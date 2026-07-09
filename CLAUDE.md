# Qamar Labs Inc App

Marketing website for Qamar Labs, a worker-owned IT cooperative building open-source
software. Single Next.js app deployed as a static-leaning marketing site: a homepage
composed of stacked sections, an about page, a contact page, and one privacy-policy
page per shipped product.

## Tech Stack

- **Framework**: Next.js 15 (App Router) with React 19
- **Language**: TypeScript 5 — note `strict: false` in [tsconfig.json](tsconfig.json)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss`; global sheet at [src/styles/index.css](src/styles/index.css)
- **Theming**: `next-themes` (class-based dark mode), wired through [src/app/providers.tsx](src/app/providers.tsx)
- **Forms**: Formik + Yup
- **Email**: `@genezio/email-service`
- **Lint/Format**: ESLint 9 (`eslint-config-next`), Prettier with `prettier-plugin-tailwindcss`
- **Path alias**: `@/*` → `./src/*`
- **No test runner is installed.** There is no Jest, Vitest, or Playwright config. Do not
  invent test commands. See [Validation](#validation) for what "verified" means here.

Scripts: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`.

## Architectural Principles

- **Sections are the unit of composition.** [src/app/page.tsx](src/app/page.tsx) is a flat
  list of section components. Adding, removing, or reordering homepage content means editing
  that list — not threading props through a layout.
- **Server components by default.** Only add `"use client"` when a component needs state,
  effects, refs, or browser APIs. `Hero`, `Features`, and the `About` sections are server
  components; `Video`, `ThemeToggler`, and `Contact` are client components.
- **Content lives beside its component.** Section copy is either inline JSX or a colocated
  `*Data.tsx` module (`featuresData`, `menuData`, `blogData`, `brandsData`). There is no CMS
  fetch on the homepage path.
- **Types are shared, small, and explicit.** One interface per domain object in
  [src/types/](src/types/) (`feature.ts`, `menu.ts`, `blog.ts`, …).
- **Assets are static and public.** Images and videos live under `public/images/<category>/`
  and are referenced by absolute path (`/images/products/foo.webm`). Only `cdn.sanity.io` is
  allowlisted for remote images in [next.config.js](next.config.js).
- **Commented-out sections are intentional inventory,** not dead code. `Video`, `Brands`,
  `Pricing`, `Testimonials`, and `Blog` are staged in `page.tsx` behind comments. Re-enable
  by uncommenting rather than rewriting.

## Code Patterns

**Section component shape.** A section is a default-exported arrow function returning a
`<section>` with vertical rhythm `py-16 md:py-20 lg:py-28`, an inner `.container`, and a
`SectionTitle` when it needs a heading:

```tsx
const MySection = () => (
  <section id="my-section" className="py-16 md:py-20 lg:py-28">
    <div className="container">
      <SectionTitle title="…" paragraph="…" center />
      {/* content */}
    </div>
  </section>
);
export default MySection;
```

**`SectionTitle`** ([src/components/Common/SectionTitle.tsx](src/components/Common/SectionTitle.tsx))
takes `title`, `paragraph`, optional `center`, `width` (default `570px`), and `mb`
(default `100px`). Every headed section uses it; do not hand-roll an `<h2>`.

**Dark mode** is expressed per-utility with the `dark:` variant, never with a theme object.
Recurring pairs: `text-black dark:text-white`, `bg-white dark:bg-gray-dark`,
`text-body-color dark:text-body-color-dark`, `border-body-color/[.15] dark:border-white/[.15]`.

**Dual-asset light/dark images** ship as two `<Image>` tags, the dark one gated on the
variant — see [AboutSectionOne.tsx:52-63](src/components/About/AboutSectionOne.tsx#L52-L63):

```tsx
<Image src="/images/about/about-image.svg" fill className="dark:hidden" alt="…" />
<Image src="/images/about/about-image-dark.svg" fill className="hidden dark:block" alt="…" />
```

**Video embeds must autoplay silently with no controls.** Any `<video>` added to this site
is decorative product footage, so it carries `autoPlay muted loop playsInline` and omits
`controls`. `muted` is required — browsers block unmuted autoplay. Pair it with `poster`
where a `.png` sibling exists in `public/images/products/`.

```tsx
<video autoPlay muted loop playsInline preload="metadata"
       poster="/images/products/foo.png" className="h-full w-full object-cover">
  <source src="/images/products/foo.webm" type="video/webm" />
</video>
```

**Data modules** export a typed default array; icons are inline JSX `<Image>` elements rather
than icon-library imports.

**`<Image fill>` requires a `sizes` prop.** Without it Next defaults to `sizes="100vw"` and
emits a srcset of candidates up to `3840w` for what may be a 40px box. For anything of known
fixed size — feature icons, avatars, logos — pass explicit `width`/`height` instead of `fill`.
That reserves the layout box, keeps the srcset to `1x`/`2x`, and avoids the `fill` + lazy-load
+ zero-height-container class of bugs where an image intermittently fails to appear. Reserve
`fill` for images that must fill a genuinely fluid container, and give those a real `sizes`.

**Layout quirk to preserve**: [src/app/layout.tsx](src/app/layout.tsx) is a client component
and imports `Providers` at the bottom of the file. Leave the import placement alone unless
the task is specifically to fix it.

## SDD and Workflow

This repo is spec-driven. Every non-trivial change starts as a markdown file in
[specs/](specs/) and moves through the five stages below. Do not skip to Implementation.

### Specification

Write `specs/<kebab-case-goal>.md` using the house structure, in this order:
`# Overview`, `## Implementation Steps`, `## Rules`, `## Acceptance` (with `- Passing Tests`
and `- Failing Tests`), `## Out of Scope`, `## Reference Code`.

The Overview states the *why* in prose or bullets. Implementation Steps state observable
outcomes, not file diffs. Preserve the existing heading structure of a spec when editing it
— fill sections in, never reorder or rename them.

### Technical Planning

Before writing code, map each Implementation Step to concrete files. Read the section
components involved and the assets in `public/` that the step depends on. Confirm an asset
exists on disk before writing a `src` path to it — several `public/images/` subdirectories
are newer than the code that references them.

Decide up front whether a step needs a **new** section component or an **edit** to an
existing one, and whether it must be a client component. Prefer editing existing sections.

### Task Breakdown

Split the plan into tasks that each leave the site building and visually coherent. A good
task is "add the `ResponsiveShowcase` section component"; a bad one is "update the
homepage." Track them with the todo tool when there is more than one.

Order tasks so shared primitives (types, data modules) land before the components that
consume them, and so `page.tsx` composition changes land last.

### Implementation

Follow [Code Patterns](#code-patterns) exactly — match the surrounding Tailwind idiom,
`dark:` variants, and section rhythm. New copy must read in the voice of the current site:
plain, declarative, cooperative-first.

Keep diffs tight. Do not reformat untouched files, do not upgrade dependencies, and do not
delete the commented-out sections in `page.tsx`.

### Validation

There is no test suite, so validation is build, lint, and eyes on the page:

1. `npm run build` — must succeed with no type or prerender errors.
2. `npm run lint` — **currently fails before it lints anything**, with `Converting circular
   structure to JSON … Referenced from: .eslintrc.json`. This is an ESLint 9 / legacy
   `.eslintrc.json` incompatibility, not a code defect, and it predates any given change.
   Treat lint as non-signal until the config is migrated to flat config (`eslint.config.js`).
3. `npm run dev` and load `/` — confirm each changed section renders in **both** light and
   dark theme, and at mobile / tablet / desktop widths.
4. For video work, confirm playback starts unprompted, loops, has no visible control bar,
   and stays silent.

Record the outcome honestly in the spec's `## Acceptance` section. If a check was skipped,
say so rather than marking it passed.
