# Overview

Reposition the Qamar Labs site from "cooperative that builds software" to **consultancy that
sells Spec-Driven Development**, give developers a direct address (`dev@qamarlabsllc.com`), and
add motion with anime.js — without breaking the site for anyone who cannot or will not run it.

Derived from [prds/initial-project-v1.0.md](../prds/initial-project-v1.0.md). Read that first
for personas, success metrics, and the decisions behind the choices below.

Three things are true of the site today, and each maps to a section of this spec:

- **The method is not sold.** "A Spec-Driven Approach" is one of six value cards in
  [featuresData.tsx](../src/components/Features/featuresData.tsx). A visitor cannot learn what
  an engagement looks like or what they receive at each stage. The five stages already exist —
  in [CLAUDE.md](../CLAUDE.md#sdd-and-workflow), as the process this repo actually runs on.
  This spec puts them on the page. **The site must describe the method we practice, not a
  marketing fiction of it.**

- **The contact path is broken and leaks a credential.**
  [Contact/index.tsx](../src/components/Contact/index.tsx) sends to
  `process.env.NEXT_PUBLIC_MY_EMAIL` — unset, with no `.env` in the repo — using
  `NEXT_PUBLIC_EMAIL_SERVICE_TOKEN`. Next.js inlines `NEXT_PUBLIC_*` into the client bundle, so
  **the mail token is currently readable by any visitor.** There is also a live `debugger;` at
  [Contact/index.tsx:35](../src/components/Contact/index.tsx#L35), and
  `dev@qamarlabsllc.com` appears nowhere in `src/`. This is the highest-value work in the spec
  and is a bug fix independent of any marketing goal.

- **The page is inert.** For a firm whose pitch is rigor and craft, the site is a static stack.
  anime.js adds motion that *carries the argument* — the method is sequential, so the process
  animates in sequence. Motion is enhancement, never a precondition for reading the page.

# Implementation Steps

## 1. De-risk before writing UI code

- **Confirm `@genezio/email-service` runs server-side** inside a Next.js Route Handler by
  sending one real mail from `src/app/api/contact/route.ts`. This is the only blocking unknown
  in the spec (PRD OQ-1); everything in step 3 depends on the answer. If the package proves
  browser-only, fall back to a plain `fetch` against the provider's HTTP API **from the route
  handler** — the token stays server-side either way. Do not proceed to step 3 until this is
  answered.
- **Capture a baseline** of Lighthouse (homepage, mobile) and `next build` route JS size. The
  performance targets in Acceptance are meaningless without a "before."
- **Confirm `dev@qamarlabsllc.com` exists and is monitored.** Business gate, not an engineering
  task. Publishing an unmonitored address converts a silent failure into a broken promise.

## 2. Contact: kill the credential leak, publish the address

- **`src/constants/contact.ts`** — one exported `DEV_EMAIL = "dev@qamarlabsllc.com"`. The
  four privacy-policy components each declare their own local
  `const CONTACT_EMAIL = "support@qamarlabsllc.com"`
  ([AlSaqr:5](../src/components/PrivacyPolicy/AlSaqrPrivacyPolicy.tsx#L5),
  [Dawaar:4](../src/components/PrivacyPolicy/DawaarPrivacyPolicy.tsx#L4),
  [Musuah:6](../src/components/PrivacyPolicy/MusuahPrivacyPolicy.tsx#L6),
  [Comeback:5](../src/components/PrivacyPolicy/TheComebackAppPrivacyPolicy.tsx#L5)); hoist
  `SUPPORT_EMAIL` into the same module and import it in all four. **Their rendered addresses
  must not change.** Note that
  [MusuahPrivacyPolicy.tsx:8](../src/components/PrivacyPolicy/MusuahPrivacyPolicy.tsx#L8) uses
  `privacy@qamarlabs.com` — a *different domain* from its siblings. **Leave it. Flag it.** It
  is published legal copy; changing it is a business decision (PRD OQ-2).
- **`src/app/api/contact/route.ts`** — a `POST` handler that reads a **non-`NEXT_PUBLIC_`**
  `EMAIL_SERVICE_TOKEN`, re-validates the payload server-side (name ≤ 50, valid email, message
  ≥ 10 — mirroring the Yup schema at
  [Contact/index.tsx:19-29](../src/components/Contact/index.tsx#L19-L29)), and sends to
  `DEV_EMAIL`. Return `{ success: boolean }` with a non-2xx on failure. Note `strict: false` in
  [tsconfig.json](../tsconfig.json) — the compiler will not catch a missing field for you.
  Validate explicitly.
- **Rewrite `Contact`'s `onSubmit`** to `fetch("/api/contact", { method: "POST" })`. Keep
  Formik + Yup, keep the four `submitStatus` states, keep the 48-hour promise. **Delete the
  `debugger;` on line 35.**
- **Add the `mailto:` fallback to the error state.** When the form fails, the user must still
  leave with an address. This is the failure mode the current site handles worst.
- **Render `dev@qamarlabsllc.com` as a live `mailto:` in three places**: the `Contact` section,
  the `Footer`, and `/contact`. Selectable, copyable text — not an image, not obfuscated, not
  gated behind a submission. The primary persona will not fill in a form.
- **Honeypot field** (a visually hidden input that must stay empty). Cut if time is short.

## 3. Positioning: sell the method

- **`src/types/process.ts`** — a `ProcessStage` interface (`id`, `stage`, `title`,
  `paragraph`, `deliverable`), following the one-interface-per-domain-object convention in
  [src/types/](../src/types/).
- **`src/components/Process/processData.tsx`** — a typed default-export array of the **five
  stages taken from [CLAUDE.md](../CLAUDE.md#sdd-and-workflow)**: Specification → Technical
  Planning → Task Breakdown → Implementation → Validation. Each gets one plain, client-facing
  sentence and a named deliverable. **The stage names must match CLAUDE.md.** If the site and
  the constitution disagree, the site is lying.
- **`src/components/Process/index.tsx`** — new **server** component. Standard shape:
  `<section id="process" className="py-16 md:py-20 lg:py-28">` → `.container` → `SectionTitle`
  (`center`) → an ordered, visibly numbered list of the five stages. Numbering is not
  decoration; the sequence *is* the pitch.
- **Specification Anatomy** — inside the Process section, show the real headings of a Qamar
  Labs spec (`Overview`, `Implementation Steps`, `Rules`, `Acceptance`, `Out of Scope`,
  `Reference Code`), calling out **Acceptance** and **Out of Scope** as where scope gets
  controlled. Source of truth is the house structure in CLAUDE.md.
- **Hero** ([Hero/index.tsx](../src/components/Hero/index.tsx)) — headline and subheadline name
  the consultancy and the practice. Keep the decorative SVG blobs and the GitHub button.
- **`featuresData`** — re-point the six entries from generic values to consultancy
  capabilities. **Copy change only.** Reuse the six existing `/images/features/*.png` icons and
  keep the `width={40} height={40}` form — do not reintroduce `<Image fill>`.
- **`page.tsx`** — mount `<Process />` between `<Features />` and `<ResponsiveShowcase />`.
  Add one `menuData` entry for it. **Composition changes land last.**

## 4. Motion: anime.js

- **`npm i animejs`** (v4). This is the **only** new runtime dependency, authorized by the PRD
  as a deliberate exception to the standing no-new-deps rule. **v4 has named ESM exports**
  (`import { animate, stagger } from "animejs"`), *not* v3's default `anime({...})` export —
  every v3 snippet in the wild and in model memory is wrong. Verify the installed API against
  `node_modules/animejs/` before writing animation code.
- **`src/components/Common/Reveal.tsx`** — the single `"use client"` animation primitive.
  Everything else composes it. It must:
  - trigger on `IntersectionObserver`, never a `scroll` listener;
  - animate `transform` and `opacity` **only** (no height/top/margin — CLS);
  - fire **once**; re-entering the viewport must not re-trigger;
  - accept a `delay`/stagger index so callers can sequence children;
  - **guard the initial hidden state on `prefers-reduced-motion`.** See Rules — this is the one
    that will bite.
- **Hero** — staggered reveal of headline, subheadline, CTA on mount.
- **Process** — stages reveal **in sequence** on scroll-into-view. This is the animation that
  earns its keep: the motion states the argument that the method is ordered.
- **Features** — cards reveal with a small stagger.
- Sections stay **server components**; `Reveal` wraps their server-rendered children. Do not
  convert `Process`, `Hero`, or `Features` to `"use client"` wholesale.

# Rules

- **The mail credential must never reach the browser.** No `NEXT_PUBLIC_` prefix on any token.
  After `npm run build`, `grep -r "EMAIL_SERVICE_TOKEN" .next/static/` must return **nothing**.
  A build that leaks the token fails the release outright, regardless of how good the site looks.
- **Reduced motion must not hide content.** If an element's initial state is `opacity: 0` and
  the animation is merely *skipped* under `prefers-reduced-motion: reduce`, that content is
  **invisible forever**. The guard belongs on the *initial hidden state*, not only on the
  `animate()` call. The site's own copy promises accessibility is "a requirement of the
  specification, never a later enhancement"
  ([featuresData.tsx:67-71](../src/components/Features/featuresData.tsx#L67-L71)) — shipping
  this bug would make the site contradict itself.
- **Content must be readable with JavaScript disabled.** Motion is progressive enhancement. No
  section's *content* may depend on anime.js having executed. This follows for free if sections
  stay server components.
- **Animate `transform` and `opacity` only.** Layout properties cause CLS.
- **Sections stay server components.** `"use client"` is for animation leaves, state, effects,
  and refs — nothing else (CLAUDE.md).
- **`page.tsx` stays a flat list of sections**, and the commented-out sections (`Video`,
  `Brands`, `Pricing`, `Testimonials`, `Blog`) are **not deleted and not uncommented**. They are
  intentional inventory.
- **Reuse `SectionTitle` for every headed section.** Do not hand-roll an `<h2>`.
- **Every colour utility needs its `dark:` counterpart** — `text-black dark:text-white`,
  `bg-white dark:bg-gray-dark`, `text-body-color dark:text-body-color-dark`.
- **The five stage names must match [CLAUDE.md](../CLAUDE.md#sdd-and-workflow).** The site
  describes the method we actually practice.
- **`animejs` is the only new dependency.** No other adds, no upgrades, no `next.config.js`
  changes.
- **Do not change the rendered addresses in the privacy-policy pages.** The `qamarlabs.com` /
  `qamarlabsllc.com` split is real, is flagged, and is a business decision.
- **`npm run lint` is not a signal.** It fails before linting with `Converting circular
  structure to JSON … Referenced from: .eslintrc.json` (ESLint 9 vs legacy config). Pre-existing.
  Record it as blocked — **never as passed.**
- **`strict: false`.** The compiler will not catch null/undefined mistakes in the route handler.
- **Reserve `<Image fill>` for genuinely fluid containers**, and give those a real `sizes`. For
  known-size images pass `width`/`height`. This rule exists because `fill` without `sizes`
  already caused an intermittently-missing feature icon.

# Acceptance

Status: **implemented and verified**, except where explicitly marked. Verified against a
production build (`npm run build` + `npm run start`) and headless Edge on 2026-07-12.
Baseline captured before any change: `/` = 1.8 kB, **138 kB** First Load JS, 11/11 static pages.

- Passing Tests
  - ✅ `npm run build` succeeds — no type errors, no prerender errors. 12/12 static pages
    (11 as before, plus the new `ƒ /api/contact` server route).
  - ✅ `grep -r "EMAIL_SERVICE_TOKEN\|emailServiceToken\|lambda-url" .next/static/` returns
    **zero matches**. The token *and the entire mail SDK* are now off the client. Before this
    change both `app/page-*.js` and `app/contact/page-*.js` carried the `emailServiceToken`
    plumbing and the provider's Lambda URL. The homepage bundle **shrank** as a result
    (138 kB → 137 kB) before motion was added.
  - ✅ `grep -rn "debugger" src/` returns **zero matches**.
  - ✅ `dev@qamarlabsllc.com` is defined **once** in `src/constants/contact.ts` and renders in
    the Hero CTA, the Contact section, the Footer, and `/contact` — **6 occurrences** in the
    served homepage HTML, as selectable `mailto:` text.
  - ✅ `curl -X POST /api/contact` is **rejected server-side**, browser bypassed entirely:
    empty name → `400 Name is required`; 60-char name → `400 Name must be 50 characters or
    less`; `not-an-email` → `400 Invalid email address`; 5-char message → `400 Message must be
    at least 10 characters`; non-JSON body → `400 Malformed request`.
  - ✅ Honeypot: a payload with `website` filled returns `200 {"success":true}` and sends
    nothing. Bots are not told they were caught.
  - ✅ The homepage renders in this order: `ScrollUp`, `Hero`, `Features`, `Process`,
    `ResponsiveShowcase`, `AboutSectionOne`, `AboutSectionTwo`, `Contact`.
  - ✅ The Process section renders all five stages — Specification, Technical Planning, Task
    Breakdown, Implementation, Validation — **matching CLAUDE.md exactly**, numbered `01`–`05`
    and in order, each with its epithet and deliverable.
  - ✅ **Reduced motion / no-JS: no content is hidden in markup.** The served HTML contains
    **zero** `opacity-0` from `Reveal`. (The only two `opacity-0` occurrences are the
    pre-existing collapsed mobile nav in `Header/index.tsx`, correctly gated `lg:opacity-100`.)
    `Reveal` renders children visible and hides them *only* in a client effect, after
    confirming motion is allowed — so reduced-motion and no-JS visitors keep every word. This
    was the highest-risk failure mode in the spec and it is structurally closed, not merely
    untriggered.
  - ✅ The moon renders in the **server HTML** (its surface strip is present without JS) and
    carries `aria-hidden="true"`.
  - ✅ Legible in **both** themes at 1440px, confirmed by screenshot: dark (silver moon,
    deep-space field) and light (cream moon, dawn sky). Hero copy is unobstructed in both.
  - ✅ Zero occurrences of "lorem" in the served homepage HTML.
  - ✅ `ResponsiveShowcase` unregressed; all four `/privacy-policy/*` routes still build, with
    their addresses unchanged.
  - ✅ anime.js + `Reveal` + `Moon` + `Process` add **+15 kB** First Load JS to `/`
    (137 kB → 152 kB), inside the ≤ 20 kB budget (SM-9).
  - ⚠️ `npm run lint` — **blocked, pre-existing.** Fails before linting with `Converting
    circular structure to JSON … Referenced from: .eslintrc.json`. Reproduced against an
    unmodified tree. Not a signal.

- Not verified (recorded as **skipped**, not passed)
  - ⬜ **Mail actually arriving at `dev@qamarlabsllc.com`.** A valid payload reaches the send
    step and returns `503 Contact form is unavailable`, because `EMAIL_SERVICE_TOKEN` is not
    set in this environment (there is no `.env`). The code path is proven; **delivery is not.**
    This is a **launch blocker**: set the token server-side (no `NEXT_PUBLIC_` prefix) and send
    one real message before shipping.
  - ⬜ **Reduced motion emulated in a real browser.** Guaranteed structurally (nothing is
    hidden in markup, and `Reveal`/`Moon` both bail before hiding anything), but not observed
    via DevTools → Emulate `prefers-reduced-motion: reduce`.
  - ⬜ **Scroll re-trigger behaviour** — `observer.disconnect()` on first intersection means it
    cannot replay, but this was not exercised by scrolling away and back.
  - ⬜ **Lighthouse** Performance/Accessibility/CLS. Not run.
  - ⬜ **390px mobile.** See the failing check below — this does **not** pass.

- Failing Tests
  - ❌ **Horizontal overflow at 390px — pre-existing, not introduced here.** Copy is clipped at
    the right edge on the homepage at 390px wide. The **same clipping reproduces on `/about`,
    which this work never touched**, so it predates these changes and is site-wide. Root cause
    not identified: `.container` (`@utility container`) sets no max-width and `SectionTitle`
    correctly uses `maxWidth`, so neither is responsible. **Tracked as a separate bug; needs
    its own spec.** Do not mark the mobile check passed until it is fixed.
  - Note for future work: this repo **redefines Tailwind's breakpoints** in
    `src/styles/index.css` (`xs: 450px`, `sm: 575px`, `lg: 992px`, `xl: 1200px`) — they are
    **not** the framework defaults (640/1024/1280). Any responsive class written against the
    default scale will fire at the wrong width.

- Failing Tests
  - Any `NEXT_PUBLIC_`-prefixed mail token survives, or the token appears in a client chunk.
  - The contact form still targets `process.env.NEXT_PUBLIC_MY_EMAIL`.
  - `debugger` survives anywhere in `src/`.
  - `dev@qamarlabsllc.com` is hardcoded in more than one module, or is rendered as an image or
    obfuscated rather than as selectable `mailto:` text.
  - Any element remains `opacity: 0` under `prefers-reduced-motion: reduce` — content hidden
    from the users most likely to need it.
  - Any content is missing with JavaScript disabled.
  - `Process`, `Hero`, or `Features` becomes a `"use client"` component.
  - An animation drives `height`, `top`, `margin`, or any layout property.
  - A scroll animation is driven by a `scroll` event listener rather than
    `IntersectionObserver`, or re-triggers on re-entry.
  - The Process stage names drift from CLAUDE.md.
  - `page.tsx` loses any commented-out section import, or a staged section gets uncommented.
  - A dependency other than `animejs` is added or upgraded.
  - An anime.js **v3** default-export call (`anime({ targets: … })`) appears anywhere.
  - A rendered address in any `/privacy-policy/*` page changes.
  - `npm run lint` is reported as passing.

# Out of Scope

- **Analytics, tracking, A/B testing, cookie consent.** None installed; adding it drags in
  consent obligations.
- **A CMS.** Copy stays colocated (inline JSX or `*Data.tsx`).
- **`Blog`, `Testimonials`, `Pricing`, `Brands`, `Video`.** They stay commented-out inventory in
  `page.tsx`. Do not delete, do not uncomment.
- **The `Video` / `video-modal` components.** They wrap a YouTube `<iframe>`, not a `<video>`,
  and are unmounted.
- **An "Our Work" section** built from `public/images/products/` (the `learn-chain-forge` and
  `claude-constitution` MacBook recordings, which have `.png` posters). Adjacent and tempting;
  it is a separate spec.
- **The ESLint 9 flat-config migration.** `npm run lint` stays broken. Pre-existing repo defect;
  fixing it here would balloon the diff.
- **Enabling `strict: true`.** Cascades across the whole codebase.
- **Swapping the email provider** away from `@genezio/email-service`.
- **Rewriting privacy-policy content.** Step 2 touches only the email constants in those files.
- **Pricing or published rates.** The `Pricing` component stays commented out.
- **A downloadable spec template or interactive spec builder.** The Specification Anatomy shows
  the *shape* of a spec; it does not ship a tool. This is the most likely scope-creep vector.
- **Any 3D / WebGL / scroll-jacking library.** anime.js is the only motion dependency.
- **Auth, client portal, scheduling, live chat.**
- **i18n / RTL.**
- **Redesign of the Hero SVG artwork.**
- **Introducing a test runner.** None is installed. Acceptance is build + manual, per CLAUDE.md.

# Reference Code

1) [prds/initial-project-v1.0.md](../prds/initial-project-v1.0.md) — personas, success metrics,
   and the ten decisions (OQ-1 … OQ-10) this spec implements.
2) [CLAUDE.md](../CLAUDE.md#sdd-and-workflow) — **the source of truth for the five process
   stages.** Also carries the Code Patterns and the Validation checklist Acceptance refers to.
3) [src/app/page.tsx](../src/app/page.tsx) — the flat section list `<Process />` mounts into;
   note the commented-out imports that must survive.
4) [src/components/Common/SectionTitle.tsx](../src/components/Common/SectionTitle.tsx) —
   required heading component; props are `title`, `paragraph`, `center`, `width` (default
   `570px`), `mb` (default `100px`).
5) [src/components/ResponsiveShowcase/index.tsx](../src/components/ResponsiveShowcase/index.tsx)
   — the closest model for a new section: server component, typed local data array,
   `SectionTitle`, responsive grid, `dark:` pairs throughout.
6) [src/components/Features/featuresData.tsx](../src/components/Features/featuresData.tsx) —
   typed default-export data module; icons are inline `<Image width={40} height={40}>`. Model
   `processData.tsx` on this.
7) [src/types/feature.ts](../src/types/feature.ts) — the interface convention `process.ts` should
   follow.
8) [src/components/Contact/index.tsx](../src/components/Contact/index.tsx) — the form being
   rewritten. Formik config at 13–59, Yup schema at 19–29, the `debugger` at 35, the leaked
   token at 38, the unset destination at 40, the four `submitStatus` states at 8.
9) [src/components/PrivacyPolicy/AlSaqrPrivacyPolicy.tsx:5](../src/components/PrivacyPolicy/AlSaqrPrivacyPolicy.tsx#L5)
   — the `const CONTACT_EMAIL = …` + `` href={`mailto:${…}`} `` idiom, duplicated across four
   files, that step 2 hoists into one module.
10) [src/components/About/AboutSectionOne.tsx:52-63](../src/components/About/AboutSectionOne.tsx#L52-L63)
    — the dual light/dark asset pattern (`dark:hidden` + `hidden dark:block`) and the `checkIcon`
    list rendering.
11) [src/components/Header/menuData.tsx](../src/components/Header/menuData.tsx) — where the
    Process nav entry goes; keep the existing entries intact.
