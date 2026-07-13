"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

/**
 * One full revolution. Slow enough to read as celestial, fast enough to actually see:
 * at the original 60s the surface crept along at ~5px/sec and read as a still image.
 */
const ROTATION_MS = 24000;

/** Tilt of the rotation axis. The surface travels on the diagonal, not straight across. */
const AXIAL_TILT_DEG = 45;

/**
 * Craters, drawn as gradients rather than shipped as an image — the page already carries
 * ~11 MB of video, and a decorative texture PNG is not worth another request.
 *
 * These are painted into a tile half the width of the surface strip below, so the strip
 * contains exactly two identical tiles. Translating it by -50% therefore lands on an
 * identical pixel column and the loop is seamless. Change one number here without changing
 * the other and a visible seam will sweep across the moon once a minute.
 */
const CRATERS = [
  "radial-gradient(circle at 20% 26%, rgba(15,23,42,0.30) 0 2.6%, transparent 3.0%)",
  "radial-gradient(circle at 33% 61%, rgba(15,23,42,0.26) 0 2.0%, transparent 2.4%)",
  "radial-gradient(circle at 12% 72%, rgba(15,23,42,0.22) 0 1.5%, transparent 1.8%)",
  "radial-gradient(circle at 44% 34%, rgba(15,23,42,0.20) 0 1.2%, transparent 1.5%)",
  "radial-gradient(circle at 27% 45%, rgba(15,23,42,0.17) 0 0.9%, transparent 1.2%)",
  "radial-gradient(circle at 40% 82%, rgba(15,23,42,0.24) 0 1.7%, transparent 2.0%)",
  "radial-gradient(circle at 8% 44%, rgba(15,23,42,0.19) 0 1.1%, transparent 1.4%)",
  "radial-gradient(circle at 46% 14%, rgba(15,23,42,0.21) 0 1.4%, transparent 1.7%)",
  "radial-gradient(circle at 17% 12% , rgba(15,23,42,0.18) 0 1.0%, transparent 1.3%)",
  "radial-gradient(circle at 4%  86%, rgba(15,23,42,0.20) 0 1.3%, transparent 1.6%)",
  "radial-gradient(circle at 36% 94%, rgba(15,23,42,0.16) 0 0.8%, transparent 1.1%)",
  "radial-gradient(circle at 25% 6%,  rgba(15,23,42,0.15) 0 0.7%, transparent 1.0%)",
  // Maria — the big dark plains that make a moon read as a moon rather than a golf ball.
  "radial-gradient(ellipse 7% 5.5% at 30% 40%, rgba(15,23,42,0.16), transparent 70%)",
  "radial-gradient(ellipse 5% 4.5% at 16% 60%, rgba(15,23,42,0.13), transparent 70%)",
  "radial-gradient(ellipse 6% 4%   at 42% 70%, rgba(15,23,42,0.12), transparent 70%)",
].join(", ");

/**
 * A moon that rotates on its axis like a planet.
 *
 * Decorative only: aria-hidden, no text, no focusable child. It renders without JS and
 * simply holds still under reduced motion — decoration is allowed to be inert, never absent.
 */
const Moon = ({ className = "" }: { className?: string }) => {
  const surfaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;

    // Reduced motion: a moon, still. Not a hidden moon.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rotation = animate(surface, {
      translateX: ["0%", "-50%"],
      duration: ROTATION_MS,
      ease: "linear",
      loop: true,
    });

    return () => {
      rotation.pause();
    };
  }, []);

  return (
    <div aria-hidden="true" className={`pointer-events-none select-none ${className}`}>
      <div className="relative aspect-square w-full">
        {/* Corona. Starlight in the dark, a soft halo through the dawn haze in the light. */}
        <div className="absolute -inset-[18%] rounded-full bg-primary/10 blur-3xl dark:bg-primary/20" />

        {/* The limb. Everything inside is clipped to this circle. */}
        <div className="absolute inset-0 overflow-hidden rounded-full bg-[#e8e3d8] shadow-[0_0_60px_-12px_rgba(74,108,247,0.45)] dark:bg-[#c9cddb]">
          {/* The axis. Rotating this wrapper tilts the direction the surface travels, so the
              moon turns about a 45° axis. Oversized to 200% so its corners still cover the
              circle once rotated — at 100% the rotation would expose bare edges. */}
          <div
            className="absolute inset-[-50%]"
            style={{ transform: `rotate(${AXIAL_TILT_DEG}deg)` }}
          >
            {/* The surface: two identical tiles, translated exactly one tile per revolution. */}
            <div
              ref={surfaceRef}
              className="h-full w-[200%] will-change-transform"
              style={{
                backgroundImage: CRATERS,
                backgroundSize: "50% 100%",
                backgroundRepeat: "repeat",
              }}
            />
          </div>

          {/* Sphere shading. Static by design: the light source does not orbit with the
              surface, which is what stops this reading as a flat scrolling rectangle. */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              backgroundImage: [
                "radial-gradient(circle at 30% 26%, rgba(255,255,255,0.55), transparent 52%)",
                "radial-gradient(circle at 72% 78%, rgba(15,23,42,0.55), transparent 62%)",
                "radial-gradient(circle at 50% 50%, transparent 58%, rgba(15,23,42,0.30) 100%)",
              ].join(", "),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Moon;
