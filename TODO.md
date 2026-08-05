# FamBridge Lessor App TODO

## Project Status

Current progress is focused on frontend development only.

> **Note:** API creation and API integration have not started yet.

---

## 1. Frontend Development

### Completed

- [x] Finalized project direction
- [x] Finalized `AI_CONTEXT.md`
- [x] Updated `PROJECT_PLAN.md`
- [x] Created `TODO.md`
- [x] Created Lessor Login Page
- [x] Added GSAP animation for login page
- [x] Created Sidebar / Burger Menu Layout
- [x] Fixed sidebar routes
- [x] Added breadcrumb/topbar layout
- [x] Added mobile sidebar behavior
- [x] Created Dashboard Page
- [x] Created Vehicle Management Page
- [x] Created Add / Edit Vehicle Form
- [x] Created Booking Requests Page
- [x] Added View Reservation Fee button
- [x] Added redirect from Booking Requests to Reservation Fees
  - Route: `/reservation-fees?refno=BR-2026-0002`
- [x] Created Reservation Fees Page
- [x] Added payment proof view
- [x] Added multiple payment attempts/history
- [x] Added reject payment flow
- [x] Added cancel booking flow
- [x] Added notes timeline
- [x] Added one-column selected-record layout
- [x] Created Renter Approval Page
- [x] Added renter list and renter detail view
- [x] Added renter trust profile
- [x] Added grouped document requirements
- [x] Added document upload history
- [x] Added document viewer
  - [x] Zoom in
  - [x] Zoom out
  - [x] Pan/drag image
  - [x] Verify document
  - [x] Reject document with required remarks
- [x] Added Request More Documents section under the document list
- [x] Added Booking History section
- [x] Added Ratings & Reviews section
- [x] Added Driving History “Soon” section
- [x] Added Notes & Activity section
- [x] Created API Usage Page
- [x] Created Verification Credits Page
- [x] Added Purchasing Credits
- [x] Created Renter Reports Page
- [x] Created Booking Reports Page

### Pending

- [ ] Create Settings Page
- [ ] Perform final responsive review for all pages
- [ ] Complete UI cleanup and shared SCSS optimization
- [ ] Replace component-level mock data with a service-based mock structure
- [ ] Prepare frontend models/interfaces for API integration

---

## 2. API Creation Based on Frontend Requirements

> **Status:** Pending

### Auth API

- [ ] Lessor login
- [ ] Token validation
- [ ] Logout
- [ ] Refresh token, if needed

### Dashboard API

- [ ] Get summary counts
- [ ] Get recent booking requests
- [ ] Get recent reservation fee records
- [ ] Get recent renter approvals

### Vehicle API

- [ ] Get vehicle list
- [ ] Get vehicle details
- [ ] Create vehicle
- [ ] Update vehicle
- [ ] Upload vehicle images
- [ ] Change vehicle status
- [ ] Configure vehicle availability rules

### Booking Requests API

- [ ] Get booking request list
- [ ] Get booking request details
- [ ] Approve booking request
- [ ] Reject booking request with reason
- [ ] Cancel booking with reason
- [ ] Add booking notes

### Reservation Fees API

- [ ] Get reservation fee records
- [ ] Get reservation fee details by booking reference number
- [ ] Get payment proof history
- [ ] Confirm reservation fee
- [ ] Reject payment proof with reason
- [ ] Add payment notes

### Renter Approval API

- [ ] Get renter approval list
- [ ] Get renter trust profile
- [ ] Get renter documents grouped by requirement
- [ ] Get document upload history
- [ ] Verify document
- [ ] Reject document with remarks
- [ ] Request more documents
- [ ] Approve renter
- [ ] Reject renter with reason
- [ ] Get renter booking history
- [ ] Get renter ratings and reviews
- [ ] Get renter activity notes

### API Usage API

- [ ] Get API request logs
- [ ] Get API usage summary
- [ ] Get endpoint usage breakdown
- [ ] Get request/response details

### Verification Credits API

- [ ] Get credit balance
- [ ] Get credit transactions
- [ ] Add credit transaction
- [ ] Deduct credit transaction
- [ ] Get verification activity

### Reports API

- [ ] Booking report
- [ ] Vehicle performance report
- [ ] Reservation fee report
- [ ] API usage report
- [ ] Renter approval report

### Settings API

- [ ] Get business profile
- [ ] Update business profile
- [ ] Upload logo
- [ ] Save payment QR/account details
- [ ] Save public website settings
- [ ] Save API keys/client keys
- [ ] Save notification settings

---

## 3. API Integration Based on Frontend Requirements

> **Status:** Pending

### Create Angular API Services

- [ ] `AuthService`
- [ ] `DashboardService`
- [ ] `VehicleService`
- [ ] `BookingRequestService`
- [ ] `ReservationFeeService`
- [ ] `RenterApprovalService`
- [ ] `ApiUsageService`
- [ ] `VerificationCreditService`
- [ ] `ReportService`
- [ ] `SettingsService`

### Add HTTP Interceptor

- [ ] Attach authentication token
- [ ] Handle unauthorized responses
- [ ] Handle API errors
- [ ] Show a global loading state, if needed

### Replace Mock Data with API Calls

- [ ] Dashboard
- [ ] Vehicles
- [ ] Vehicle form
- [ ] Booking Requests
- [ ] Reservation Fees
- [ ] Renter Approval
- [ ] API Usage
- [ ] Verification Credits
- [ ] Reports
- [ ] Settings

### Connect Backend Features

- [ ] Connect file/document viewer to uploaded files
- [ ] Connect document verification actions to the backend
- [ ] Connect payment proof history to the backend
- [ ] Connect renter notes/activity logs to the backend
- [ ] Connect booking approval/rejection actions to the backend
- [ ] Connect vehicle image uploads to the backend
- [ ] Add API loading states
- [ ] Add API empty states
- [ ] Add API error states

---

## 4. Deployment and Infrastructure

### Completed

- [x] Created Cloudflare account/domain setup
- [x] Moved DNS management to Cloudflare
- [x] Added FamBridge subdomain DNS
- [x] Added EC2 Nginx routing
- [x] Installed Cloudflare Origin SSL certificate on EC2
- [x] Configured HTTPS for EC2 origin

### Pending

- [ ] Finalize Cloudflare SSL mode as **Full (strict)**
- [ ] Confirm SSL for `api.cgicsoftwaresolution.com`
- [ ] Deploy the final Angular production build
- [ ] Configure Laravel/API deployment folder
- [ ] Configure database
- [ ] Configure backend environment variables
- [ ] Configure API log storage
- [ ] Configure backup strategy

---

## Next Recommended Build Order

1. Finish the remaining frontend work:
   - Settings Page
   - Final responsive review
   - UI and shared SCSS cleanup
   - Service-based mock structure
   - Frontend models/interfaces
2. Create API specifications based on frontend data requirements.
3. Build the backend APIs.
4. Integrate the frontend with the APIs.
5. Replace all mock data.
6. Complete final testing and deployment.
