# Overview

Add a **Rubrics** area to the site whose first entry is the **Specification Grading Rubric**: a
page that renders the rubric as native, styled JSX and offers the original markdown as a
download.

The rubric already exists as
[public/docs/Qamar Labs - Specification Grading Rubric.md](../public/docs/Qamar%20Labs%20-%20Specification%20Grading%20Rubric.md)
— the exact criteria by which a Qamar Labs specification is scored (Clarity 25, Completeness 25,
Testability 20, Consistency 20, Appropriate Abstraction 10). Nothing on the site surfaces it.
This spec puts it on a page and behind a nav tab.

**Why this earns a page.** The rubric is the studio's method turned into a measuring stick, so it
serves both audiences at once:

- **A prospective client** reads it as a selling point — visible proof that "spec-driven" is a
  discipline with a grading scale, not a slogan. It answers "how do you keep quality honest?"
  before they have to ask.
- **A developer** reads it as a reference — a concrete standard they can hold their own specs to,
  with worked pass/fail examples in real formats (UUIDs, ISO-8601, exact status values).

This supports the positioning goal in [prds/initial-project-v1.0.md](../prds/initial-project-v1.0.md)
(FR-1: sell the method; show what a specification actually is). It is a modest, single-surface
addition — a spec, not a new PRD.

**The core tension to design around:** there will now be **two copies of the same content** — the
canonical `.md` (which downloads) and the JSX (which renders). They can drift. The `.md` is the
single source of truth; the JSX mirrors it and must not paraphrase, re-score, or "improve" it.

# Implementation Steps

- **Navigation — a new "Rubrics" tab, mirroring the Privacy Policies submenu.**
  In [src/components/Header/menuData.tsx](../src/components/Header/menuData.tsx), add one new
  top-level `Menu` entry titled **"Rubrics"** with a `submenu`, following the exact shape of the
  existing "Privacy Policies" entry. Its first (and, for now, only) child is **"Specification
  Grading Rubric"** pointing at `/rubrics/specification-grading`. Give the new entries a unique
  `id` (the current list reuses small ids; pick one not already present at that level). Leave
  every existing entry — About, How We Work, Privacy Policies, Contact — untouched. The parent is
  a category so a second rubric later is a one-line addition, not a redesign.

- **Route — a new page under `/rubrics/`, mirroring the privacy-policy page wrapper.**
  Create `src/app/rubrics/specification-grading/page.tsx` as a **server component** that exports
  `metadata` (title e.g. "Specification Grading Rubric — Qamar Labs", a description naming it as
  the standard specs are graded against) and renders `ScrollUp` plus the rubric component —
  structurally identical to
  [src/app/privacy-policy/dawaar/page.tsx](../src/app/privacy-policy/dawaar/page.tsx).

- **Component — the JSX rubric.**
  Create `src/components/Rubrics/SpecificationGradingRubric.tsx`, a **server component** (no state,
  no effects — the download is a plain anchor, so no `"use client"`). It:
  - Opens with a [Breadcrumb](../src/components/Common/Breadcrumb.tsx) header
    (`pageName="Specification Grading Rubric"`, a one-line description) — the same header the
    about page uses — so the page reads as a first-class destination with a Home ›
    breadcrumb trail.
  - Renders a short framing paragraph in the site voice: this is the rubric Qamar Labs grades its
    own specifications against, offered as a reference. Plain, declarative, cooperative-first.
  - Reproduces the rubric faithfully: the **five dimensions**, each with its failing and passing
    example and the italic annotation explaining why; the **scoring bands** for each dimension;
    and the **"How the Rubric Is Applied"** precedence list (Constitution › Conventions › UX /
    Testability › Merge). Section order and wording match the `.md`.
  - Wraps every code sample (`text`, `gherkin`, `json`) in a monospace `<pre><code>` block that
    **scrolls horizontally inside its own container** (`overflow-x-auto`) — the gherkin and JSON
    lines are long and must never force the page body to scroll sideways on a phone.
  - Presents each dimension's failing/passing pair as a visually distinguished pair (e.g. a
    red-toned "Failing" card and a green-toned "Passing" card) so the contrast the rubric teaches
    is legible at a glance — in **both** light and dark themes.

- **Presentational primitives.**
  The generic [Section / Para / Bullets](../src/components/PrivacyPolicy/common.tsx) primitives
  cover headings, prose, and lists. The rubric additionally needs a **code-block** primitive and a
  **pass/fail example** primitive that do not exist yet. Add those as small colocated helpers for
  the Rubrics area (keeping content beside its component). Reuse the generic primitives rather
  than re-hand-rolling headings and lists.

- **Download link — the original markdown.**
  On the page, render a clearly labelled download control (a button-styled `<a>`) whose `href` is
  the served path of the source file and which carries the `download` attribute with a clean
  filename (e.g. `download="Qamar-Labs-Specification-Grading-Rubric.md"`). Because the file name
  contains spaces, the `href` **must be percent-encoded**:
  `/docs/Qamar%20Labs%20-%20Specification%20Grading%20Rubric.md`. An un-encoded space breaks the
  URL and the download 404s. Place the control prominently near the top (in or just under the
  breadcrumb) and, optionally, repeat it at the foot of the long page.

- **Ship the asset.**
  `public/docs/` is currently **untracked in git**. The download resolves in local dev regardless,
  but in production the link 404s unless the file is committed and deployed. Committing the `.md`
  is part of this change.

# Rules

- **The `.md` is the single source of truth; the JSX mirrors it.** Do not paraphrase, re-score,
  reorder, or "tidy" the rubric text in the JSX. The scores, band ranges, real-data examples
  (UUIDs, ISO-8601 timestamps, exact endpoint/JSON shapes), and the precedence list are the
  point — reproduce them verbatim. If the two ever disagree, the JSX is wrong.
- **Code samples are reproduced exactly and never lin-wrapped destructively.** Use `<pre><code>`
  with horizontal scroll inside the block; the page body must not scroll horizontally at any width
  from 390px up.
- **Server component.** No `"use client"` — there is no state, effect, ref, or browser API here.
  The download is an anchor, not an `onClick`.
- **The download `href` is percent-encoded**, and the file is committed so it resolves in
  production. A download button that 404s is worse than no button.
- **Reuse existing patterns.** Nav mirrors the Privacy Policies submenu; the page wrapper mirrors
  a privacy-policy page; the header uses the shared `Breadcrumb`. Do not invent new page scaffolding.
- **Every colour utility has its `dark:` counterpart.** Follow the established pairs
  (`text-black dark:text-white`, `bg-white dark:bg-gray-dark`,
  `text-body-color dark:text-body-color-dark`, `border-body-color/[.15] dark:border-white/[.15]`).
  The pass/fail cards must be legible in both themes — a green/red tint that works in light mode
  can vanish or glare in dark.
- **No new dependencies.** No markdown renderer, no syntax-highlighting library — the constraint
  is a hand-authored JSX version, and the site's no-new-deps rule stands. The code blocks are
  styled, not highlighted.
- **`page.tsx` (homepage) and its commented-out sections are not touched.** This change adds a
  route and a nav entry; it does not alter the homepage composition.
- **Accessibility:** the download control is real, selectable, focusable text with an accessible
  label; code uses `<pre><code>`; contrast stays ≥ 4.5:1 for body copy in both themes.

# Acceptance

Status: **implemented and verified** against the production build (`npm run build` + `npm run
start`), except the one item noted below that awaits a commit decision.

- Passing Tests
  - ✅ `npm run build` succeeds — no type or prerender errors — and the static page count went from
    12 to **13**, the one new page being `/rubrics/specification-grading` (prerendered, 294 B).
  - ✅ The header shows a **Rubrics** tab whose submenu contains **Specification Grading Rubric**,
    linking to `/rubrics/specification-grading`; How We Work, About, Privacy Policies, and Contact
    are unchanged. Confirmed by screenshot in both themes.
  - ✅ `/rubrics/specification-grading` renders all five dimensions, each with its failing and
    passing example and annotation, plus the scoring bands and the **"How the Agent Applies This
    Rubric"** precedence list. (Note: the source heading is *"How the Agent Applies This Rubric"* —
    reproduced verbatim; an earlier draft of this spec paraphrased it as "How the Rubric Is
    Applied".) Verbatim strings — the UUID, the `@platform-team` open question, the
    backtick-wrapped `` `users` `` example, the final band text — confirmed present in the served
    HTML.
  - ✅ The download returns the **actual source file**: the percent-encoded URL responds `200`
    with `content-type: text/markdown` and **byte-for-byte 5,329 = 5,329** against the on-disk
    file. The un-encoded (raw-space) URL fails to resolve, confirming the encoding is load-bearing.
  - ⬜ **`public/docs/Qamar Labs - Specification Grading Rubric.md` committed to git — not yet
    done.** The file is present on disk and the download works in dev and `next start`, but it is
    still **untracked**, so the link will 404 in production until it is committed and deployed.
    Left uncommitted pending Ali's go-ahead (commits are made on request). **This is the one
    launch-blocking item for this page.**
  - ✅ Code samples render in monospace `<pre><code>` and scroll **inside their own block**. The
    page body does not scroll horizontally: `.container` is `padding-inline:1rem` with no fixed
    width, and block-level `overflow-x-auto` `<pre>` cannot expand its ancestors — confirmed
    visually at 390px (cards sit within the viewport; long gherkin/JSON lines clip inside their
    boxes). Measured basis is CSS + screenshot, not a `scrollWidth` probe (no headless-driver
    dependency was added).
  - ✅ Legible in **both** light and dark themes, including the red "Failing" / green "Passing"
    cards and the code backgrounds — confirmed by screenshot in each theme.
  - ✅ Server component (no `"use client"` anywhere in `src/components/Rubrics/` or the route), and
    the whole rubric is present in the server-rendered HTML (readable with JavaScript disabled).
  - ⚠️ `npm run lint` — **blocked, pre-existing** (ESLint 9 vs `.eslintrc.json`). Not a signal.

- Failing Tests
  - The JSX rubric drifts from the `.md`: a changed score, band range, example value, or reordered
    section.
  - The download `href` is not percent-encoded, or the file is not committed — the link 404s in
    production.
  - A code sample forces the page body to scroll horizontally on mobile.
  - The component is marked `"use client"`, or drives the download from an `onClick` handler.
  - A new dependency (markdown parser, highlighter) is added.
  - Any nav entry other than the new Rubrics tab is added, removed, or reordered.
  - A colour utility ships without its `dark:` counterpart, or a pass/fail card is illegible in
    one theme.

# Out of Scope

- **A generic docs/markdown rendering system.** This is one hand-authored rubric page, not a
  markdown pipeline. No parser, no `.md`-to-JSX build step.
- **Editing the rubric's content, scores, or examples.** This spec surfaces the rubric as written;
  changing the standard is a separate decision.
- **Additional rubrics.** The "Rubrics" tab is built to hold more, but only the Specification
  Grading Rubric ships now.
- **PDF or other export formats.** The download is the existing `.md`, as-is.
- **Any gating, login, or lead-capture in front of the rubric.** It is public reference material;
  render it as selectable text, never behind a form.
- **Syntax highlighting.** Code blocks are styled monospace, not tokenized.
- **Changes to the homepage composition** or the commented-out inventory sections in `page.tsx`.
- **A search/filter/table-of-contents UI** for the rubric.
- **Wiring the rubric into any automated grading tool.** This is a reading surface only.

# Reference Code

1) [public/docs/Qamar Labs - Specification Grading Rubric.md](../public/docs/Qamar%20Labs%20-%20Specification%20Grading%20Rubric.md)
   — the source of truth. 128 lines, 5,329 bytes. Served at
   `/docs/Qamar%20Labs%20-%20Specification%20Grading%20Rubric.md` (spaces percent-encoded).
   Currently untracked — must be committed.
2) [src/components/Header/menuData.tsx](../src/components/Header/menuData.tsx) — the nav model;
   the "Privacy Policies" entry (a top-level item with a `submenu`) is the exact pattern for the
   new "Rubrics" tab.
3) [src/types/menu.ts](../src/types/menu.ts) — the `Menu` type (`id`, `title`, `path?`, `newTab`,
   `submenu?`) the new entries conform to.
4) [src/app/privacy-policy/dawaar/page.tsx](../src/app/privacy-policy/dawaar/page.tsx) — the page
   wrapper to mirror: server component, `metadata`, `ScrollUp` + one content component.
5) [src/components/PrivacyPolicy/common.tsx](../src/components/PrivacyPolicy/common.tsx) — the
   generic `Section` / `Para` / `Bullets` primitives to reuse; the rubric adds code-block and
   pass/fail primitives on top.
6) [src/components/Common/Breadcrumb.tsx](../src/components/Common/Breadcrumb.tsx) — the page
   header (`pageName`, `description`), as used by the about page.
7) [CLAUDE.md](../CLAUDE.md) — section rhythm (`py-16 md:py-20 lg:py-28`), the `dark:` pairs, the
   server-components-by-default and no-new-dependencies rules this page must honour. Note also its
   guidance that wide content (code blocks) must scroll inside its own container, never the body.
8) [prds/initial-project-v1.0.md](../prds/initial-project-v1.0.md) — the positioning this page
   serves (the method as the product; showing the actual work standard as a selling point).
