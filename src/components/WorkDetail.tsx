import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Work } from '../types';

interface WorkDetailProps {
  work: Work;
  onBack: () => void;
  onWorkClick?: (workId: string) => void;
}

export const WorkDetail: React.FC<WorkDetailProps> = ({ work, onBack, onWorkClick }) => {
  const renderMediaFooter = (caption?: string, url?: string, actionLabel = 'Open media in a new tab') => (
    <div className="border-t border-gold/10 bg-royal-blue-light/80 p-4">
      {caption && <p className="text-center text-xs font-medium text-gold-soft">{caption}</p>}
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`block text-center text-[11px] font-medium text-gold underline transition-colors hover:text-gold-soft ${caption ? 'mt-2' : ''}`}
        >
          {actionLabel}
        </a>
      )}
    </div>
  );

  const renderLink = ({ href, children }: any) => {
    if (href?.startsWith('work:')) {
      const workId = href.split(':')[1];

      return (
        <button
          onClick={() => onWorkClick?.(workId)}
          className="inline-block font-bold text-gold underline transition-colors hover:text-gold-soft"
        >
          {children}
        </button>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-gold underline transition-colors hover:text-gold-soft"
      >
        {children}
      </a>
    );
  };

  const components = {
    p: ({ children }: any) => <p className="mb-4 text-sm leading-7 text-gold-soft sm:text-base">{children}</p>,
    h1: ({ children }: any) => <h2 className="mb-4 font-serif text-3xl font-semibold text-white sm:text-4xl">{children}</h2>,
    h2: ({ children }: any) => <h2 className="mb-4 font-serif text-3xl font-semibold text-white sm:text-4xl">{children}</h2>,
    h3: ({ children }: any) => <h3 className="mb-3 mt-8 font-serif text-2xl font-semibold text-white">{children}</h3>,
    strong: ({ children }: any) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-gold-soft">{children}</em>,
    ul: ({ children }: any) => <ul className="mb-4 space-y-2">{children}</ul>,
    li: ({ children }: any) => <li className="ml-4 list-disc text-sm leading-7 text-gold-soft sm:text-base">{children}</li>,
    a: renderLink
  };

  const sidebarComponents = {
    p: ({ children }: any) => <p className="mb-3 text-xs leading-6 text-gold-soft sm:text-sm">{children}</p>,
    h1: ({ children }: any) => <h2 className="mb-3 font-serif text-2xl font-semibold text-white sm:text-3xl">{children}</h2>,
    h2: ({ children }: any) => <h2 className="mb-3 font-serif text-2xl font-semibold text-white sm:text-3xl">{children}</h2>,
    h3: ({ children }: any) => <h3 className="mb-2 mt-6 font-serif text-xl font-semibold text-white">{children}</h3>,
    strong: ({ children }: any) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-gold-soft">{children}</em>,
    ul: ({ children }: any) => <ul className="mb-3 space-y-2">{children}</ul>,
    li: ({ children }: any) => <li className="ml-4 list-disc text-xs leading-6 text-gold-soft sm:text-sm">{children}</li>,
    a: renderLink
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] overflow-y-auto bg-royal-blue/95 backdrop-blur-sm"
    >
      <header className="sticky top-0 z-50 border-b border-gold/10 bg-royal-blue/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <img
              src="profile.jpg"
              alt="Teodora Jovanović"
              className="h-8 w-8 rounded-full border border-gold/30 object-cover"
              referrerPolicy="no-referrer"
              decoding="async"
            />
            <span className="font-serif text-2xl font-semibold tracking-tight text-white">Starbearer Portfolio</span>
          </div>
        </div>
        <div className="border-t border-gold/10 bg-royal-blue-light/70">
          <div className="mx-auto flex h-11 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em] text-gold transition-colors hover:text-gold-soft"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Return to portfolio
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_296px] xl:gap-10">
          <aside className="order-1 h-fit space-y-6 xl:order-2 xl:sticky xl:top-28">
            <div className="overflow-hidden rounded-[28px] border border-gold/10 bg-royal-blue-light">
              <img
                src={work.imageUrl}
                alt={work.title}
                className="aspect-[5/4] w-full object-cover"
                referrerPolicy="no-referrer"
                decoding="async"
              />
            </div>

            <div className="rounded-[28px] border border-gold/10 bg-royal-blue-light p-5">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60">{work.category}</p>
              <h1 className="mb-4 font-serif text-3xl font-semibold leading-none text-white sm:text-4xl">
                {work.title}
              </h1>
              <div className="space-y-3">
                <ReactMarkdown components={sidebarComponents} rehypePlugins={[rehypeRaw]}>
                  {work.longDescription || ''}
                </ReactMarkdown>
              </div>
            </div>

            <div className="rounded-[28px] border border-gold/10 bg-royal-blue-light p-5">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60">Project details</p>
              <div className="space-y-3">
                {work.details.map((detail, index) => (
                  <div key={`${detail.label}-${index}`}>
                    <h4 className="mb-1 text-[10px] font-bold uppercase tracking-[0.24em] text-gold/50">{detail.label}</h4>
                    <p className="text-xs leading-6 text-gold-soft sm:text-sm">{detail.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="order-2 space-y-8 sm:space-y-10 xl:order-1">
            {work.media.map((item, index) => (
              <motion.article
                key={`${work.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className={item.type === 'bubble' || item.type === 'divider' ? '' : 'overflow-hidden rounded-[28px] border border-gold/10 bg-royal-blue-light'}
              >
                {item.type === 'image' && (
                  <div>
                    <img
                      src={item.url}
                      alt={item.caption || work.title}
                      className="w-full"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                    {renderMediaFooter(item.caption, item.url, 'Open full image')}
                  </div>
                )}

                {item.type === 'video' && (
                  <div>
                    <video controls playsInline preload="metadata" className="w-full">
                      <source src={item.url} type="video/mp4" />
                      Your browser does not support embedded video playback.
                    </video>
                    {renderMediaFooter(item.caption, item.url, 'Open video file')}
                  </div>
                )}

                {item.type === 'pdf' && (
                  <div>
                    <div className="h-[70vh] min-h-[520px] w-full bg-white">
                      <iframe
                        src={item.url}
                        title={item.caption || `${work.title} PDF`}
                        className="h-full w-full"
                      />
                    </div>
                    {renderMediaFooter(item.caption, item.url, 'Open PDF in a new tab')}
                  </div>
                )}

                {item.type === 'text' && (
                  <div className="flex min-h-[180px] items-center justify-center px-6 py-10 sm:px-10 sm:py-14">
                    <p className="max-w-3xl text-center font-serif text-3xl italic leading-tight text-gold-soft sm:text-4xl">
                      {item.content}
                    </p>
                  </div>
                )}

                {item.type === 'markdown' && (
                  <div className="px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
                    <ReactMarkdown components={components} rehypePlugins={[rehypeRaw]}>
                      {item.content || ''}
                    </ReactMarkdown>
                  </div>
                )}

                {item.type === 'bubble' && (
                  <div className="mx-auto w-fit rounded-full border border-gold/10 bg-royal-blue-light/80 px-6 py-3">
                    <div className="text-center text-xs font-medium text-gold-soft">
                      <ReactMarkdown components={components} rehypePlugins={[rehypeRaw]}>
                        {item.content || ''}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}

                {item.type === 'grid' && (
                  <div>
                    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
                      {item.urls?.map((url, imageIndex) => (
                        <div key={`${url}-${imageIndex}`} className="overflow-hidden rounded-2xl border border-gold/10">
                          <img
                            src={url}
                            alt={item.caption || `${work.title} reference ${imageIndex + 1}`}
                            className="w-full"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ))}
                    </div>
                    {(item.caption || item.urls?.[0]) && renderMediaFooter(item.caption, item.urls?.[0], 'Open first image in a new tab')}
                  </div>
                )}

                {item.type === 'divider' && (
                  <div className="flex items-center justify-center py-4 sm:py-6">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </main>
    </motion.div>
  );
};
