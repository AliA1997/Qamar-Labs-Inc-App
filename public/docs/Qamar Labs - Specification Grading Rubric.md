# Specification Rubric
**Score is between 1 and 100** (Clarity 25 + Completeness 25 + Testability 20 + Consistency 20 + Appropriate Abstraction 10)

## 5 Dimensions of Spec Quality

### Clarity
- Terms defined, no ambiguity.

**Failing line:**
```text
The system should respond quickly and handle a reasonable number of users.
```
*"Quickly" and "reasonable" are undefined — two readers will implement two different systems.*

**Passing line:**
```text
Search requests MUST return within 200ms at p95 under a load of 500 concurrent users.
"Search request" = any call to the /search endpoint with a non-empty query parameter.
```

### Completeness
- All templates, all sections present, no [TBD] markers.

**Failing line:**
```text
## Error Handling
[TBD — ask backend team]
```

**Passing line:**
```text
## Error Handling
Invalid input returns a validation error listing each failed field.
Expired sessions redirect the user to login, preserving their draft input.
Open question: rate-limit threshold — owned by @platform-team, due 2026-08-15.
```
*Unknowns are allowed only when explicitly owned and dated — never a bare [TBD].*

### Testability
- Given/When/Then format, concrete examples with real data.

**Failing line:**
```text
When a user cancels their subscription, they should get some kind of confirmation.
```

**Passing line:**
```gherkin
Given user 7f3e9d2a-1c4b-4e8f-9a6d-2b5c8e1f0a3d has an active subscription
When they submit a cancellation on 2026-08-02T14:30:00Z
Then the subscription status becomes "cancelled"
And a confirmation email is sent within 5 minutes containing the end-of-service date 2026-09-01
```
*Real formats: UUIDs, ISO-8601 timestamps, exact status values.*

### Consistency
- Follows Claude constitution (Claude.md), matches existing API patterns.

**Failing line:**
```json
POST /createNewUser  →  { "user_name": "ali", "CreatedDate": "08/02/2026" }
```
*Invents verb-based endpoint, mixed casing, and non-ISO date — contradicts established conventions.*

**Passing line:**
```json
POST /users  →  { "userName": "ali", "createdAt": "2026-08-02T14:30:00Z" }
```
*Resource-based route, camelCase fields, ISO-8601 dates — matches existing API patterns in Claude.md.*

### Appropriate Abstraction
- WHAT, not HOW. No database/code details.

**Failing line:**
```text
Store users in a PostgreSQL `users` table with a B-tree index on the email column,
and cache lookups in Redis with a 15-minute TTL.
```

**Passing line:**
```text
The system MUST retrieve a user account by email address in under 100ms,
and email lookup MUST remain correct immediately after an email change.
```
*States the behavior and constraint; leaves storage, indexing, and caching to implementation.*

## How Dimensions Are Scored

### Clarity
- **(20–25)**: All terms defined, zero ambiguous language. Uses formats/patterns to define terms.
- **(15–19)**: Most terms defined, 1–2 need precision (reasonable limit).
- **(10–14)**: Multiple vague terms, but core concepts understandable.
- **(0–9)**: Ambiguity prevents understanding requirements.

### Completeness
- **(20–25)**: All sections present with substance, no [TBD] or well determined.
- **(15–19)**: All sections present, but 1–2 are thin.
- **(10–14)**: Missing 1 section or multiple thin.
- **(0–9)**: Multiple sections missing or mostly empty.

### Testability
- **(16–20)**: All scenarios in Given/When/Then. Examples use real formats (UUID, ISO-8601).
- **(12–15)**: Structured scenarios, but some examples use placeholders.
- **(8–11)**: Scenarios present but lack concrete or realistic data.
- **(0–7)**: No structured scenarios, only narrative descriptions.

### Consistency
- **(16–20)**: Matches all Claude.md conventions.
- **(12–15)**: Follows most conventions, 1–2 minor deviations.
- **(8–11)**: Multiple inconsistencies with existing API patterns.
- **(0–7)**: Introduces new patterns, contradicting established conventions.

### Appropriate Abstraction
- **(8–10)**: Pure WHAT/WHY, zero implementation details.
- **(5–7)**: Mostly WHAT, but 1–2 lines of implementation details.
- **(3–4)**: Multiple implementation references mixed with requirements.
- **(0–2)**: Reads like code documentation, not a behavioral spec.

## How the Agent Applies This Rubric

1. **Go through the specification section by section.** Score each section against all applicable dimensions before moving on — do not score the document in one pass.
2. **For each conflicting requirement, resolve in this precedence order:**
   1. **Constitution** — Claude.md constitution rules win over everything.
   2. **Conventions** — existing API patterns and naming conventions win next.
   3. **UX / Testability** — prefer the version that is more user-facing and testable.
   4. **Merge** — if still tied, merge both requirements into a single reconciled statement.
3. **Record a one-line rationale for each resolution.**
   Example: `"Chose camelCase over snake_case — conventions (rule 2) outrank the newer draft section."`
4. **Rescore the consolidated spec on all 5 dimensions before approval.** The final score reflects the resolved document, not the original draft.