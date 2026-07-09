"use client";

import { useEffect } from "react";

export default function ScrollUp() {
  // Block body, not a concise arrow: a concise body returns whatever the call
  // evaluates to, and React treats a non-function return as a cleanup fn.
  useEffect(() => {
    window.document.scrollingElement?.scrollTo(0, 0);
  }, []);

  return null;
}
