"use client";

import { ReactNode, useEffect, useLayoutEffect, useRef } from "react";
import { animate, stagger } from "animejs";

// useLayoutEffect warns during SSR; this component only ever animates on the client.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Delay before the reveal begins, in ms. */
  delay?: number;
  /** Reveal each direct child in turn rather than the block as a whole. */
  staggerChildren?: boolean;
  /** Gap between staggered children, in ms. */
  staggerDelay?: number;
};

/**
 * Scroll-triggered reveal. The one animation primitive on the site — compose it, don't
 * reimplement it.
 *
 * The load-bearing detail: children are rendered *visible*, and are hidden here in an
 * effect only once we know motion is permitted and we can bring them back. Hiding them in
 * markup instead (opacity-0 + animate to 1) would leave the content permanently invisible
 * for anyone with reduced motion or without JS — the exact failure this guards against.
 */
const Reveal = ({
  children,
  className,
  delay = 0,
  staggerChildren = false,
  staggerDelay = 90,
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    // Reduced motion: leave everything exactly as rendered — visible, and still.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets: HTMLElement[] = staggerChildren
      ? (Array.from(root.children) as HTMLElement[])
      : [root];
    if (!targets.length) return;

    // Safe to hide now: we are on the client, motion is allowed, and the reveal below
    // will restore these. Done before paint, so there is no flash of visible content.
    targets.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        observer.disconnect(); // fire once; re-entering the viewport must not replay it

        animate(targets, {
          opacity: [0, 1],
          translateY: [24, 0],
          duration: 720,
          ease: "out(3)",
          delay: staggerChildren ? stagger(staggerDelay, { start: delay }) : delay,
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(root);

    return () => {
      observer.disconnect();
      // Never leave content stranded mid-animation if this unmounts early.
      targets.forEach((el) => {
        el.style.opacity = "";
        el.style.transform = "";
      });
    };
  }, [delay, staggerChildren, staggerDelay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default Reveal;
