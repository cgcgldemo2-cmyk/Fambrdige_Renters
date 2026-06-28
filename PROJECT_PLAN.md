# FamBridge Rental Platform - Project Plan

## Current Project Direction

FamBridge is not a car rental business.

FamBridge is not a marketplace.

FamBridge provides software and API services for existing rental businesses.

Phase 1 focuses on car rental businesses.

The goal is to help existing car rental businesses digitize their process using FamBridge software and FamBridge API.

The rental business owns the operation, vehicles, customers, payment accounts, approvals, and transactions. FamBridge provides the software, API, logging, automation, and support system.

## Phase 1 Focus

Phase 1 is focused on:

```text
Car Rental Business Software
```

FamBridge will provide tools for car rental businesses to manage:

* Public rental website
* Vehicle listings
* Vehicle availability
* Renter registration
* Renter approval
* Booking requests
* Reservation fee flow
* Direct payment tracking
* Lessor-owned payment QR/account display
* Payment proof and payment reference records
* Lessor payment confirmation
* Lessor approval flow
* Renter document collection
* Renter trust profile
* Insurance information display
* Booking status
* Admin dashboard
* API request logs
* API usage tracking
* Reports and transactions

## Project Name

Angular frontend project name:

```bash
fambridge-rental-platform
```

Create project using:

```bash
ng new fambridge-rental-platform --routing --style=scss
```

When asked for SSR/SSG:

```text
No
```

When asked for AI tool configuration:

```text
None
```

## Important Route Rule

This Angular project/build is for the rental business / lessor side.

Routes should not include `lessor` prefix.

Correct routes:

```text
/login
/dashboard
/vehicles
/vehicles/new
/vehicles/:id/edit
/booking-requests
/reservation-fees
/api-usage
/verification-credits
/reports
/settings
```

Avoid routes like:

```text
/lessor-login
/lessor-dashboard
/lessor-booking-requests
```

Component and folder names may still include `lessor` internally if needed, but public routes should stay clean.

## Recommended Folder Structure

```text
src/app/
  core/
    services/
    guards/
    interceptors/

  shared/
    components/
      lessor-sidebar/
      public-header/
      vehicle-card/
      filter-panel/
      booking-panel/
      trust-profile-card/

  pages/
    lessor-login/
    lessor-dashboard/

    vehicles/
    vehicle-form/
    booking-requests/
    reservation-fees/
    api-usage/
    verification-credits/
    reports/
    settings/

    renter-verification-gate/
    renter-login/
    renter-profile/
    renter-documents/
    vehicle-search/
    booking-request/
    reservation-fee/
    booking-status/

    lessor-public-page/
    lessor-public-header/
```

## Current Completed Items

```text
[x] AI_CONTEXT.md
[x] PROJECT_PLAN.md
[x] GOOSE_INSTRUCTIONS.md
[x] Lessor Login Page
[x] Sidebar / Burger Menu
[x] Dashboard Page
[x] Vehicle Management Page
[x] Add / Edit Vehicle Form
[x] Booking Requests Page
[x] Reservation Fees Page
```

## Development Priority

Build frontend pages first using mock data.

Do not connect to the backend yet until the UI flow is stable.

Current priority order:

1. Lessor login
2. Sidebar / burger menu layout
3. Dashboard
4. Vehicle management
5. Add / edit vehicle form
6. Booking requests
7. Reservation fees / payment confirmation records
8. API usage
9. Verification credits
10. Reports
11. Settings

## Page 1: Lessor Login

Purpose:

Login page for rental business owners/admin users.

Design:

* Business software themed
* FamBridge branding
* Not marketplace-themed
* Not renter login
* GSAP animation allowed
* Shows that the portal is powered by FamBridge API

Route:

```text
/login
```

## Page 2: Sidebar / Burger Menu Layout

Purpose:

Main layout for the rental business/admin side.

Includes:

* Desktop sidebar
* Mobile hamburger menu
* Breadcrumb/topbar
* Notification/profile area
* Content area using `ng-content`

Used by:

* Dashboard
* Vehicles
* Booking requests
* Reservation fees
* API usage
* Verification credits
* Reports
* Settings

## Page 3: Dashboard

Purpose:

Private admin dashboard for the rental business.

Sections:

* Booking requests summary
* Pending lessor approval
* Vehicle summary
* Reservation fee records
* API request usage
* API logs preview
* Credits
* Reports preview
* Renter trust preview

Important:

Do not mix dashboard UI with the public rental business website.

Route:

```text
/dashboard
```

## Page 4: Vehicle Management

Purpose:

Manage vehicles owned or operated by the rental business.

Sections:

* Vehicle list
* Search/filter
* Status: Active / Inactive / Under Review
* Insurance status
* Availability status
* Edit button
* Add Vehicle button

Vehicle card should show:

* Vehicle image
* Vehicle name
* Pickup location
* Car type
* Seats
* Fuel type
* Transmission
* Insurance status
* Price
* Availability status
* Edit button

Routes:

```text
/vehicles
/vehicles/new
/vehicles/:id/edit
```

## Page 5: Add / Edit Vehicle Form

Purpose:

Allow the rental business to add and update vehicle records.

Form sections:

* Basic vehicle information
* Car type
* Rental type
* Seats
* Transmission
* Fuel type
* Color
* Plate number
* MV file number
* Pickup address
* 12-hour rate
* 24-hour / daily rate
* With-driver add-on
* Insurance coverage
* Vehicle photo
* OR/CR document
* Insurance policy document
* Availability status
* Vehicle notes

Important:

Seats should be stored as vehicle information, but not used as a primary filter on the renter-facing lessor page.

## Page 6: Booking Requests

Purpose:

Allow the rental business to review renter booking requests.

Correct booking flow:

```text
Renter searches vehicle
→ Renter clicks Book Now
→ Renter sends booking request
→ Renter scans lessor-owned payment QR or pays to lessor payment account
→ Renter submits payment proof or payment reference
→ Booking request is submitted
→ Payment status becomes Pending Payment Confirmation
→ Lessor confirms payment
→ Reservation fee status becomes Reservation Fee Confirmed
→ Booking status remains Pending Lessor Approval
→ Lessor reviews renter profile/documents
→ Lessor approves or rejects booking
```

Booking Requests Page should show:

* Booking request number
* Renter name
* Renter Trust ID
* Trust score
* Verified documents count
* Successful rentals
* Vehicle requested
* Pickup location
* Pickup date/time
* Return date/time
* Rental type
* Reservation fee amount
* Payment status
* Booking status
* Approve button
* Reject button
* View details panel

Important rule:

Reservation fee payment does not mean the booking is fully confirmed.

Payment confirmation also does not mean the booking is approved.

Correct booking status after payment confirmation:

```text
Pending Lessor Approval
```

Route:

```text
/booking-requests
```

## Page 7: Reservation Fees / Payment Confirmation Records

Purpose:

Track renter reservation fee payments that are paid directly to the lessor.

In Phase 1, FamBridge does not receive renter payments directly.

The renter pays the rental business / lessor directly using the lessor-owned payment QR code or payment account.

Correct payment flow:

```text
Renter
→ scans lessor QR code
→ payment goes directly to lessor account
→ renter submits payment reference/proof
→ FamBridge records payment details
→ lessor confirms payment
→ booking remains Pending Lessor Approval until lessor approves
```

Reservation Fees Page should show:

* Booking request number
* Renter name
* Vehicle name
* Rental total
* Reservation fee amount
* Payment method
* Lessor payment QR/payment account used
* Payment reference number
* Uploaded payment proof
* Payment date/time
* Payment confirmation status
* Lessor confirmation date/time
* Confirmed by
* Notes or remarks

Recommended payment statuses:

```text
Pending Payment
Pending Payment Confirmation
Reservation Fee Confirmed
Payment Failed
Payment Rejected
Refunded
```

Recommended labels:

* Lessor Payment QR
* Direct Payment to Lessor
* Payment Reference
* Payment Proof
* Pending Payment Confirmation
* Reservation Fee Confirmed
* Lessor Confirmed Payment

Avoid these labels in Phase 1:

* Payout
* Settlement
* Disbursement
* Net Lessor Payout

Route:

```text
/reservation-fees
```

## Removed / Postponed for Phase 1

Do not prioritize a Payouts page in Phase 1.

Reason:

The renter payment goes directly to the lessor-owned QR/payment account.

FamBridge does not hold the renter’s money.

Therefore, there is no payout, settlement, or disbursement process required in Phase 1.

If needed in the future, payout features can be added only when FamBridge starts collecting payments on behalf of the rental business.

## Page 8: API Usage

Purpose:

Show API request usage because FamBridge charges clients based on API usage, subscription, or agreed pricing model.

Sections:

* Total API requests
* Successful requests
* Failed requests
* Current billing cycle
* Estimated API charges
* API logs preview
* Endpoint usage breakdown

Route:

```text
/api-usage
```

## Page 9: Verification Credits

Purpose:

Track credits used for verification workflow if enabled.

Sections:

* Remaining credits
* Earned credits
* Used credits
* Deducted credits
* Verification activity list
* Incorrect verification tracking

Route:

```text
/verification-credits
```

## Page 10: Reports

Purpose:

Show business reports for the rental business.

Possible sections:

* Booking requests report
* Vehicle performance
* Reservation fee records
* Payment confirmation report
* API usage report
* Renter approval report

Route:

```text
/reports
```

## Page 11: Settings

Purpose:

Manage rental business configuration.

Sections:

* Business profile
* Logo
* Contact details
* Payment QR/account details
* Public website settings
* API keys/client keys
* Notification settings

Route:

```text
/settings
```

## Public Rental Business Website

Purpose:

Each rental business can have a public-facing page or website.

This page is for their renters.

It should show:

* Business logo
* Business name
* Business contact information
* Available vehicles
* Vehicle details
* Insurance coverage
* Booking request form
* Lessor-owned payment QR/payment instructions when needed
* About Us
* Contact Us

The page should look like the rental business website, not like FamBridge owns the cars.

## Lessor Public Header

Purpose:

Header for a rental business public website.

This page represents the rental business, not FamBridge.

### Header Layout

First row:

* Lessor logo on top left
* Hamburger menu on top right
* Default logo placeholder size: 100px x 50px

Hamburger menu items:

* My Booking
* My Profile
* Change Password
* Sign Out

Behavior:

* Hamburger menu should animate.
* Hamburger icon can change from menu to X.
* Menu should close after clicking any item.

Second row:

* Book Now
* About Us
* Contact Us

## Lessor Public Page

Purpose:

This is the public website/page renters see for a specific rental business.

This is not a lessor dashboard.

This page should look like the rental business website powered by FamBridge.

Sections:

* Hero section
* RenterTopSearchComponent
* Lessor business profile
* Available vehicles
* Filters
* Vehicle list
* Booking panel
* About Us
* Contact Us

Filters:

* Rental Type
* Car Type
* Insurance Coverage

Important:

* Do not add Seats as a filter.
* Seats can be displayed only as vehicle information inside the vehicle card.

## Vehicle Search

Use the same structure as the current renter vehicle search page:

```text
booking-page
vehicle-results-page
results-intro
results-actions
inline-filter-panel
vehicle-list
vehicle-card
booking-detail-panel
```

Vehicle card should show:

* Vehicle image
* Vehicle name
* Pickup location
* Car type
* Seats
* Fuel type
* Transmission
* Insurance coverage
* Price
* Availability status
* Book Now button

## Renter Verification Gate

Purpose:

Shown when a renter is not logged in or not approved.

Message:

Renters must create an account and get approved before searching or booking vehicles.

Explain:

* Prevent fraud
* Avoid unusual traffic
* Protect rental business owners
* Build renter trust profile
* Verified documents improve approval chances
* Previous rental company references can help faster approval
* Facebook, Instagram, and TikTok references can help validation
* Documents are watermarked and protected

Actions:

* Login
* Create Account

## Renter Login

Purpose:

Login page for renters.

Design:

* Car-rental themed
* Trust-focused
* Not generic SaaS login
* Should include SUV/car visual
* Login form
* Create account option
* Message about approved renters only

## Renter Profile

Purpose:

Portable renter trust profile for faster booking approval.

Sections:

* Trust ID
* Profile photo
* Account approval status
* Trust score
* Verified documents
* Successful rentals
* Ratings and comments
* Previous rental companies
* Facebook page references
* Instagram references
* TikTok references
* Faster approval tips

## Renter Documents

Documents:

* Driver license
* Government ID
* Proof of address
* Selfie verification

Rules:

* Documents should be protected.
* Actual ID should not be publicly exposed unless required.
* Use generated Trust ID when possible.
* Document images should be watermarked when viewed.
* Store files in Cloudflare R2.
* Do not store base64 in database.
* Store file metadata and file path only.

## Deployment Model

FamBridge supports two deployment options.

### Option 1: Business-Owned Domain and Server

The rental business owner provides:

* Own domain
* Own server or hosting
* Own frontend deployment

But FamBridge is still required because the application connects to FamBridge API.

Correct model:

```text
Business-owned website/domain/server
→ connects to FamBridge API
→ FamBridge processes platform logic
→ business pays FamBridge for API/service usage
```

### Option 2: FamBridge Subdomain and Server

For businesses with a tight budget, FamBridge may provide:

* Subdomain
* Managed hosting/server
* Hosted setup under FamBridge infrastructure

Example:

```text
businessname.fambridge.com
```

This has additional cost to the lessor.

## API Usage and Billing

FamBridge may charge rental businesses based on:

* API request usage
* Monthly subscription
* Setup fee
* Hosting/server fee if hosted by FamBridge
* Subdomain fee
* Service fee per successful transaction if included in the agreement
* Verification-related credits or charges if used

## API Logging

FamBridge stores API request payloads and responses to support clients.

Logs are used for:

* Debugging
* Support
* Audit trail
* Transaction tracing
* Payment proof/reference checking
* Payment confirmation issue checking
* API usage monitoring
* Client billing
* Security monitoring

Sensitive data should be masked, encrypted, or excluded when possible.

Do not intentionally store:

* Plain text passwords
* Full payment card details
* Secret keys
* Access tokens
* OTP codes

## Insurance Labels

Renter-facing labels:

* Comprehensive Insurance
* Personal Accident Coverage
* Third Party Liability Coverage
* Acts of Nature Coverage

Admin/lessor-side labels:

* CTPL
* OR/CR
* Insurance policy documents
* Insurance expiry dates

## Correct Language

Avoid:

* FamBridge rents cars
* Our cars
* Our vehicles
* Marketplace
* SaaS marketplace
* We own cars
* Payouts
* Settlement
* Disbursement

Use:

* Rental business software
* Rental management platform
* Powered by FamBridge
* Verified rental business
* Approved renters
* Booking request
* Pending lessor approval
* FamBridge API
* Business-owned rental website
* Direct payment to lessor
* Lessor payment QR
* Payment proof
* Payment confirmation

## Correct Mental Model

FamBridge is the software and API provider.

The rental business is the operator.

The renter is the customer of the rental business.

The renter pays the rental business directly using the lessor-owned payment account or QR code.

FamBridge records and supports the transaction workflow but does not hold the renter’s money in Phase 1.

Correct flow:

```text
Renter
→ Rental Business Website powered by FamBridge
→ FamBridge API
→ Renter pays lessor directly
→ Rental Business Owner / Lessor confirms payment
→ Rental Business Owner / Lessor approves booking
```
