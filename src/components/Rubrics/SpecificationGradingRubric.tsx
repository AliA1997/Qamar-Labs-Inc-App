import { Dimension, ExampleBlock, ScoreBands } from "./common";

// The source markdown is the single source of truth; this href is its served path. The file
// name contains spaces, so it MUST be percent-encoded or the download 404s.
const RUBRIC_HREF = "/docs/Qamar%20Labs%20-%20Specification%20Grading%20Rubric.md";
const RUBRIC_FILENAME = "Qamar-Labs-Specification-Grading-Rubric.md";

const DownloadButton = () => (
  <a
    href={RUBRIC_HREF}
    download={RUBRIC_FILENAME}
    aria-label="Download the Specification Grading Rubric as a Markdown file"
    className="inline-flex items-center gap-2 rounded-xs bg-primary px-6 py-3 text-base font-semibold text-white transition duration-300 hover:bg-primary/90"
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      className="fill-current"
      aria-hidden="true"
    >
      <path d="M10 13.333 5.833 9.167l1.167-1.209 2.167 2.167V2.5h1.666v7.625l2.167-2.167 1.167 1.209L10 13.333Z" />
      <path d="M4.167 15.833h11.666V17.5H4.167v-1.667Z" />
    </svg>
    Download the rubric <>{"(Qamar-Labs-Specification-Grading-Rubric.md)"}</>
  </a>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-5 mt-14 text-2xl font-bold text-black dark:text-white first:mt-0">
    {children}
  </h2>
);

const SpecificationGradingRubric = () => {
  return (
    <section className="pb-20 pt-35 md:pt-40 xl:pt-46">
      <div className="container">
        <div className="mx-auto max-w-2xl">
        {/* Page header — positioned like the privacy-policy pages, no breadcrumb.
            `.container` keeps the column inside the viewport on mobile (the bare
            max-w-2xl the privacy pages use overflows at 390px). */}
        <div className="mb-12">
          <p className="mb-3 flex items-center gap-3 text-xs font-light uppercase tracking-widest text-body-color dark:text-body-color-dark">
            <span className="inline-block h-px w-6 bg-primary" />
            Reference
          </p>
          <h1 className="mb-2 text-3xl font-bold text-black dark:text-white sm:text-4xl">
            Specification Grading Rubric
          </h1>
          <p className="text-sm font-light text-body-color dark:text-body-color-dark">
            The standard every Qamar Labs specification is scored against — five dimensions,
            100 points.
          </p>
        </div>

        {/* Framing + primary download */}
            <div className="mb-14 rounded-sm border border-body-color/[.15] bg-white p-6 shadow-one dark:border-white/[.15] dark:bg-gray-dark dark:shadow-none sm:p-8">
              <p className="mb-6 text-base leading-relaxed text-body-color dark:text-body-color-dark">
                This is the rubric we grade our own specifications against before a line of code
                is written. Every spec earns a score out of 100 across five dimensions; a low
                score sends the spec back, not forward. We publish it because a standard you can
                read is more convincing than one you are asked to trust — use it as a reference,
                or download it and grade your own work by it.
              </p>
              <DownloadButton />
            </div>

            {/* # Specification Rubric */}
            <H2>Specification Rubric</H2>
            <p className="mb-2 text-base text-body-color dark:text-body-color-dark">
              <strong className="text-black dark:text-white">Score is between 1 and 100</strong>{" "}
              (Clarity 25 + Completeness 25 + Testability 20 + Consistency 20 + Appropriate
              Abstraction 10)
            </p>

            {/* ## 5 Dimensions of Spec Quality */}
            <H2>5 Dimensions of Spec Quality</H2>

            <Dimension name="Clarity" criterion="Terms defined, no ambiguity.">
              <ExampleBlock
                verdict="Failing"
                lang="text"
                code={`The system should respond quickly and handle a reasonable number of users.`}
                note={`"Quickly" and "reasonable" are undefined — two readers will implement two different systems.`}
              />
              <ExampleBlock
                verdict="Passing"
                lang="text"
                code={`Search requests MUST return within 200ms at p95 under a load of 500 concurrent users.
"Search request" = any call to the /search endpoint with a non-empty query parameter.`}
              />
            </Dimension>

            <Dimension
              name="Completeness"
              criterion="All templates, all sections present, no [TBD] markers."
            >
              <ExampleBlock
                verdict="Failing"
                lang="text"
                code={`## Error Handling
[TBD — ask backend team]`}
              />
              <ExampleBlock
                verdict="Passing"
                lang="text"
                code={`## Error Handling
Invalid input returns a validation error listing each failed field.
Expired sessions redirect the user to login, preserving their draft input.
Open question: rate-limit threshold — owned by @platform-team, due 2026-08-15.`}
                note={`Unknowns are allowed only when explicitly owned and dated — never a bare [TBD].`}
              />
            </Dimension>

            <Dimension
              name="Testability"
              criterion="Given/When/Then format, concrete examples with real data."
            >
              <ExampleBlock
                verdict="Failing"
                lang="text"
                code={`When a user cancels their subscription, they should get some kind of confirmation.`}
              />
              <ExampleBlock
                verdict="Passing"
                lang="gherkin"
                code={`Given user 7f3e9d2a-1c4b-4e8f-9a6d-2b5c8e1f0a3d has an active subscription
When they submit a cancellation on 2026-08-02T14:30:00Z
Then the subscription status becomes "cancelled"
And a confirmation email is sent within 5 minutes containing the end-of-service date 2026-09-01`}
                note={`Real formats: UUIDs, ISO-8601 timestamps, exact status values.`}
              />
            </Dimension>

            <Dimension
              name="Consistency"
              criterion="Follows Claude constitution (Claude.md), matches existing API patterns."
            >
              <ExampleBlock
                verdict="Failing"
                lang="json"
                code={`POST /createNewUser  →  { "user_name": "ali", "CreatedDate": "08/02/2026" }`}
                note={`Invents verb-based endpoint, mixed casing, and non-ISO date — contradicts established conventions.`}
              />
              <ExampleBlock
                verdict="Passing"
                lang="json"
                code={`POST /users  →  { "userName": "ali", "createdAt": "2026-08-02T14:30:00Z" }`}
                note={`Resource-based route, camelCase fields, ISO-8601 dates — matches existing API patterns in Claude.md.`}
              />
            </Dimension>

            <Dimension
              name="Appropriate Abstraction"
              criterion="WHAT, not HOW. No database/code details."
            >
              <ExampleBlock
                verdict="Failing"
                lang="text"
                code={`Store users in a PostgreSQL \`users\` table with a B-tree index on the email column,
and cache lookups in Redis with a 15-minute TTL.`}
              />
              <ExampleBlock
                verdict="Passing"
                lang="text"
                code={`The system MUST retrieve a user account by email address in under 100ms,
and email lookup MUST remain correct immediately after an email change.`}
                note={`States the behavior and constraint; leaves storage, indexing, and caching to implementation.`}
              />
            </Dimension>

            {/* ## How Dimensions Are Scored */}
            <H2>How Dimensions Are Scored</H2>

            <ScoreBands
              dimension="Clarity"
              bands={[
                { range: "(20–25)", text: "All terms defined, zero ambiguous language. Uses formats/patterns to define terms." },
                { range: "(15–19)", text: "Most terms defined, 1–2 need precision (reasonable limit)." },
                { range: "(10–14)", text: "Multiple vague terms, but core concepts understandable." },
                { range: "(0–9)", text: "Ambiguity prevents understanding requirements." },
              ]}
            />
            <ScoreBands
              dimension="Completeness"
              bands={[
                { range: "(20–25)", text: "All sections present with substance, no [TBD] or well determined." },
                { range: "(15–19)", text: "All sections present, but 1–2 are thin." },
                { range: "(10–14)", text: "Missing 1 section or multiple thin." },
                { range: "(0–9)", text: "Multiple sections missing or mostly empty." },
              ]}
            />
            <ScoreBands
              dimension="Testability"
              bands={[
                { range: "(16–20)", text: "All scenarios in Given/When/Then. Examples use real formats (UUID, ISO-8601)." },
                { range: "(12–15)", text: "Structured scenarios, but some examples use placeholders." },
                { range: "(8–11)", text: "Scenarios present but lack concrete or realistic data." },
                { range: "(0–7)", text: "No structured scenarios, only narrative descriptions." },
              ]}
            />
            <ScoreBands
              dimension="Consistency"
              bands={[
                { range: "(16–20)", text: "Matches all Claude.md conventions." },
                { range: "(12–15)", text: "Follows most conventions, 1–2 minor deviations." },
                { range: "(8–11)", text: "Multiple inconsistencies with existing API patterns." },
                { range: "(0–7)", text: "Introduces new patterns, contradicting established conventions." },
              ]}
            />
            <ScoreBands
              dimension="Appropriate Abstraction"
              bands={[
                { range: "(8–10)", text: "Pure WHAT/WHY, zero implementation details." },
                { range: "(5–7)", text: "Mostly WHAT, but 1–2 lines of implementation details." },
                { range: "(3–4)", text: "Multiple implementation references mixed with requirements." },
                { range: "(0–2)", text: "Reads like code documentation, not a behavioral spec." },
              ]}
            />

            {/* ## How the Agent Applies This Rubric */}
            <H2>How the Agent Applies This Rubric</H2>
            <ol className="list-decimal space-y-4 pl-6 text-base leading-relaxed text-body-color dark:text-body-color-dark marker:font-semibold marker:text-primary">
              <li>
                <strong className="text-black dark:text-white">
                  Go through the specification section by section.
                </strong>{" "}
                Score each section against all applicable dimensions before moving on — do not
                score the document in one pass.
              </li>
              <li>
                <strong className="text-black dark:text-white">
                  For each conflicting requirement, resolve in this precedence order:
                </strong>
                <ol className="mt-2 list-decimal space-y-1 pl-6 marker:text-primary">
                  <li>
                    <strong className="text-black dark:text-white">Constitution</strong> — Claude.md
                    constitution rules win over everything.
                  </li>
                  <li>
                    <strong className="text-black dark:text-white">Conventions</strong> — existing
                    API patterns and naming conventions win next.
                  </li>
                  <li>
                    <strong className="text-black dark:text-white">UX / Testability</strong> —
                    prefer the version that is more user-facing and testable.
                  </li>
                  <li>
                    <strong className="text-black dark:text-white">Merge</strong> — if still tied,
                    merge both requirements into a single reconciled statement.
                  </li>
                </ol>
              </li>
              <li>
                <strong className="text-black dark:text-white">
                  Record a one-line rationale for each resolution.
                </strong>
                <br />
                Example:{" "}
                <code className="rounded-sm bg-[#f8f8fb] px-1.5 py-0.5 font-mono text-sm text-[#1d2430] dark:bg-[#12161f] dark:text-[#e3e6ee]">
                  &quot;Chose camelCase over snake_case — conventions (rule 2) outrank the newer
                  draft section.&quot;
                </code>
              </li>
              <li>
                <strong className="text-black dark:text-white">
                  Rescore the consolidated spec on all 5 dimensions before approval.
                </strong>{" "}
                The final score reflects the resolved document, not the original draft.
              </li>
            </ol>

            {/* Repeat the download at the foot of a long page */}
            <div className="mt-14 border-t border-body-color/[.15] pt-10 text-center dark:border-white/[.15]">
              <p className="mb-5 text-base text-body-color dark:text-body-color-dark">
                Want it as a file you can keep or grade against?
              </p>
              <DownloadButton />
            </div>
        </div>
      </div>
    </section>
  );
};

export default SpecificationGradingRubric;
