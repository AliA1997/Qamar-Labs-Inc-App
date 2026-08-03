import { ReactNode } from "react";

/**
 * A monospace code sample. It scrolls **inside its own box** (`overflow-x-auto`) so the long
 * gherkin and JSON lines in the rubric never push the page body sideways on a phone.
 * `children` is a raw string — reproduce the source sample verbatim.
 */
export function CodeSample({ lang, children }: { lang?: string; children: string }) {
  return (
    <div className="overflow-hidden rounded-sm border border-body-color/[.15] dark:border-white/[.15]">
      {lang && (
        <span className="block border-b border-body-color/[.12] bg-[#f0f0f5] px-4 py-1 font-mono text-xs uppercase tracking-wider text-body-color dark:border-white/[.08] dark:bg-[#161b26] dark:text-body-color-dark">
          {lang}
        </span>
      )}
      <pre className="overflow-x-auto bg-[#f8f8fb] p-4 dark:bg-[#12161f]">
        <code className="font-mono text-sm leading-relaxed text-[#1d2430] dark:text-[#e3e6ee]">
          {children}
        </code>
      </pre>
    </div>
  );
}

/**
 * One worked example: a tinted card (red for failing, green for passing), the code sample, and
 * the source's italic annotation. The colour is the point the rubric is teaching, so it must
 * read at a glance in both themes.
 */
export function ExampleBlock({
  verdict,
  lang,
  code,
  note,
}: {
  verdict: "Failing" | "Passing";
  lang?: string;
  code: string;
  note?: ReactNode;
}) {
  const pass = verdict === "Passing";
  return (
    <div
      className={`mb-5 rounded-sm border-l-4 p-4 ${
        pass
          ? "border-green-500 bg-green-50 dark:bg-green-500/10"
          : "border-red-500 bg-red-50 dark:bg-red-500/10"
      }`}
    >
      <span
        className={`mb-3 inline-block rounded-full px-3 py-0.5 text-xs font-semibold uppercase tracking-wider ${
          pass
            ? "bg-green-500/15 text-green-700 dark:text-green-400"
            : "bg-red-500/15 text-red-700 dark:text-red-400"
        }`}
      >
        {verdict}
      </span>
      <CodeSample lang={lang}>{code}</CodeSample>
      {note && (
        <p className="mt-3 text-sm italic leading-relaxed text-body-color dark:text-body-color-dark">
          {note}
        </p>
      )}
    </div>
  );
}

/**
 * A quality dimension: its name, the one-line criterion, and its worked examples.
 */
export function Dimension({
  name,
  criterion,
  children,
}: {
  name: string;
  criterion: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-10">
      <h3 className="mb-2 text-xl font-bold text-black dark:text-white">{name}</h3>
      <p className="mb-5 flex items-start gap-3 text-base font-medium text-body-color dark:text-body-color-dark">
        <span className="mt-2 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
        <span>{criterion}</span>
      </p>
      {children}
    </div>
  );
}

/**
 * The score bands for one dimension, from "How Dimensions Are Scored". Reproduce the ranges and
 * text exactly — the numbers are the standard.
 */
export function ScoreBands({
  dimension,
  bands,
}: {
  dimension: string;
  bands: { range: string; text: string }[];
}) {
  return (
    <div className="mb-8">
      <h3 className="mb-3 text-lg font-bold text-black dark:text-white">{dimension}</h3>
      <ul className="space-y-2">
        {bands.map((b) => (
          <li
            key={b.range}
            className="flex flex-col gap-0.5 text-sm text-body-color dark:text-body-color-dark sm:flex-row sm:gap-3"
          >
            <span className="shrink-0 font-mono font-semibold text-primary">{b.range}</span>
            <span>{b.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
