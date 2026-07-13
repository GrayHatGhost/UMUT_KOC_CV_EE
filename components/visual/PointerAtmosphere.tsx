"use client";

import { useEffect } from "react";

const DEFAULT_X = "50vw";
const DEFAULT_Y = "18vh";

function resetPointerVariables(root: HTMLElement) {
  root.style.setProperty("--pointer-x", DEFAULT_X);
  root.style.setProperty("--pointer-y", DEFAULT_Y);
  root.style.setProperty("--pointer-shift-x", "0px");
  root.style.setProperty("--pointer-shift-y", "0px");
  root.style.setProperty("--pointer-opacity", "0");
}

export default function PointerAtmosphere() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const finePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    let animationFrame = 0;
    let latestX = window.innerWidth * 0.5;
    let latestY = window.innerHeight * 0.18;

    const canAnimate = () =>
      !reducedMotionQuery.matches && finePointerQuery.matches;

    const commitPointerPosition = () => {
      animationFrame = 0;

      if (!canAnimate()) {
        resetPointerVariables(root);
        return;
      }

      const width = Math.max(window.innerWidth, 1);
      const height = Math.max(window.innerHeight, 1);

      const normalizedX = latestX / width - 0.5;
      const normalizedY = latestY / height - 0.5;

      root.style.setProperty("--pointer-x", `${latestX}px`);
      root.style.setProperty("--pointer-y", `${latestY}px`);
      root.style.setProperty(
        "--pointer-shift-x",
        `${normalizedX * 12}px`,
      );
      root.style.setProperty(
        "--pointer-shift-y",
        `${normalizedY * 9}px`,
      );
      root.style.setProperty("--pointer-opacity", "1");
    };

    const requestCommit = () => {
      if (animationFrame !== 0) return;

      animationFrame =
        window.requestAnimationFrame(commitPointerPosition);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!canAnimate() || event.pointerType === "touch") return;

      latestX = event.clientX;
      latestY = event.clientY;
      requestCommit();
    };

    const handlePointerLeave = () => {
      root.style.setProperty("--pointer-opacity", "0");
      root.style.setProperty("--pointer-shift-x", "0px");
      root.style.setProperty("--pointer-shift-y", "0px");
    };

    const handleWindowBlur = () => {
      root.style.setProperty("--pointer-opacity", "0");
    };

    const handleCapabilityChange = () => {
      if (!canAnimate()) {
        resetPointerVariables(root);
        return;
      }

      latestX = window.innerWidth * 0.5;
      latestY = window.innerHeight * 0.18;
      requestCommit();
    };

    resetPointerVariables(root);

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );
    window.addEventListener("blur", handleWindowBlur);
    reducedMotionQuery.addEventListener(
      "change",
      handleCapabilityChange,
    );
    finePointerQuery.addEventListener(
      "change",
      handleCapabilityChange,
    );

    return () => {
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener(
        "pointermove",
        handlePointerMove,
      );
      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
      window.removeEventListener("blur", handleWindowBlur);
      reducedMotionQuery.removeEventListener(
        "change",
        handleCapabilityChange,
      );
      finePointerQuery.removeEventListener(
        "change",
        handleCapabilityChange,
      );

      resetPointerVariables(root);
    };
  }, []);

  return (
    <div className="pointer-atmosphere" aria-hidden="true">
      <div className="pointer-atmosphere__dust pointer-atmosphere__dust--far" />
      <div className="pointer-atmosphere__dust pointer-atmosphere__dust--near" />
      <div className="pointer-atmosphere__halo" />

      <style jsx>{`
        .pointer-atmosphere {
          position: fixed;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
          contain: strict;
        }

        .pointer-atmosphere__dust,
        .pointer-atmosphere__halo {
          position: absolute;
          pointer-events: none;
        }

        .pointer-atmosphere__dust {
          inset: -28px;
          opacity: 0;
          transition: opacity 0.4s var(--ease);
        }

        .pointer-atmosphere__dust--far {
          background-image:
            radial-gradient(
              circle,
              rgba(17, 17, 20, 0.18) 0 0.55px,
              transparent 0.72px
            ),
            radial-gradient(
              circle,
              rgba(37, 99, 235, 0.12) 0 0.65px,
              transparent 0.82px
            );
          background-position:
            0 0,
            19px 27px;
          background-size:
            43px 43px,
            71px 71px;
          transform: translate3d(
            calc(var(--pointer-shift-x) * -0.45),
            calc(var(--pointer-shift-y) * -0.45),
            0
          );
          mask-image: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.72),
            rgba(0, 0, 0, 0.18) 58%,
            transparent 88%
          );
        }

        .pointer-atmosphere__dust--near {
          background-image:
            radial-gradient(
              circle,
              rgba(17, 17, 20, 0.2) 0 0.7px,
              transparent 0.88px
            ),
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.9) 0 0.8px,
              transparent 1px
            );
          background-position:
            13px 9px,
            41px 33px;
          background-size:
            89px 89px,
            113px 113px;
          transform: translate3d(
            calc(var(--pointer-shift-x) * 0.7),
            calc(var(--pointer-shift-y) * 0.7),
            0
          );
          mask-image: radial-gradient(
            circle 520px at var(--pointer-x) var(--pointer-y),
            rgba(0, 0, 0, 0.72),
            rgba(0, 0, 0, 0.2) 48%,
            transparent 78%
          );
        }

        .pointer-atmosphere__halo {
          top: var(--pointer-y);
          left: var(--pointer-x);
          width: min(44vw, 520px);
          aspect-ratio: 1;
          border-radius: 50%;
          opacity: 0;
          background: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(224, 231, 244, 0.3) 32%,
            rgba(37, 99, 235, 0.035) 54%,
            transparent 74%
          );
          transform: translate3d(-50%, -50%, 0);
          transition: opacity 0.35s var(--ease);
        }

        :global(html[style*="--pointer-opacity: 1"])
          .pointer-atmosphere__dust {
          opacity: 0.34;
        }

        :global(html[style*="--pointer-opacity: 1"])
          .pointer-atmosphere__halo {
          opacity: 0.72;
        }

        @media (max-width: 900px),
          (hover: none),
          (pointer: coarse) {
          .pointer-atmosphere {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pointer-atmosphere {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
