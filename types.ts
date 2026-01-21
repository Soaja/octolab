import React from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  tags: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}