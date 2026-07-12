# Overview
This is a company website with a new mission
- Provides cutting edge solutions to new expectations.
- Continous wisdom, and care in regards to your product.
- Keeping your systems iterable in the AI era.
- Spec driven approach to new problems.

The site currently reads as an open-source collective ("Code for Earth", "an IT collective
creating open source software solutions"). The four statements above reframe it as a
practice that ships and maintains software for clients in the AI era. The existing
cooperative values are not discarded — they become the *how*, while the four statements
become the *what*.

Two homepage sections still carry unedited template copy (`Features` and `Video` both use a
Lorem Ipsum paragraph). Those are the clearest tells that this is an unfinished template and
must go.

Three device-framed recordings of the **Claude Constitution Creator** landed in
`/public/images/responsive` and two product recordings landed in `/public/images/products`,
but nothing in `src/` references either directory yet. This spec puts them on the page.


## Implementation Steps
- Change the homepage to include the new mission, also update multiple sections to reflect the new mission.
  - **Hero** ([src/components/Hero/index.tsx](../src/components/Hero/index.tsx)) — replace the
    `Code for Earth` headline and the `An IT collective creating open source software
    solutions` subheading with the new mission. Headline carries the promise; the paragraph
    carries "cutting edge solutions to new expectations." Keep the decorative SVG blobs and
    the existing GitHub button; add no second CTA.
  - **Features** ([src/components/Features/index.tsx](../src/components/Features/index.tsx)) —
    replace the `Main Features` title and its **Lorem Ipsum** paragraph. The section now
    introduces the four mission pillars.
  - **featuresData** ([src/components/Features/featuresData.tsx](../src/components/Features/featuresData.tsx)) —
    rewrite the six entries so they express the new mission. Map at minimum:
    *spec-driven approach* → the entry currently titled "Transparent & Participatory
    Decision-Making Systems"; *iterable systems in the AI era* → "Interoperable Modules for
    Community Needs"; *continuous wisdom and care* → "Resource Stewardship & Optimization
    Platforms"; *cutting edge solutions* → "Actionable Environmental Intelligence".
    Reuse the six existing `/images/features/*.png` icons — do not add image assets.
    Additionally, fix the intermittently-missing icon (reported against "Actionable
    Environmental Intelligence"): the icons rendered as `<Image fill>` inside a
    `relative h-full w-full` wrapper with **no `sizes` prop**, so Next emitted a `100vw`
    srcset for a 70px box. Replace `fill` with explicit `width={40} height={40}` and drop
    the wrapper div. See the `<Image fill>` rule in [CLAUDE.md](../CLAUDE.md).
  - **AboutSectionOne** ([src/components/About/AboutSectionOne.tsx](../src/components/About/AboutSectionOne.tsx)) —
    keep the "Four Pillars" framing and the `checkIcon` list, but replace the four list items
    with the four mission statements. Update the `SectionTitle` paragraph so the cooperative
    identity supports the new mission rather than replacing it.
  - **AboutSectionTwo** ([src/components/About/AboutSectionTwo.tsx](../src/components/About/AboutSectionTwo.tsx)) —
    rework the three blocks. `For Humanity` and `For the Environment` become the two things
    the practice actually delivers under the new mission; `Our Call` stays as the closing
    invitation.
- Have a section mentioning responsive design, and display responsive design of claude constitution creator found in the /public/images/responsive
  - New section component `src/components/ResponsiveShowcase/index.tsx`, mounted in
    [src/app/page.tsx](../src/app/page.tsx) between `<Features />` and `<AboutSectionOne />`.
  - Server component. Standard shape: `<section id="responsive" className="py-16 md:py-20
    lg:py-28">` → `.container` → `SectionTitle` (`center`) → media grid.
  - Renders all three recordings of the Claude Constitution Creator, each labelled with its
    device and each in a `<video>` element per the autoplay rule below:

    | Device | File (under `/images/responsive/`) |
    | --- | --- |
    | Desktop | `Macbook-Air-claude-constitution.vercel.app.webm` |
    | Tablet | `iPad-PRO-11-claude-constitution.vercel.app.webm` |
    | Mobile | `iPhone-14-PRO-MAX-claude-constitution.vercel.app.webm` |

  - Layout: one column stacked on mobile, three columns from `lg:` up
    (`grid grid-cols-1 gap-8 lg:grid-cols-3`). The phone clip is portrait and the laptop clip
    is landscape — let each `<video>` keep its intrinsic ratio (`h-auto w-full`) rather than
    forcing a shared `aspect-*`, so nothing is cropped.
  - Copy explains that every system is built to hold its shape from a 390px phone to a
    desktop, and names the Claude Constitution Creator as the example.
- For all videos make it autoplayable, and do not display play bar.
  - Every `<video>` on the site carries `autoPlay muted loop playsInline` and **omits**
    `controls`. `muted` is not optional — Chrome and Safari block unmuted autoplay outright.
  - Add `preload="metadata"` and a `poster` where a sibling `.png` exists
    (`public/images/products/` has one per product; `public/images/responsive/` has none).
  - This rule applies to any future `<video>`, and is recorded in the **Code Patterns**
    section of [CLAUDE.md](../CLAUDE.md).
  - The existing `Video` / `video-modal` components embed a **YouTube `<iframe>`**, not a
    `<video>` element, and are commented out of `page.tsx`. They are out of scope — see below.

## Rules
- Preserve the section-per-component architecture. `page.tsx` stays a flat list of sections.
- Do not delete or uncomment the staged sections in `page.tsx` (`Video`, `Brands`, `Pricing`,
  `Testimonials`, `Blog`). They are intentional inventory.
- New sections are **server components**. Autoplay via HTML attributes needs no `"use client"`,
  no `useRef`, and no `useEffect`.
- Reuse `SectionTitle` for every headed section. Do not hand-roll an `<h2>`.
- Every colour utility needs its `dark:` counterpart. Follow the existing pairs
  (`text-black dark:text-white`, `text-body-color dark:text-body-color-dark`).
- Use only assets already present in `public/`. Confirm a file exists on disk before writing
  its path — asset filenames here contain dots (`…claude-constitution.vercel.app.webm`) and
  are easy to mistype.
- No new dependencies, no dependency upgrades, no `next.config.js` changes.
- The word "Lorem" must not survive anywhere that **renders**. It legitimately remains in the
  staged-but-unmounted sections (`Blog`, `Pricing`, `Testimonials`, `Video`) and in the orphan
  `Contact/NewsLatterBox.tsx`, which nothing imports. Assert against the served HTML, not `src/`.
- Give each `<video>` an accessible label (`aria-label` or an adjacent visible caption).
  A silent decorative clip still needs a name.

## Acceptance
Status: **implemented and verified** against the dev server, except where noted.

- Passing Tests
  - ✅ `npm run build` completes with no type errors and no prerender errors (11/11 static pages).
  - ⚠️ `npm run lint` — **not a usable signal.** It fails before linting with
    `Converting circular structure to JSON … Referenced from: .eslintrc.json`. Verified
    pre-existing: the same failure reproduces with all `src/` changes stashed. Needs an
    ESLint 9 flat-config migration, tracked separately.
  - ✅ Homepage renders in this order: `ScrollUp`, `Hero`, `Features`, `ResponsiveShowcase`,
    `AboutSectionOne`, `AboutSectionTwo`, `Contact`.
  - ✅ All four mission statements present in the served HTML — Hero copy, `Features` intro,
    and the four `AboutSectionOne` pillar list items.
  - ✅ The responsive section renders exactly three `<video>` elements, one per device file;
    all three assets return `200` (3.06 MB / 3.55 MB / 4.16 MB).
  - ✅ Each `<video>` carries `autoPlay muted loop playsInline` and no `controls`. Note the
    SSR HTML serializes these camelCased (`autoPlay=""`, `playsInline=""`); HTML attribute
    names are case-insensitive, so this is correct. Grep for them case-insensitively.
  - ✅ Zero occurrences of "lorem" in the served homepage HTML.
  - ⬜ **Not verified by me:** the 390px single-column / ≥1024px three-column breakpoint
    behaviour, autoplay actually starting, and light/dark legibility. These need a real
    browser; the classes and attributes are in the served markup but I did not observe paint.
- Failing Tests
  - Any `<video>` rendered with a `controls` attribute, or without `muted` — the clip either
    shows a play bar or is blocked from autoplaying.
  - The served homepage HTML contains "lorem" (case-insensitive). Do **not** assert this
    against `src/` — see Rules.
  - `grep -r "Code for Earth" src/` returns a match. Resolved: the Hero headline and the
    `metadata.description` in `page.tsx` were both replaced with the new mission.
  - The responsive section is added as a `"use client"` component, or drives playback from a
    `useEffect` / `videoRef.play()` call.
  - A `<video>` `src` points at `/public/images/...` (the `public/` prefix must not appear in
    the URL) or at a file that does not exist on disk.
  - `page.tsx` loses any of its commented-out section imports.
  - The phone clip is cropped or letterboxed by a forced `aspect-*` shared with the laptop clip.

## Out of Scope
- The `Video` and `video-modal` components. They wrap a YouTube `<iframe>`, are commented out
  of `page.tsx`, and the autoplay rule targets `<video>` elements. Leave both files untouched.
- The two product recordings in `/public/images/products/`
  (`Macbook-Air-claude-constitution…`, `Macbook-Air-learn-chain-forge…`). They are the raw
  material for a future "Our Work" section; this spec only covers the responsive showcase.
- `/about`, `/contact`, `/error`, and every `/privacy-policy/*` page.
- `Header`, `Footer`, `menuData` — no new nav entry for the responsive section.
- Introducing a test runner. None is installed; acceptance above is build + lint + manual.
- Any redesign of the Hero's decorative SVG artwork.
- Converting `.webm` to `.mp4` or adding fallback `<source>` elements. WebM covers the
  evergreen browsers this site targets.

## Reference Code
1) [src/app/page.tsx](../src/app/page.tsx) — the flat section list the new section is mounted into.
2) [src/components/Common/SectionTitle.tsx](../src/components/Common/SectionTitle.tsx) — required heading component; props are `title`, `paragraph`, `center`, `width`, `mb`.
3) [src/components/About/AboutSectionOne.tsx:50-65](../src/components/About/AboutSectionOne.tsx#L50-L65) — the dual light/dark asset pattern (`dark:hidden` + `hidden dark:block`) and the `checkIcon` list rendering to copy for the pillars.
4) [src/components/Features/index.tsx:16-20](../src/components/Features/index.tsx#L16-L20) — the responsive grid idiom (`grid grid-cols-1 … md:grid-cols-2 lg:grid-cols-3`) the showcase grid should mirror.
5) [src/components/Features/featuresData.tsx](../src/components/Features/featuresData.tsx) — typed default-export data module; icons are inline `<Image>` wrapped in `relative h-full w-full`.
6) [src/types/feature.ts](../src/types/feature.ts) — the `Feature` interface backing that module.
7) [CLAUDE.md](../CLAUDE.md) — **Code Patterns** carries the canonical autoplay `<video>` snippet; **Validation** carries the build/lint/manual checklist referenced by Acceptance.
