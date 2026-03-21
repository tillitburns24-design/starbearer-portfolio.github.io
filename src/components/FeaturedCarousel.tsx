import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Work } from '../types';

interface FeaturedCarouselProps {
  works: Work[];
  onWorkClick: (work: Work) => void;
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ works, onWorkClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (works.length <= 1) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % works.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [works.length]);

  useEffect(() => {
    if (currentIndex > works.length - 1) {
      setCurrentIndex(0);
    }
  }, [currentIndex, works.length]);

  if (works.length === 0) {
    return null;
  }

  const activeWork = works[currentIndex];
  const featuredImageStyle = activeWork.title === 'The Game' ? { objectPosition: 'center 18%' as const } : undefined;

  const nextSlide = (event: React.MouseEvent) => {
    event.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % works.length);
  };

  const prevSlide = (event: React.MouseEvent) => {
    event.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + works.length) % works.length);
  };

  return (
    <div className="mb-12 w-full sm:mb-16">
      <div className="group relative overflow-hidden rounded-[28px] border border-gold/10 bg-royal-blue-light shadow-2xl">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={activeWork.id}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="grid min-h-[520px] cursor-pointer lg:min-h-[540px] lg:grid-cols-[1.15fr_0.85fr]"
            onClick={() => onWorkClick(activeWork)}
          >
            <div className="relative h-[280px] overflow-hidden sm:h-[360px] lg:h-full lg:min-h-[540px]">
              <img
                src={activeWork.imageUrl}
                alt={activeWork.title}
                className="h-full w-full object-cover object-center"
                style={featuredImageStyle}
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-royal-blue/15 to-royal-blue lg:bg-gradient-to-r lg:from-transparent lg:via-royal-blue/10 lg:to-royal-blue" />
            </div>

            <div className="relative flex flex-col justify-end bg-royal-blue p-6 sm:p-8 lg:justify-center lg:p-12">
              <div className="max-w-xl">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-gold/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
                    Featured work
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold/60">
                    {activeWork.category}
                  </span>
                </div>

                <h2 className="mb-4 font-serif text-4xl font-semibold leading-none tracking-tight text-white sm:text-5xl lg:text-6xl">
                  {activeWork.title}
                </h2>
                <p className="mb-8 max-w-lg text-sm leading-7 text-gold-soft sm:text-base">
                  {activeWork.description}
                </p>

                <div className="inline-flex rounded-full border border-gold/30 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-gold transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-royal-blue">
                  View project
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {works.length > 1 && (
          <>
            <button
              aria-label="Previous featured project"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/10 bg-black/25 p-2 text-white opacity-100 transition-all hover:border-gold/60 hover:bg-gold hover:text-royal-blue md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <button
              aria-label="Next featured project"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/10 bg-black/25 p-2 text-white opacity-100 transition-all hover:border-gold/60 hover:bg-gold hover:text-royal-blue md:opacity-0 md:group-hover:opacity-100"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            <div className="absolute bottom-5 left-6 z-20 flex gap-2 sm:bottom-6 sm:left-8">
              {works.map((work, index) => (
                <button
                  key={work.id}
                  aria-label={`Show featured project ${work.title}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    setCurrentIndex(index);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    index === currentIndex ? 'w-10 bg-gold' : 'w-3 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
