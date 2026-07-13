import { ProcessStage } from "@/types/process";

/**
 * The five stages are not a marketing invention — they are the process this studio actually
 * runs on, mirrored from CLAUDE.md. If the two ever disagree, the site is lying. Keep the
 * `stage` names in sync; the `epithet` is ours to play with.
 */
const processData: ProcessStage[] = [
  {
    id: 1,
    stage: "Specification",
    epithet: "Star Chart",
    paragraph: `
      Before anything is built, we write down what "done" means: the intent, the constraints,
      and the edges of the work. Ambiguity gets resolved on paper, where it costs an afternoon,
      instead of in production, where it costs a quarter.
    `,
    deliverable: "A written spec you approve before we open an editor.",
  },
  {
    id: 2,
    stage: "Technical Planning",
    epithet: "Trajectory",
    paragraph: `
      Every line of the specification is mapped to the real files, systems, and assets it
      touches. We find the load-bearing walls now, while moving them is still cheap.
    `,
    deliverable: "A plan naming what changes, and what it depends on.",
  },
  {
    id: 3,
    stage: "Task Breakdown",
    epithet: "Stages",
    paragraph: `
      The plan is split into increments that each leave your product working. No six-week
      branch that lands in one terrifying merge. Shared foundations land before the things
      built on top of them.
    `,
    deliverable: "An ordered queue of changes, each shippable on its own.",
  },
  {
    id: 4,
    stage: "Implementation",
    epithet: "Launch",
    paragraph: `
      The part everyone mistakes for the whole job. It is the fastest stage precisely because
      the first three were not skipped — the arguments are already settled, so the code is
      just transcription.
    `,
    deliverable: "Working software, in increments you can see.",
  },
  {
    id: 5,
    stage: "Validation",
    epithet: "Telemetry",
    paragraph: `
      We do not guess whether it worked. Each specification carries its own acceptance
      criteria, and we report against them honestly — including the checks we skipped and the
      ones that failed.
    `,
    deliverable: "A truthful account of what passed, what did not, and what is left.",
  },
];

export default processData;
