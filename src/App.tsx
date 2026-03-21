import React, { useState, lazy, Suspense } from 'react';
import { AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Stripe } from './components/Stripe';
import { Footer } from './components/Footer';
import { FeaturedCarousel } from './components/FeaturedCarousel';
import { PROJECTS, MISCELLANEOUS } from './constants';
import { Work, Category } from './types';

// Lazy load large components for better performance
const WorkDetail = lazy(() => import('./components/WorkDetail').then(m => ({ default: m.WorkDetail })));
const FullGallery = lazy(() => import('./components/FullGallery').then(m => ({ default: m.FullGallery })));

const StarBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(120)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gold-soft/40"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            opacity: Math.random() * 0.7 + 0.2,
            animation: `pulse ${Math.random() * 3 + 2}s infinite ease-in-out`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const miscellaneousCategories = [...MISCELLANEOUS].sort((left, right) => {
    if (left.id === 'writing') return -1;
    if (right.id === 'writing') return 1;
    return 0;
  });

  // Get specific featured works
  const featuredTitles = ["The Game", "Death's Return", "Her Guardian", "Ceres"];
  const allWorks = [...PROJECTS, ...miscellaneousCategories].flatMap(cat => cat.works);
  const featuredWorks = featuredTitles
    .map(title => allWorks.find(w => w.title === title))
    .filter((w): w is Work => w !== undefined);

  const handleWorkClickById = (workId: string) => {
    const work = allWorks.find(w => w.id === workId);
    if (work) {
      setSelectedWork(work);
      setSelectedCategory(null);
    }
  };

  return (
    <div className="min-h-screen bg-royal-blue font-sans text-white selection:bg-gold selection:text-royal-blue flex flex-col relative">
      <StarBackground />
      
      {/* Header (Horizontal and Sidebar) */}
      <Header />

      <div className="flex flex-1 relative z-10 justify-center xl:pl-[18rem] xl:pr-[8vw]">
        {/* Main Content Area */}
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
          <div className={selectedWork || selectedCategory ? 'hidden' : 'block'}>
            <main className="relative z-10 py-8 sm:py-12">
              {/* Featured Carousel before stripes */}
              <FeaturedCarousel 
                works={featuredWorks} 
                onWorkClick={(work) => setSelectedWork(work)} 
              />

              <Stripe 
                title="Main Projects" 
                categories={PROJECTS} 
                onWorkClick={(work) => setSelectedWork(work)} 
                onViewAll={(cat) => setSelectedCategory(cat)}
              />
              
              <Stripe 
                title="Additional Interests" 
                categories={miscellaneousCategories} 
                onWorkClick={(work) => setSelectedWork(work)} 
                onViewAll={(cat) => setSelectedCategory(cat)}
              />
            </main>
          </div>
        </div>
      </div>

      <div className={selectedWork || selectedCategory ? 'hidden' : 'block'} style={{ position: 'relative', zIndex: 20 }}>
        <Footer />
      </div>

      {/* Modals / Overlays */}
      <Suspense fallback={null}>
        <AnimatePresence>
          {selectedWork && (
            <WorkDetail 
              work={selectedWork} 
              onBack={() => setSelectedWork(null)} 
              onWorkClick={handleWorkClickById}
            />
          )}
          
          {selectedCategory && (
            <FullGallery 
              category={selectedCategory} 
              onBack={() => setSelectedCategory(null)} 
              onWorkClick={(work) => {
                setSelectedCategory(null);
                setSelectedWork(work);
              }}
            />
          )}
        </AnimatePresence>
      </Suspense>
    </div>
  );
}
