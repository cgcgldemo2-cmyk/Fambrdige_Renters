# FamBridge Renters TODO

## Current Priority

> Complete the FamBridge Renters frontend UI/UX before prioritizing missing backend APIs.

API availability must not block frontend design completion.

Missing APIs should be documented and assigned separately to the Backend/API Agent.

---

## 1. Confirmed Working Features

- [x] Renter Login
- [x] Renter Registration
- [x] Search Available Cars

These working features must be preserved.

---

## 2. Main Navigation

- [ ] Keep hamburger menu visible on all screen sizes
- [ ] Verify hamburger menu on mobile
- [ ] Verify hamburger menu on tablet
- [ ] Verify hamburger menu on desktop
- [ ] Remove separate desktop Login button
- [ ] Remove separate desktop Create Account button
- [ ] Add guest dropdown navigation
- [ ] Add authenticated renter dropdown navigation
- [ ] Close menu when item is selected
- [ ] Close menu when clicking outside
- [ ] Close menu with Escape key
- [ ] Close menu after route navigation
- [ ] Verify menu accessibility
- [ ] Verify dropdown overlay/z-index behavior

### Guest Menu

- [ ] Home
- [ ] Find a Car
- [ ] Login
- [ ] Create Account

### Authenticated Menu

- [ ] Home
- [ ] Find a Car
- [ ] My Bookings
- [ ] My Profile
- [ ] Change Password
- [ ] How to Delete My Account?
- [ ] Sign Out

---

## 3. Home / Search UI

- [ ] Review current home page UI
- [ ] Improve primary vehicle search experience
- [ ] Clearly display Pickup Location
- [ ] Clearly display Pickup Date
- [ ] Clearly display Pickup Time
- [ ] Clearly display rental duration or Return Date
- [ ] Clearly display Return Time when required
- [ ] Keep Search Available Cars as primary CTA
- [ ] Preserve selected search criteria during navigation
- [ ] Improve mobile search layout
- [ ] Improve desktop search layout
- [ ] Add form validation states

---

## 4. Pickup Location

> High Priority

- [ ] Review current pickup-location implementation
- [ ] Fix pickup-location loading
- [ ] Fix pickup-location selection
- [ ] Display appropriate lessor pickup locations
- [ ] Add selected-location state
- [ ] Add loading state
- [ ] Add empty state
- [ ] Add error state
- [ ] Retain selected location during vehicle search
- [ ] Retain location when opening Vehicle Details
- [ ] Carry location into booking request
- [ ] Verify mobile behavior
- [ ] Verify desktop behavior

---

## 5. Available Cars

- [x] Search Available Cars working
- [ ] Review search results UI
- [ ] Improve vehicle cards
- [ ] Display vehicle image
- [ ] Display vehicle name
- [ ] Display vehicle type
- [ ] Display seating capacity
- [ ] Display transmission
- [ ] Display rental type
- [ ] Display pricing
- [ ] Display availability/status where appropriate
- [ ] Add View Details action
- [ ] Improve filters
- [ ] Add useful sorting
- [ ] Allow search criteria to be modified
- [ ] Add loading state
- [ ] Add no-results state
- [ ] Add API/search error state
- [ ] Verify mobile responsiveness
- [ ] Verify desktop responsiveness

---

## 6. Vehicle Details

- [ ] Create or complete Vehicle Details page
- [ ] Display vehicle images
- [ ] Display vehicle name
- [ ] Display vehicle description
- [ ] Display vehicle specifications
- [ ] Display seating capacity
- [ ] Display transmission
- [ ] Display rental type
- [ ] Display pricing
- [ ] Display pickup location
- [ ] Display selected rental schedule
- [ ] Display availability
- [ ] Add primary rental/request CTA
- [ ] Preserve search context
- [ ] Add loading state
- [ ] Add unavailable state
- [ ] Add error state
- [ ] Verify mobile layout
- [ ] Verify desktop layout

---

## 7. Authentication UI

### Login

- [x] Login functional
- [ ] Final Login UI review
- [ ] Verify validation
- [ ] Verify loading state
- [ ] Verify API error presentation
- [ ] Verify password visibility control
- [ ] Verify mobile layout
- [ ] Verify desktop layout

### Registration

- [x] Registration functional
- [ ] Final Registration UI review
- [ ] Verify validation
- [ ] Verify password confirmation
- [ ] Verify loading state
- [ ] Verify success state
- [ ] Verify API error presentation
- [ ] Verify mobile layout
- [ ] Verify desktop layout

---

## 8. Rental / Booking Request

- [ ] Create or complete Rental Request page
- [ ] Display selected vehicle
- [ ] Display pickup location
- [ ] Display pickup date/time
- [ ] Display return date/time or duration
- [ ] Display renter information
- [ ] Display rental pricing when available
- [ ] Add final review section
- [ ] Add submission confirmation
- [ ] Prevent accidental duplicate submission
- [ ] Add validation state
- [ ] Add loading state
- [ ] Add success state
- [ ] Add error state
- [ ] Verify mobile layout
- [ ] Verify desktop layout

---

## 9. Booking Confirmation

- [ ] Create Booking Confirmation UI
- [ ] Display successful-request message
- [ ] Display booking/request reference
- [ ] Display vehicle
- [ ] Display pickup location
- [ ] Display schedule
- [ ] Display booking/request status
- [ ] Display clear next-step instructions
- [ ] Add My Bookings action
- [ ] Add Home / Find a Car action
- [ ] Verify mobile layout
- [ ] Verify desktop layout

---

## 10. My Bookings

> High Priority

- [ ] Create or complete My Bookings page
- [ ] Add authenticated route
- [ ] Protect route
- [ ] Display booking reference
- [ ] Display vehicle
- [ ] Display pickup location
- [ ] Display rental schedule
- [ ] Display booking status
- [ ] Display reservation/payment status when available
- [ ] Add View Details action
- [ ] Add useful booking status filters if appropriate
- [ ] Add loading state
- [ ] Add empty state
- [ ] Add error state
- [ ] Verify mobile layout
- [ ] Verify desktop layout

---

## 11. Booking Details

- [ ] Create or complete Booking Details page
- [ ] Display booking reference
- [ ] Display vehicle information
- [ ] Display pickup location
- [ ] Display rental schedule
- [ ] Display booking status
- [ ] Display payment/reservation status
- [ ] Display rental request information
- [ ] Display next-step information
- [ ] Add booking timeline/history when data supports it
- [ ] Add loading state
- [ ] Add error state
- [ ] Verify mobile layout
- [ ] Verify desktop layout

---

## 12. My Profile

> High Priority

- [ ] Create My Profile page
- [ ] Add authenticated route
- [ ] Protect route
- [ ] Add profile photo/initials area
- [ ] Display full name
- [ ] Display email
- [ ] Display mobile number
- [ ] Display address
- [ ] Display account approval status
- [ ] Display verification status
- [ ] Display document status when appropriate
- [ ] Create Edit Profile interface
- [ ] Add form validation
- [ ] Add loading state
- [ ] Add success state
- [ ] Add error state
- [ ] Verify mobile layout
- [ ] Verify desktop layout

---

## 13. Change Password

> High Priority

- [ ] Create Change Password page
- [ ] Add authenticated route
- [ ] Protect route
- [ ] Add Current Password
- [ ] Add New Password
- [ ] Add Confirm New Password
- [ ] Add show/hide controls
- [ ] Add required validation
- [ ] Add password policy validation
- [ ] Validate matching passwords
- [ ] Validate new password differs from current password
- [ ] Add submit loading state
- [ ] Add success feedback
- [ ] Add error feedback
- [ ] Verify mobile layout
- [ ] Verify desktop layout

---

## 14. How to Delete My Account?

- [ ] Create informational page
- [ ] Add authenticated route
- [ ] Explain deletion-request process using approved information
- [ ] Explain handling of active/pending bookings
- [ ] Explain possible record-retention requirements without inventing policies
- [ ] Display configured support/contact information
- [ ] Avoid immediate destructive deletion
- [ ] Verify mobile layout
- [ ] Verify desktop layout

---

## 15. Sign Out

> High Priority

- [ ] Add Sign Out to authenticated dropdown
- [ ] Verify authentication state is cleared
- [ ] Update menu immediately after logout
- [ ] Redirect to appropriate public page
- [ ] Prevent access to protected pages after logout
- [ ] Verify browser Back behavior
- [ ] Verify expired-session behavior

---

## 16. Standard UI States

Ensure applicable pages include:

- [ ] Loading states
- [ ] Empty states
- [ ] Error states
- [ ] Success states
- [ ] Validation states
- [ ] Disabled/unavailable states
- [ ] Retry actions where appropriate

---

## 17. Responsive Design

- [ ] Review Home
- [ ] Review Search
- [ ] Review Available Cars
- [ ] Review Vehicle Details
- [ ] Review Login
- [ ] Review Registration
- [ ] Review Rental Request
- [ ] Review Booking Confirmation
- [ ] Review My Bookings
- [ ] Review Booking Details
- [ ] Review My Profile
- [ ] Review Change Password
- [ ] Review Delete Account Information
- [ ] Review hamburger/dropdown navigation
- [ ] Verify mobile
- [ ] Verify tablet
- [ ] Verify laptop
- [ ] Verify desktop
- [ ] Verify large desktop
- [ ] Remove unintended horizontal scrolling
- [ ] Fix overlapping elements
- [ ] Verify touch-target sizes

---

## 18. Frontend Code Quality

- [ ] Reuse existing shared components
- [ ] Reuse existing SCSS variables
- [ ] Reduce duplicated UI styles
- [ ] Create reusable UI components where appropriate
- [ ] Create TypeScript interfaces/models
- [ ] Move mock data out of components
- [ ] Use service-based mock data when APIs are unavailable
- [ ] Preserve environment-based configuration
- [ ] Do not hardcode API URLs
- [ ] Do not hardcode lessor IDs
- [ ] Do not hardcode tenant/client IDs
- [ ] Preserve existing working API integrations

---

## 19. API Dependencies

> API work is not the current frontend priority.

For every completed UI feature:

- [ ] Check whether required API exists
- [ ] Use verified API if already available
- [ ] Do not invent API URLs
- [ ] Complete UI even when API is unavailable
- [ ] Define typed frontend service contract
- [ ] Use service-based mock data when necessary
- [ ] Record missing APIs for Backend/API Agent
- [ ] Keep API integration status separate from UI completion

---

## 20. API Gaps

Record confirmed missing APIs here.

| Feature | Required Operation | API Status | Backend Status | Frontend Status |
|---|---|---|---|---|
| My Bookings | Retrieve renter bookings | To Verify | Pending | UI Pending |
| Booking Details | Retrieve renter booking details | To Verify | Pending | UI Pending |
| My Profile | Retrieve renter profile | Existing endpoint to verify | — | UI Pending |
| Edit Profile | Update renter profile | To Verify | Pending | UI Pending |
| Change Password | Change renter password | To Verify | Pending | UI Pending |
| Delete Account | Account deletion request, if required | To Verify | Pending | Info UI Pending |
| Sign Out | Logout renter session | To Verify | Pending | UI Pending |

Do not assign an endpoint path until it has been verified from the backend.

---

## 21. Regression Verification

Before considering the renter UI complete:

- [ ] Login still works
- [ ] Registration still works
- [ ] Search Available Cars still works
- [ ] Pickup Location works correctly
- [ ] Guest navigation works
- [ ] Authenticated navigation works
- [ ] Protected routes work
- [ ] Page reload while authenticated works
- [ ] Sign Out works
- [ ] Mobile navigation works
- [ ] Desktop navigation works
- [ ] Production build passes

---

# Current Recommended Implementation Order

1. Fix Pickup Location
2. Complete always-visible hamburger navigation
3. Complete Available Cars UI
4. Complete Vehicle Details
5. Complete Rental Request flow
6. Complete Booking Confirmation
7. Complete My Bookings
8. Complete Booking Details
9. Complete My Profile
10. Complete Change Password
11. Complete How to Delete My Account?
12. Complete Sign Out
13. Complete all loading/empty/error/success states
14. Perform full responsive review
15. Perform regression testing
16. Record all missing APIs for Backend/API Agent

---

# UI Completion Target

The current milestone is:

> **100% Renter Website UI/UX Complete**

Backend APIs and final API integration are tracked separately and must not prevent completion of this milestone.
