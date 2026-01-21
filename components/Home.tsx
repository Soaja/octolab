import React from 'react';
import { Hero } from './Hero';
import { WhyUs } from './WhyUs';
import { Products } from './Products';
import { Comparison } from './Comparison';
import { About } from './About';
import { Faq } from './Faq';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <WhyUs />
      <Products />
      <Comparison />
      <About />
      <Faq />
    </>
  );
};