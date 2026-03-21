import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Category, Work } from '../types';
import { Gallery } from './Gallery';

interface FullGalleryProps {
  category: Category;
  onBack: () => void;
  onWorkClick: (work: Work) => void;
}

export const FullGallery: React.FC<FullGalleryProps> = ({ category, onBack, onWorkClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 32 }}
      className="fixed inset-0 z-[90] overflow-y-auto bg-royal-blue/95 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <button
          onClick={onBack}
          className="mb-10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-gold transition-colors hover:text-gold-soft sm:mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </button>

        <div className="mb-10 rounded-[28px] border border-gold/10 bg-royal-blue-light p-6 sm:mb-12 sm:p-8 lg:p-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60">Collection</span>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-none text-white sm:text-6xl lg:text-7xl">
            {category.title}
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-gold-soft sm:text-base">
            A closer look at every project in the {category.title} collection, including visual material,
            writing, and project context where available.
          </p>
          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.24em] text-gold/60">
            {category.works.length} projects
          </p>
        </div>

        <Gallery works={category.works} onWorkClick={onWorkClick} />
      </div>
    </motion.div>
  );
};
