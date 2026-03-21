import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CONTACTS } from '../constants';

const TOOLS = ['Unreal Engine', 'Word', 'Sketchbook Pro', 'DaVinci Resolve', 'ZBrush', '3ds Max'];
const HIGHLIGHTS = [
  'Creator of story-driven cathartic experiences',
  'Builder of intimate worlds, moods, and character-led journeys',
  'Narrative, concept, and visual development enthusiast'
];

const isExternalLink = (href?: string) => href?.startsWith('http');

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 260);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="relative z-10 w-full border-b border-gold/10 bg-royal-blue-light/90 px-4 py-12 backdrop-blur-sm sm:px-6 sm:py-16 xl:px-[15vw]">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-12">
          <div className="flex shrink-0 flex-col items-center gap-4">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36"
            >
              <img
                src="profile.jpg"
                alt="Teodora Jovanović portrait"
                className="h-full w-full rounded-full border-4 border-gold object-cover shadow-xl"
                referrerPolicy="no-referrer"
                fetchPriority="high"
                decoding="async"
              />
            </motion.div>
            <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-gold/60">Starbearer</span>
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h1 className="mb-3 font-serif text-5xl font-semibold leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
              Teodora Jovanović
            </h1>
            <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.32em] text-gold sm:text-xs">
              Storyteller, writer, storyboard artist, concept artist, creative
            </p>

            <div className="mx-auto mb-8 grid max-w-xl gap-3 lg:mx-0">
              {HIGHLIGHTS.map((highlight) => (
                <div key={highlight} className="mx-auto flex w-full max-w-xl items-start justify-start gap-3 text-left lg:mx-0">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <p className="text-sm font-medium leading-relaxed text-gold-soft sm:text-base">{highlight}</p>
                </div>
              ))}
            </div>

            <p className="mb-8 max-w-2xl text-sm leading-7 text-gold-soft sm:text-base">
              Exploring the intersection of level design, game mechanics, and visual storytelling.
              Crafting immersive worlds and digital experiences with a focus on narrative, atmosphere, and player catharsis.
            </p>

            <div className="flex flex-col">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-gold/10 py-4 lg:justify-start">
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">Contacts</span>
                <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                  {CONTACTS.map((contact) => (
                    <a
                      key={contact.label}
                      href={contact.link}
                      target={isExternalLink(contact.link) ? '_blank' : undefined}
                      rel={isExternalLink(contact.link) ? 'noopener noreferrer' : undefined}
                      className="rounded-full border border-gold/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-soft transition-colors hover:border-gold/60 hover:text-gold"
                    >
                      {contact.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-gold/10 py-4 lg:justify-start">
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">Tools</span>
                <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
                  {TOOLS.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-gold/20 bg-royal-blue px-3 py-1 text-[11px] text-gold-soft"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isScrolled && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 z-40 hidden h-screen w-[15vw] min-w-[220px] flex-col items-center overflow-y-auto border-r border-gold/10 bg-royal-blue-light/95 p-6 backdrop-blur xl:flex"
          >
            <div className="flex w-full flex-col items-center gap-8">
              <div className="h-24 w-24 shrink-0">
                <img
                  src="profile.jpg"
                  alt="Teodora Jovanović portrait"
                  className="h-full w-full rounded-full border-2 border-gold object-cover shadow-md"
                  referrerPolicy="no-referrer"
                  decoding="async"
                />
              </div>

              <div className="space-y-4 text-center">
                <h1 className="font-serif text-3xl font-semibold tracking-tight text-white">Teodora Jovanović</h1>
                <div className="mx-auto h-px w-8 bg-gold/30" />
                <p className="text-center text-[12px] font-medium leading-relaxed text-gold-soft">
                  Teodora Jovanović is a storyteller and concept artist exploring the boundaries of digital and physical art.
                  Starbearer is her portfolio of immersive worlds, intimate moments, and emotionally led projects.
                </p>
              </div>

              <div className="w-full space-y-4 pt-4">
                <div className="mb-2 text-center text-[9px] uppercase tracking-[0.3em] text-gold/50">Connect</div>
                <div className="flex flex-col gap-2">
                  {CONTACTS.map((contact) => (
                    <a
                      key={contact.label}
                      href={contact.link}
                      target={isExternalLink(contact.link) ? '_blank' : undefined}
                      rel={isExternalLink(contact.link) ? 'noopener noreferrer' : undefined}
                      className="rounded-full border border-gold/10 bg-royal-blue/70 px-3 py-2 text-center text-[9px] font-bold uppercase tracking-[0.24em] text-gold-soft transition-colors hover:border-gold/40 hover:text-gold"
                    >
                      {contact.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-auto w-full pt-8">
                <div className="mb-4 text-center text-[9px] uppercase tracking-[0.3em] text-gold/50">Status</div>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-medium text-gold-soft">Available</span>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};
