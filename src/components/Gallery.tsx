import React from 'react';
import { motion } from 'motion/react';
import { Work } from '../types';

interface GalleryProps {
  works: Work[];
  onWorkClick: (work: Work) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ works, onWorkClick }) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {works.map((work, index) => (
        <motion.article
          key={work.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08 }}
          onClick={() => onWorkClick(work)}
          className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[24px] border border-gold/10 bg-royal-blue-light shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-gold/35"
        >
          <div className="aspect-[5/4] overflow-hidden bg-royal-blue-mid">
            <img
              src={work.imageUrl}
              alt={work.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <span className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-gold/60">
              {work.category}
            </span>
            <h3 className="font-serif text-3xl font-semibold leading-none text-white transition-colors group-hover:text-gold">
              {work.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-7 text-gold-soft">
              {work.description}
            </p>
            <div className="mt-5 text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
              Open project
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
};
