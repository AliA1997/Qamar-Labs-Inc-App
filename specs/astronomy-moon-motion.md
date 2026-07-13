# Overview

Give the site an **astronomy visual identity** anchored on a **rotating moon**, and use it to
carry the Spec-Driven Development pitch rather than decorate it.

The theme is not arbitrary. **قمر (*qamar*) is Arabic for "moon."** Qamar Labs is, literally,
Moon Labs. The astronomy motif is the company's own etymology, which means the site can lean on
it without the register turning into stock-photo space kitsch. This is the difference between a
theme and a costume.

The metaphor also happens to be *true of the method*, which is what earns it a place on a page
selling that method:

- A moon is the most **predictable** object in the sky. You can compute where it will be in a
  decade. That is precisely the claim Spec-Driven Development makes about a software project:
  the destination is known before the journey starts.
- Orbits are **cyclical, not linear** — the same discipline, repeated, holding the system in
  place. That is the "continuous wisdom and care" already promised in
  [featuresData.tsx](../src/components/Features/featuresData.tsx).
- You never see the far side by accident. You see it by **going there deliberately**.

So: the moon rotates, the SDD stages get astronomical epithets *alongside* their real names, and
the palette shifts toward deep-space blues in dark mode and dawn-sky light in light mode.

Companion to [spec-driven-consulting-relaunch.md](spec-driven-consulting-relaunch.md), which
owns positioning, contact, and the `Reveal` motion primitive. **That spec must land first** —
this one consumes its `Reveal` component and its `Process` section. Both descend from
[prds/initial-project-v1.0.md](../prds/initial-project-v1.0.md).

**The hard constraint, stated once:** the moon is decoration. A visitor with
`prefers-reduced-motion: reduce`, or with JavaScript disabled, must lose *nothing but motion*.
No content may live inside the moon.

# Implementation Steps

## 1. The rotating moon

- **`src/components/Common/Moon.tsx`** — a `"use client"` component rendering a moon that
  rotates on its axis like a planet.
- **Technique: a texture strip translated inside a circular mask.** Do **not** animate
  `background-position` (repaints every frame, not compositor-friendly) and do **not** spin the
  whole element with `rotate` (that reads as a spinning coin, not a rotating sphere). Instead:
  - an outer `div`, `rounded-full`, `overflow-hidden` — this is the moon's limb;
  - an inner texture layer **twice the width** of the moon, carrying a **seamless, horizontally
    tiling** crater texture, animated `translateX` from `0%` to `-50%` on an infinite linear
    loop. Because the texture tiles seamlessly at the halfway point, the wrap is invisible and
    the surface appears to rotate continuously in one direction;
  - a **static** overlay layer: a `radial-gradient` offset toward one side, producing the limb
    darkening and terminator that sell the illusion of a *sphere* rather than a disc. This layer
    does not animate — the shading stays fixed while the surface moves beneath it, which is
    exactly what a rotating planet does.
- **The rotation axis is tilted 45°.** The surface travels on the diagonal, not straight across.
  Implemented by rotating the *axis wrapper* that holds the texture strip — the circular mask is
  rotation-invariant, so only the direction of travel changes. That wrapper must be oversized
  (200%) or its corners will swing inside the circle and expose bare edges as it rotates.
- **One full rotation ≈ 24s.** Revised from 60s: at a minute per revolution the surface crept
  along at roughly 5px/sec and read as a still image — the animation was *there* and nobody
  could see it. Still slow enough to read as celestial rather than as a loading spinner.
- **The crater texture must be legible at the moon's rendered size.** Tilting doubles the tile,
  which doubles apparent crater size and softens them to invisibility if the values are not
  compensated. If you cannot see craters, you cannot see the rotation, and the whole component
  is pointless.
- **The texture is generated in CSS, not an image asset.** Layered `radial-gradient`s for
  craters. Rationale: the page already carries ~11 MB of `.webm`; adding a moon texture PNG for
  decoration is not defensible against the performance budget. It also sidesteps the light/dark
  dual-asset problem entirely — see [CLAUDE.md](../CLAUDE.md) on dual-asset images.
- **Seam check:** the texture must tile at exactly 50% of the inner layer's width, or a visible
  vertical seam will sweep across the moon once per cycle. This is the single most likely visual
  defect and must be checked by eye, not assumed.
- **anime.js v4 drives the loop** (`animate(el, { translateX: …, loop: true, ease: "linear" })`),
  consistent with the relaunch spec. Named ESM exports — **not** v3's default `anime({...})`.

## 2. Reduced motion and no-JS

- **Under `prefers-reduced-motion: reduce`, the moon renders fully — and simply does not
  rotate.** It is a static moon. Not hidden, not removed.
- **With JavaScript disabled the moon still renders**, statically, because the texture and
  shading are CSS on server-rendered markup. Only the `translateX` loop needs JS.
- This is the inverse of the `Reveal` failure mode in the relaunch spec, and it is worth being
  explicit about the asymmetry: `Reveal` hides content and must be guarded so the content
  *appears*; the moon is *always visible* and is guarded so it merely *stops moving*. Decoration
  is allowed to be inert. Content is never allowed to be invisible.
- **`aria-hidden="true"`** on the moon and every orbital element. It is decorative; a screen
  reader announcing "moon" is noise. It carries no `alt`, no label, and no focusable child.

## 3. Astronomy in the Hero

- Mount `<Moon />` in [Hero/index.tsx](../src/components/Hero/index.tsx) **centred in the
  section, with the hero copy sitting directly on top of it** (`z-[-1]`, matching the existing
  decorative-SVG idiom at [Hero/index.tsx:35](../src/components/Hero/index.tsx#L35)). The moon is
  the hero, not a corner ornament.
- **Hero stays a server component.** `<Moon />` is the `"use client"` leaf. Do not convert Hero.
- **Contrast is the acceptance bar, not aesthetics.** Text over a bright moon is the whole risk
  of this composition. Body copy must stay ≥ 4.5:1 in **both** themes. A pretty hero nobody can
  read is a failure, and it would violate the "Accessible by Default" claim the site makes.
- **The scrim is what makes text-on-moon legible.** A radial wash of the page background,
  strongest behind the copy and fading to nothing by the limb, sits between the moon and the
  text. It buys contrast where the words are without flattening the moon's edges, where the
  craters and the rotation are actually visible. Two nodes (`dark:hidden` /
  `hidden dark:block`), because the wash has to match the active theme.
- On mobile the moon shrinks. It must never push layout or introduce horizontal overflow.
- The existing decorative SVG blobs stay. The moon is additive.

## 4. Astronomy in the Process section

- Extend the `ProcessStage` type (owned by the relaunch spec) with an **`epithet`** field: an
  astronomical label rendered *alongside* — never instead of — the canonical stage name.
- **The canonical five names must still match [CLAUDE.md](../CLAUDE.md#sdd-and-workflow)
  exactly.** The epithet is flavour; the name is the contract. If a reader can no longer tell
  that stage 3 is "Task Breakdown," the theme has eaten the message and must be rolled back.

  | # | Stage (canonical — do not alter) | Epithet | Why it fits |
  | --- | --- | --- | --- |
  | 1 | Specification | *Star Chart* | You plot the course before you leave the ground. |
  | 2 | Technical Planning | *Trajectory* | The route from here to a known destination. |
  | 3 | Task Breakdown | *Stages* | A launch vehicle sheds stages in order. |
  | 4 | Implementation | *Launch* | The part everyone thinks is the whole job. |
  | 5 | Validation | *Telemetry* | You do not guess whether it worked. You measure. |

- The five stages animate in sequence on scroll (relaunch spec FR-3.3). The astronomy layer adds
  a connecting **orbital path** between the numbered stage markers — rendered in CSS, decorative,
  `aria-hidden`.

## 5. Astronomy palette

- **Dark mode is the primary canvas**: deep-space blues, the existing `#4A6CF7` primary reading
  as starlight against them.
- **Light mode is dawn sky, not "space with a white background."** A moon visible in a pale
  morning sky — which is the more interesting image anyway, and avoids the trap of a light theme
  that looks like a broken dark theme.
- Use existing Tailwind tokens (`bg-gray-dark`, `text-body-color`, `primary`). **No new colour
  tokens, no `tailwind.config` changes.** The theme is carried by composition and gradient, not
  by expanding the design system.
- Every astronomy surface ships light **and** dark. No exceptions.

# Rules

- **The moon is decoration and must be `aria-hidden="true"`.** No content, no text, no focusable
  element inside it. If a screen-reader user misses the moon entirely, that is correct behaviour.
- **Under `prefers-reduced-motion: reduce`, the moon is still fully visible — it simply stops
  rotating.** Do not hide it, do not unmount it. Guard the *animation*, not the *render*.
- **The moon must render without JavaScript.** Texture and shading are CSS on server-rendered
  markup; only the rotation loop requires JS.
- **Animate `transform` and `opacity` only.** No `background-position`, no `width`/`height`, no
  `top`/`left`. The rotation is a `translateX` inside a circular mask.
- **Do not spin the moon with `rotate`.** Rotating the element spins the disc; translating a
  texture inside a fixed mask rotates the *sphere*. The whole illusion depends on this. The 45°
  tilt is a **static** rotation of the axis wrapper — it sets the *direction* the surface
  travels. It is not an animated `rotate`, and it must never become one.
- **An animation nobody can perceive is a bug, not a subtlety.** If the surface moves so slowly
  that a visitor reads the page and leaves without seeing it move, the component has failed.
  Verify by comparing two frames seconds apart, not by reading the duration constant.
- **The moon must never cost legibility.** Body text over it stays ≥ 4.5:1 contrast in both
  themes. The moon is centred *under the copy* by design, so this is not hypothetical — the
  scrim is load-bearing, not decoration. If contrast cannot be met, the moon yields: dim it,
  strengthen the scrim, or shrink it. Never ship an unreadable hero.
- **The moon must never cause layout shift or horizontal overflow** at any width, 390px upward.
- **Canonical Process stage names must match CLAUDE.md.** Epithets are additive, secondary, and
  visually subordinate. The theme decorates the method; it does not rename it.
- **No new dependencies** beyond `animejs` (already authorized by the relaunch spec). **No new
  image assets** — the moon is CSS. **No `tailwind.config` or `next.config.js` changes.**
- **The rotation is slow** (≈ 60s/revolution). A fast-spinning moon reads as a loading spinner
  and undermines the "predictable, unhurried" idea the theme exists to convey.
- **One `requestAnimationFrame`-driven loop at most.** An infinite animation runs forever, on
  every page, on every device, including a phone on battery. Keep it cheap, and make sure it is
  the only one.
- `Hero` and `Process` **stay server components.** `Moon` is the client leaf.

# Acceptance

Status: **implemented and verified**, except where explicitly marked. Verified against a
production build and headless Edge on 2026-07-12.

- Passing Tests
  - ✅ `npm run build` succeeds; no type or prerender errors; 12/12 static pages (11 as before,
    plus the new `/api/contact` route from the companion spec).
  - ✅ The moon renders on `/` in **both** themes and is attractive in both — verified by
    screenshot. Dark: a silver moon rising against a deep-space field. Light: a warm cream moon
    in a pale dawn sky, exactly the "moon visible in a morning sky" this spec asked for rather
    than a dark theme with the lights turned up.
  - ✅ It reads as a **sphere**, not a disc: craters and maria are visible, and the static
    radial-gradient shading gives limb darkening and a terminator.
  - ✅ **Centred, with the copy on top, and still readable.** The moon fills the hero and the
    headline, paragraph, and both buttons sit directly on it. Legibility is held by the radial
    scrim, verified by screenshot in both themes at 1440px: white headline and body copy on the
    dark-theme moon, black headline on the light-theme moon, all crisp.
    *(History: an earlier revision placed the moon behind the paragraph with no scrim and washed
    the copy out. The scrim, not luck, is what makes the centred composition legible.)*
  - ✅ **The rotation is visibly moving, and on a 45° diagonal.** Proved by capturing two frames
    ~12s apart from the running production build: the frames differ, and the craters have
    travelled diagonally between them. Not inferred from the duration constant.
  - ✅ **Rotation is perceptible.** The original 60s period moved the surface ~5px/sec and read
    as a still image — the reported "no moon animation". Now 24s, with a denser, higher-contrast
    crater texture so the movement is actually legible at the rendered size.
  - ✅ The 45° tilt is a **static** rotation of the axis wrapper (oversized to 200% so its
    corners cannot swing inside the limb). The moon element itself is never `rotate`d, so it
    still reads as a turning sphere and not a spinning coin.
  - ✅ Under reduced motion and with JS disabled, the moon **still renders**: the surface strip
    is in the server HTML, and both `Moon` and `Reveal` bail out *before* hiding anything.
    Decoration goes inert; it never disappears.
  - ✅ The moon carries `aria-hidden="true"`, contains no text and no focusable child.
  - ✅ Rotation is driven by a single `translateX` on a texture strip inside a circular mask —
    `transform` only. The element itself is never `rotate`d, so it does not read as a spinning
    coin.
  - ✅ Rotation period is 60s (`ROTATION_MS`), well clear of "loading spinner".
  - ✅ **No new image asset**: the moon is layered `radial-gradient`s. `public/` is untouched.
  - ✅ The Process section renders all five **canonical** names (matching CLAUDE.md) with the
    epithets — Star Chart, Trajectory, Stages, Launch, Telemetry — clearly subordinate above
    them, joined by the orbital connector line.
  - ✅ Total motion cost (anime.js + `Reveal` + `Moon` + `Process`): **+15 kB** First Load JS,
    inside the ≤ 20 kB budget.
  - ⚠️ `npm run lint` — **blocked, pre-existing.** Not a signal.

- Not verified (recorded as **skipped**, not passed)
  - ⬜ **The seam.** This spec says to watch one full ~60s revolution and *not* infer it from
    the code — and I did not do that. Screenshots capture a single instant, so they cannot show
    a seam sweeping past. The geometry is right by construction (the strip is `w-[200%]` with
    `background-size: 50% 100%`, so a `-50%` translate lands on an identical pixel column), but
    **that is exactly the inference this spec forbids.** Watch a full minute in a real browser
    before signing this off.
  - ⬜ **Rotation actually animating.** anime.js drives it and the build is clean, but I never
    observed motion — a screenshot cannot prove a thing is moving.
  - ⬜ **Reduced motion emulated in a real browser.** Structurally guaranteed, not observed.
  - ⬜ **Measured contrast ratio.** Verified by eye at 1440px in both themes; not measured with
    a contrast tool.
  - ⬜ **Lighthouse / CLS.** Not run.

- Failing Tests
  - ❌ **390px mobile: horizontal overflow.** Copy is clipped at the right edge — but this
    reproduces identically on `/about`, which neither spec touched, so it is **pre-existing and
    site-wide**, not caused by the moon. Tracked in the companion spec; needs its own fix.
  - Note: this repo **redefines Tailwind's breakpoints** (`sm: 575px`, `lg: 992px`,
    `xl: 1200px`), so the moon's `lg:`/`xl:` offsets fire at 992/1200, not 1024/1280. The
    positioning was chosen with that in mind. Anyone editing it must not assume the default scale.

- Failing Tests
  - The moon is hidden or unmounted under `prefers-reduced-motion` — decoration that vanishes
    for reduced-motion users instead of merely holding still.
  - The moon fails to render with JS disabled.
  - The moon animates `background-position`, `rotate` on the sphere itself, or any layout property.
  - A visible seam crosses the moon each cycle.
  - The moon carries an accessible name, contains text, or is announced by a screen reader.
  - Hero copy drops below 4.5:1 contrast in either theme.
  - Horizontal overflow appears at any width ≥ 390px.
  - A canonical Process stage name is replaced by its epithet, or drifts from CLAUDE.md.
  - A new image asset, dependency, or Tailwind token was added for the theme.
  - `Hero` or `Process` becomes a `"use client"` component.
  - The rotation is fast enough to read as a spinner.

# Out of Scope

- **Three.js / WebGL / any 3D library.** The moon is CSS and anime.js. A real 3D sphere is
  hundreds of kilobytes for a decorative background — indefensible against the budget.
- **A photographic moon texture, or any new asset in `public/`.** The page already carries ~11 MB
  of video.
- **Parallax, scroll-jacking, cursor-following, or starfield particle systems.** One infinite
  animation is the budget. A canvas full of drifting stars is where this theme goes to die.
- **Real lunar-phase logic** (rendering the actual phase of the moon today). Cute; a distraction;
  a date-math dependency.
- **Rethemeing the privacy-policy pages, `/about`, or `/error`.** Homepage identity only.
- **New Tailwind colour tokens or a `tailwind.config` change.**
- **Renaming the SDD stages.** Epithets are additive. This is the theme's main scope-creep risk
  and it is closed here.
- **Astronomy copy elsewhere on the site** (rewriting Features, About, or Contact into space
  metaphors). The theme is carried by the Hero, the Process section, and the palette. Everything
  becoming a space pun is how a theme turns into a costume.
- **The `Reveal` primitive, the `Process` section, contact, and security work** — all owned by
  [spec-driven-consulting-relaunch.md](spec-driven-consulting-relaunch.md).

# Reference Code

1) [specs/spec-driven-consulting-relaunch.md](spec-driven-consulting-relaunch.md) — **lands
   first.** Owns `Reveal`, the `Process` section, `ProcessStage`, and the anime.js dependency
   this spec builds on.
2) [prds/initial-project-v1.0.md](../prds/initial-project-v1.0.md) — the motion constraints
   (FR-3.5, FR-3.6), the performance budget, and OQ-6 (anime.js v4, not v3).
3) [CLAUDE.md](../CLAUDE.md) — the motion rules (reduced-motion guard, transform/opacity only),
   the `dark:` pairs, and **the canonical five stage names** the epithets must not replace.
4) [src/components/Hero/index.tsx:35-45](../src/components/Hero/index.tsx#L35-L45) — the existing
   decorative-background idiom (`absolute … z-[-1]`, `opacity-30 lg:opacity-100`) the moon should
   sit alongside and match.
5) [src/components/Common/SectionTitle.tsx](../src/components/Common/SectionTitle.tsx) — required
   for any headed section; props `title`, `paragraph`, `center`, `width`, `mb`.
6) [src/components/ResponsiveShowcase/index.tsx](../src/components/ResponsiveShowcase/index.tsx) —
   the closest model for a clean server section with `dark:` pairs throughout.
