# Qamar Labs Inc App

Marketing website for Qamar Labs, a worker-owned IT cooperative that operates as a
**consultancy specializing in Spec-Driven Development**. Single Next.js app deployed as a
static-leaning marketing site: a homepage composed of stacked sections, an about page, a
contact page, and one privacy-policy page per shipped product.

The site sells the method this repo runs on. The five stages in [SDD and Workflow](#sdd-and-workflow)
are both our internal process and our client-facing offer — **if the site and this file ever
disagree about the method, the site is lying.** Keep them in sync.

Developers are reached at `dev@qamarlabsllc.com`.

## Tech Stack

- **Framework**: Next.js 15 (App Router) with React 19
- **Language**: TypeScript 5 — note `strict: false` in [tsconfig.json](tsconfig.json)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss`; global sheet at [src/styles/index.css](src/styles/index.css).
  **Breakpoints are redefined and are _not_ the framework defaults** — `xs: 450px`, `sm: 575px`,
  `md: 768px`, `lg: 992px`, `xl: 1200px`, `2xl: 1400px`. A responsive class written against
  Tailwind's stock scale (640/1024/1280) will fire at the wrong width.
- **Theming**: `next-themes` (class-based dark mode), wired through [src/app/providers.tsx](src/app/providers.tsx)
- **Forms**: Formik + Yup
- **Email**: `@genezio/email-service`
- **Motion**: `animejs` **v4** — authorized by [prds/initial-project-v1.0.md](prds/initial-project-v1.0.md)
  but **not yet installed**. Do not import it until it is in `package.json`. See
  [Motion and animation](#code-patterns).
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

**Secrets never carry the `NEXT_PUBLIC_` prefix.** Next.js **inlines every `NEXT_PUBLIC_*`
variable into the client bundle**, where any visitor can read it. A token behind that prefix is
public, not configured. Anything that needs a credential — mail, in particular — runs in a
Route Handler under `src/app/api/`, reads a plain (non-prefixed) env var, and is called from the
client by `fetch`.

```tsx
// ✅ src/app/api/contact/route.ts — token stays on the server
export async function POST(req: Request) {
  const token = process.env.EMAIL_SERVICE_TOKEN; // no NEXT_PUBLIC_
  // …validate the body again here; `strict: false` will not catch a missing field
}

// ❌ never: a credential read in a "use client" component
const token = process.env.NEXT_PUBLIC_EMAIL_SERVICE_TOKEN;
```

Client-side Formik/Yup validation is a UX affordance, not a control. **Re-validate every
payload server-side** — anything reaching a route handler is untrusted.

**Contact addresses are defined once**, in `src/constants/contact.ts`, and imported wherever
they render. Do not re-declare an address in a component. The four privacy-policy components
each historically declared their own `const CONTACT_EMAIL = …`, which is how
[MusuahPrivacyPolicy.tsx:8](src/components/PrivacyPolicy/MusuahPrivacyPolicy.tsx#L8) drifted onto
a **different domain** (`privacy@qamarlabs.com`, no `llc`) from its siblings. That discrepancy
is known, is published legal copy, and is a business decision — **flag it, do not silently
rewrite it.**

Render addresses as selectable `mailto:` text — never an image, never obfuscated, never gated
behind a form. Our primary audience is engineers who will not fill in a form. And when a form
fails, **its error state must still surface the address**, so a broken send never costs a lead.

**Motion is enhancement, never a precondition for reading the page.** Animation is `animejs`
v4 only, confined to `"use client"` leaf components that wrap server-rendered children. Sections
themselves stay server components — that is what keeps content in the SSR HTML.

Two rules are non-negotiable, because breaking either hides content from real users:

1. **Guard the *initial hidden state* on `prefers-reduced-motion`, not just the animation.** If
   an element starts at `opacity: 0` and you merely skip the `animate()` call, that content is
   **invisible forever** for the users who asked for less motion.
2. **Animate `transform` and `opacity` only.** Layout properties (height, top, margin) cause CLS.

Trigger on `IntersectionObserver`, never a `scroll` listener, and fire once — re-entering the
viewport must not replay a completed reveal.

```tsx
"use client";
import { animate, stagger } from "animejs"; // v4: named ESM exports…
// …NOT v3's default `anime({ targets: … })`. Every v3 snippet you have seen is wrong here.

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reduced) return; // …and the element's base CSS must already be visible when we bail
```

Content must remain readable with JavaScript disabled. Verify both conditions before calling
motion work done — see [Validation](#validation).

The reusable primitive is [Reveal](src/components/Common/Reveal.tsx): it renders children
**visible** and hides them only inside a client effect, once it knows motion is permitted and
it can bring them back. Compose it; do not reimplement it, and do not "simplify" it by moving
the hidden state into markup — that reintroduces the exact bug it exists to prevent.

**Decoration may go inert; it must never disappear.** The distinction matters:
[Moon](src/components/Common/Moon.tsx) is background art, so under reduced motion it renders
fully and simply stops rotating. `Reveal` guards *content*, so it must guarantee the content
*appears*. Never hide a decorative element as a way of "respecting" reduced motion.

**Text wins the pixels it occupies.** Where copy sits on top of background art — as the hero
copy sits on the centred moon — the art must give ground: a **scrim** (a radial wash of the page
background, strongest behind the text, fading to nothing at the art's edges) buys contrast where
the words are while leaving the art crisp where it is actually seen. Body copy stays ≥ 4.5:1 in
both themes; if it cannot, dim, scrim, shrink, or move the art. Never ship an unreadable hero.

**Look at the page.** A legibility collision is invisible in a diff and obvious in a screenshot.
So is an animation that is technically running but too slow to perceive — **an animation nobody
can see is a bug, not a subtlety.** Prove motion by comparing two frames captured seconds apart,
never by re-reading the duration constant.

## SDD and Workflow

This repo is spec-driven. Substantial work starts as a **PRD** in [prds/](prds/); every
non-trivial change then becomes a markdown spec in [specs/](specs/) and moves through the
stages below. Do not skip to Implementation.

### Product Requirements (PRD)

For a **new product surface or a change of direction** — not for a routine section edit — write
`prds/<name>-v<major.minor>.md` first. It answers *why* and *for whom*, in this order:
`Problem Statement`, `Users and Personas`, `Functional Requirements`, `User Stories`
(Given/When/Then), `Constraints`, `Success Metrics`, `Out of Scope`, `Open Questions →
Decisions`, `Testing Strategy`, `Timeline`.

Two sections carry the weight and are usually done badly:

- **Open Questions → Decisions.** An open question left open is a decision deferred onto the
  implementer at the worst moment. Every question gets a decision and a rationale. If something
  is genuinely blocking and unknowable from the code, say so explicitly and schedule it as the
  first task — do not let it silently gate the work.
- **Success Metrics** must be *measurable against a baseline you actually captured*. "Improves
  conversion" is not a metric on a site with no analytics installed. `grep` returning zero
  matches for a leaked token is.

A PRD produces decisions; a spec turns them into observable outcomes. Reference the PRD from the
spec's `# Overview` and `## Reference Code`. See
[prds/initial-project-v1.0.md](prds/initial-project-v1.0.md) for the worked example.

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
5. **For anything touching a credential**: after `npm run build`, `grep -r
   "EMAIL_SERVICE_TOKEN" .next/static/` must return **nothing**. A build that ships the token
   fails outright, however good the page looks.
6. **For anything touching a form**: a `200` response is not proof of delivery. **Check the
   inbox.** Then `curl -X POST` the route directly with an invalid payload and confirm the
   server rejects it — bypassing the browser is the point of the check.
7. **For motion work**: emulate `prefers-reduced-motion: reduce` (DevTools → Rendering) and
   hard-reload — **every** animated element must be fully visible, with nothing stuck at
   `opacity: 0`. Then disable JavaScript and reload — all content must still be readable.
   These two catch the failure mode that silently hides content from the users least able to
   tolerate it.

Record the outcome honestly in the spec's `## Acceptance` section. If a check was skipped,
say so rather than marking it passed — a skipped check recorded as passed is worse than no
check at all, because it spends trust that was never earned.
