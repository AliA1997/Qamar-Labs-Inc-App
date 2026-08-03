# PRD — Qamar Labs: Spec-Driven Development Studio (Initial Project, v1.0)

- **Status**: Approved, in delivery
- **Author**: Ali — Founding Engineer
- **Created**: 2026-07-12 · **Revised**: 2026-08-02
- **Product**: The Qamar Labs marketing site
- **Downstream specs**, in order:
  [1-update-website-with-new-mission.md](../specs/1-update-website-with-new-mission.md) (the new
  mission, ResponsiveShowcase, autoplay video),
  [2-spec-driven-consulting-relaunch.md](../specs/2-spec-driven-consulting-relaunch.md)
  (positioning, contact security, motion, and the moon identity), and
  [3-specification-grading-rubric.md](../specs/3-specification-grading-rubric.md) (the rubrics
  page). This document says *why* and *for whom*; those specs say *how*.

> **About the team.** Qamar Labs is one person: Ali, the founding engineer, who designs, builds,
> maintains, and sells the work — and builds the tools the site showcases. There is no separate
> engineering, design, or business function to hand decisions to. Everywhere this document would
> normally name a role, the owner is Ali. That single-operator reality is itself a product
> constraint: whatever ships has to be maintainable by one person, indefinitely.

---

## Problem Statement

Qamar Labs practises Spec-Driven Development for real — it is the discipline behind every change
in this codebase — and it builds working tools that come out of that discipline. **The website
communicates neither.** A visitor arrives and cannot tell what Qamar Labs sells, what it has
built, or how to reach the person behind it. Four gaps, in order of how much they cost:

1. **The method is invisible.** Spec-Driven Development is the whole offer, and the site reduces
   it to one bullet in a grid of generic values. Nothing shows what an engagement looks like,
   what happens first, or what a client receives at each step. The site describes *how Qamar Labs
   thinks* and never says *what it sells*.

2. **The tools are hidden.** Qamar Labs has shipped real, live tools — a Spec-Driven Development
   tool and others — and the site barely references them. For a studio whose credibility rests on
   *having built things the disciplined way*, hiding the built things is the most expensive
   omission of all. A prospective client's first question is "show me something real," and today
   the site cannot answer it.

3. **There is no way to reach a human, and the contact form is unsafe.** The site publishes no
   direct email address. The one contact form is wired so that the credential used to send mail
   is handed to every visitor's browser — a live security exposure — and it delivers to an
   address that was never configured, so messages may go nowhere. A developer who wants to reach
   a developer has no working, trustworthy path.

4. **The site shows no craft.** For a studio selling rigor and taste, a flat, motionless page is
   evidence against the pitch. The site is itself a work sample, and right now it undersells the
   work.

**In one sentence:** a technical buyer who is already inclined toward Spec-Driven Development
cannot tell from this site that Qamar Labs sells it, cannot see what it has built, and cannot
safely reach the person who built it.

---

## Users and Personas

The site serves prospective clients and fellow developers. It is read on a laptop, in a few
minutes, usually mid-evaluation against other options.

| Persona | Who they are | What they need from the site | What stops them today |
| --- | --- | --- | --- |
| **The technical founder** | Runs a small startup; has been burned by a build that shipped the wrong thing. Evaluating a few firms. | Proof that requirements get pinned down *before* code, and a believable picture of what week one looks like. | The method is one value card. No process, no engagement shape, no next step. |
| **The hands-on engineering lead** *(primary)* | Senior engineer sent to vet the studio. Skims copy, opens the code, judges the site's own craft as a work sample — and **will not fill in a marketing form.** | Technical substance, real artifacts they can inspect, working tools they can click into, and a **direct human email.** | No address exists on the site. The only channel is a form, which is a black box — and a leaky one. |
| **The tool-curious developer** | Found or was sent a Qamar Labs tool. Wants to try it and see what else exists. | A clear list of the tools, what each does, and a live link to each. | The tools are effectively unlisted; there is nowhere to discover them. |

**Design for the engineering lead.** They are the hardest to convince, the one who kills deals,
and the one who refuses forms. Satisfying them — real tools to click, a spec they can read, a
plain email address — satisfies the other two for free.

**Accessibility is a requirement, not a nicety.** The site's own copy promises access "for people
using assistive technology … never a later enhancement." Any motion the site adds is therefore
held to that promise: a visitor who asks their system for reduced motion, or who has JavaScript
disabled, must lose nothing but the animation. Breaking that would make the site contradict the
very standard it sells.

---

## Functional Requirements

Grouped by theme, prioritized **P0** (v1.0 is not done without it) / **P1** (v1.0 target) /
**P2** (desirable, first to be cut). These state *what must be true*, not how to build it — the
specs own the how.

### FR-1 — Position Qamar Labs as a Spec-Driven Development studio

- **FR-1.1 (P0)** — The homepage names, up front, that Qamar Labs practises Spec-Driven
  Development. A visitor learns the offer in the first screen, not by inference.
- **FR-1.2 (P0)** — The site presents the method as an ordered, named sequence a client would
  move through, with a plain-language description and a concrete deliverable at each stage. **The
  stages shown are the stages actually practised** — the site and the internal process may never
  diverge.
- **FR-1.3 (P1)** — The site shows what a real specification contains, so a visitor can see the
  actual work product rather than only hear it described — with emphasis on the parts that
  control scope (how "done" is agreed, and what is deliberately excluded).
- **FR-1.4 (P1)** — The existing value grid is re-pointed from generic cooperative values to the
  studio's actual capabilities.

### FR-2 — Showcase the tools *(new in this revision)*

- **FR-2.1 (P0)** — The site presents the tools Qamar Labs has built as first-class evidence,
  each with a name, a one-line description of what it does, and a **live link** to a working
  instance. The tools are the strongest proof the method produces real software.
- **FR-2.2 (P0)** — **Spec-Driven Development tools get top billing.** They are the method made
  tangible — the argument of the whole site, demonstrated rather than asserted. Other tools are
  presented alongside, clearly as additional work.
- **FR-2.3 (P1)** — Where a tool has a device recording, the site shows it running, silently and
  without a play bar, so a visitor sees the tool work without leaving the page.
- **FR-2.4 (P1)** — The showcase is built to grow. Adding the next tool is a content edit, not a
  redesign, so the list can keep pace with what Ali ships.
- **FR-2.5 (P2)** — A short note on *how* each tool was built (spec-first), tying the showcase
  back to the method in FR-1.

### FR-3 — A safe, direct line to the developer

- **FR-3.1 (P0)** — A single developer address (`dev@qamarlabsllc.com`) is published as plain,
  selectable, clickable text in the places a visitor looks for contact. Never an image, never
  obfuscated, never gated behind a form. The primary persona will not fill in a form; the address
  is the product.
- **FR-3.2 (P0, security)** — **It must be impossible for a site visitor to recover the
  mail-sending credential from anything the browser downloads.** This is the single
  highest-priority item in the PRD and is a defect fix independent of everything else. A site that
  ships the credential fails, however good it looks.
- **FR-3.3 (P0)** — The contact form reliably delivers to the developer address, and delivery is
  verified end-to-end at least once against a real inbox before launch. A success message is not
  proof; a received email is.
- **FR-3.4 (P1)** — When the form fails, its error state still shows the direct address, so a
  broken send never costs a lead. This is the failure mode the site currently handles worst.
- **FR-3.5 (P1)** — Every submission is validated on the server, not only in the browser. Anything
  the browser sends is untrusted.
- **FR-3.6 (P2)** — Basic abuse mitigation, since a public contact path attracts bots.

### FR-4 — Demonstrate craft, without excluding anyone

- **FR-4.1 (P1)** — The site carries a distinctive, considered visual identity and motion that
  reads as taste, not decoration — evidence of the craft the studio sells.
- **FR-4.2 (P0, accessibility)** — All content is fully readable and usable for visitors who
  request reduced motion and for visitors without JavaScript. Motion is enhancement; content never
  depends on it having run. Nothing is ever left invisible in the name of "respecting" a setting.
- **FR-4.3 (P0)** — Motion never degrades reading: text stays legible over any background art in
  both light and dark themes, and animation never shifts layout.

### FR-5 — Hold the line on quality

- **FR-5.1 (P0)** — Every surface works in both light and dark themes and from a narrow phone to a
  desktop. No exceptions.
- **FR-5.2 (P0)** — The site keeps building cleanly and stays maintainable by one person: no new
  heavy dependencies, no speculative complexity, existing working content preserved.

---

## User Stories (Given / When / Then)

**US-1 — The engineering lead reaches a human without a form** *(FR-3.1)*
> **Given** I am evaluating Qamar Labs and refuse to submit a marketing form,
> **When** I look for a way to make contact,
> **Then** I find a plain developer email address I can select, copy, and click to open my mail
> client — no form required.

**US-2 — The tool-curious developer finds something real to click** *(FR-2.1, FR-2.2)*
> **Given** I want proof this studio ships, not just talks,
> **When** I reach the tools showcase,
> **Then** I see the Spec-Driven Development tools first, each named and described, each with a
> live link I can open, and I can try one within a click.

**US-3 — The founder understands what an engagement looks like** *(FR-1.2)*
> **Given** I was burned by a vendor that built the wrong thing,
> **When** I read the homepage,
> **Then** I find the method laid out as named, ordered stages with a deliverable at each, and I
> can describe week one of working with Qamar Labs without contacting anyone.

**US-4 — A message actually arrives, and no secret leaks** *(FR-3.2, FR-3.3, FR-3.5)*
> **Given** I fill in the contact form correctly,
> **When** I submit it,
> **Then** my message is delivered to the developer, **and** nothing I could inspect in my browser
> reveals any credential.

**US-5 — The form fails and I am not lost** *(FR-3.4)*
> **Given** the send fails for any reason,
> **When** I submit,
> **Then** the error still shows me the direct email address, and I can reach Qamar Labs anyway.

**US-6 — A motion-sensitive visitor gets the whole site** *(FR-4.2)*
> **Given** my system is set to reduce motion, or JavaScript has not run,
> **When** I load the site,
> **Then** every piece of content is fully visible and legible, and nothing is stuck hidden or
> mid-animation.

**US-7 — The craft speaks for itself** *(FR-4.1, FR-4.3)*
> **Given** I judge the studio's own site as a work sample,
> **When** I load it with motion enabled,
> **Then** it feels composed and intentional, and never at the expense of being able to read it.

---

## Constraints

### Technical

- **Maintainable by one person.** Every choice is weighed against Ali maintaining it alone for
  years. Complexity is a recurring cost, not a one-time one.
- **Stays a fast, server-rendered, static-leaning site.** Content must be present in the delivered
  page without depending on client-side scripting.
- **No credential ever reaches the browser.** Anything requiring a secret runs on the server.
- **Minimal dependencies.** One motion library is the only sanctioned addition for v1.0; nothing
  heavy (no 3D engines, no analytics stacks) enters without its own decision.
- **Content lives with the code**, editable directly. No CMS to operate.
- **Assets are local and must exist before they are referenced.**
- **Quality is verified by build plus a human looking at the page.** There is no automated test
  suite, and this PRD does not add one — inventing test commands would be dishonest. See Testing
  Strategy.

### Business

- **Solo operation.** Ali is engineer, designer, and decision-maker. Scope must fit one person,
  and every "owner" in this document is Ali.
- **Voice:** plain, declarative, cooperative-first. No growth-hacking register.
- **The site must not out-claim reality.** It describes the method actually practised and the
  tools actually shipped — nothing aspirational dressed as done.
- **The developer address must be monitored before it is published.** An unwatched address turns
  a silent failure into a broken promise. Launch gate.

### Performance

- **Craft may not cost speed.** Motion and identity work stay within a tight page-weight budget;
  animation must not shift layout.
- **Tool recordings are already heavy**, so the tools showcase must be mindful of what it loads.
- **Strong scores are the bar:** fast load and high accessibility on the homepage, on mobile.

---

## Success Metrics

Measured against a baseline captured before work began (homepage ≈ 1.8 kB route payload,
≈ 138 kB first load; captured 2026-07-12).

| # | Outcome | Baseline | Target | How we know |
| --- | --- | --- | --- | --- |
| SM-1 | The developer address is reachable on the site | 0 places | Present in every place a visitor looks for contact | Visit the pages; the address is live, selectable text |
| SM-2 | No mail credential is recoverable from the shipped site | Exposed to every visitor | Not present anywhere the browser can reach | Inspect the delivered client code for the credential; expect none |
| SM-3 | Contact messages actually arrive | Unverified; destination never configured | Every valid message delivered; proven once end-to-end | Send a real message; confirm it lands in the real inbox |
| SM-4 | The method is stated as its real, named stages | Not stated | Named and ordered on the page, matching the practice | Read the page against the documented process |
| SM-5 | Built tools are showcased with live links | Effectively hidden | Each tool named, described, and linked to a working instance | Open each link; the tool loads |
| SM-6 | Content survives reduced motion and no-JS | N/A | 100% of content visible and legible in both conditions | Emulate reduced motion and disable JS; nothing is hidden |
| SM-7 | Craft is added without hurting load or stability | Baseline load; no motion | Within the page-weight budget; no layout shift | Compare payload to baseline; measure layout stability |
| SM-8 | The site keeps building and stays maintainable | Builds today | Still builds; only the one sanctioned dependency added | Build succeeds; dependency list reviewed |

**Deliberately not claimed:** lead volume, conversion, or time-on-page. The site has no analytics
and none is in scope, so any such number would be unfalsifiable. This PRD does not pretend to move
a metric it cannot measure.

---

## Out of Scope

- **Analytics, tracking, A/B testing, cookie consent.** None installed; adding it brings consent
  obligations. A later decision.
- **A CMS.** Content stays with the code.
- **A blog, testimonials, pricing, or a client portal.** Not for v1.0.
- **A full application platform.** The tools showcase *links to* live tools; it does not host,
  authenticate, or embed a backend for them. Each tool remains its own deployment.
- **Building new tools.** v1.0 showcases what already exists; shipping the next tool is its own
  work.
- **Publishing rates or engagement pricing.**
- **Heavy visual tech** (3D/WebGL) or scroll-jacking.
- **Multi-language / right-to-left.** English-only today.
- **Re-theming the secondary pages** (about, error, privacy policies) beyond what contact requires.
- **Introducing an automated test suite.** A real decision with real cost; not smuggled in here.

---

## Open Questions → Decisions

Every question carries a decision, a rationale, and an owner. The owner is Ali; the column records
who *else* would need to weigh in, which is no one.

| # | Question | Decision | Rationale |
| --- | --- | --- | --- |
| **OQ-1** | Can mail be sent from the server so the credential never reaches the browser? | **Yes — verified.** The mail library detects a server environment and sends from there. If it had not, the fallback was a direct server-to-provider call. Either way the secret stays server-side. | This was the one blocking unknown; it was answered first, before any UI work. Resolved. |
| **OQ-2** | Which domain is canonical for contact — `qamarlabsllc.com` or `qamarlabs.com`? | **`qamarlabsllc.com`.** The one stray `qamarlabs.com` address in a privacy policy has been corrected to match. | Every other address already agreed on `qamarlabsllc.com`. Ali made this call directly. Resolved. |
| **OQ-3** | Keep the contact form at all, now that a direct address is prominent? | **Keep it, fixed, with the address equally visible.** The founder persona will use a form; the engineering lead will not. Serve both. | The form already exists and works; the defect was in delivery, not the form. Cheap to keep. |
| **OQ-4** | Is the method a new section, or a rewrite of the value grid? | **New section for the method; the value grid stays and is re-pointed.** They answer different questions — *how we work* (a sequence) vs *what you get* (capabilities). Collapsing them loses the sequence, which is the pitch. | |
| **OQ-5** | Which tools ship in the showcase for v1.0, and how are they presented? | **The two already built and recorded** — the Spec-Driven Development tool (top billing) and one other tool — each named, described, and linked to its live deployment, with its recording where one exists. | Uses assets on hand; does not block the release on building anything new. The showcase is structured to grow (FR-2.4). |
| **OQ-6** | Does the site publish pricing? | **No.** Not in v1.0. | Publishing rates not yet committed to is worse than publishing none. |
| **OQ-7** | How is reduced motion handled — skip the animation, or guarantee the content shows? | **Guarantee the content shows.** Content is never hidden as a *precondition* of an animation; if motion is declined, the content is simply already there and still. | Skipping only the animation, while leaving content hidden, makes it invisible forever for exactly the people who asked for less motion. Non-negotiable, and it is what keeps the site honest about its own accessibility claim. |
| **OQ-8** | Does adding motion turn the site into a client-rendered app? | **No.** Content stays server-rendered; motion is confined to small enhancement layers over it. | Keeps content in the delivered page (OQ-7 for free) and keeps the site maintainable and fast. |
| **OQ-9** | Is the moon identity worth the risk of text-over-art? | **Yes, with a guardrail.** The name *Qamar* means "moon"; the identity is the studio's own etymology, not decoration bolted on. Legibility is protected so copy always wins the pixels it sits on. | A theme rooted in the name reads as intent, not stock space art — provided the words stay readable. If they ever can't, the art yields. |
| **OQ-10** | Basic spam protection on the public contact path? | **Yes, lightweight, in v1.0.** | A public contact path attracts bots; a simple deterrent is cheap and proportionate for a solo operation. |

---

## Testing Strategy

There is no automated test suite, and this PRD does not add one. "Verified" means the site
**builds**, and a person **looks at it** — the discipline defined in the project's own validation
checklist. Every check is framed so it can be honestly marked passed, failed, or **skipped**; a
skipped check recorded as passed is worse than no check, because it spends trust that was not
earned.

The checks that actually gate a release, in plain terms:

- **The site builds** with no errors, and its page count does not regress.
- **No credential is recoverable** from anything the browser downloads. *(This gates the release
  outright — a leak fails it regardless of appearance.)*
- **A real message arrives.** Delivery is proven against a live inbox, and the server rejects a
  bad submission when the browser is bypassed. A success message alone is not proof.
- **The developer address is present and clickable** everywhere contact is offered, and it still
  appears when the form fails.
- **Reduced motion and no-JS both leave the whole site readable** — nothing hidden, nothing stuck.
  *(Highest-risk check; performed deliberately, not assumed.)*
- **The method on the page matches the method practised**, stage for stage.
- **Each showcased tool's link opens a working tool.**
- **Every surface is legible in both themes and from phone to desktop**, and craft/motion causes
  no layout shift.

What this does not cover — concurrency, provider reliability, deep regression of the secondary
pages — is accepted for a solo-run marketing site and named here so no one later mistakes this for
more than it is.

---

## Timeline

Phased so the highest-value and highest-risk work lands first, and each phase leaves the site
whole. Owner throughout: Ali. Estimates are calendar, part-time.

| Phase | Goal | Status |
| --- | --- | --- |
| **0 — De-risk** | Confirm mail can send server-side (OQ-1); capture a performance baseline; confirm the developer inbox is real and monitored. | ✅ Done — server-side send confirmed, baseline captured. Inbox monitoring is the remaining launch gate. |
| **1 — Contact & security** | Remove the credential exposure; publish the developer address; make the form deliver, validate on the server, and fall back to the address on failure. | ✅ Built. **Live delivery still to be verified against a real inbox (SM-3).** |
| **2 — Positioning** | State the method as named stages with deliverables; show what a spec contains; re-point the value grid. | ✅ Built. |
| **3 — Craft & identity** | Add the moon identity and motion, within budget, never at the cost of legibility, fully safe under reduced motion and no-JS. | ✅ Built. |
| **4 — Tools showcase** | Present the built tools with descriptions and live links; SDD tools first; recordings where available; structured to grow. | ⬜ **Next.** Assets are on hand (two recorded tools). |
| **5 — Validate & launch** | Full build + human validation pass; verify mail delivery end-to-end; confirm the tool links work. | ⬜ Pending Phase 4 and the delivery check. |

**Critical path to launch:** verify mail delivery end-to-end (SM-3) and confirm the inbox is
monitored — both currently open. **Do not launch** with the credential fix unverified against a
real inbox, or with a published address no one is watching.

**If time is short, cut in this order:** the "how it was built" tool notes (FR-2.5) → spam
mitigation (FR-3.6) → the spec-anatomy detail (FR-1.3). **Never cut:** the credential fix (FR-3.2),
reduced-motion/no-JS safety (FR-4.2), or legibility over art (FR-4.3). Those are correctness and
accessibility, not polish.
