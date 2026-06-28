# FamBridge Lessor App TODO

## Project Direction

FamBridge is not a car rental business.

FamBridge is not a marketplace.

FamBridge provides software and API services for existing rental businesses.

Phase 1 focuses on car rental businesses.

The renter app is a separate source code/build. This project is for the lessor/business owner side.

Routes should be simple:

```text
/login
/dashboard
/vehicles
/vehicles/new
/vehicles/:id/edit
/booking-requests
/reservation-fees
/renter-approval
/api-usage
/verification-credits
/reports
/settings
```

Do not use:

```text
/lessor-login
/lessor-dashboard
```

---

## Completed

```text
[x] Finalized business direction
[x] Finalized AI_CONTEXT.md
[x] Updated PROJECT_PLAN.md
[x] Finalized GOOSE_INSTRUCTIONS.md

[x] Created Lessor Login Page
[x] Added GSAP animation for login page
[x] Created Sidebar / Burger Menu Layout
[x] Created Dashboard Page

[x] Created Vehicle Management Page
[x] Created Add / Edit Vehicle Form

[x] Created Booking Requests Page

[x] Created Reservation Fees / Payment Confirmation Records Page
[x] Added direct payment to lessor QR/account model
[x] Added payment proof view
[x] Added multiple payment attempts/history
[x] Added notes timeline
    - Renter notes
    - System notes
    - Lessor notes

[x] Added Reject Payment flow
    - Shows textarea
    - Requires lessor reason
    - Adds note history
    - Does not cancel booking

[x] Added Cancel Booking flow
    - Shows textarea
    - Requires lessor reason
    - Adds note history
    - Separate from payment rejection

[x] Updated Reservation Fees layout
    - One-column booking/payment list
    - Click row/card to show detail below
    - Hide other records after selecting one
    - Detail actions visible only in detail panel
```

---

## Next Priority

```text
[ ] Renter Approval Page
[ ] Renter Approval Detail / Review Panel
[ ] Renter Documents Review
[ ] Renter Trust Profile Review
```

---

## Renter Approval Page

Purpose:

Allow the rental business owner/admin to review renters before they are allowed to book smoothly.

Tasks:

```text
[ ] Generate renter-approval component
[ ] Add route: /renter-approval
[ ] Wrap page with LessorSidebarComponent
[ ] Add page hero/header
[ ] Add summary cards
    - Pending Approval
    - Approved Renters
    - Rejected Renters
    - Need More Documents

[ ] Add renter approval list
[ ] Add search by renter name, Trust ID, email, or mobile
[ ] Add filter by approval status
[ ] Show renter Trust ID
[ ] Show renter name
[ ] Show email/mobile
[ ] Show trust score
[ ] Show submitted documents count
[ ] Show previous rental references
[ ] Show approval status

[ ] Add renter detail/review panel
[ ] Show renter profile information
[ ] Show trust score
[ ] Show verified documents
[ ] Show uploaded document placeholders
[ ] Show social references
    - Facebook
    - Instagram
    - TikTok

[ ] Add Approve Renter flow
[ ] Add Reject Renter flow with reason textarea
[ ] Add Request More Documents flow with reason textarea
[ ] Add lessor/admin notes timeline
```

Recommended route:

```text
/renter-approval
```

---

## API Usage Page

Purpose:

Show API request usage because FamBridge may charge clients based on API usage, subscription, or agreed pricing.

Tasks:

```text
[ ] Generate api-usage component
[ ] Add route: /api-usage
[ ] Add summary cards
    - Total API Requests
    - Successful Requests
    - Failed Requests
    - Estimated Usage Cost

[ ] Add current billing cycle section
[ ] Add endpoint usage breakdown
[ ] Add API logs preview
[ ] Add search/filter by endpoint, status, date
[ ] Add request details panel
[ ] Show request payload/response placeholder
[ ] Add privacy notice about API logging
```

Recommended route:

```text
/api-usage
```

---

## Verification Credits Page

Purpose:

Track verification credits if the verification workflow is enabled.

Tasks:

```text
[ ] Generate verification-credits component
[ ] Add route: /verification-credits
[ ] Add summary cards
    - Remaining Credits
    - Earned Credits
    - Used Credits
    - Deducted Credits

[ ] Add verification activity list
[ ] Add incorrect verification tracking
[ ] Add credit transaction history
[ ] Add filter by credit type/status
[ ] Add detail panel
```

Recommended route:

```text
/verification-credits
```

---

## Reports Page

Purpose:

Show business reports for the rental business.

Tasks:

```text
[ ] Generate reports component
[ ] Add route: /reports
[ ] Add report filters
    - Date range
    - Vehicle
    - Booking status
    - Payment status

[ ] Add booking requests report
[ ] Add vehicle performance report
[ ] Add reservation fee/payment confirmation report
[ ] Add API usage report
[ ] Add renter approval report
[ ] Add export button placeholder
```

Recommended route:

```text
/reports
```

---

## Settings Page

Purpose:

Manage rental business configuration.

Tasks:

```text
[ ] Generate settings component
[ ] Add route: /settings
[ ] Add business profile settings
[ ] Add logo upload placeholder
[ ] Add contact details
[ ] Add payment QR/account details
[ ] Add public website settings
[ ] Add API keys/client keys section
[ ] Add notification settings
[ ] Add save/cancel buttons
```

Recommended route:

```text
/settings
```

---

## Phase 1 Removed / Postponed

```text
[x] Remove Payouts Page from Phase 1
[x] Remove Settlement wording
[x] Remove Disbursement wording
[x] Remove Net Lessor Payout wording
```

Reason:

```text
Renter pays directly to the lessor-owned QR/account.
FamBridge does not hold renter money in Phase 1.
```

---

## Important Business Rules

```text
[ ] FamBridge must not look like the car rental company
[ ] FamBridge must not look like a marketplace
[ ] FamBridge is the software/API provider
[ ] Rental business owner is the operator
[ ] Renter is the customer of the rental business
[ ] Renter pays directly to lessor QR/account in Phase 1
[ ] Payment rejection does not cancel booking
[ ] Booking cancellation is separate
[ ] Reservation fee confirmation does not automatically approve booking
[ ] Booking remains Pending Lessor Approval until lessor approves it
```

---

## Suggested Build Order From Here

```text
1. Renter Approval Page
2. Renter Approval Detail / Review Panel
3. API Usage Page
4. Verification Credits Page
5. Reports Page
6. Settings Page
```
