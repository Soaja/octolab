import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { isOpen, toggleCart, items, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[480px] bg-black border-l border-white/10 shadow-2xl z-[100] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500">
                  <ShoppingBag className="w-4 h-4" />
                </span>
                <h2 className="text-xl font-display font-bold text-white tracking-wide">Research List</h2>
                <span className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">
                  {items.length} ITEM{items.length !== 1 && 'S'}
                </span>
              </div>
              <button 
                onClick={toggleCart}
                className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-600">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <p className="text-gray-400 font-display text-lg">Your archive is empty</p>
                  <button 
                    onClick={() => { toggleCart(); navigate('/shop'); }}
                    className="text-emerald-500 text-sm hover:underline"
                  >
                    Browse Catalog
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex gap-4 bg-white/[0.03] p-4 rounded-2xl border border-white/5 group"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 rounded-xl bg-white/5 overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-overlay opacity-80" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-display font-bold text-white text-lg">{item.name}</h3>
                          <span className="text-[10px] font-mono uppercase text-gray-500 tracking-wider block mt-1">
                            Ref: {item.id.padStart(3, '0')}-LAB
                          </span>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-600 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Control */}
                        <div className="flex items-center gap-3 bg-black border border-white/10 rounded-full px-2 py-1">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-mono text-white w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="block font-bold text-white">
                            {(item.price * item.quantity).toLocaleString()} <span className="text-xs text-emerald-500">RSD</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-6 bg-white/[0.02] border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                  <span>Subtotal</span>
                  <span className="text-white font-bold text-lg">{cartTotal.toLocaleString()} RSD</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs text-emerald-500/80 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                   <ShieldCheck className="w-4 h-4" />
                   <span>Secure checkout & discreet shipping verified.</span>
                </div>

                <button className="w-full relative group overflow-hidden bg-white text-black py-4 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-emerald-500 transition-colors duration-300">
                  <span className="relative z-10">Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};