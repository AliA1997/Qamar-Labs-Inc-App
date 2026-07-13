export type ProcessStage = {
  id: number;
  /** Canonical stage name. Must match the five stages in CLAUDE.md — this is the contract. */
  stage: string;
  /** Astronomical label. Decoration, always subordinate to `stage`. Never a replacement. */
  epithet: string;
  paragraph: string;
  /** What the client actually receives at the end of this stage. */
  deliverable: string;
};
