import SectionTitle from "../Common/SectionTitle";
import Reveal from "../Common/Reveal";
import processData from "./processData";

/** The real headings of a Qamar Labs spec. Shown, not described. */
const SPEC_ANATOMY = [
  { heading: "Overview", note: "Why this work exists." },
  { heading: "Implementation Steps", note: "Observable outcomes, not file diffs." },
  { heading: "Rules", note: "The constraints we will not break." },
  { heading: "Acceptance", note: "How we prove it worked." },
  { heading: "Out of Scope", note: "What we are deliberately not doing." },
  { heading: "Reference Code", note: "What we read before we wrote." },
];

const Process = () => {
  return (
    <section
      id="process"
      className="relative overflow-hidden bg-gray-light py-16 dark:bg-bg-color-dark md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title="How We Work"
          paragraph="A moon is the most predictable thing in the sky — you can say where it will be in ten years. Software earns that predictability the same way: by charting the course before the launch. These are the five stages every engagement moves through."
          center
          width="700px"
          mb="80px"
        />

        <div className="mx-auto max-w-[850px]">
          <Reveal staggerChildren staggerDelay={140}>
            {processData.map(({ id, stage, epithet, paragraph, deliverable }, index) => (
              <div key={id} className="relative flex gap-6 pb-12 last:pb-0 sm:gap-8">
                {/* Orbital path: the line linking one stage to the next. */}
                <div className="flex flex-col items-center" aria-hidden="true">
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-white text-base font-bold text-primary shadow-one dark:bg-gray-dark dark:shadow-none">
                    {String(id).padStart(2, "0")}
                  </span>
                  {index < processData.length - 1 && (
                    <span className="mt-2 w-px grow bg-linear-to-b from-primary/40 to-primary/5" />
                  )}
                </div>

                <div className="pt-1">
                  <span className="mb-2 block text-sm font-medium uppercase tracking-widest text-primary/70">
                    {epithet}
                  </span>
                  <h3 className="mb-3 text-xl font-bold text-black dark:text-white sm:text-2xl">
                    {stage}
                  </h3>
                  <p className="mb-4 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                    {paragraph}
                  </p>
                  <p className="text-base font-medium text-black dark:text-white">
                    <span className="text-body-color dark:text-body-color-dark">
                      You receive:{" "}
                    </span>
                    {deliverable}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        {/* The artifact itself, rather than another claim about it. */}
        <Reveal className="mx-auto mt-16 max-w-[850px]">
          <div className="rounded-xs border border-body-color/[.15] bg-white p-8 shadow-one dark:border-white/[.15] dark:bg-gray-dark dark:shadow-none sm:p-10">
            <h3 className="mb-3 text-xl font-bold text-black dark:text-white">
              What a specification actually contains
            </h3>
            <p className="mb-8 text-base leading-relaxed text-body-color dark:text-body-color-dark">
              Every engagement starts as a document with these six sections. Two of them are
              why clients hire us: <strong className="font-semibold text-black dark:text-white">Acceptance</strong>{" "}
              settles how we prove the work is done, and{" "}
              <strong className="font-semibold text-black dark:text-white">Out of Scope</strong>{" "}
              settles what we are not building — both agreed before the first line of code.
            </p>

            <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
              {SPEC_ANATOMY.map(({ heading, note }) => (
                <div key={heading} className="border-l-2 border-primary/30 pl-4">
                  <dt className="text-base font-semibold text-black dark:text-white">
                    {heading}
                  </dt>
                  <dd className="text-sm text-body-color dark:text-body-color-dark">
                    {note}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Process;
