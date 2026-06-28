# FamBridge Rental Platform - Project Plan

## Current Project Direction

FamBridge is not a car rental business.

FamBridge is not a marketplace.

FamBridge provides software and API services for existing rental businesses.

Phase 1 focuses on car rental businesses.

The goal is to help existing car rental businesses digitize their process using FamBridge software and FamBridge API.

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

## Recommended Folder Structure

```text
src/app/
  core/
    services/
    guards/
    interceptors/

  shared/
    components/
      public-header/
      vehicle-card/
      filter-panel/
      booking-panel/
      trust-profile-card/

  pages/
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
    lessor-dashboard/
    verification-queue/
    credit-wallet/
```

## Development Priority

Build frontend pages first using mock data.

Do not connect to the backend yet until the UI flow is stable.

Priority order:

1. Lessor public header
2. Lessor public page
3. Vehicle list/cards
4. Booking request panel
5. Reservation fee panel
6. Renter verification gate
7. Renter login
8. Renter profile
9. Renter documents
10. Lessor dashboard

## Page 1: Lessor Public Header

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

## Page 2: Lessor Public Page

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

## Page 3: Vehicle Search

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

## Page 4: Booking Request Flow

Correct booking flow:

```text
Renter searches vehicle
→ Renter clicks Book Now
→ Renter sends booking request
→ Renter pays reservation fee
→ Booking request is submitted
→ Booking status becomes Pending Lessor Approval
→ Lessor reviews renter profile/documents
→ Lessor approves or rejects booking
```

Important rule:

Reservation fee payment does not mean the booking is fully confirmed.

Correct status after payment:

```text
Pending Lessor Approval
```

## Page 5: Reservation Fee Flow

Reservation fee page should show:

* Rental total
* Reservation fee
* Platform service fee
* Total to pay now
* Remaining balance
* Payment method
* Payment result

After successful payment, show:

```text
Reservation fee received successfully.
Your booking request has been submitted and is awaiting lessor approval.
```

## Page 6: Renter Verification Gate

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

## Page 7: Renter Login

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

## Page 8: Renter Profile

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

## Page 9: Renter Documents

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

## Page 10: Lessor Dashboard

Purpose:

Private admin dashboard for the rental business.

Sections:

* Booking requests
* Renter approval
* Vehicle list
* Vehicle availability
* Reservation fee records
* Payout records
* API request usage
* API logs
* Credits
* Reports

Important:

Do not mix dashboard UI with the public lessor website.

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

## Correct Mental Model

FamBridge is the software and API provider.

The rental business is the operator.

The renter is the customer of the rental business.

Correct flow:

```text
Renter
→ Rental Business Website powered by FamBridge
→ FamBridge API
→ Rental Business Owner / Lessor
→ Booking approval
```
