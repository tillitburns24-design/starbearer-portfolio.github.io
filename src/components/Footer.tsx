import React from 'react';
import { FOOTER_CONTACTS } from '../constants';

const isExternalLink = (href?: string) => href?.startsWith('http');

export const Footer: React.FC = () => {
  return (
    <footer className="flex justify-center border-t border-gold/10 bg-royal-blue-mid/90 px-4 py-12 backdrop-blur-sm sm:px-6 xl:pl-[18rem] xl:pr-[8vw]">
      <div className="w-full max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
          <div>
            <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.3em] text-gold/60">Available for work</p>
            <h2 className="mb-4 font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Let&apos;s build something great together.
            </h2>
            <p className="max-w-2xl text-xs leading-6 text-gold-soft sm:text-sm">
              Open to collaborations in writing, game concept development, storyboarding, and visual storytelling.
              If a project needs mood, structure, and emotional clarity, this portfolio is the conversation starter.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-4 text-[9px] font-bold uppercase tracking-[0.24em] text-gold/50">Connect</h3>
              <div className="space-y-2">
                {FOOTER_CONTACTS.map((contact) => (
                  <a
                    key={contact.label}
                    href={contact.link}
                    target={isExternalLink(contact.link) ? '_blank' : undefined}
                    rel={isExternalLink(contact.link) ? 'noopener noreferrer' : undefined}
                    className="inline-block rounded-full border border-gold/10 bg-royal-blue/70 px-3 py-2 text-[11px] font-medium text-gold-soft transition-colors hover:border-gold/40 hover:text-gold"
                  >
                    {contact.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-[9px] font-bold uppercase tracking-[0.24em] text-gold/50">Focus</h3>
              <div className="space-y-2 text-xs text-gold-soft sm:text-sm">
                <p>Game concepts and worldbuilding</p>
                <p>Storyboards and cinematic thinking</p>
                <p>Short fiction and atmospheric writing</p>
                <p>Remote collaborations worldwide</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-gold/10 pt-6 text-[10px] text-gold-soft/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Teodora Jovanović. All rights reserved.</p>
          <p>Starbearer portfolio</p>
        </div>
      </div>
    </footer>
  );
};
