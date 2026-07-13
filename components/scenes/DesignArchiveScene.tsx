"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ImageIcon } from "lucide-react";

import { designWorks } from "@/src/content/design-works";

const DesignCatalogModal = dynamic(
  () => import("@/components/design/DesignCatalogModal"),
  {
    ssr: false,
  },
);

const ease = [0.22, 1, 0.36, 1] as const;

export default function DesignArchiveScene() {
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [initialWorkId, setInitialWorkId] =
    useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(
    () => new Set(),
  );
  const shouldReduceMotion = useReducedMotion();

  const openCatalog = (workId?: string) => {
    setInitialWorkId(workId ?? designWorks[0]?.id ?? null);
    setCatalogOpen(true);
  };

  const markImageAsFailed = (workId: string) => {
    setFailedImages((current) => {
      const next = new Set(current);
      next.add(workId);
      return next;
    });
  };

  return (
    <>
      <section
        aria-labelledby="design-title"
        className="design-shell"
        style={{
          position: "relative",
          paddingTop: "clamp(7rem, 13vw, 12rem)",
          paddingBottom: "clamp(7rem, 13vw, 12rem)",
        }}
      >
        <div className="site-wrap">
          <motion.header
            initial={
              shouldReduceMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 24 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.72, ease }
            }
            className="section-intro"
            style={{
              marginBottom: "clamp(4rem, 9vw, 8rem)",
            }}
          >
            <p
              className="t-label"
              style={{
                marginBottom: "1.4rem",
              }}
            >
              TASARIM ARŞİVİ
            </p>

            <h2
              id="design-title"
              className="t-section"
              style={{
                maxWidth: "15ch",
              }}
            >
              Görsel çalışmalar.
            </h2>

            <p
              className="t-body"
              style={{
                maxWidth: "54ch",
                marginTop: "1.6rem",
                fontSize: "clamp(1.05rem, 1.5vw, 1.22rem)",
              }}
            >
              Sosyal medya, duyuru ve kurumsal iletişim için
              hazırladığım seçili görsel çalışmalar.
            </p>
          </motion.header>

          <div className="design-preview-grid">
            {designWorks.slice(0, 3).map((work, index) => {
              const imageAvailable =
                Boolean(work.thumbnail || work.image) &&
                !failedImages.has(work.id);

              return (
                <motion.button
                  key={work.id}
                  type="button"
                  className={[
                    "design-preview",
                    index === 0
                      ? "design-preview--featured"
                      : "",
                  ].join(" ")}
                  onClick={() => openCatalog(work.id)}
                  aria-label={`${work.title} tasarımını katalogda incele`}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 22 }
                  }
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.66,
                          delay: index * 0.07,
                          ease,
                        }
                  }
                >
                  <span className="design-preview__visual">
                    {imageAvailable ? (
                      <Image
                        src={work.thumbnail || work.image}
                        alt={work.title}
                        fill
                        sizes={
                          index === 0
                            ? "(max-width: 767px) 100vw, 52vw"
                            : "(max-width: 767px) 100vw, 30vw"
                        }
                        className="design-preview__image"
                        onError={() =>
                          markImageAsFailed(work.id)
                        }
                      />
                    ) : (
                      <span className="design-preview__placeholder">
                        <ImageIcon size={24} aria-hidden="true" />
                        <span>{work.number}</span>
                      </span>
                    )}

                    <span
                      className="design-preview__overlay"
                      aria-hidden="true"
                    >
                      İncele
                      <ArrowRight size={17} />
                    </span>
                  </span>

                  <span className="design-preview__meta">
                    <span>{work.category}</span>
                    <strong>{work.title}</strong>
                  </span>
                </motion.button>
              );
            })}
          </div>

          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.55, delay: 0.2 }
            }
            style={{
              marginTop: "clamp(2.5rem, 5vw, 4rem)",
            }}
          >
            <button
              type="button"
              className="design-archive-link"
              onClick={() => openCatalog()}
            >
              Tasarım arşivini aç
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </motion.div>
        </div>

        <style jsx>{`
          .design-preview-grid {
            display: grid;
            grid-template-columns:
              minmax(0, 1.22fr)
              minmax(0, 0.78fr);
            grid-template-rows: repeat(2, minmax(0, 1fr));
            gap: 1rem;
          }

          .design-preview {
            min-width: 0;
            display: flex;
            flex-direction: column;
            color: var(--ink);
            text-align: left;
          }

          .design-preview--featured {
            grid-row: 1 / span 2;
          }

          .design-preview__visual {
            position: relative;
            overflow: hidden;
            min-height: 16rem;
            flex: 1;
            border: 1px solid var(--rule);
            background: var(--surface);
          }

          .design-preview--featured
            .design-preview__visual {
            min-height: 38rem;
          }

          :global(.design-preview__image) {
            object-fit: cover;
            filter: grayscale(1) contrast(1.03) brightness(0.72);
            transition:
              filter 0.42s var(--ease),
              transform 0.42s var(--ease);
          }

          .design-preview:hover
            :global(.design-preview__image),
          .design-preview:focus-visible
            :global(.design-preview__image) {
            filter: grayscale(0.15) contrast(1) brightness(0.92);
            transform: scale(1.025);
          }

          .design-preview__placeholder {
            width: 100%;
            height: 100%;
            min-height: inherit;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            color: var(--ink-3);
          }

          .design-preview__placeholder > span {
            font-size: 0.6875rem;
            font-weight: 650;
            letter-spacing: 0.14em;
          }

          .design-preview__overlay {
            position: absolute;
            right: 1rem;
            bottom: 1rem;
            display: inline-flex;
            align-items: center;
            gap: 0.55rem;
            padding: 0.65rem 0.85rem;
            border: 1px solid var(--rule-strong);
            border-radius: 999px;
            background: rgba(8, 8, 8, 0.9);
            color: var(--ink-2);
            font-size: 0.75rem;
            font-weight: 560;
            opacity: 0;
            transform: translateY(6px);
            transition:
              opacity 0.25s var(--ease),
              transform 0.25s var(--ease),
              color 0.25s var(--ease);
          }

          .design-preview:hover .design-preview__overlay,
          .design-preview:focus-visible
            .design-preview__overlay {
            color: var(--ink);
            opacity: 1;
            transform: translateY(0);
          }

          .design-preview__meta {
            display: grid;
            gap: 0.45rem;
            padding-top: 1rem;
          }

          .design-preview__meta > span {
            color: var(--ink-3);
            font-size: 0.6875rem;
            font-weight: 650;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }

          .design-preview__meta strong {
            color: var(--ink-2);
            font-size: 0.9375rem;
            font-weight: 560;
            line-height: 1.45;
          }

          .design-archive-link {
            display: inline-flex;
            align-items: center;
            gap: 0.7rem;
            padding-bottom: 0.35rem;
            border-bottom: 1px solid var(--rule-strong);
            color: var(--ink);
            font-size: 0.75rem;
            font-weight: 650;
            letter-spacing: 0.11em;
            text-transform: uppercase;
            transition:
              color 0.22s var(--ease),
              border-color 0.22s var(--ease),
              gap 0.22s var(--ease);
          }

          .design-archive-link:hover,
          .design-archive-link:focus-visible {
            gap: 1rem;
            border-color: rgba(255, 255, 255, 0.55);
            color: var(--ink-2);
          }

          @media (max-width: 767px) {
            .design-preview-grid {
              grid-template-columns: 1fr;
              grid-template-rows: auto;
            }

            .design-preview--featured {
              grid-row: auto;
            }

            .design-preview__visual,
            .design-preview--featured
              .design-preview__visual {
              min-height: 0;
              aspect-ratio: 4 / 5;
            }

            .design-preview__overlay {
              color: var(--ink);
              opacity: 1;
              transform: none;
            }

            :global(.design-preview__image) {
              transition: none;
            }

            .design-preview:hover
              :global(.design-preview__image),
            .design-preview:focus-visible
              :global(.design-preview__image) {
              filter: grayscale(0.85) brightness(0.84);
              transform: none;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            :global(.design-preview__image),
            .design-preview__overlay,
            .design-archive-link {
              transition: none;
            }
          }
        `}</style>
      </section>

      <DesignCatalogModal
        isOpen={catalogOpen}
        initialWorkId={initialWorkId}
        onClose={() => setCatalogOpen(false)}
      />
    </>
  );
}
