"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { FileText, Menu, X } from "lucide-react";

import {
  navItems,
  sectionIndicators,
} from "@/src/content/navigation";

type SiteHeaderProps = {
  activeSection: string;
  onOpenCV: () => void;
};

const ease = [0.22, 1, 0.36, 1] as const;

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export default function SiteHeader({
  activeSection,
  onOpenCV,
}: SiteHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const previousBodyOverflowRef = useRef("");

  useEffect(() => {
    let ticking = false;

    const updateScrolledState = () => {
      const nextValue = window.scrollY > 32;

      setIsScrolled((currentValue) =>
        currentValue === nextValue ? currentValue : nextValue,
      );

      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(updateScrolledState);
    };

    updateScrolledState();
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    previousBodyOverflowRef.current =
      document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      const firstFocusable =
        menuPanelRef.current?.querySelector<HTMLElement>(
          focusableSelector,
        );

      firstFocusable?.focus();
    }, shouldReduceMotion ? 0 : 80);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow =
        previousBodyOverflowRef.current;
    };
  }, [isMenuOpen, shouldReduceMotion]);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);

    const scroll = () => {
      const section = document.getElementById(sectionId);

      section?.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "start",
      });
    };

    window.setTimeout(scroll, isMenuOpen ? 120 : 0);
  };

  const scrollToTop = () => {
    setIsMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  const openCV = () => {
    setIsMenuOpen(false);

    window.setTimeout(
      onOpenCV,
      isMenuOpen && !shouldReduceMotion ? 120 : 0,
    );
  };

  const closeMenu = () => {
    setIsMenuOpen(false);

    window.requestAnimationFrame(() => {
      menuButtonRef.current?.focus();
    });
  };

  const handleMenuKeyDown = (
    event: ReactKeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== "Tab" || !menuPanelRef.current) return;

    const focusableElements = Array.from(
      menuPanelRef.current.querySelectorAll<HTMLElement>(
        focusableSelector,
      ),
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement =
      focusableElements[focusableElements.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey && activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <>
      <motion.header
        className={[
          "site-header",
          isScrolled ? "site-header--scrolled" : "",
        ].join(" ")}
        initial={
          shouldReduceMotion
            ? { opacity: 1 }
            : { opacity: 0, y: -10 }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.55, delay: 0.12, ease }
        }
      >
        <div className="site-wrap site-header__inner">
          <button
            type="button"
            className="site-header__brand"
            onClick={scrollToTop}
            aria-label="Sayfanın başına git"
          >
            UMUT KOÇ
          </button>

          <nav
            className="site-header__desktop-nav"
            aria-label="Ana navigasyon"
          >
            {navItems.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isCV = "isCV" in item && item.isCV;
              const isActive =
                !isCV && activeSection === sectionId;

              if (isCV) {
                return (
                  <button
                    key={item.label}
                    type="button"
                    className="site-header__cv-button"
                    onClick={openCV}
                  >
                    CV
                    <FileText
                      size={14}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </button>
                );
              }

              return (
                <button
                  key={item.label}
                  type="button"
                  className={[
                    "site-header__nav-link",
                    isActive
                      ? "site-header__nav-link--active"
                      : "",
                  ].join(" ")}
                  onClick={() => scrollToSection(sectionId)}
                  aria-current={isActive ? "location" : undefined}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            className="site-header__menu-button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-label={
              isMenuOpen ? "Menüyü kapat" : "Menüyü aç"
            }
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
          >
            {isMenuOpen ? (
              <X size={21} strokeWidth={1.7} />
            ) : (
              <Menu size={21} strokeWidth={1.7} />
            )}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            ref={menuPanelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobil navigasyon"
            className="mobile-navigation"
            onKeyDown={handleMenuKeyDown}
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.24, ease }
            }
          >
            <div className="site-wrap mobile-navigation__inner">
              <nav
                className="mobile-navigation__links"
                aria-label="Mobil ana navigasyon"
              >
                {sectionIndicators
                  .filter((item) => item.href !== "#giris")
                  .map((item, index) => {
                    const sectionId = item.href.replace("#", "");
                    const isActive =
                      activeSection === sectionId;

                    return (
                      <motion.button
                        key={item.href}
                        type="button"
                        className={[
                          "mobile-navigation__link",
                          isActive
                            ? "mobile-navigation__link--active"
                            : "",
                        ].join(" ")}
                        onClick={() =>
                          scrollToSection(sectionId)
                        }
                        aria-current={
                          isActive ? "location" : undefined
                        }
                        initial={
                          shouldReduceMotion
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 16 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : {
                                duration: 0.4,
                                delay: 0.04 + index * 0.045,
                                ease,
                              }
                        }
                      >
                        <span>{item.number}</span>
                        <strong>{item.label}</strong>
                      </motion.button>
                    );
                  })}
              </nav>

              <motion.div
                className="mobile-navigation__footer"
                initial={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0 }
                }
                animate={{ opacity: 1 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.4, delay: 0.28 }
                }
              >
                <button
                  type="button"
                  className="btn-dark"
                  onClick={openCV}
                >
                  CV&apos;yi görüntüle
                  <FileText size={15} aria-hidden="true" />
                </button>

                <p>İstanbul — IT Support — Teknik Operasyon</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .site-header {
          position: fixed;
          top: 0;
          right: 0;
          left: 0;
          z-index: 120;
          height: 72px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid transparent;
          background: transparent;
          transition:
            background-color 0.28s var(--ease),
            border-color 0.28s var(--ease);
        }

        .site-header--scrolled {
          border-color: var(--rule);
          background: rgba(8, 8, 8, 0.92);
        }

        @supports (
          (-webkit-backdrop-filter: blur(10px)) or
            (backdrop-filter: blur(10px))
        ) {
          .site-header--scrolled {
            background: rgba(8, 8, 8, 0.82);
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
          }
        }

        .site-header__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .site-header__brand {
          flex: 0 0 auto;
          padding: 0.65rem 0;
          color: var(--ink);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          line-height: 1;
        }

        .site-header__desktop-nav {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .site-header__nav-link,
        .site-header__cv-button {
          position: relative;
          min-height: 38px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          padding: 0.65rem 0.8rem;
          border-radius: 999px;
          color: var(--ink-3);
          font-size: 0.6875rem;
          font-weight: 650;
          letter-spacing: 0.1em;
          line-height: 1;
          text-transform: uppercase;
          transition:
            color 0.2s var(--ease),
            background-color 0.2s var(--ease),
            border-color 0.2s var(--ease);
        }

        .site-header__nav-link:hover,
        .site-header__nav-link:focus-visible {
          color: var(--ink);
        }

        .site-header__nav-link--active {
          background: rgba(255, 255, 255, 0.075);
          color: var(--ink);
        }

        .site-header__cv-button {
          margin-left: 0.35rem;
          border: 1px solid var(--rule-strong);
          color: var(--ink);
        }

        .site-header__cv-button:hover,
        .site-header__cv-button:focus-visible {
          border-color: rgba(255, 255, 255, 0.5);
          background: var(--surface);
        }

        .site-header__menu-button {
          width: 44px;
          height: 44px;
          display: none;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--rule);
          border-radius: 999px;
          background: #0d0d0d;
          color: var(--ink);
        }

        .mobile-navigation {
          position: fixed;
          inset: 0;
          z-index: 110;
          overflow-y: auto;
          background: #080808;
          color: var(--ink);
          overscroll-behavior: contain;
        }

        .mobile-navigation__inner {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 3rem;
          padding-top: max(7rem, env(safe-area-inset-top));
          padding-bottom: max(
            2rem,
            env(safe-area-inset-bottom)
          );
        }

        .mobile-navigation__links {
          border-top: 1px solid var(--rule);
        }

        .mobile-navigation__link {
          width: 100%;
          display: grid;
          grid-template-columns: 2.5rem minmax(0, 1fr);
          gap: 1rem;
          align-items: baseline;
          padding-top: 1.4rem;
          padding-bottom: 1.4rem;
          border-bottom: 1px solid var(--rule);
          color: var(--ink-3);
          text-align: left;
        }

        .mobile-navigation__link span {
          font-size: 0.625rem;
          font-weight: 650;
          letter-spacing: 0.12em;
        }

        .mobile-navigation__link strong {
          color: inherit;
          font-family:
            var(--font-display), var(--font-geist), Georgia, serif;
          font-size: clamp(2rem, 10vw, 3.25rem);
          font-weight: 650;
          letter-spacing: -0.04em;
          line-height: 1;
        }

        .mobile-navigation__link--active {
          color: var(--ink);
        }

        .mobile-navigation__footer {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--rule);
        }

        .mobile-navigation__footer p {
          color: var(--ink-3);
          font-size: 0.6875rem;
          font-weight: 650;
          letter-spacing: 0.1em;
          line-height: 1.6;
          text-transform: uppercase;
        }

        @media (max-width: 900px) {
          .site-header__desktop-nav {
            display: none;
          }

          .site-header__menu-button {
            display: inline-flex;
          }

          .site-header--scrolled {
            background: #080808;
            -webkit-backdrop-filter: none;
            backdrop-filter: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .site-header,
          .site-header__nav-link,
          .site-header__cv-button {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}
