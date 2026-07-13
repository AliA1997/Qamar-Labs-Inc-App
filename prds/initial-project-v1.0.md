# PRD — Qamar Labs: Spec-Driven Development Consultancy (Initial Project, v1.0)

- **Status**: Draft for review
- **Author**: Engineering
- **Date**: 2026-07-12
- **Codebase**: `Qamar-Labs-Inc-App` (Next.js 15 App Router, React 19, Tailwind v4)
- **Downstream spec**: [specs/spec-driven-consulting-relaunch.md](../specs/spec-driven-consulting-relaunch.md)

---

## Problem Statement

Qamar Labs already ships software with a spec-driven method — the discipline is real and
documented in [CLAUDE.md](../CLAUDE.md), and every non-trivial change in this repo starts as
a markdown spec. **The website does not sell it.**

The site today reads as a product company that happens to be a cooperative. It states a
mission ("Cutting Edge Solutions to New Expectations"), lists six values in
[featuresData.tsx](../src/components/Features/featuresData.tsx), shows a responsive demo, and
ends with a contact form. A visitor who lands on it cannot answer the question a prospective
client actually arrives with: *what do I buy from you, what happens in week one, and who do I
email?* Three concrete gaps:

1. **No engagement offer.** "A Spec-Driven Approach" is stated as a *value* (one of six
   feature cards) rather than sold as a *service*. Nothing on the site explains the method as
   a sequence a client would move through, and nothing invites them to start one. The site
   describes how Qamar Labs thinks; it never says what it sells.

2. **The contact path is broken and unaddressed.** The homepage `Contact` form
   ([src/components/Contact/index.tsx](../src/components/Contact/index.tsx)) sends to
   `process.env.NEXT_PUBLIC_MY_EMAIL` — an unset, unversioned variable with no default. There
   is no `.env` file in the repo. There is **no `dev@qamarlabsllc.com` anywhere in `src/`**,
   and no `mailto:` outside the privacy-policy pages. A developer who wants to reach a
   developer has no address to use, and the form they *do* find may silently post to
   `undefined`. Separately, that call passes `NEXT_PUBLIC_EMAIL_SERVICE_TOKEN` from the
   browser — a `NEXT_PUBLIC_*` variable is inlined into the client bundle, so **the mail
   credential is readable by any visitor** who opens devtools. This is a live security defect,
   not a hypothetical.

3. **The page is inert.** The site is a stack of static sections. For a firm whose pitch is
   *rigor and craft*, a page with no motion, no sense of sequence, and no evidence of taste
   undersells the product. Craft has to be demonstrated, not asserted.

**The pain point, stated once:** a technical buyer who is *already convinced* spec-driven
development is what they want cannot tell from this website that Qamar Labs sells it, cannot
see what the process looks like, and cannot find a developer's email address.

---

## Users and Personas

| Persona | Who they are | What they want from the site | What stops them today |
| --- | --- | --- | --- |
| **Dana — the technical founder** | Non-CTO founder, 5–30 person startup. Has been burned by a contract build that shipped the wrong thing. Reads the site on a laptop, 3–5 minutes, mid-evaluation of 3 firms. | Proof that requirements get pinned down *before* code, and a plausible answer to "what does week one look like?" | The method is one bullet in a six-card grid. There is no process, no engagement model, no next step beyond a generic form. |
| **Malik — the engineering lead** | Staff/principal engineer at a mid-size company, sent to vet the vendor. Skims copy, opens the GitHub link, judges the site's own craft as a work sample. | Technical substance, real artifacts (an actual spec), and a **direct human email** — will not fill in a marketing form. | The GitHub button is the only technical signal. No email address exists on the site. The form is the only channel and it is a black box. |
| **Priya — the product manager** | PM at a scale-up scoping a rebuild. Cares about scope discipline, acceptance criteria, and change control. | To see what a Qamar Labs specification actually contains — Acceptance, Out of Scope, Rules. | Nothing on the site shows the artifact. The word "spec" appears but the work product never does. |
| **Ibrahim — the returning client** | Existing relationship, needs to reach the team about live work. | Fastest route to a developer. | Same missing address. Falls back to the form, which promises 48h and may not deliver at all. |

**Primary persona: Malik.** He is the hardest to satisfy, he is the one who kills deals, and
he is the one who will not use a contact form. Design for him; Dana and Priya are satisfied by
the same work.

**Accessibility as a persona constraint, not a checkbox.** [featuresData.tsx:67-71](../src/components/Features/featuresData.tsx#L67-L71)
already promises "Accessible by Default … for people using assistive technology … never as a
later enhancement." Any motion this PRD introduces is therefore held to that promise: a
visitor with `prefers-reduced-motion: reduce` must get the full content, statically. Shipping
animation that ignores the setting would make the site contradict its own marketing copy.

---

## Functional Requirements

Requirements are grouped by theme and prioritized **P0** (v1.0 ships without it only if
descoped explicitly) / **P1** (v1.0 target) / **P2** (nice to have).

### FR-1 — Position the firm as a spec-driven consultancy

- **FR-1.1 (P0)** — The homepage hero states that Qamar Labs is a **consultancy** and that
  **Spec-Driven Development** is the practice it sells. Current hero copy asserts outcomes
  ("Cutting Edge Solutions to New Expectations") without naming the service.
- **FR-1.2 (P0)** — A new **Process** section presents the SDD method as an ordered,
  numbered sequence. The stages are **not invented for marketing** — they are the five stages
  this repo already runs on, from [CLAUDE.md](../CLAUDE.md#sdd-and-workflow): Specification →
  Technical Planning → Task Breakdown → Implementation → Validation. Each stage gets a name,
  one sentence of client-facing plain English, and a stated deliverable.
- **FR-1.3 (P1)** — A **Specification Anatomy** element shows the real structure of a Qamar
  Labs spec (`Overview`, `Implementation Steps`, `Rules`, `Acceptance`, `Out of Scope`,
  `Reference Code`) so Priya and Malik can see the artifact, not just hear about it. Source of
  truth is the house structure in CLAUDE.md; the shipped copy must not drift from it.
- **FR-1.4 (P1)** — Existing `featuresData` entries are re-pointed from generic values to
  consultancy capabilities. Keep the six-card grid and the six existing
  `/images/features/*.png` icons — this is a copy change, not a redesign.
- **FR-1.5 (P2)** — An engagement-model block (e.g. discovery sprint / build / retainer). Cut
  first if the client-facing commercial terms are not settled — see OQ-5.

### FR-2 — Direct contact with developers at `dev@qamarlabsllc.com`

- **FR-2.1 (P0)** — `dev@qamarlabsllc.com` is rendered as a live `mailto:` link in at least:
  the Contact section, the Footer, and the `/contact` page. It must be selectable, copyable
  text — not an image, not obfuscated, not gated behind a form submission. Malik's requirement
  is a *visible address*, not a *working form*.
- **FR-2.2 (P0)** — The address is defined **once** as a shared exported constant and imported
  everywhere it renders. The codebase already establishes this idiom — four privacy-policy
  components each declare `const CONTACT_EMAIL = "support@qamarlabsllc.com"`
  ([AlSaqrPrivacyPolicy.tsx:5](../src/components/PrivacyPolicy/AlSaqrPrivacyPolicy.tsx#L5),
  [DawaarPrivacyPolicy.tsx:4](../src/components/PrivacyPolicy/DawaarPrivacyPolicy.tsx#L4),
  [MusuahPrivacyPolicy.tsx:6](../src/components/PrivacyPolicy/MusuahPrivacyPolicy.tsx#L6),
  [TheComebackAppPrivacyPolicy.tsx:5](../src/components/PrivacyPolicy/TheComebackAppPrivacyPolicy.tsx#L5)) —
  but each declares its own copy. v1.0 hoists this to one module so a fifth address cannot
  drift. Note the existing inconsistency this exposes: `MusuahPrivacyPolicy.tsx:8` uses
  `privacy@qamarlabs.com` (**`.com`**, no `llc`) while its siblings use `qamarlabsllc.com`.
  One of those domains is wrong. See OQ-2.
- **FR-2.3 (P0)** — The contact form delivers to `dev@qamarlabsllc.com`. It must not depend on
  an unset `NEXT_PUBLIC_MY_EMAIL`; the destination is a constant, not runtime configuration.
- **FR-2.4 (P0, security)** — The mail credential must **stop being exposed to the browser**.
  `NEXT_PUBLIC_EMAIL_SERVICE_TOKEN` is inlined into the client bundle by Next.js, meaning the
  token is currently public. Submission moves to a server-side Route Handler
  (`src/app/api/contact/route.ts`) that reads a **non-`NEXT_PUBLIC_`** `EMAIL_SERVICE_TOKEN`
  and calls `@genezio/email-service` server-side. The client posts JSON to that route and
  never sees a credential. *This is the single highest-value item in the PRD and is a bug fix
  regardless of the marketing work.*
- **FR-2.5 (P0)** — The stray `debugger;` statement at
  [Contact/index.tsx:35](../src/components/Contact/index.tsx#L35) is removed. It halts
  execution for any visitor with devtools open — including Malik, who will have them open.
- **FR-2.6 (P1)** — Server-side validation on the route handler mirrors the existing Yup
  schema (name ≤ 50, valid email, message ≥ 10). Client-side Formik/Yup validation
  ([Contact/index.tsx:19-29](../src/components/Contact/index.tsx#L19-L29)) is a UX affordance,
  not a control; anything that reaches the route is untrusted.
- **FR-2.7 (P1)** — Preserve the existing four submit states (`idle` / `submitting` /
  `success` / `error`) and the "respond within 48 hours" promise. The error state must now
  also surface `dev@qamarlabsllc.com` as a fallback — if the form breaks, the user still
  leaves with an address. This is the failure mode the current site handles worst.
- **FR-2.8 (P2)** — Basic abuse mitigation (honeypot field and/or per-IP rate limit) on the
  route handler. A public unauthenticated mail relay is a spam vector.

### FR-3 — Motion and craft (anime.js)

- **FR-3.1 (P1)** — Add `animejs` (v4) as a runtime dependency. This is a **deliberate
  exception** to the repo's standing "no new dependencies" rule, authorized by this PRD, and
  is the only new runtime dependency in v1.0.
- **FR-3.2 (P1)** — Hero headline animates on mount: a staggered reveal of the headline,
  subheadline, and CTA. anime.js v4's `stagger` is the mechanism.
- **FR-3.3 (P1)** — The Process section (FR-1.2) animates its stages **in sequence** on
  scroll-into-view. The motion carries the argument — the method is ordered, so the animation
  is ordered. Motion here is content, not decoration.
- **FR-3.4 (P1)** — Feature cards reveal on scroll with a small stagger.
- **FR-3.5 (P0, accessibility)** — **Every** animation respects
  `prefers-reduced-motion: reduce`. Under that setting, elements render in their final,
  visible state with no transition. This must be implemented as a *guard on the initial
  hidden state*, not merely a skipped animation: if content starts at `opacity: 0` and the
  animation is skipped, the content is **invisible forever**. That failure mode is the single
  biggest risk in FR-3 and is called out again in the spec's Rules.
- **FR-3.6 (P0)** — Animated content must be present in server-rendered HTML and readable
  with JavaScript disabled or still loading. Motion is progressive enhancement. No section's
  *content* may depend on anime.js having executed.
- **FR-3.7 (P1)** — Animation is confined to `"use client"` leaf components. Sections stay
  server components wherever possible; a client wrapper animates children passed to it. This
  preserves the "server components by default" principle in CLAUDE.md rather than converting
  the page to client rendering.
- **FR-3.8 (P2)** — Micro-interaction on the submit button (pending/success). Cut freely.

### FR-4 — Non-regression

- **FR-4.1 (P0)** — `ResponsiveShowcase` and its three `<video>` elements keep working
  unchanged: `autoPlay muted loop playsInline`, no `controls`.
- **FR-4.2 (P0)** — The commented-out sections in
  [page.tsx](../src/app/page.tsx) (`Video`, `Brands`, `Pricing`, `Testimonials`, `Blog`) are
  **not deleted**. They are intentional inventory per CLAUDE.md.
- **FR-4.3 (P0)** — All four `/privacy-policy/*` routes continue to build and render. The
  FR-2.2 constant hoist touches those files; it must not change their *rendered* addresses
  (except where OQ-2 explicitly decides to).
- **FR-4.4 (P0)** — Every new surface ships light **and** dark styling. No exceptions; the
  `dark:` variant is not optional in this codebase.

---

## User Stories (Given / When / Then)

**US-1 — Malik finds a developer's email without filling in a form** *(FR-2.1, FR-2.2)*
> **Given** I am an engineering lead evaluating Qamar Labs and I refuse to submit a marketing form,
> **When** I open the homepage and scroll to the contact section, or open the footer, or visit `/contact`,
> **Then** I see the literal text `dev@qamarlabsllc.com` rendered as a `mailto:` link,
> **And** I can select and copy it as text,
> **And** clicking it opens my mail client with the address pre-filled.

**US-2 — Dana understands what an engagement looks like** *(FR-1.2)*
> **Given** I am a founder who has been burned by a vendor that built the wrong thing,
> **When** I read the homepage,
> **Then** I find a Process section presenting five named, numbered stages from Specification through Validation,
> **And** each stage tells me in one plain sentence what happens and what I receive,
> **And** I can state what week one of working with Qamar Labs consists of without contacting anyone.

**US-3 — Priya inspects the actual work product** *(FR-1.3)*
> **Given** I am a PM who cares about scope control,
> **When** I reach the Specification Anatomy element,
> **Then** I see the real sections of a Qamar Labs spec — including **Acceptance** and **Out of Scope** —
> **And** I understand that scope boundaries are written down before implementation begins.

**US-4 — A visitor sends a message and it actually arrives** *(FR-2.3, FR-2.4, FR-2.6)*
> **Given** I have filled in name, email, and a message of at least 10 characters,
> **When** I submit the form,
> **Then** the browser posts JSON to `/api/contact` and **no mail credential is present anywhere in the client bundle**,
> **And** the server validates the payload again and sends the mail to `dev@qamarlabsllc.com`,
> **And** I see the success state and the 48-hour promise.

**US-5 — The form fails and the visitor is not lost** *(FR-2.7)*
> **Given** the mail service is down or the request fails,
> **When** I submit the form,
> **Then** I see an error state that contains `dev@qamarlabsllc.com` as a direct fallback,
> **And** I leave the page able to reach Qamar Labs anyway.

**US-6 — A motion-sensitive visitor gets the whole site** *(FR-3.5, FR-3.6)*
> **Given** my OS is set to "reduce motion" (or JavaScript has not executed),
> **When** I load the homepage,
> **Then** every headline, process stage, and feature card is **fully visible and legible**,
> **And** nothing is stuck at `opacity: 0`,
> **And** no element translates, fades, or staggers.

**US-7 — Malik judges the craft** *(FR-3.2, FR-3.3)*
> **Given** I treat the vendor's own site as a work sample,
> **When** I load the homepage with default motion settings,
> **Then** the hero reveals with a composed stagger rather than snapping in,
> **And** the process stages animate **in order** as I scroll them into view, reinforcing that the method is sequential,
> **And** nothing janks, double-fires on re-entry, or shifts layout (CLS).

**US-8 — The existing product demo still works** *(FR-4.1)*
> **Given** the ResponsiveShowcase section exists and is already accepted,
> **When** I scroll to it after this project ships,
> **Then** all three device recordings still autoplay silently, loop, and show no control bar.

---

## Constraints

### Technical

- **Next.js 15 App Router / React 19.** Server components by default; `"use client"` only for
  state, effects, refs, or browser APIs (CLAUDE.md). anime.js touches the DOM, so every
  animated component is a client leaf — but sections must not become client components
  wholesale (FR-3.7).
- **`strict: false`** in [tsconfig.json](../tsconfig.json). The compiler will not catch a
  null/undefined mistake in the route handler. Validate explicitly; do not lean on types.
- **Tailwind v4, utility-first, no theme object.** Dark mode is per-utility `dark:` variants.
  Recurring pairs are fixed: `text-black dark:text-white`, `bg-white dark:bg-gray-dark`,
  `text-body-color dark:text-body-color-dark`.
- **`SectionTitle` is mandatory** for headed sections
  ([SectionTitle.tsx](../src/components/Common/SectionTitle.tsx), props `title`, `paragraph`,
  `center`, `width`, `mb`). Do not hand-roll an `<h2>`.
- **No test runner exists.** No Jest, Vitest, or Playwright config is installed. "Verified"
  means build + manual browser checks (see Testing Strategy). Do not invent test commands.
- **`npm run lint` is broken and is not a signal.** It fails before linting with
  `Converting circular structure to JSON … Referenced from: .eslintrc.json` — an ESLint 9 vs.
  legacy `.eslintrc.json` incompatibility. Pre-existing; out of scope; must not be reported as
  a pass.
- **`@genezio/email-service` is the incumbent mail transport.** v1.0 keeps it and moves the
  call server-side rather than swapping providers. If it turns out to be browser-only, that is
  a blocking discovery — see OQ-1.
- **One new runtime dependency: `animejs` v4.** v4 is ESM with named exports
  (`import { animate, stagger } from "animejs"`), not v3's default `anime()` export. Any v3
  snippet found online will not work. No other dependency may be added or upgraded.
- **Assets are static and local.** Only `cdn.sanity.io` is allowlisted for remote images in
  [next.config.js](../next.config.js). Confirm any asset exists on disk before writing its
  path — `public/images/responsive/` and `public/images/products/` contain filenames with dots
  (`…claude-constitution.vercel.app.webm`) that are trivially mistyped.
- **`<Image fill>` requires `sizes`;** prefer explicit `width`/`height` for known-size images.
  This rule exists because it already caused an intermittently-missing icon bug.
- **Layout quirk:** [src/app/layout.tsx](../src/app/layout.tsx) is a client component and
  imports `Providers` at the bottom of the file. Leave it alone.

### Business

- **Voice:** plain, declarative, cooperative-first. No growth-hacking register, no
  exclamation marks, no "revolutionary."
- **The method described on the site must be the method actually practiced.** The five stages
  come from CLAUDE.md. If marketing copy and CLAUDE.md diverge, the site is lying, and Malik
  will find out during the first engagement.
- **Domain is `qamarlabsllc.com`** for contact (per three of the four existing privacy pages).
  The site itself is currently deployed at `qamarlabs.netlify.app`
  ([Footer/index.tsx:161](../src/components/Footer/index.tsx#L161)).
- **No pricing on the site in v1.0** unless OQ-5 resolves otherwise.
- **`dev@qamarlabsllc.com` must exist and be monitored before launch.** Publishing an
  unmonitored address is worse than publishing none — it converts a silent failure into a
  broken promise. This is a launch gate, not an engineering task.

### Performance

- **anime.js budget: ≤ 20 KB gzipped** added to the client bundle. v4 tree-shakes; import
  named functions only, never a namespace import.
- **Cumulative Layout Shift < 0.1.** Animations must use `transform` and `opacity` only.
  Animating layout properties (height, top, margin) is prohibited.
- **Scroll animations must not run on the main thread per-frame.** Use `IntersectionObserver`
  to trigger, not a `scroll` event listener.
- **Animations fire once.** Re-entering the viewport must not re-trigger a completed reveal.
- **Video assets are already heavy** — the three `responsive/` recordings are ~3–4 MB each.
  v1.0 must not add to page weight beyond the anime.js budget.
- **Lighthouse Performance ≥ 90** and **Accessibility ≥ 95** on the homepage (mobile profile).

---

## Success Metrics

| # | Metric | Baseline (today) | v1.0 target | How measured |
| --- | --- | --- | --- | --- |
| SM-1 | `dev@qamarlabsllc.com` appears as a `mailto:` in served HTML | **0 occurrences** in `src/` | ≥ 3 (contact section, footer, `/contact`) | `grep -ri "dev@qamarlabsllc.com" src/`; view-source on served pages |
| SM-2 | Mail credential present in client JS bundle | **Exposed** (`NEXT_PUBLIC_EMAIL_SERVICE_TOKEN`) | **0** — no token in any `.next/static/**` chunk | `grep -r "EMAIL_SERVICE_TOKEN" .next/static/` returns nothing after build |
| SM-3 | Contact form delivery to `dev@qamarlabsllc.com` | Unverified; destination env var is unset | 100% of valid submissions delivered; verified end-to-end at least once | Manual submission → confirm receipt in the real inbox |
| SM-4 | Site states the SDD service and its five stages | Not stated | Hero names the practice; Process section renders all 5 stages | View-source; stage names match CLAUDE.md exactly |
| SM-5 | Content legible with reduced motion | N/A (no motion) | 100% of animated elements visible and legible | DevTools → Emulate `prefers-reduced-motion: reduce`; reload; visually confirm nothing is `opacity: 0` |
| SM-6 | Content legible with JS disabled | Currently 100% (static site) | Remains 100% | Disable JS; reload; all sections readable |
| SM-7 | Lighthouse Performance / Accessibility (mobile) | To be captured as baseline before work starts | ≥ 90 / ≥ 95 | Lighthouse, homepage, mobile profile |
| SM-8 | Cumulative Layout Shift | Baseline TBD | < 0.1 | Lighthouse / Web Vitals |
| SM-9 | anime.js bundle cost | 0 KB | ≤ 20 KB gzipped | Compare `next build` route JS size before/after |
| SM-10 | `debugger` statements in shipped source | **1** ([Contact/index.tsx:35](../src/components/Contact/index.tsx#L35)) | **0** | `grep -rn "debugger" src/` |
| SM-11 | `npm run build` | Passes (11/11 static pages) | Still passes, no new type or prerender errors | `npm run build` |

*SM-7 and SM-8 require a baseline capture as the first task; the targets are meaningless
without one.*

**Not measurable in v1.0:** inbound leads, conversion rate, time-on-page. There is no
analytics installed and none is in scope (see Out of Scope). Any claim about lead volume would
be unfalsifiable, so this PRD does not make one.

---

## Out of Scope

- **Analytics, tracking, A/B testing, cookie consent.** Nothing is installed; adding it drags
  in consent obligations. Deferred to a v1.1 decision.
- **A CMS.** Copy stays colocated (inline JSX or `*Data.tsx`) per CLAUDE.md.
- **A blog / case-study system.** `Blog`, `Testimonials`, `Pricing`, `Brands`, and `Video`
  remain commented-out inventory in `page.tsx`. **Do not delete them; do not uncomment them.**
- **Redesign of the Hero SVG artwork.**
- **The `Video` / `video-modal` components.** They wrap a YouTube `<iframe>`, not a `<video>`,
  and are unmounted. Untouched.
- **A second "Our Work" section** using `public/images/products/` (the `learn-chain-forge` and
  `claude-constitution` MacBook recordings). Tempting and adjacent, but it is a separate spec.
- **The ESLint 9 flat-config migration.** `npm run lint` stays broken. Tracked separately; it
  is a pre-existing repo defect and fixing it here would balloon the diff.
- **Enabling `strict: true` in tsconfig.** Would cascade across the whole codebase.
- **Swapping the email provider** away from `@genezio/email-service`.
- **Authentication, a client portal, scheduling/calendar integration, live chat.**
- **A public spec-template download or an interactive spec builder.** FR-1.3 shows the
  *anatomy* of a spec; it does not ship a tool. This is the most likely scope creep vector.
- **Any 3D / WebGL / scroll-jacking library.** anime.js is the only motion dependency.
- **i18n / RTL.** Despite the Arabic-derived product names, the site is English-only today.
- **Rewriting the privacy-policy page content.** FR-2.2 touches only the email constant in
  those files.

---

## Open Questions → Decisions

| # | Question | Decision | Rationale / Owner |
| --- | --- | --- | --- |
| **OQ-1** | Does `@genezio/email-service` run server-side in a Next.js Route Handler, or is it browser-only? | **Decided: build FR-2.4 assuming server-side works, and validate this in Task 1 before anything else.** If `MailService.sendMail` proves browser-only, the fallback is a plain `fetch` to the provider's HTTP API from the route handler. Either way the token stays server-side. | This is the **only genuinely blocking unknown** in the PRD. Everything in FR-2 depends on it. It is cheap to answer (one route handler, one call) and must be answered first. Owner: eng, day 1. |
| **OQ-2** | Which domain is correct — `qamarlabsllc.com` or `qamarlabs.com`? [MusuahPrivacyPolicy.tsx:8](../src/components/PrivacyPolicy/MusuahPrivacyPolicy.tsx#L8) uses `privacy@qamarlabs.com`; every other contact constant uses `qamarlabsllc.com`. | **Decided: `qamarlabsllc.com` is canonical** for this project; `dev@qamarlabsllc.com` ships as specified. The `privacy@qamarlabs.com` discrepancy is **flagged, not fixed** — changing a published privacy-policy contact address is a legal-copy decision, not an engineering one. Raise it with the owner; do not silently rewrite it. | Three of four privacy pages and the PRD requirement agree on `qamarlabsllc.com`. Touching legal copy unasked is out of bounds. Owner: business. |
| **OQ-3** | Does the contact form survive at all, given Malik will never use it and a `mailto:` is now prominent? | **Decided: keep the form, fix it, and make the address equally prominent.** Serve both personas rather than choosing. Dana will use a form; Malik will not. Removing the form loses Dana for no gain. | Cheap to keep — the Formik/Yup form already exists and works; the defect is in the transport, not the UI. |
| **OQ-4** | Should `Process` be a new component or a rewrite of `Features`? | **Decided: new `Process` section component; `Features` stays and is re-pointed (FR-1.4).** They answer different questions — Process is *how we work* (sequence), Features is *what you get* (capabilities). Collapsing them would lose the sequence, which is the whole pitch. | Follows "sections are the unit of composition." Prefer editing existing sections, but this is genuinely new content. |
| **OQ-5** | Does the site publish pricing / engagement tiers? | **Decided: no pricing in v1.0.** FR-1.5 ships as a qualitative engagement-model block *only if* the commercial terms are settled before implementation; otherwise it is cut. The `Pricing` component stays commented out either way. | Publishing rates the business has not agreed to is worse than publishing none. Owner: business. Blocks FR-1.5 only, not the release. |
| **OQ-6** | anime.js v3 or v4? | **Decided: v4.** Named ESM exports (`animate`, `stagger`, `onScroll`), better tree-shaking, actively maintained. **Consequence: every v3 tutorial and LLM-recalled snippet using the default `anime({...})` export is wrong.** Verify the installed version's API against `node_modules/animejs/package.json` before writing animation code. | Bundle budget (SM-9) and longevity. This is a known footgun; it is written down so it is not rediscovered painfully. |
| **OQ-7** | Do sections become client components to animate? | **Decided: no.** Animation lives in `"use client"` leaf wrappers that receive server-rendered children (FR-3.7). Section components stay server components. | Preserves "server components by default." Also automatically satisfies FR-3.6 — content is in the SSR HTML because the server rendered it. |
| **OQ-8** | How is reduced motion handled — skip the animation, or never hide the content? | **Decided: never hide the content.** The initial hidden state (`opacity: 0`) must itself be conditional on motion being allowed. A guard that merely skips the `animate()` call leaves content permanently invisible. | This is the failure mode that turns a nice-to-have into a P0 accessibility bug, and it contradicts the site's own "Accessible by Default" copy. Non-negotiable. |
| **OQ-9** | Is a nav link added for the new Process section? | **Decided: yes — one entry in [menuData.tsx](../src/components/Header/menuData.tsx).** The Process section is the primary pitch; burying it below the fold with no nav affordance wastes it. Keep the existing entries intact. | Small, reversible, high value. |
| **OQ-10** | Spam protection on a public mail route? | **Decided: honeypot field in v1.0 (FR-2.8, P2); rate limiting deferred.** A public unauthenticated relay will be found by bots. A honeypot is ~10 lines and catches naive ones; real rate limiting needs shared state the deploy target may not have. | Proportionate to a marketing site. Revisit if abuse appears. |

---

## Testing Strategy

**There is no test runner in this repository.** No Jest, no Vitest, no Playwright, no config
for any of them. This PRD does **not** introduce one — that is a repo-wide decision with its
own cost, and inventing `npm test` in a spec would be a lie. Validation is therefore
**build + manual browser verification**, exactly as CLAUDE.md's Validation section prescribes.

Every check below is stated so that it can be honestly marked pass, fail, or **skipped**.
A skipped check is recorded as skipped — never as passed.

### Tier 1 — Automated (what actually runs)

| Check | Command | Pass condition |
| --- | --- | --- |
| Build | `npm run build` | Succeeds; no type errors, no prerender errors; static page count does not regress |
| Credential leak | `grep -r "EMAIL_SERVICE_TOKEN" .next/static/` after build | **Zero matches.** Any match fails the release outright (SM-2) |
| Address present | `grep -ri "dev@qamarlabsllc.com" src/` | ≥ 3 rendering call sites |
| No debugger | `grep -rn "debugger" src/` | Zero matches (SM-10) |
| Bundle cost | Compare `next build` route JS size to pre-change baseline | Delta ≤ 20 KB gzipped (SM-9) |
| Lint | `npm run lint` | ⚠️ **Not a signal.** Fails before linting (ESLint 9 vs `.eslintrc.json`). Record as *blocked/pre-existing*, never as passed. |

### Tier 2 — Manual browser verification (required before merge)

Run `npm run dev`, load `/`, and confirm:

1. **Both themes.** Every new or changed section is legible in light **and** dark. Toggle via
   `ThemeToggler`, do not just trust the `dark:` classes being present in source.
2. **Three widths.** 390px (iPhone), 768px (tablet), 1440px (desktop). Nothing overflows
   horizontally; the Process section reflows sensibly; the ResponsiveShowcase grid still goes
   1-col → 3-col at `lg:`.
3. **Reduced motion (US-6 / SM-5).** DevTools → Rendering → Emulate CSS
   `prefers-reduced-motion: reduce` → hard reload. **Every** animated element is fully visible
   and legible. Nothing is stuck at `opacity: 0`. This is the highest-risk check in the plan —
   perform it deliberately, not as an afterthought.
4. **JS disabled (US-6 / SM-6).** Disable JavaScript → reload → all content readable.
5. **Scroll animation behaviour.** Stages animate in order on entry; scrolling away and back
   does **not** re-trigger; no layout shift while animating.
6. **Contact happy path (US-4).** Submit a valid message. Confirm: the network request goes to
   `/api/contact` (not to a third-party mail host from the browser), the success state renders,
   and **the mail lands in the real `dev@qamarlabsllc.com` inbox.** Delivery is not proven by a
   `200` response — check the inbox.
7. **Contact failure path (US-5).** Force a failure (stop the network, or temporarily unset the
   server token). Confirm the error state renders **and contains the `mailto:` fallback**.
8. **Validation.** Empty name, malformed email, 9-character message → client-side errors show.
   Then `curl -X POST /api/contact` with the same bad payloads directly → server rejects them
   too (FR-2.6). Bypassing the browser is the point of this check.
9. **`mailto:` links (US-1).** Click the address in the contact section, the footer, and
   `/contact`. Confirm each opens a mail client with `dev@qamarlabsllc.com` pre-filled.
10. **Non-regression (US-8).** ResponsiveShowcase: all three videos autoplay, loop, are silent,
    and show no control bar. All four `/privacy-policy/*` routes still render, with their
    existing addresses unchanged.
11. **Lighthouse.** Homepage, mobile profile. Performance ≥ 90, Accessibility ≥ 95, CLS < 0.1
    (SM-7, SM-8) — against the baseline captured in Task 1.

### What this strategy does not do

It does not prove the contact route works under concurrency, does not test the mail provider's
reliability, and does not regression-test the privacy pages beyond "they render." Those gaps
are accepted for a marketing site and are recorded here so nobody later mistakes this suite
for something it is not.

---

## Timeline

Sequenced so that shared primitives land before consumers, and `page.tsx` composition changes
land last — per CLAUDE.md's Task Breakdown rule. Each task leaves the site **building and
visually coherent**. Estimates are working days for one engineer; dates anchor to Monday
2026-07-13.

### Phase 0 — De-risk (Days 1–2 · Jul 13–14)

| Task | Deliverable | Why first |
| --- | --- | --- |
| **T0.1** | **Answer OQ-1.** Spike a `src/app/api/contact/route.ts` that calls `@genezio/email-service` server-side and delivers one real mail. | **Blocking.** If the provider is browser-only, FR-2 changes shape. Nothing else in FR-2 may start until this is answered. |
| **T0.2** | Capture Lighthouse + bundle-size baseline. | SM-7/8/9 targets are meaningless without a "before." |
| **T0.3** | Confirm `dev@qamarlabsllc.com` **exists and is monitored** (business). | Launch gate. Publishing a dead address is a broken promise. |

> **Gate:** if T0.1 fails, stop and re-plan FR-2 before writing UI code.

### Phase 1 — Contact & security (Days 3–5 · Jul 15–17) — *highest value; ships alone if everything else slips*

| Task | Deliverable |
| --- | --- |
| **T1.1** | `src/constants/contact.ts` — single exported `DEV_EMAIL = "dev@qamarlabsllc.com"` (FR-2.2). Refactor the four privacy-policy components to import a shared constant. **Do not change their rendered addresses** (OQ-2). |
| **T1.2** | `src/app/api/contact/route.ts` — server-side send, server-side Yup-equivalent validation, non-`NEXT_PUBLIC_` token (FR-2.4, FR-2.6). |
| **T1.3** | Rewrite `Contact` submit to POST `/api/contact`. **Delete the `debugger;`** (FR-2.5). Keep the four submit states; add the `mailto:` fallback to the error state (FR-2.7). |
| **T1.4** | Render `dev@qamarlabsllc.com` in the Contact section, the Footer, and `/contact` (FR-2.1). |
| **T1.5** | Honeypot field (FR-2.8) — cut if time is short. |

**Milestone M1 (Jul 17): the credential is off the client, the address is live, mail is verified delivered.** This alone justifies the project.

### Phase 2 — Positioning (Days 6–9 · Jul 20–23)

| Task | Deliverable |
| --- | --- |
| **T2.1** | `src/types/process.ts` + `src/components/Process/processData.tsx` — the five stages, sourced from CLAUDE.md (FR-1.2). Types and data before components. |
| **T2.2** | `src/components/Process/index.tsx` — **server** component; `SectionTitle`; `py-16 md:py-20 lg:py-28`; `.container`. Static, no motion yet. |
| **T2.3** | Specification Anatomy element (FR-1.3). |
| **T2.4** | Hero copy → consultancy positioning (FR-1.1). Re-point `featuresData` copy (FR-1.4); keep the six existing icons. |
| **T2.5** | Mount `<Process />` in `page.tsx`; add the nav entry (OQ-9). **Composition change lands last.** |

**Milestone M2 (Jul 23): the site sells Spec-Driven Development, statically. Fully shippable with zero motion.**

### Phase 3 — Motion (Days 10–13 · Jul 24–29)

| Task | Deliverable |
| --- | --- |
| **T3.1** | `npm i animejs` (v4). Verify the actual API surface in `node_modules` before writing a line (OQ-6). |
| **T3.2** | `src/components/Common/Reveal.tsx` — the **one** `"use client"` animation primitive: `IntersectionObserver` trigger, `transform`/`opacity` only, fires once, and **initial hidden state guarded on `prefers-reduced-motion`** (FR-3.5, OQ-8). Everything else composes this. |
| **T3.3** | Hero stagger (FR-3.2). |
| **T3.4** | Process sequential reveal (FR-3.3) — the motion that carries the argument. |
| **T3.5** | Feature-card stagger (FR-3.4). |

**Milestone M3 (Jul 29): motion ships, and the site is still fully usable without it.**

### Phase 4 — Validate & ship (Days 14–15 · Jul 30–31)

| Task | Deliverable |
| --- | --- |
| **T4.1** | Full Tier-1 + Tier-2 test pass (all 11 manual checks, both themes, three widths). |
| **T4.2** | Lighthouse vs. the T0.2 baseline; bundle delta vs. SM-9. |
| **T4.3** | Record outcomes **honestly** in the spec's `## Acceptance` — skipped checks marked skipped, not passed. |

**Ship: 2026-07-31.**

### Critical path & cut lines

- **Critical path:** T0.1 → T1.2 → T1.3. Everything in FR-2 sits behind the OQ-1 answer.
- **If time is short, cut in this order:** FR-1.5 (engagement model) → FR-3.8 (button
  micro-interaction) → FR-3.4 (feature stagger) → FR-1.3 (spec anatomy) → **all of Phase 3.**
- **Never cut:** FR-2.4 (credential exposure), FR-2.5 (`debugger`), FR-3.5 (reduced motion),
  FR-3.6 (content without JS). These are correctness and accessibility, not polish. A site
  that ships motion but leaks its mail token is strictly worse than the site we have today.
