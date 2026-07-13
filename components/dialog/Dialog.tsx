"use client";

import {
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { X } from "lucide-react";

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel: string;
  size?: "default" | "wide";
};

const ease = [0.22, 1, 0.36, 1] as const;

const focusableSelector = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable="true"]',
  '[tabindex]:not([tabindex="-1"])',
].join(",");

let openDialogCount = 0;
let lockedScrollY = 0;
const dialogStack: symbol[] = [];

function lockPageScroll() {
  openDialogCount += 1;

  if (openDialogCount > 1) return;

  lockedScrollY = window.scrollY;

  document.body.classList.add("modal-open");
  document.body.style.position = "fixed";
  document.body.style.top = `-${lockedScrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
}

function unlockPageScroll() {
  openDialogCount = Math.max(0, openDialogCount - 1);

  if (openDialogCount > 0) return;

  document.body.classList.remove("modal-open");
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";

  window.scrollTo({
    top: lockedScrollY,
    left: 0,
    behavior: "instant",
  });
}

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(focusableSelector),
  ).filter((element) => {
    const styles = window.getComputedStyle(element);

    return (
      styles.display !== "none" &&
      styles.visibility !== "hidden" &&
      !element.hasAttribute("inert")
    );
  });
}

export default function Dialog({
  isOpen,
  onClose,
  children,
  ariaLabel,
  size = "default",
}: DialogProps) {
  const [isMounted, setIsMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const generatedId = useId();
  const panelId = `dialog-${generatedId.replace(/:/g, "")}`;

  const dialogTokenRef = useRef(Symbol("dialog"));
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen || !isMounted) return;

    const token = dialogTokenRef.current;

    dialogStack.push(token);
    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    lockPageScroll();

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, shouldReduceMotion ? 0 : 80);

    return () => {
      window.clearTimeout(focusTimer);

      const tokenIndex = dialogStack.lastIndexOf(token);

      if (tokenIndex >= 0) {
        dialogStack.splice(tokenIndex, 1);
      }

      unlockPageScroll();

      const previousElement = previouslyFocusedRef.current;

      window.requestAnimationFrame(() => {
        if (previousElement?.isConnected) {
          previousElement.focus();
        }
      });
    };
  }, [isMounted, isOpen, shouldReduceMotion]);

  useEffect(() => {
    if (!isOpen || !isMounted) return;

    const token = dialogTokenRef.current;

    const handleKeyDown = (event: KeyboardEvent) => {
      const isTopDialog =
        dialogStack[dialogStack.length - 1] === token;

      if (!isTopDialog) return;

      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusableElements = getFocusableElements(
        panelRef.current,
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        panelRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement =
        focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (
        event.shiftKey &&
        (activeElement === firstElement ||
          !panelRef.current.contains(activeElement))
      ) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (
        !event.shiftKey &&
        (activeElement === lastElement ||
          !panelRef.current.contains(activeElement))
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown,
        true,
      );
    };
  }, [isMounted, isOpen, onClose]);

  if (!isMounted) return null;

  const backdropTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.22, ease };

  const panelTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.38, ease };

  const dialog = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="dialog-root"
          role="presentation"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.button
            type="button"
            className="dialog-backdrop"
            aria-label={`${ariaLabel} penceresini kapat`}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={backdropTransition}
          />

          <motion.div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            tabIndex={-1}
            className={[
              "dialog-panel",
              size === "wide"
                ? "dialog-panel--wide"
                : "dialog-panel--default",
            ].join(" ")}
            initial={
              shouldReduceMotion
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.985, y: 18 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.99, y: 10 }
            }
            transition={panelTransition}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(
              event: ReactKeyboardEvent<HTMLDivElement>,
            ) => {
              if (
                event.key === "Escape" &&
                dialogStack[dialogStack.length - 1] !==
                  dialogTokenRef.current
              ) {
                event.stopPropagation();
              }
            }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="dialog-close"
              onClick={onClose}
              aria-label={`${ariaLabel} penceresini kapat`}
            >
              <X size={17} strokeWidth={1.8} aria-hidden="true" />
            </button>

            <div className="dialog-content">{children}</div>
          </motion.div>

          <style jsx global>{`
            .dialog-root {
              position: fixed;
              inset: 0;
              z-index: 200;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: clamp(0.75rem, 2vw, 1.5rem);
              isolation: isolate;
            }

            .dialog-backdrop {
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              border: 0;
              border-radius: 0;
              background: rgba(0, 0, 0, 0.84);
              cursor: default;
            }

            .dialog-panel {
              position: relative;
              z-index: 1;
              width: 100%;
              max-height: calc(100dvh - clamp(1.5rem, 4vw, 3rem));
              overflow: hidden;
              border: 1px solid var(--rule-strong);
              border-radius: 24px;
              background: var(--surface-dark);
              color: var(--ink);
              box-shadow: 0 30px 90px rgba(0, 0, 0, 0.48);
              overscroll-behavior: contain;
            }

            .dialog-panel--default {
              max-width: 760px;
            }

            .dialog-panel--wide {
              max-width: min(1280px, calc(100vw - 3rem));
            }

            .dialog-content {
              width: 100%;
              height: 100%;
              max-height: inherit;
              overflow-x: hidden;
              overflow-y: auto;
              overscroll-behavior: contain;
              scrollbar-gutter: stable;
              -webkit-overflow-scrolling: touch;
            }

            .dialog-close {
              position: absolute;
              top: 1rem;
              right: 1rem;
              z-index: 30;
              width: 42px;
              height: 42px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              border: 1px solid var(--rule-strong);
              border-radius: 999px;
              background: rgba(8, 8, 8, 0.94);
              color: var(--ink-2);
              box-shadow: none;
              transition:
                color 0.2s var(--ease),
                background-color 0.2s var(--ease),
                border-color 0.2s var(--ease),
                transform 0.2s var(--ease);
            }

            .dialog-close:hover,
            .dialog-close:focus-visible {
              border-color: rgba(255, 255, 255, 0.5);
              background: #151515;
              color: var(--ink);
              transform: scale(1.04);
            }

            .dialog-close:active {
              transform: scale(0.96);
            }

            @media (max-width: 767px) {
              .dialog-root {
                align-items: stretch;
                padding: 0;
              }

              .dialog-panel,
              .dialog-panel--default,
              .dialog-panel--wide {
                width: 100%;
                max-width: none;
                height: 100dvh;
                max-height: 100dvh;
                border: 0;
                border-radius: 0;
                box-shadow: none;
              }

              .dialog-backdrop {
                background: #050505;
              }

              .dialog-close {
                position: fixed;
                top: max(0.85rem, env(safe-area-inset-top));
                right: max(0.85rem, env(safe-area-inset-right));
                width: 44px;
                height: 44px;
                background: #0d0d0d;
              }

              .dialog-content {
                padding-top: env(safe-area-inset-top);
                padding-bottom: env(safe-area-inset-bottom);
                scrollbar-gutter: auto;
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .dialog-close {
                transition: none;
              }

              .dialog-close:hover,
              .dialog-close:focus-visible,
              .dialog-close:active {
                transform: none;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(dialog, document.body);
}
