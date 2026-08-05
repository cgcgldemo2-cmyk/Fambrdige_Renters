# FamBridge Renter Frontend Agent Instructions

## Scope and precedence

These instructions apply to the entire repository.

- Read `AI_CONTEXT.md` completely before changing product behavior, business
  rules, renter/lessor flows, labels, or user-facing copy.
- Follow the user's current request first. More specific `AGENTS.md` files in
  subdirectories take precedence if they are added later.
- Inspect the current implementation before editing. Preserve existing user
  changes and avoid unrelated refactors.
- Do not stop after describing a requested implementation. Complete the change,
  validate it, and report any real blocker within the authorization granted by
  the user.

## Project context

This repository contains the Angular frontend for the FamBridge rental
platform. Phase 1 focuses on car-rental businesses.

Use this mental model:

- FamBridge is the software and API provider.
- The lessor is the rental business/operator and FamBridge client.
- The renter is the lessor's customer.
- FamBridge does not own or rent vehicles and is not a central marketplace.
- In Phase 1, renters pay the lessor directly through the lessor's payment
  account or QR code.
- Payment confirmation does not approve a booking. The booking remains
  `Pending Lessor Approval` until the lessor approves it.
- Renters must register and be approved before protected search or booking
  actions when the API requires approval.

Preferred terminology includes:

- Rental management platform
- Business-owned rental website
- Powered by FamBridge
- Booking request
- Direct payment to lessor
- Lessor payment QR
- Payment proof
- Pending lessor approval

Avoid language that says FamBridge owns vehicles, rents cars directly, holds
renter payments, or operates a marketplace. Do not use payout, settlement, or
disbursement language for the Phase 1 direct-payment flow.

The established visual direction is clean, modern, mobile-first, and
trust-focused:

```text
Primary: #ff4104
Dark:    #001621
```

Preserve the existing responsive design and component structure unless the
task explicitly requests a redesign.

## Project Identity

- Application: FamBridge Renters
- Framework: Angular 19.2
- Active repository: https://github.com/cgcgldemo2-cmyk/Fambrdige_Renters
- Current development branch: `feature/renter-api-integration-v2`
- Protected branch: `main`

Before modifying source code:

1. Confirm that the current branch is not `main`.
2. Use a focused feature branch for implementation.
3. Do not commit, push, merge, rebase, or force-push without explicit approval.
4. Do not discard unrelated existing changes.

## Angular implementation rules

- This is an Angular 19 project using standalone components.
- Prefer strict TypeScript interfaces over `any`.
- Keep API access in reusable services rather than duplicating `HttpClient`
  calls across components.
- Reuse the existing authentication/tenant interceptor and configuration.
- Keep components responsible for presentation and interaction; keep request
  construction, response validation, and API-to-view-model mapping in services.
- Preserve existing routes, query parameters, UI behavior, and public
  component contracts unless the requested change requires an intentional
  update.
- Do not redesign or reformat unrelated screens.
- Use existing shared components and styles before creating duplicates.

Environment rules:

- Build API URLs from the active files under `src/environments/`.
- Inspect `angular.json` and current imports before deciding which environment
  file is active.
- Treat `src/environment/environment.example.ts` as a possible legacy example;
  do not create or maintain competing environment systems without evidence that
  both are required.
- Keep base URLs and non-secret endpoint paths in environment configuration.
- Never hardcode credentials, bearer tokens, client secrets, private API keys,
  or real Stripe secret keys.

## API integration rules

The Google Sheet described below is the source of record for the FamBridge
Phase 1 API inventory. Review the matching endpoint row before integrating or
changing an API call.

For every API integration:

1. Confirm the HTTP method, path, authentication, tenant requirements, request
   parameters, response envelope, billing rule, and known status in the tracker
   and source code.
2. Inspect a real response or authoritative backend documentation when
   available. Do not invent a response contract from UI mock data.
3. Define typed request, response, and view-model interfaces.
4. Use `HttpParams` or an equivalent safe encoder for query parameters.
5. Send optional parameters only when they have meaningful values.
6. Parse the real response envelope. For the available-vehicles endpoint, the
   expected vehicle array is nested at `data.vehicles`.
7. Treat HTML, landing-page text, malformed JSON, `success: false`, or a missing
   required response structure as an API error. Do not silently turn a broken
   response into a valid empty result.
8. Keep loading, error/retry, empty, and success states distinct in the UI.
9. Preserve local date/time intent when constructing `starts_at` and `ends_at`;
   avoid unintended UTC or calendar-date shifts.
10. Prefer backend-calculated totals when supplied. Calculate a fallback only
    when the contract permits it.
11. Do not log secrets, access tokens, passwords, OTPs, full payment-card data,
    or sensitive identity-document values.

Existing frontend calls may still use legacy API paths. Do not silently change
an established working endpoint merely to version it. When a task also requires
a new backend route:

- Add the new route under the `/api/v1/` prefix.
- Keep every existing/legacy route active and working.
- Do not comment out, delete, rename, or repurpose an old route.
- Use a distinct prefix and route name to prevent conflicts.
- Keep new Laravel API routes organized by concern, such as `public`, `auth`,
  `renter`, `landlord`, and `system-admin`.

Use placeholders in documentation and sample requests:

```text
{{domain}}
Authorization: Bearer {{token}}
```

Never place a real credential in a cURL example, source file, test fixture,
commit, issue, or tracker cell.

## API inventory Google Sheet

Canonical spreadsheet:

- Title: `FamBridge Phase 1 API Endpoints`
- URL:
  `https://docs.google.com/spreadsheets/d/1Nkc-DLbW61rdPKhM7iuNDxlCp5-LEgqCXyWv2x-Lw0I/edit`
- Spreadsheet ID: `1Nkc-DLbW61rdPKhM7iuNDxlCp5-LEgqCXyWv2x-Lw0I`

Use this canonical spreadsheet, not the `-bak1` backup.

The spreadsheet has three tabs.

### Phase 1 Endpoints

This tab is the API contract and delivery inventory. Its columns are:

1. Route Name
2. Request Method
3. Endpoint
4. Purpose
5. Sample CURL Request
6. Repo
7. Branch Name
8. Route File
9. Controller / Handler
10. Service / Action
11. Model / Table
12. Billing Rule
13. Implementation Status
14. PR / Commit / Notes
15. Documentation Link

Before adding a row, search by HTTP method and endpoint. Update the existing row
when it already represents the same contract; do not create duplicates.

For a frontend-only integration:

- Keep the authoritative backend method, endpoint, route file, controller, and
  model/table information already recorded.
- Add the frontend repository or integration details without replacing correct
  backend ownership.
- Record the Angular service/component in notes or in `Source Code Tracking`.
- Use `N/A - frontend` only when a field truly does not apply and no backend
  value is already known.

Sample cURL requests must be complete and ready to copy, but must use
`{{domain}}`, `{{token}}`, and safe sample values.

### Source Code Tracking

This tab maps an API area to its implementation. Its columns are:

1. Module / Area
2. Repo
3. Branch Name
4. Route File
5. Controller / Handler
6. Service / Action
7. Model / Table
8. Implementation Status
9. Developer Notes
10. Test / Validation

For frontend work, record:

- Repo: `cliterato/FambrdigeRenters`
- The actual feature branch
- Angular route file when relevant
- Component as the handler
- Angular service and action/method
- `N/A - frontend` for a model/table only when no backend model is involved
- The exact build, test, and runtime validation performed

Update the matching module row when one exists; otherwise add one focused row.

### API Change Log

Append one row for every implemented API contract change, route refactor, or
frontend API integration before merge. Its columns are:

1. Date
2. Repo
3. Branch Name
4. Commit / PR Link
5. Change Summary
6. Affected Endpoint(s)
7. Status
8. Reviewer / Notes

Use the actual branch and commit/PR link when available. If the change is not
committed yet, leave the link blank and update it after the commit instead of
inventing a hash or URL.

### Tracker update workflow

For any task that adds, changes, removes, deprecates, or integrates an API:

1. Read the relevant tracker row before coding.
2. Implement and validate the change.
3. Update `Phase 1 Endpoints`.
4. Update `Source Code Tracking`.
5. Append the corresponding `API Change Log` row.
6. Preserve existing formulas, formatting, dropdowns, links, and validation.
7. Match the sheet's existing status vocabulary.
8. Never mark an endpoint `Working`, `Merged`, or `Deployed` without evidence.
9. Link detailed API documentation, normally the matching
   `docs/admin-onboarding.md` GitHub anchor, when it exists.

If Google Sheets access is unavailable, do not guess and do not block the code
change. Return the exact paste-ready values for all affected tracker rows in the
final report and clearly state that the live sheet was not updated.

## Documentation rules

API-facing work should include or update documentation for:

- Method and route
- Purpose and authentication
- Headers, path parameters, query parameters, and request body
- Sample cURL request
- Example success response
- Important validation and error responses
- Billing/credit behavior when applicable
- Source route file, handler/controller, service/action, and model/table
- Feature branch and commit/PR reference

Preserve existing documentation anchors. Use `{{domain}}` and
`Authorization: Bearer {{token}}` in examples.

When the authoritative API documentation lives in the backend repository and
is outside the current checkout, report the exact documentation section that
must be updated rather than fabricating a local backend file.

## Security and privacy

- Never open, print, copy, expose, or modify private-key contents, including
  files under `Cloudflare SSL/`.
- Do not commit secrets or real credentials to any environment file.
- Use empty values or obvious placeholders in example environment files.
- Do not expose API logs, renter documents, identity numbers, access tokens,
  passwords, OTPs, or payment details in UI errors or console output.
- Store document files through the approved backend/storage workflow; never
  convert sensitive files to base64 for persistence.
- Before committing, search the changed files for secret-key patterns and
  inspect the staged diff.

## Validation

For implementation changes:

1. Review `git diff` and confirm only task-related files changed.
2. Run relevant focused tests when available.
3. Run the production build:

   ```bash
   npm run build -- --configuration production
   ```

4. When network access permits, test affected API URLs and verify HTTP status,
   `Content-Type`, and the JSON structure.
5. Exercise loading, error, retry, empty, and success states for API-backed UI.
6. Report existing warnings separately. A warning is not a failed build, but
   never claim success when a command exits nonzero.
7. Confirm that the protected remote branch was not modified.

## Required final report

For API-facing implementation work, report:

1. Outcome
2. Feature branch and commit/push status
3. API route(s) used or changed
4. Angular component(s), service(s), and method(s) changed
5. Sample cURL request
6. Google Sheet rows updated, or paste-ready row values if access was blocked
7. Documentation updated or still required
8. Build, test, and runtime/API validation results
9. Existing warnings and unresolved blockers
10. Confirmation that `RentersMasterBranch` was not modified remotely
