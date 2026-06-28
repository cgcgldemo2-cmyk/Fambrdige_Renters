# FamBridge Rental Platform - AI Context

## Project Name

FamBridge Rental Platform

## Core Business Rule

FamBridge is **not a car rental business**.

FamBridge is **not a marketplace**.

FamBridge provides software and API services for existing rental businesses.

Phase 1 focuses on rental businesses, specifically **car rental businesses**.

The rental business owners already have their own rental operations, vehicles, customers, pricing, verification process, and business rules. FamBridge helps them digitize, automate, and manage those processes through software.

## What FamBridge Provides

FamBridge provides the software platform and API layer that helps rental businesses manage:

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
* Admin/lessor dashboard
* Credits and verification workflow
* Reports and transaction records
* API request and response logging
* API usage monitoring and billing

## What FamBridge Does Not Do

FamBridge does not:

* Own the rental vehicles
* Rent vehicles directly
* Act as the car rental company
* Replace the rental business owner
* Become the main marketplace between all rental companies
* Approve every renter manually for the lessor
* Take responsibility for damages, loss, theft, or issues between renter and lessor

FamBridge provides the system, API, and process automation.

The rental business owner is still responsible for their own renters, vehicles, approvals, operations, and transactions.

## Phase 1 Focus

Phase 1 is focused on:

```text
Car Rental Business Software
```

The goal is to provide existing car rental businesses with their own digital platform.

Each rental business can have:

* Own public website
* Own brand/logo
* Own vehicles
* Own renter approval process
* Own booking flow
* Own customer records
* Own payment setup
* Own domain or subdomain
* Own server or FamBridge-hosted option

## Business Owner / Lessor

In this project, a lessor means:

* Car rental business owner
* Vehicle owner
* Rental operator
* Company offering vehicles for rent

The lessor is the client/customer of FamBridge.

They use FamBridge software to run their rental operation online.

## Renter

A renter is the customer of the car rental business.

Rules:

* Renter must register.
* Renter must be approved before searching or booking vehicles.
* Renter may need to upload documents.
* Renter may have a trust profile.
* Renter can send booking requests.
* Renter can pay reservation fees.
* Booking is still subject to lessor approval.

## Deployment / Hosting Model

FamBridge supports different deployment options.

### Option 1: Business-Owned Domain and Server

In this setup, the rental business owner provides and manages their own:

* Domain
* Hosting/server
* Business email
* Frontend application deployment

Example:

```text
www.businessname.com
```

However, this does **not** mean FamBridge is no longer needed.

FamBridge remains the core API and system provider.

The business-owned application still connects to FamBridge API for:

* Renter registration
* Renter approval
* Vehicle listing data
* Booking requests
* Reservation fee flow
* Renter documents
* Trust profile
* Verification records
* Credits
* Reports
* Transaction logs
* API usage tracking

FamBridge charges the business client based on API usage, subscription, or agreed pricing model.

Correct model:

```text
Business-owned website/domain/server
→ connects to FamBridge API
→ FamBridge processes platform logic
→ business pays FamBridge for API/service usage
```

This setup gives the rental business stronger control over branding and hosting, while FamBridge continues to provide the backend platform, API, trust system, verification system, and business logic.

### Option 2: FamBridge Subdomain and Server

For businesses with a tight budget, FamBridge may offer:

* Subdomain
* Shared or managed server
* Hosted setup under FamBridge infrastructure

Example:

```text
businessname.fambridge.com
```

This will have an additional cost to the lessor because FamBridge will shoulder or manage server resources.

## Public Website Purpose

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
* About Us
* Contact Us

The page should look like the rental business website, not like FamBridge owns the cars.

## Lessor Public Page Header

The public lessor page should have this layout.

### First Row

* Lessor logo on the top left
* Hamburger menu on the top right

Hamburger menu items:

* My Booking
* My Profile
* Change Password
* Sign Out

Logo placeholder size:

```text
100px x 50px
```

### Second Row

Navigation links:

* Book Now
* About Us
* Contact Us

## Vehicle Search Rules

For lessor public pages, filters should include:

* Rental Type
* Car Type
* Insurance Coverage

Do not add Seats as a filter.

Seats can be displayed only as vehicle information inside the vehicle card.

## Booking Flow

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

Important:

Reservation fee payment does not mean the booking is fully confirmed.

The correct status after payment is:

```text
Pending Lessor Approval
```

## Trust and Verification Concept

FamBridge can help rental businesses improve renter screening.

Renter profile may include:

* Trust ID
* Trust score
* Verified documents
* Previous rental history
* Ratings
* Comments
* Previous rental company references
* Facebook page reference
* Instagram reference
* TikTok reference

This helps the lessor decide whether to approve the booking faster.

## Document Handling

Renter documents should be protected.

Rules:

* Store actual files, not base64.
* Use secure file storage such as Cloudflare R2.
* Store only file path and metadata in the database.
* Add watermark when documents are viewed.
* Avoid exposing actual ID numbers when not needed.
* Use generated Trust ID when possible.

## Data Privacy and API Logging

FamBridge stores API request payloads and API responses in system logs to help support clients, troubleshoot issues, audit transactions, investigate errors, and monitor API usage.

This is important because FamBridge acts as the API provider for business-owned applications.

When a rental business website or application connects to FamBridge API, FamBridge may store:

* Request endpoint
* HTTP method
* Client key
* App key
* Tenant/business identifier
* Request payload
* API response
* Status code
* Error message
* Timestamp
* IP address or device metadata if needed
* User or account reference if available

Purpose of storing payloads and responses:

* Easier technical support
* Faster debugging
* Transaction tracing
* Booking issue investigation
* Payment flow checking
* Document verification issue checking
* API usage monitoring
* Client billing based on API usage
* Security and abuse monitoring

Important privacy rule:

FamBridge should not expose these logs publicly.

Only authorized support/admin users should access API logs.

Sensitive data should be protected, masked, encrypted, or excluded when possible.

Do not intentionally store:

* Plain text passwords
* Full payment card details
* Secret keys
* Access tokens
* OTP codes
* Highly sensitive personal data unless required for business or support purposes

Correct explanation:

```text
FamBridge stores API request and response logs to provide support, troubleshoot issues, monitor transactions, and maintain platform security.
```

Business-owned websites and servers may still connect to FamBridge API, and FamBridge remains responsible for API logging, support, verification, billing, and platform-level audit records.

## Insurance Display

Renter-facing vehicle pages should show clear insurance coverage.

Recommended labels:

* Comprehensive Insurance
* Personal Accident Coverage
* Third Party Liability Coverage
* Acts of Nature Coverage

Admin or lessor-side records can also track:

* CTPL
* OR/CR
* Insurance policy documents
* Insurance expiry dates

## Revenue / Costing Model

FamBridge may earn from:

* Software setup fee
* Monthly subscription
* API usage charges
* Hosting/server fee if hosted by FamBridge
* Subdomain/server usage fee
* Service fee per successful transaction if included in the business agreement
* Verification-related credits or charges if used

Important:

If the business owner uses their own domain and server, their hosting cost is their responsibility.

If the business owner uses FamBridge subdomain and server, additional cost will be charged to the lessor.

Even if the business owner uses their own domain and server, the application still connects to FamBridge API, and FamBridge can charge based on API request usage or agreed subscription terms.

## Design Direction

Use a professional, rental-business-friendly design.

Style:

* Clean
* Modern
* Mobile-first
* Trust-focused
* Easy for renters to understand
* Business-branded
* Not too technical
* Not too marketplace-looking

Main colors:

```text
Primary: #FF4104
Dark: #001621
```

## Important Language Rule

Avoid wording like:

* FamBridge rents cars
* Our vehicles
* Marketplace
* SaaS marketplace
* We own cars

Use wording like:

* Rental business software
* Rental management platform
* Powered by FamBridge
* Verified rental business
* Approved renters
* Booking request
* Pending lessor approval
* Business-owned rental website
* FamBridge API

## Correct Mental Model

FamBridge is the software and API provider.

The rental business is the operator.

The renter is the customer of the rental business.

Correct flow:

```text
Renter
→ Rental Business Website powered by FamBridge
→ FamBridge API
→ Business Owner / Lessor
→ Booking approval
```
