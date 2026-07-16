"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { LucideIcon } from "lucide-react";
import {
  Award,
  BookOpen,
  Briefcase,
  ImageIcon,
  Maximize2,
  Store,
  Target,
  X,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { featuredCertificate } from "@/src/content/certificates";
import {
  storyChapters,
  storyIntro,
  storyToday,
} from "@/src/content/story";

const ease = [0.22, 1, 0.36, 1] as const;

const chapterIcons: LucideIcon[] = [
  BookOpen,
  Briefcase,
  Store,
  Target,
];

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 24 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.14,
      }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              duration: 0.68,
              delay,
              ease,
            }
      }
    >
      {children}
    </motion.div>
  );
}

export default function StoryScene() {
  const [
    certificateImageFailed,
    setCertificateImageFailed,
  ] = useState(false);

  const [
    certificateViewerOpen,
    setCertificateViewerOpen,
  ] = useState(false);

  useEffect(() => {
    if (!certificateViewerOpen) return;

    const previousOverflow =
      document.body.style.overflow;

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setCertificateViewerOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [certificateViewerOpen]);

  return (
    <section
      className="story-apple page-section"
      aria-labelledby="story-title"
    >
      <div className="site-wrap">
        <div className="story-apple__intro-grid">
          <Reveal className="story-apple__intro-main">
            <article className="apple-card story-apple__intro-card">
              <div>
                <p className="card-eyebrow">
                  KARİYER HİKÂYEM
                </p>

                <h2
                  id="story-title"
                  className="story-apple__title"
                >
                  Operasyonun içinden
                  <span>
                    dijital ticarete ilerliyorum.
                  </span>
                </h2>
              </div>

              <p className="story-apple__intro-copy">
                {storyIntro}
              </p>
            </article>
          </Reveal>

          <Reveal
            delay={0.08}
            className="story-apple__intro-side"
          >
            <aside className="apple-card apple-card--soft story-apple__today-card">
              <div className="story-apple__today-top">
                <span>BUGÜN</span>
                <Target
                  size={22}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </div>

              <p>{storyToday}</p>
            </aside>
          </Reveal>
        </div>

        <div className="story-apple__chapters">
          {storyChapters.map((chapter, index) => {
            const Icon = chapterIcons[index] ?? Target;
            const isClosingChapter =
              index === storyChapters.length - 1;

            return (
              <Reveal
                key={chapter.number}
                delay={index * 0.06}
                className={[
                  "story-apple__chapter-wrap",
                  index % 2 === 0
                    ? "story-apple__chapter-wrap--large"
                    : "story-apple__chapter-wrap--small",
                  isClosingChapter
                    ? "story-apple__chapter-wrap--closing"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <article
                  className={[
                    "apple-card",
                    "apple-card--interactive",
                    "story-apple__chapter",
                    isClosingChapter
                      ? "apple-card--dark story-apple__chapter--dark"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className="story-apple__chapter-top">
                    <span className="story-apple__chapter-icon">
                      <Icon
                        size={20}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>

                    <span className="story-apple__chapter-number">
                      {chapter.number}
                    </span>
                  </div>

                  <div>
                    <p className="card-eyebrow">
                      {chapter.period}
                    </p>

                    <h3 className="story-apple__chapter-title">
                      {chapter.title}
                    </h3>

                    <p className="story-apple__chapter-summary">
                      {chapter.summary}
                    </p>
                  </div>

                  <ul className="story-apple__chapter-details">
                    {chapter.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>

                  <p className="story-apple__chapter-closing">
                    {chapter.closing}
                  </p>
                </article>
              </Reveal>
            );
          })}
        <Reveal className="story-apple__certificate-wrap">
          <article className="apple-card story-apple__certificate">
            <div className="story-apple__certificate-media">
              {certificateImageFailed ? (
                <div className="story-apple__certificate-fallback">
                  <ImageIcon
                    size={28}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <span>Udemy sertifikası</span>
                </div>
              ) : (
                <Image
                  src={featuredCertificate.image}
                  alt={featuredCertificate.alt}
                  fill
                  sizes="(max-width: 720px) 100vw, 420px"
                  className="story-apple__certificate-image"
                  onError={() =>
                    setCertificateImageFailed(true)
                  }
                />
              )}
            </div>

            <div className="story-apple__certificate-content">
              <span className="story-apple__certificate-icon">
                <Award
                  size={20}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </span>

              <div>
                <p className="card-eyebrow">
                  {featuredCertificate.issuer} ·{" "}
                  {featuredCertificate.period}
                </p>

                <h3 className="story-apple__certificate-title">
                  {featuredCertificate.title}
                </h3>

                <p className="story-apple__certificate-copy">
                  {featuredCertificate.description}
                </p>
              </div>

              {!certificateImageFailed && (
                <button
                  type="button"
                  className="story-apple__certificate-link"
                  onClick={() =>
                    setCertificateViewerOpen(true)
                  }
                >
                  Tam ekranda görüntüle
                  <Maximize2
                    size={16}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </button>
              )}
            </div>
          </article>
        </Reveal>
        </div>


      </div>


      {certificateViewerOpen &&
        !certificateImageFailed &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="story-apple__certificate-viewer"
            role="dialog"
            aria-modal="true"
            aria-label={`${featuredCertificate.title} sertifikası`}
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) {
                setCertificateViewerOpen(false);
              }
            }}
          >
            <div className="story-apple__certificate-viewer-media">
              <Image
                src={featuredCertificate.image}
                alt={featuredCertificate.alt}
                width={1600}
                height={1200}
                priority
                sizes="(max-width: 900px) 94vw, 1200px"
                className="story-apple__certificate-viewer-image"
              />
            </div>

            <button
              type="button"
              className="story-apple__certificate-viewer-close"
              onClick={() =>
                setCertificateViewerOpen(false)
              }
              aria-label="Sertifika görüntüsünü kapat"
              autoFocus
            >
              <X
                size={21}
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </button>
          </div>,
          document.body,
        )}

      <style jsx global>{`
        .story-apple {
          overflow: clip;
        }


        .story-apple__certificate-wrap {
          min-width: 0;
          height: 100%;
          grid-column: 1 / -1;
        }

        .story-apple__certificate {
          width: 100%;
          max-width: none;
          min-height: 340px;
          height: 100%;
          display: grid;
          grid-template-columns:
            minmax(340px, 5fr)
            minmax(0, 7fr);
          gap: 0;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        .story-apple__certificate-media {
          position: relative;
          min-width: 0;
          aspect-ratio: 4 / 3;
          align-self: center;
          overflow: hidden;
          margin: 0.7rem 0 0.7rem 0.7rem;
          border-radius: calc(var(--radius-lg) - 9px);
          background: linear-gradient(
            145deg,
            #eeeef1,
            #e2e2e6
          );
        }

        .story-apple__certificate-image {
          object-fit: contain;
          object-position: center;
          background: #e9e9ed;
        }

        .story-apple__certificate-fallback {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          color: var(--ink-3);
        }

        .story-apple__certificate-fallback span {
          font-size: 0.66rem;
          font-weight: 740;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .story-apple__certificate-content {
          min-width: 0;
          display: grid;
          grid-template-columns:
            46px
            minmax(0, 1fr);
          grid-template-rows:
            minmax(0, 1fr)
            auto;
          gap: 1.15rem;
          align-items: start;
          padding: clamp(1.8rem, 3vw, 2.7rem);
        }

        .story-apple__certificate-content > div {
          align-self: center;
        }

        .story-apple__certificate-icon {
          width: 46px;
          height: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          align-self: center;
          border: 1px solid var(--rule);
          border-radius: 16px;
          background: var(--surface-2);
          color: var(--ink);
        }

        .story-apple__certificate-title {
          max-width: 20ch;
          margin-top: 0.8rem;
          color: var(--ink);
          font-size: clamp(
            1.65rem,
            2.7vw,
            2.75rem
          );
          font-weight: 820;
          letter-spacing: -0.05em;
          line-height: 1.04;
          text-wrap: balance;
        }

        .story-apple__certificate-copy {
          max-width: 60ch;
          margin-top: 0.9rem;
          color: var(--ink-2);
          font-size: 0.88rem;
          line-height: 1.65;
        }

        .story-apple__certificate-link {
          grid-column: 1 / -1;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding-top: 1.2rem;
          border-top: 1px solid var(--rule);
          color: var(--ink);
          font-size: 0.72rem;
          font-weight: 740;
        }

        @media (max-width: 980px) {
          .story-apple__certificate {
            min-height: auto;
            grid-template-columns:
              minmax(300px, 0.9fr)
              minmax(0, 1.1fr);
          }
        }

        @media (max-width: 820px) {
          .story-apple__certificate {
            grid-template-columns:
              minmax(0, 1fr);
          }

          .story-apple__certificate-media {
            width: auto;
            margin: 0.55rem 0.55rem 0;
          }
        }

        @media (max-width: 520px) {
          .story-apple__certificate-content {
            grid-template-columns:
              minmax(0, 1fr);
            gap: 1rem;
            padding: 1.3rem;
          }

          .story-apple__certificate-icon {
            align-self: start;
          }

          .story-apple__certificate-title {
            max-width: none;
          }
        }



        .story-apple__certificate-link {
          border: 0;
          background: transparent;
          text-align: left;
          cursor: pointer;
        }

        .story-apple__certificate-viewer {
          position: fixed;
          inset: 0;
          z-index: 2147483000;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          display: grid;
          place-items: center;
          padding: clamp(0.75rem, 2vw, 1.5rem);
          overflow: hidden;
          overscroll-behavior: contain;
          isolation: isolate;
          background: rgba(10, 10, 12, 0.94);
        }

        .story-apple__certificate-viewer-media {
          position: relative;
          width: min(
            94vw,
            calc(90dvh * 4 / 3)
          );
          max-width: 1600px;
          max-height: 90dvh;
          aspect-ratio: 4 / 3;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 1px solid
            rgba(255, 255, 255, 0.14);
          border-radius: 18px;
          background: #111114;
          box-shadow:
            0 32px 100px
              rgba(0, 0, 0, 0.58);
        }

        .story-apple__certificate-viewer-image {
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
          display: block;
          object-fit: contain;
          object-position: center;
          background: #111114;
        }

        .story-apple__certificate-viewer-close {
          position: fixed;
          top: max(
            1rem,
            env(safe-area-inset-top)
          );
          right: max(
            1rem,
            env(safe-area-inset-right)
          );
          z-index: 2147483001;
          width: 46px;
          height: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid
            rgba(255, 255, 255, 0.24);
          border-radius: 50%;
          background: rgba(24, 24, 27, 0.88);
          color: white;
          cursor: pointer;
          transition:
            transform 0.22s var(--ease),
            background-color 0.22s var(--ease);
        }

        .story-apple__certificate-viewer-close:hover {
          transform: translateY(-2px);
          background: rgba(42, 42, 46, 0.96);
        }

        @media (max-width: 720px) {
          .story-apple__certificate-viewer {
            padding:
              max(0.65rem, env(safe-area-inset-top))
              0.65rem
              max(0.65rem, env(safe-area-inset-bottom));
          }

          .story-apple__certificate-viewer-media {
            width: min(
              96vw,
              calc(86dvh * 4 / 3)
            );
            max-height: 86dvh;
            border-radius: 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .story-apple__certificate-viewer-close {
            transition: none;
          }
        }


        @media (min-width: 981px) {
          .story-apple__certificate-wrap {
            grid-column: 8 / -1;
            grid-row: 2;
          }

          .story-apple__certificate {
            min-height: 580px;
            grid-template-columns:
              minmax(0, 1fr);
            grid-template-rows:
              auto
              minmax(0, 1fr);
          }

          .story-apple__certificate-media {
            width: auto;
            align-self: auto;
            margin: 0.7rem 0.7rem 0;
          }

          .story-apple__certificate-content {
            grid-template-columns:
              46px
              minmax(0, 1fr);
            grid-template-rows:
              minmax(0, 1fr)
              auto;
            align-content: stretch;
            padding: 1.7rem;
          }

          .story-apple__certificate-content > div {
            align-self: start;
          }

          .story-apple__certificate-icon {
            align-self: start;
          }

          .story-apple__certificate-title {
            max-width: 15ch;
            font-size: clamp(
              1.55rem,
              2.2vw,
              2.2rem
            );
          }

          .story-apple__certificate-copy {
            max-width: 40ch;
          }

          .story-apple__certificate-link {
            align-self: end;
          }
        }

        .story-apple__intro-grid {
          display: grid;
          grid-template-columns:
            minmax(0, 1.38fr)
            minmax(280px, 0.62fr);
          gap: var(--grid-gap);
          align-items: stretch;
        }

        .story-apple__intro-main,
        .story-apple__intro-side {
          min-width: 0;
          height: 100%;
        }

        .story-apple__intro-card,
        .story-apple__today-card {
          min-height: 460px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 3rem;
        }

        .story-apple__title {
          max-width: 12ch;
          margin-top: 1rem;
          color: var(--ink);
          font-size: var(--f-section);
          font-weight: 850;
          letter-spacing: -0.062em;
          line-height: 0.95;
          text-wrap: balance;
        }

        .story-apple__title span {
          display: block;
          color: var(--ink-3);
        }

        .story-apple__intro-copy {
          max-width: 58ch;
          color: var(--ink-2);
          font-size: var(--f-body);
          line-height: 1.72;
        }

        .story-apple__today-card {
          background:
            radial-gradient(
              circle at 100% 0%,
              rgba(255, 255, 255, 0.82),
              transparent 34%
            ),
            var(--surface-muted);
        }

        .story-apple__today-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          color: var(--ink);
        }

        .story-apple__today-top span {
          color: var(--ink-3);
          font-size: var(--f-label);
          font-weight: 780;
          letter-spacing: 0.145em;
        }

        .story-apple__today-card > p {
          max-width: 24ch;
          color: var(--ink);
          font-size: clamp(1.65rem, 3.2vw, 3rem);
          font-weight: 790;
          letter-spacing: -0.048em;
          line-height: 1.05;
          text-wrap: balance;
        }

        .story-apple__chapters {
          display: grid;
          grid-template-columns: repeat(
            12,
            minmax(0, 1fr)
          );
          gap: var(--grid-gap);
          margin-top: var(--grid-gap);
        }

        .story-apple__chapter-wrap {
          min-width: 0;
          grid-column: span 5;
        }

        .story-apple__chapter-wrap--large {
          grid-column: span 7;
        }

        .story-apple__chapter-wrap--closing {
          grid-column: span 7;
        }

        .story-apple__chapter {
          min-height: 580px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 2.15rem;
        }

        .story-apple__chapter-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
        }

        .story-apple__chapter-icon {
          width: 46px;
          height: 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--rule);
          border-radius: 16px;
          background: var(--surface-2);
          color: var(--ink);
        }

        .story-apple__chapter-number {
          color: var(--ink-3);
          font-size: 0.68rem;
          font-weight: 780;
          letter-spacing: 0.13em;
        }

        .story-apple__chapter-title {
          max-width: 15ch;
          margin-top: 0.9rem;
          color: var(--ink);
          font-size: var(--f-card-title);
          font-weight: 820;
          letter-spacing: -0.052em;
          line-height: 1.03;
          text-wrap: balance;
        }

        .story-apple__chapter-summary {
          max-width: 58ch;
          margin-top: 1rem;
          color: var(--ink-2);
          font-size: 0.95rem;
          line-height: 1.68;
        }

        .story-apple__chapter-details {
          display: grid;
          gap: 0.75rem;
          padding-top: 1.35rem;
          border-top: 1px solid var(--rule);
          list-style: none;
        }

        .story-apple__chapter-details li {
          position: relative;
          padding-left: 1.15rem;
          color: var(--ink-2);
          font-size: 0.84rem;
          line-height: 1.62;
        }

        .story-apple__chapter-details li::before {
          content: "";
          position: absolute;
          top: 0.7em;
          left: 0;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: currentColor;
          opacity: 0.32;
        }

        .story-apple__chapter-closing {
          padding-top: 1.2rem;
          border-top: 1px solid var(--rule);
          color: var(--ink);
          font-size: 0.94rem;
          font-weight: 650;
          line-height: 1.62;
        }

        .story-apple__chapter--dark
          .story-apple__chapter-icon {
          border-color: var(--rule-inverse);
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }

        .story-apple__chapter--dark
          .story-apple__chapter-number,
        .story-apple__chapter--dark
          .story-apple__chapter-summary,
        .story-apple__chapter--dark
          .story-apple__chapter-details li {
          color: var(--ink-inverse-2);
        }

        .story-apple__chapter--dark
          .story-apple__chapter-title,
        .story-apple__chapter--dark
          .story-apple__chapter-closing {
          color: white;
        }

        .story-apple__chapter--dark
          .story-apple__chapter-details,
        .story-apple__chapter--dark
          .story-apple__chapter-closing {
          border-color: var(--rule-inverse);
        }

        @media (max-width: 980px) {
          .story-apple__intro-grid {
            grid-template-columns: 1fr;
          }

          .story-apple__intro-card,
          .story-apple__today-card {
            min-height: 420px;
          }

          .story-apple__chapter-wrap,
          .story-apple__chapter-wrap--large,
          .story-apple__chapter-wrap--closing {
            grid-column: span 6;
          }
        }

        @media (max-width: 720px) {
          .story-apple__intro-card,
          .story-apple__today-card {
            min-height: 390px;
          }

          .story-apple__chapters {
            grid-template-columns: 1fr;
          }

          .story-apple__chapter-wrap,
          .story-apple__chapter-wrap--large,
          .story-apple__chapter-wrap--closing {
            grid-column: 1;
          }

          .story-apple__chapter {
            min-height: auto;
          }
        }

        /* Yerleşim dengesi */
        .story-apple__intro-card,
        .story-apple__today-card {
          min-height: 430px;
          display: grid;
          grid-template-rows: minmax(0, 1fr) auto;
          gap: var(--content-gap-2xl);
        }

        .story-apple__title {
          max-width: 13ch;
          margin-top: 1rem;
          line-height: 1;
        }

        .story-apple__title span {
          margin-top: 0.08em;
        }

        .story-apple__intro-copy {
          max-width: 62ch;
          line-height: 1.74;
        }

        .story-apple__today-card > p {
          max-width: 25ch;
          line-height: 1.1;
        }

        .story-apple__chapters {
          align-items: stretch;
        }

        .story-apple__chapter-wrap {
          height: 100%;
        }

        .story-apple__chapter {
          min-height: 550px;
          display: grid;
          grid-template-rows: auto auto minmax(0, 1fr) auto;
          align-content: start;
          gap: var(--content-gap-lg);
        }

        .story-apple__chapter-title {
          max-width: 17ch;
          margin-top: 0.85rem;
          line-height: 1.08;
        }

        .story-apple__chapter-summary {
          max-width: 62ch;
          margin-top: 0.9rem;
          line-height: 1.7;
        }

        .story-apple__chapter-details {
          align-content: start;
          gap: 0.78rem;
          padding-top: 1.2rem;
        }

        .story-apple__chapter-details li {
          line-height: 1.64;
        }

        .story-apple__chapter-closing {
          padding-top: 1.15rem;
          line-height: 1.66;
        }

        @media (max-width: 980px) {
          .story-apple__intro-card,
          .story-apple__today-card {
            min-height: 390px;
          }

          .story-apple__chapter {
            min-height: 530px;
          }
        }

        @media (max-width: 720px) {
          .story-apple__intro-card,
          .story-apple__today-card,
          .story-apple__chapter {
            min-height: auto;
          }

          .story-apple__chapter {
            gap: 1.35rem;
          }
        }

        /* Mobilde Hikâyem ile bir sonraki bölüm arasındaki
           gereksiz çift dikey boşluğu azaltır. */
        @media (max-width: 720px) {
          .story-apple.page-section {
            padding-bottom: 2rem;
          }
        }

        /* Masaüstü yerleşim sistemi */
        @media (min-width: 1025px) {
          .story-apple__intro-grid {
            grid-template-columns:
              minmax(0, 1.25fr)
              minmax(340px, 0.75fr);
          }

          .story-apple__intro-card,
          .story-apple__today-card {
            min-height: 440px;
            grid-template-rows: minmax(0, 1fr) auto;
            gap: var(--content-gap-2xl);
          }

          .story-apple__title {
            max-width: 14ch;
            line-height: 1;
          }

          .story-apple__intro-copy {
            max-width: 64ch;
            line-height: 1.72;
          }

          .story-apple__today-card > p {
            max-width: 22ch;
            line-height: 1.08;
          }

          .story-apple__chapters {
            align-items: stretch;
            row-gap: var(--grid-gap);
          }

          .story-apple__chapter-wrap {
            height: 100%;
          }

          .story-apple__chapter {
            min-height: 560px;
            grid-template-rows:
              auto
              auto
              minmax(0, 1fr)
              auto;
            gap: 1.65rem;
          }

          .story-apple__chapter-title {
            max-width: 18ch;
            margin-top: 0.8rem;
            line-height: 1.07;
          }

          .story-apple__chapter-wrap--large
            .story-apple__chapter-title,
          .story-apple__chapter-wrap--closing
            .story-apple__chapter-title {
            max-width: 22ch;
          }

          .story-apple__chapter-summary {
            max-width: 62ch;
            margin-top: 0.85rem;
            line-height: 1.68;
          }

          .story-apple__chapter-details {
            align-content: start;
            gap: 0.72rem;
            padding-top: 1.2rem;
          }

          .story-apple__chapter-closing {
            padding-top: 1.15rem;
            line-height: 1.64;
          }
        }






      `}</style>
    </section>
  );
}
