import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Category, Work } from '../types';
import { Gallery } from './Gallery';

interface StripeProps {
  title: string;
  categories: Category[];
  onWorkClick: (work: Work) => void;
  onViewAll: (category: Category) => void;
}

const getItemsPerPage = () => {
  if (typeof window === 'undefined') {
    return 3;
  }

  if (window.innerWidth < 768) {
    return 1;
  }

  if (window.innerWidth < 1280) {
    return 2;
  }

  return 3;
};

export const Stripe: React.FC<StripeProps> = ({ title, categories, onWorkClick, onViewAll }) => {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(categories.length === 1 ? categories[0].id : null);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage);

  useEffect(() => {
    const syncItemsPerPage = () => setItemsPerPage(getItemsPerPage());

    syncItemsPerPage();
    window.addEventListener('resize', syncItemsPerPage);

    return () => window.removeEventListener('resize', syncItemsPerPage);
  }, []);

  useEffect(() => {
    if (categories.length === 1 && activeCategoryId !== categories[0].id) {
      setActiveCategoryId(categories[0].id);
    }
  }, [activeCategoryId, categories]);

  const activeCategory = categories.find((category) => category.id === activeCategoryId) ?? null;
  const totalPages = activeCategory ? Math.ceil(activeCategory.works.length / itemsPerPage) : 0;
  const paginatedWorks = activeCategory
    ? activeCategory.works.slice(page * itemsPerPage, (page + 1) * itemsPerPage)
    : [];

  useEffect(() => {
    if (!activeCategory) {
      return;
    }

    const nextTotalPages = Math.max(1, Math.ceil(activeCategory.works.length / itemsPerPage));
    setPage((currentPage) => Math.min(currentPage, nextTotalPages - 1));
  }, [activeCategory, itemsPerPage]);

  const handleCategoryClick = (id: string) => {
    if (categories.length === 1) {
      setActiveCategoryId(id);
      return;
    }

    if (activeCategoryId === id) {
      setActiveCategoryId(null);
      return;
    }

    setActiveCategoryId(id);
    setPage(0);
    setDirection(0);
  };

  const paginate = (nextDirection: number) => {
    setDirection(nextDirection);
    setPage((currentPage) => currentPage + nextDirection);
  };

  const variants = {
    enter: (customDirection: number) => ({
      x: customDirection > 0 ? 160 : -160,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (customDirection: number) => ({
      x: customDirection < 0 ? 160 : -160,
      opacity: 0
    })
  };

  return (
    <section className="border-b border-gold/10 py-12 sm:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-gold">{title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-gold-soft">
              Browse by discipline, then open a project for the full visual and written breakdown.
            </p>
          </div>
        </div>

        <div className={`mb-10 grid gap-4 ${categories.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'}`}>
          {categories.map((category) => {
            const isActive = activeCategoryId === category.id;

            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`rounded-2xl border px-5 py-5 text-left transition-all duration-300 ${
                  isActive
                    ? 'border-gold bg-gold text-royal-blue shadow-lg shadow-gold/10'
                    : 'border-gold/20 bg-royal-blue-light text-gold-soft hover:border-gold/50 hover:bg-royal-blue-mid'
                }`}
              >
                <div className="text-base font-semibold tracking-tight">{category.title}</div>
                <div className={`mt-2 text-[11px] font-bold uppercase tracking-[0.24em] ${isActive ? 'text-royal-blue/70' : 'text-gold/60'}`}>
                  {category.works.length} projects
                </div>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="relative"
            >
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {activeCategory.title}
                  </h3>
                  <p className="mt-2 text-sm text-gold-soft">
                    Showing {paginatedWorks.length} of {activeCategory.works.length} projects
                  </p>
                </div>

                {totalPages > 1 && (
                  <div className="flex gap-2">
                    <button
                      aria-label="Previous projects"
                      disabled={page === 0}
                      onClick={() => paginate(-1)}
                      className="rounded-full border border-gold/20 p-3 text-gold transition-colors hover:bg-gold/10 disabled:opacity-20"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      aria-label="Next projects"
                      disabled={page >= totalPages - 1}
                      onClick={() => paginate(1)}
                      className="rounded-full border border-gold/20 p-3 text-gold transition-colors hover:bg-gold/10 disabled:opacity-20"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="overflow-hidden py-2">
                <AnimatePresence custom={direction} initial={false} mode="wait">
                  <motion.div
                    key={`${activeCategory.id}-${page}-${itemsPerPage}`}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 280, damping: 28 },
                      opacity: { duration: 0.2 }
                    }}
                  >
                    <Gallery works={paginatedWorks} onWorkClick={onWorkClick} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => onViewAll(activeCategory)}
                  className="rounded-full border border-gold/20 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gold transition-colors hover:border-gold/60 hover:bg-gold/10"
                >
                  Explore full collection ({activeCategory.works.length})
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
