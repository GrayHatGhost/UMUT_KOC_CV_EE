"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, FileText } from "lucide-react";

type HeroSceneProps = {
  onOpenCV: () => void;
};

const ease = [0.22, 1, 0.36, 1] as const;

const titleLines = [
  "Teknik merakımı",
  "profesyonel bir kariyere",
  "dönüştürüyorum.",
] as const;

export default function HeroScene({ onOpenCV }: HeroSceneProps) {
  const shouldReduceMotion = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: shouldReduceMotion
      ? { duration: 0 }
      : { duration: 0.72, delay, ease },
  });

  return (
    <section
      aria-labelledby="hero-title"
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "clamp(6.5rem, 12vh, 9rem)",
        paddingBottom: "clamp(4rem, 9vh, 7rem)",
      }}
    >
      <div
        className="site-wrap"
        style={{
          width: "100%",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: "min(100%, 78rem)",
          }}
        >
          <motion.p
            className="t-label"
            {...reveal(0.08)}
            style={{
              marginBottom: "clamp(1.75rem, 4vw, 3.25rem)",
              color: "var(--ink-3)",
            }}
          >
            KİŞİSEL PORTFOLYO · 2026
          </motion.p>

          <h1
            id="hero-title"
            className="t-hero"
            style={{
              maxWidth: "13ch",
              textWrap: "balance",
            }}
          >
            {titleLines.map((line, index) => (
              <span
                key={line}
                className="clip"
                style={{
                  display: "block",
                  paddingBottom: "0.07em",
                }}
              >
                <motion.span
                  {...reveal(0.18 + index * 0.1)}
                  style={{
                    display: "block",
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            {...reveal(0.56)}
            style={{
              marginTop: "clamp(2.25rem, 5vw, 4rem)",
              maxWidth: "48rem",
            }}
          >
            <p
              className="t-body"
              style={{
                maxWidth: "54ch",
                fontSize: "clamp(1.05rem, 1.6vw, 1.3rem)",
                lineHeight: 1.72,
                color: "var(--ink-2)",
              }}
            >
              Bilgisayar donanımı, teknik destek ve dijital operasyonlar
              alanında uygulamalı deneyime sahip bir IT Support adayıyım.
            </p>

            <p
              className="t-label"
              style={{
                marginTop: "1.35rem",
                color: "var(--ink-3)",
                letterSpacing: "0.13em",
              }}
            >
              İstanbul — IT Support — Teknik Operasyon
            </p>
          </motion.div>

          <motion.div
            {...reveal(0.68)}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              marginTop: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            <a
              href="#hikayem"
              id="hero-discover-btn"
              className="btn-dark"
              aria-label="Hikâyem bölümüne git"
            >
              Hikâyemi keşfet
              <ArrowDown size={15} aria-hidden="true" />
            </a>

            <button
              type="button"
              id="hero-cv-btn"
              className="btn-ghost"
              onClick={onOpenCV}
              aria-label="Öz geçmişimi görüntüle"
            >
              CV&apos;yi görüntüle
              <FileText size={15} aria-hidden="true" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
