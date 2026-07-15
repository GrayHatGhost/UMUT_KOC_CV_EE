"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  FileText,
  Headphones,
  MonitorCog,
  Network,
  Wrench,
} from "lucide-react";

type HeroSceneProps = {
  onOpenCV: () => void;
};

const ease = [0.22, 1, 0.36, 1] as const;

const focusItems = [
  { label: "Donanım", icon: Wrench },
  { label: "Kullanıcı desteği", icon: Headphones },
  { label: "Ağ ve bağlantı", icon: Network },
  { label: "Teknik operasyon", icon: MonitorCog },
] as const;

export default function HeroScene({
  onOpenCV,
}: HeroSceneProps) {
  const shouldReduceMotion = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.7, delay, ease },
  });

  return (
    <section
      className="hero-apple"
      aria-labelledby="hero-title"
    >
      <div className="site-wrap">
        <div className="hero-apple__grid">
          <motion.article
            className="apple-card hero-apple__main"
            {...reveal(0.06)}
          >
            <div className="hero-apple__intro">
              <p className="card-eyebrow">
                IT SUPPORT · İSTANBUL
              </p>

              <h1
                id="hero-title"
                className="hero-apple__title"
              >
                Teknik sorunları çözen,
                <span>
                  süreçleri öğrenen ve sorumluluk alan
                  biriyim.
                </span>
              </h1>
            </div>

            <div className="hero-apple__bottom">
              <p className="hero-apple__description">
                Donanım, Windows, kullanıcı desteği ve
                dijital operasyonlarda uygulamalı deneyime
                sahip bir IT Support adayıyım.
              </p>

              <div className="hero-apple__actions">
                <a href="#gelisim" className="btn-dark">
                  Çalışmalarımı incele
                  <ArrowDownRight
                    size={16}
                    aria-hidden="true"
                  />
                </a>

                <button
                  type="button"
                  className="btn-ghost"
                  onClick={onOpenCV}
                >
                  CV&apos;yi aç
                  <FileText
                    size={16}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </motion.article>

          <motion.aside
            className="apple-card apple-card--dark hero-apple__side"
            {...reveal(0.16)}
          >
            <div className="hero-apple__side-copy">
              <p className="card-eyebrow">
                ŞU ANDA ARADIĞIM ROL
              </p>

              <h2 className="hero-apple__side-title">
                Bir ekibin içinde güvenilir teknik destek
                noktası olmak.
              </h2>

              <p className="card-copy">
                Kullanıcılara yakın olduğum, işleyişi
                öğrenebildiğim ve kurumun ihtiyaçlarıyla
                birlikte daha fazla sorumluluk alabildiğim
                bir IT Support rolü arıyorum.
              </p>
            </div>

            <div className="hero-apple__focus-grid">
              {focusItems.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="hero-apple__focus"
                >
                  <span className="hero-apple__focus-icon">
                    <Icon
                      size={17}
                      aria-hidden="true"
                    />
                  </span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>

      <style jsx>{`
        .hero-apple {
          min-height: 100svh;
          display: flex;
          align-items: center;
          padding-top: clamp(8rem, 12vh, 9.75rem);
          padding-bottom: clamp(4rem, 7vh, 5.75rem);
        }

        .hero-apple__grid {
          display: grid;
          grid-template-columns:
            minmax(0, 1.28fr)
            minmax(370px, 0.72fr);
          gap: var(--grid-gap);
          align-items: stretch;
        }

        .hero-apple__main,
        .hero-apple__side {
          min-height: clamp(660px, 68vh, 710px);
        }

        .hero-apple__main {
          display: grid;
          grid-template-rows:
            minmax(0, 1fr)
            auto;
        }

        .hero-apple__intro {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-bottom: clamp(2.25rem, 3vw, 3rem);
        }

        .hero-apple__intro :global(.card-eyebrow) {
          margin-bottom: clamp(1.3rem, 1.8vw, 1.65rem);
        }

        .hero-apple__title {
          max-width: 14ch;
          margin: 0;
          color: var(--ink);
          font-size: clamp(3.2rem, 5.25vw, 5.35rem);
          font-weight: 850;
          letter-spacing: -0.064em;
          line-height: 0.98;
          text-wrap: balance;
        }

        .hero-apple__title span {
          display: block;
          margin-top: 0.08em;
          color: var(--ink-3);
        }

        .hero-apple__bottom {
          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            auto;
          gap: clamp(1.5rem, 2.8vw, 2.5rem);
          align-items: center;
          padding-top: clamp(1.75rem, 2.5vw, 2.2rem);
          border-top: 1px solid var(--rule);
        }

        .hero-apple__description {
          max-width: 54ch;
          color: var(--ink-2);
          font-size: clamp(1.02rem, 1.25vw, 1.16rem);
          line-height: 1.72;
        }

        .hero-apple__actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 0.65rem;
        }

        .hero-apple__actions :global(a),
        .hero-apple__actions :global(button) {
          min-width: 150px;
        }

        .hero-apple__side {
          display: grid;
          grid-template-rows:
            minmax(0, 1fr)
            auto;
        }

        .hero-apple__side-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-bottom: clamp(2rem, 3vw, 2.75rem);
        }

        .hero-apple__side-copy
          :global(.card-eyebrow) {
          margin-bottom: 1.25rem;
        }

        .hero-apple__side-title {
          max-width: 14ch;
          margin: 0;
          color: white;
          font-size: clamp(2.15rem, 3.45vw, 3.45rem);
          font-weight: 820;
          letter-spacing: -0.055em;
          line-height: 1.03;
          text-wrap: balance;
        }

        .hero-apple__side-copy
          :global(.card-copy) {
          max-width: 42ch;
          margin-top: 1.4rem;
          line-height: 1.7;
        }

        .hero-apple__focus-grid {
          display: grid;
          grid-template-columns: repeat(
            2,
            minmax(0, 1fr)
          );
          gap: 0.7rem;
          padding-top: clamp(1.75rem, 2.5vw, 2.2rem);
          border-top: 1px solid var(--rule-inverse);
        }

        .hero-apple__focus {
          min-height: 84px;
          display: grid;
          grid-template-columns:
            38px
            minmax(0, 1fr);
          align-items: center;
          gap: 0.8rem;
          padding: 0.9rem;
          border: 1px solid var(--rule-inverse);
          border-radius: 19px;
          background: rgba(255, 255, 255, 0.07);
          color: rgba(255, 255, 255, 0.84);
          font-size: 0.76rem;
          font-weight: 650;
          line-height: 1.4;
        }

        .hero-apple__focus-icon {
          width: 38px;
          height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 13px;
          background: rgba(255, 255, 255, 0.09);
          color: white;
        }

        @media (max-width: 1000px) {
          .hero-apple {
            min-height: auto;
          }

          .hero-apple__grid {
            grid-template-columns: 1fr;
          }

          .hero-apple__main,
          .hero-apple__side {
            min-height: auto;
          }

          .hero-apple__main {
            min-height: 580px;
          }

          .hero-apple__side-copy {
            min-height: 380px;
          }
        }

        @media (max-width: 767px) {
          .hero-apple {
            padding-top: 6.5rem;
            padding-bottom: 3.25rem;
          }

          .hero-apple__main {
            min-height: auto;
          }

          .hero-apple__intro {
            justify-content: flex-start;
            padding-bottom: 2.2rem;
          }

          .hero-apple__intro
            :global(.card-eyebrow) {
            margin-bottom: 1.15rem;
          }

          .hero-apple__title {
            max-width: none;
            font-size: clamp(2.75rem, 12vw, 4.2rem);
          }

          .hero-apple__bottom {
            grid-template-columns: 1fr;
            align-items: start;
            padding-top: 1.6rem;
          }

          .hero-apple__actions {
            display: grid;
            grid-template-columns: 1fr;
            width: 100%;
          }

          .hero-apple__actions :global(a),
          .hero-apple__actions :global(button) {
            width: 100%;
            min-width: 0;
          }

          .hero-apple__side-copy {
            min-height: auto;
            justify-content: flex-start;
            padding-bottom: 1.8rem;
          }

          .hero-apple__side-title {
            max-width: none;
            font-size: clamp(2rem, 10vw, 2.8rem);
          }

          .hero-apple__focus-grid {
            padding-top: 1.6rem;
          }
        }

        @media (max-width: 420px) {
          .hero-apple__focus-grid {
            grid-template-columns: 1fr;
            gap: 0.6rem;
          }

          .hero-apple__focus {
            min-height: 0;
            padding: 0.78rem 0.85rem;
            border-radius: 17px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-apple__focus {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
