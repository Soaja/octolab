import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const FluidBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Configuration ---
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowPowerDevice = isMobile || navigator.hardwareConcurrency <= 4;
    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

    // Theme Colors (Matching Sora Peptides)
    // Primary BG: #0f172a -> R:15 G:23 B:42
    // Accent: #10b981 -> R:16 G:185 B:129
    const settings = {
      sphereCount: isMobile ? 5 : 8,
      ambientIntensity: 0.05,
      diffuseIntensity: 1.0,
      specularIntensity: 1.5,
      specularPower: 8,
      fresnelPower: 1.5,
      // Slate 900 Background
      backgroundColor: new THREE.Color(0x0f172a), 
      // Deep Emerald/Slate Spheres
      sphereColor: new THREE.Color(0x0a2a2a), 
      // Bright Emerald Light
      lightColor: new THREE.Color(0x10b981), 
      lightPosition: new THREE.Vector3(0.5, 1, 0.5),
      smoothness: 0.4,
      contrast: 1.1,
      fogDensity: 0.10,
      cursorGlowIntensity: 0.8,
      cursorGlowRadius: 1.5,
      cursorGlowColor: new THREE.Color(0x34d399), // Emerald 400
      
      fixedTopLeftRadius: 0.8,
      fixedBottomRightRadius: 0.9,
      smallTopLeftRadius: 0.3,
      smallBottomRightRadius: 0.35,
      cursorRadiusMin: 0.08,
      cursorRadiusMax: 0.15,
      animationSpeed: 0.6,
      movementScale: 1.2,
      mouseSmoothness: 0.1,
      mergeDistance: 1.5,
      mouseProximityEffect: true,
      minMovementScale: 0.3,
      maxMovementScale: 1.0
    };

    // --- State ---
    let scene: THREE.Scene, camera: THREE.OrthographicCamera, renderer: THREE.WebGLRenderer, material: THREE.ShaderMaterial;
    let clock = new THREE.Clock();
    let mousePosition = new THREE.Vector2(0.5, 0.5);
    let targetMousePosition = new THREE.Vector2(0.5, 0.5);
    let cursorSphere3D = new THREE.Vector3(0, 0, 0);
    let animationFrameId: number;

    // --- Init ---
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    renderer = new THREE.WebGLRenderer({
      antialias: !isMobile && !isLowPowerDevice,
      alpha: true,
      powerPreference: isMobile ? "default" : "high-performance",
      preserveDrawingBuffer: false,
      premultipliedAlpha: false
    });

    renderer.setPixelRatio(devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Explicit style to ensure background positioning
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.zIndex = '0';
    
    containerRef.current.appendChild(renderer.domElement);

    // --- Shader ---
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      ${isMobile || isLowPowerDevice ? "precision mediump float;" : "precision highp float;"}
      
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uActualResolution;
      uniform vec2 uMousePosition;
      uniform vec3 uCursorSphere;
      uniform float uCursorRadius;
      uniform int uSphereCount;
      uniform float uFixedTopLeftRadius;
      uniform float uFixedBottomRightRadius;
      uniform float uSmallTopLeftRadius;
      uniform float uSmallBottomRightRadius;
      uniform float uMergeDistance;
      uniform float uSmoothness;
      uniform float uAmbientIntensity;
      uniform float uDiffuseIntensity;
      uniform float uSpecularIntensity;
      uniform float uSpecularPower;
      uniform float uFresnelPower;
      uniform vec3 uBackgroundColor;
      uniform vec3 uSphereColor;
      uniform vec3 uLightColor;
      uniform vec3 uLightPosition;
      uniform float uContrast;
      uniform float uFogDensity;
      uniform float uAnimationSpeed;
      uniform float uMovementScale;
      uniform bool uMouseProximityEffect;
      uniform float uMinMovementScale;
      uniform float uMaxMovementScale;
      uniform float uCursorGlowIntensity;
      uniform float uCursorGlowRadius;
      uniform vec3 uCursorGlowColor;
      uniform float uIsMobile;
      
      varying vec2 vUv;
      
      const float PI = 3.14159265359;
      const float EPSILON = 0.001;
      const float MAX_DIST = 100.0;
      
      float smin(float a, float b, float k) {
        float h = max(k - abs(a - b), 0.0) / k;
        return min(a, b) - h * h * k * 0.25;
      }
      
      float sdSphere(vec3 p, float r) {
        return length(p) - r;
      }
      
      vec3 screenToWorld(vec2 normalizedPos) {
        vec2 uv = normalizedPos * 2.0 - 1.0;
        uv.x *= uResolution.x / uResolution.y;
        return vec3(uv * 2.0, 0.0);
      }
      
      float getDistanceToCenter(vec2 pos) {
        float dist = length(pos - vec2(0.5, 0.5)) * 2.0;
        return smoothstep(0.0, 1.0, dist);
      }
      
      float sceneSDF(vec3 pos) {
        float result = MAX_DIST;
        
        vec3 topLeftPos = screenToWorld(vec2(0.08, 0.92));
        float topLeft = sdSphere(pos - topLeftPos, uFixedTopLeftRadius);
        
        vec3 smallTopLeftPos = screenToWorld(vec2(0.25, 0.72));
        float smallTopLeft = sdSphere(pos - smallTopLeftPos, uSmallTopLeftRadius);
        
        vec3 bottomRightPos = screenToWorld(vec2(0.92, 0.08));
        float bottomRight = sdSphere(pos - bottomRightPos, uFixedBottomRightRadius);
        
        vec3 smallBottomRightPos = screenToWorld(vec2(0.72, 0.25));
        float smallBottomRight = sdSphere(pos - smallBottomRightPos, uSmallBottomRightRadius);
        
        float t = uTime * uAnimationSpeed;
        
        float dynamicMovementScale = uMovementScale;
        if (uMouseProximityEffect) {
          float distToCenter = getDistanceToCenter(uMousePosition);
          float mixFactor = smoothstep(0.0, 1.0, distToCenter);
          dynamicMovementScale = mix(uMinMovementScale, uMaxMovementScale, mixFactor);
        }
        
        int maxIter = uIsMobile > 0.5 ? 4 : min(uSphereCount, 10);
        for (int i = 0; i < 10; i++) {
          if (i >= uSphereCount || i >= maxIter) break;
          
          float fi = float(i);
          float speed = 0.4 + fi * 0.12;
          float radius = 0.12 + mod(fi, 3.0) * 0.06;
          float orbitRadius = (0.3 + mod(fi, 3.0) * 0.15) * dynamicMovementScale;
          float phaseOffset = fi * PI * 0.35;
          
          float distToCursor = length(vec3(0.0) - uCursorSphere);
          float proximityScale = 1.0 + (1.0 - smoothstep(0.0, 1.0, distToCursor)) * 0.5;
          orbitRadius *= proximityScale;
          
          vec3 offset;
          if (i == 0) {
            offset = vec3(
              sin(t * speed) * orbitRadius * 0.7,
              sin(t * 0.5) * orbitRadius,
              cos(t * speed * 0.7) * orbitRadius * 0.5
            );
          } else if (i == 1) {
            offset = vec3(
              sin(t * speed + PI) * orbitRadius * 0.5,
              -sin(t * 0.5) * orbitRadius,
              cos(t * speed * 0.7 + PI) * orbitRadius * 0.5
            );
          } else {
            offset = vec3(
              sin(t * speed + phaseOffset) * orbitRadius * 0.8,
              cos(t * speed * 0.85 + phaseOffset * 1.3) * orbitRadius * 0.6,
              sin(t * speed * 0.5 + phaseOffset) * 0.3
            );
          }
          
          vec3 toCursor = uCursorSphere - offset;
          float cursorDist = length(toCursor);
          if (cursorDist < uMergeDistance && cursorDist > 0.0) {
            float attraction = (1.0 - cursorDist / uMergeDistance) * 0.3;
            offset += normalize(toCursor) * attraction;
          }
          
          float movingSphere = sdSphere(pos - offset, radius);
          
          float blend = 0.05;
          if (cursorDist < uMergeDistance) {
            float influence = 1.0 - (cursorDist / uMergeDistance);
            blend = mix(0.05, uSmoothness, influence * influence * influence);
          }
          
          result = smin(result, movingSphere, blend);
        }
        
        float cursorBall = sdSphere(pos - uCursorSphere, uCursorRadius);
        
        float topLeftGroup = smin(topLeft, smallTopLeft, 0.4);
        float bottomRightGroup = smin(bottomRight, smallBottomRight, 0.4);
        
        result = smin(result, topLeftGroup, 0.3);
        result = smin(result, bottomRightGroup, 0.3);
        result = smin(result, cursorBall, uSmoothness);
        
        return result;
      }
      
      vec3 calcNormal(vec3 p) {
        float eps = 0.002;
        return normalize(vec3(
          sceneSDF(p + vec3(eps, 0, 0)) - sceneSDF(p - vec3(eps, 0, 0)),
          sceneSDF(p + vec3(0, eps, 0)) - sceneSDF(p - vec3(0, eps, 0)),
          sceneSDF(p + vec3(0, 0, eps)) - sceneSDF(p - vec3(0, 0, eps))
        ));
      }
      
      float rayMarch(vec3 ro, vec3 rd) {
        float t = 0.0;
        int maxSteps = uIsMobile > 0.5 ? 24 : 48;
        
        for (int i = 0; i < 48; i++) {
          if (i >= maxSteps) break;
          vec3 p = ro + rd * t;
          float d = sceneSDF(p);
          if (d < EPSILON) return t;
          if (t > 5.0) break;
          t += d * 0.9;
        }
        return -1.0;
      }
      
      vec3 lighting(vec3 p, vec3 rd, float t) {
        if (t < 0.0) return vec3(0.0);
        
        vec3 normal = calcNormal(p);
        vec3 viewDir = -rd;
        
        vec3 ambient = uLightColor * uAmbientIntensity;
        
        vec3 lightDir = normalize(uLightPosition);
        float diff = max(dot(normal, lightDir), 0.0);
        vec3 diffuse = uLightColor * diff * uDiffuseIntensity;
        
        vec3 reflectDir = reflect(-lightDir, normal);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), uSpecularPower);
        float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), uFresnelPower);
        
        vec3 specular = uLightColor * spec * uSpecularIntensity * fresnel;
        vec3 fresnelRim = uLightColor * fresnel * 0.4;
        
        float distToCursor = length(p - uCursorSphere);
        if (distToCursor < uCursorRadius + 0.4) {
          float highlight = 1.0 - smoothstep(0.0, uCursorRadius + 0.4, distToCursor);
          specular += uLightColor * highlight * 0.2;
        }
        
        vec3 color = (uSphereColor + ambient + diffuse + specular + fresnelRim);
        
        // Tone mapping
        color = pow(color, vec3(uContrast));
        
        return color;
      }
      
      float calculateCursorGlow(vec3 worldPos) {
        float dist = length(worldPos.xy - uCursorSphere.xy);
        float glow = 1.0 - smoothstep(0.0, uCursorGlowRadius, dist);
        glow = pow(glow, 2.0);
        return glow * uCursorGlowIntensity;
      }
      
      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - uActualResolution.xy) / uActualResolution.xy;
        uv.x *= uResolution.x / uResolution.y;
        
        vec3 ro = vec3(uv * 2.0, -1.0);
        vec3 rd = vec3(0.0, 0.0, 1.0);
        
        float t = rayMarch(ro, rd);
        vec3 p = ro + rd * t;
        vec3 color = lighting(p, rd, t);
        
        float cursorGlow = calculateCursorGlow(ro);
        vec3 glowContribution = uCursorGlowColor * cursorGlow;
        
        if (t > 0.0) {
          float fogAmount = 1.0 - exp(-t * uFogDensity);
          color = mix(color, uBackgroundColor.rgb, fogAmount * 0.3);
          color += glowContribution * 0.3;
          gl_FragColor = vec4(color, 1.0);
        } else {
          // If no object hit, just draw background + glow
          vec3 bg = uBackgroundColor;
          // Add some subtle noise to BG to match Sora theme
          // Simple noise not implemented in shader to save perf, relying on static css overlay in parent if needed
          bg += glowContribution * 0.5;
          gl_FragColor = vec4(bg, 1.0);
        }
      }
    `;

    material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uActualResolution: { value: new THREE.Vector2(window.innerWidth * devicePixelRatio, window.innerHeight * devicePixelRatio) },
        uMousePosition: { value: new THREE.Vector2(0.5, 0.5) },
        uCursorSphere: { value: new THREE.Vector3(0, 0, 0) },
        uCursorRadius: { value: settings.cursorRadiusMin },
        uSphereCount: { value: settings.sphereCount },
        uFixedTopLeftRadius: { value: settings.fixedTopLeftRadius },
        uFixedBottomRightRadius: { value: settings.fixedBottomRightRadius },
        uSmallTopLeftRadius: { value: settings.smallTopLeftRadius },
        uSmallBottomRightRadius: { value: settings.smallBottomRightRadius },
        uMergeDistance: { value: settings.mergeDistance },
        uSmoothness: { value: settings.smoothness },
        uAmbientIntensity: { value: settings.ambientIntensity },
        uDiffuseIntensity: { value: settings.diffuseIntensity },
        uSpecularIntensity: { value: settings.specularIntensity },
        uSpecularPower: { value: settings.specularPower },
        uFresnelPower: { value: settings.fresnelPower },
        uBackgroundColor: { value: settings.backgroundColor },
        uSphereColor: { value: settings.sphereColor },
        uLightColor: { value: settings.lightColor },
        uLightPosition: { value: settings.lightPosition },
        uContrast: { value: settings.contrast },
        uFogDensity: { value: settings.fogDensity },
        uAnimationSpeed: { value: settings.animationSpeed },
        uMovementScale: { value: settings.movementScale },
        uMouseProximityEffect: { value: settings.mouseProximityEffect },
        uMinMovementScale: { value: settings.minMovementScale },
        uMaxMovementScale: { value: settings.maxMovementScale },
        uCursorGlowIntensity: { value: settings.cursorGlowIntensity },
        uCursorGlowRadius: { value: settings.cursorGlowRadius },
        uCursorGlowColor: { value: settings.cursorGlowColor },
        uIsMobile: { value: isMobile ? 1.0 : 0.0 }
      },
      vertexShader,
      fragmentShader,
      transparent: false
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // --- Helpers ---
    function screenToWorldJS(normalizedX: number, normalizedY: number) {
      const uv_x = normalizedX * 2.0 - 1.0;
      const uv_y = normalizedY * 2.0 - 1.0;
      const aspect = window.innerWidth / window.innerHeight;
      return new THREE.Vector3(uv_x * aspect * 2.0, uv_y * 2.0, 0.0);
    }

    // --- Events ---
    const handleMouseMove = (event: MouseEvent) => {
      targetMousePosition.x = event.clientX / window.innerWidth;
      targetMousePosition.y = 1.0 - event.clientY / window.innerHeight;
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(devicePixelRatio);
      
      material.uniforms.uResolution.value.set(width, height);
      material.uniforms.uActualResolution.value.set(width * devicePixelRatio, height * devicePixelRatio);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // --- Animation Loop ---
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse
      mousePosition.x += (targetMousePosition.x - mousePosition.x) * settings.mouseSmoothness;
      mousePosition.y += (targetMousePosition.y - mousePosition.y) * settings.mouseSmoothness;

      // Calculate Cursor Sphere Physics
      const worldPos = screenToWorldJS(mousePosition.x, mousePosition.y);
      cursorSphere3D.copy(worldPos);

      // Dynamic Radius based on merge proximity
      let closestDistance = 1000.0;
      const fixedPositions = [
        screenToWorldJS(0.08, 0.92),
        screenToWorldJS(0.25, 0.72),
        screenToWorldJS(0.92, 0.08),
        screenToWorldJS(0.72, 0.25)
      ];

      fixedPositions.forEach((pos) => {
        const dist = cursorSphere3D.distanceTo(pos);
        closestDistance = Math.min(closestDistance, dist);
      });

      const proximityFactor = Math.max(0, 1.0 - closestDistance / settings.mergeDistance);
      const smoothFactor = proximityFactor * proximityFactor * (3.0 - 2.0 * proximityFactor);
      const dynamicRadius = settings.cursorRadiusMin + (settings.cursorRadiusMax - settings.cursorRadiusMin) * smoothFactor;

      // Update Uniforms
      material.uniforms.uTime.value = clock.getElapsedTime();
      material.uniforms.uMousePosition.value.copy(mousePosition);
      material.uniforms.uCursorSphere.value.copy(cursorSphere3D);
      material.uniforms.uCursorRadius.value = dynamicRadius;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer) renderer.dispose();
      if (containerRef.current) containerRef.current.innerHTML = '';
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0" />;
};