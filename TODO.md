# FamBridge Renters TODO

## Project

FamBridge Renters Web Application

## Current Milestone

> 100% Renter Website UI/UX Complete

The current development priority is to complete the entire renter-facing website UI/UX.

Backend API completion is not the current priority.

Missing APIs must not prevent frontend UI completion.

---

# 1. Development Rules

All agents working on the FamBridge Renters project must follow these rules:

- Prioritize frontend UI/UX completion.
- Preserve existing working functionality.
- Do not modify Laravel/backend APIs unless explicitly assigned.
- Do not invent production API endpoints.
- Use verified APIs when they already exist.
- If an API is missing, complete the UI using a typed frontend service contract and service-based mock data when necessary.
- Record confirmed missing APIs separately.
- Keep API status separate from UI completion.
- Do not hardcode API URLs.
- Do not hardcode `lessor_id`.
- Do not hardcode tenant/client IDs.
- Use environment configuration for application configuration values.
- Reuse existing components and styles when practical.
- Maintain mobile-first responsive behavior.

---

# 2. GitHub Project Workflow

All development work must be represented by GitHub Issues and monitored using the:

`FamBridge Renters Development`

GitHub Project.

The project uses exactly these statuses:

| Status | Meaning |
|---|---|
| `Todo` | Work has been identified but is not yet ready to start |
| `Ready` | Requirements are clear and an agent may begin implementation |
| `In Progress` | An agent is actively working on the issue |
| `API Missing` | A confirmed backend API dependency has been discovered |
| `Done` | Implementation and required verification are complete |

Normal workflow:

```text
Todo
  â†“
Ready
  â†“
In Progress
  â†“
Done
```

When an API dependency is discovered:

```text
In Progress
  â†“
API Missing
```

`API Missing` does not mean frontend development should stop.

The frontend UI should still be completed using the approved service/mock approach.

A separate API task can then be assigned later.

---

# 3. GitHub Issue Rules

Each significant feature should have its own GitHub Issue.

Recommended naming convention:

```text
[Frontend] Feature Name
[QA] Feature Name
[API] Feature Name
[Integration] Feature Name
```

Examples:

```text
[Frontend] Improve Home and Vehicle Search UI
[Frontend] Complete Pickup Location UX
[Frontend] Complete Responsive Navigation
[Frontend] Redesign Available Cars Results
[Frontend] Complete Vehicle Details UI
[QA] Full Renter UI Responsive and Regression Testing
```

Each implementation issue should include:

```markdown
## Project

FamBridge Renters

## Status

Ready

## Objective

Describe the specific feature being implemented.

## Requirements

- Requirement 1
- Requirement 2
- Requirement 3

## Existing Functionality to Preserve

- Login
- Registration
- Search Available Cars

## API Dependency

Verified / Missing / Not Required / To Verify

## Branch

agent/<task-name>

## Verification

- [ ] Implementation completed
- [ ] Production build passed
- [ ] Mobile checked
- [ ] Tablet checked
- [ ] Desktop checked
- [ ] Existing functionality checked
- [ ] Missing APIs documented
```

---

# 4. Confirmed Working Features

The following features are currently working:

- [x] Renter Login
- [x] Renter Registration
- [x] Search Available Cars

These features must not be broken while completing the remaining UI.

---

# 5. Home / Vehicle Search

## GitHub Issue

```text
[Frontend] Improve Home and Vehicle Search UI
```

## Tasks

- [x] Review current Home page
- [x] Improve renter-focused hero section
- [x] Clearly communicate vehicle rental purpose
- [x] Make vehicle search the primary action
- [x] Clearly display Pickup Location
- [x] Clearly display Pickup Date
- [x] Clearly display Pickup Time
- [x] Clearly display rental duration or Return Date
- [x] Display Return Time where applicable
- [x] Keep Search Available Cars as primary CTA
- [x] Preserve selected search criteria during navigation
- [x] Add form validation
- [x] Add loading feedback where applicable
- [ ] Improve mobile layout
- [ ] Improve tablet layout
- [ ] Improve desktop layout
- [ ] Preserve existing working search integration

---

# 6. Pickup Location

## Priority

High

## GitHub Issue

```text
[Frontend] Complete Pickup Location UX
```

## Tasks

- [x] Review existing pickup-location implementation
- [x] Verify existing API integration before making changes
- [x] Fix pickup-location loading
- [x] Fix pickup-location selection
- [x] Display appropriate lessor pickup locations
- [x] Add clearly selected location state
- [x] Add loading state
- [x] Add empty state
- [x] Add error state
- [x] Add retry behavior where appropriate
- [x] Retain selected location during search
- [x] Retain location when opening Vehicle Details
- [x] Carry location into Rental Request
- [ ] Verify mobile usability
- [ ] Verify tablet usability
- [ ] Verify desktop usability

---

# 7. Responsive Navigation

## GitHub Issue

```text
[Frontend] Complete Responsive Navigation
```

## Requirements

The hamburger menu must remain available at all screen sizes.

Do not replace it with separate desktop navigation.

## Guest Menu

- [x] Home
- [x] Find a Car
- [x] Login
- [x] Create Account

## Authenticated Renter Menu

- [x] Home
- [x] Find a Car
- [x] My Bookings
- [x] My Profile
- [x] Change Password
- [x] How to Delete My Account?
- [x] Sign Out

## Behavior

- [x] Keep hamburger menu visible on mobile
- [x] Keep hamburger menu visible on tablet
- [x] Keep hamburger menu visible on desktop
- [x] Remove separate desktop Login button if currently present
- [x] Remove separate desktop Create Account button if currently present
- [x] Correctly switch menu after Login
- [ ] Correctly switch menu after Registration/authentication
- [x] Correctly restore menu after page reload
- [x] Correctly handle expired authentication
- [x] Update menu immediately after Sign Out
- [x] Close menu when an item is selected
- [x] Close menu after route navigation
- [x] Close menu when clicking outside
- [x] Support Escape to close
- [x] Verify keyboard accessibility
- [x] Verify dropdown z-index/overlay behavior

---

# 8. Available Cars

## GitHub Issue

```text
[Frontend] Redesign Available Cars Results
```

## Existing Status

- [x] Search Available Cars API integration working

## Tasks

- [x] Review existing results implementation before modifying
- [x] Preserve existing API integration
- [x] Improve overall search-results layout
- [x] Improve vehicle cards
- [x] Display vehicle image
- [x] Display vehicle name
- [x] Display vehicle type
- [x] Display seating capacity
- [x] Display transmission
- [x] Display rental type
- [x] Display pricing
- [x] Display availability/status where useful
- [x] Add clear View Details action
- [x] Improve filters
- [x] Add useful sorting
- [x] Avoid excessive filtering
- [x] Allow search criteria to be modified
- [x] Preserve pickup location
- [x] Preserve rental schedule
- [x] Add loading state
- [x] Add no-results state
- [x] Add search error state
- [x] Add retry behavior where appropriate
- [ ] Verify mobile responsiveness
- [ ] Verify tablet responsiveness
- [ ] Verify desktop responsiveness

---

# 9. Vehicle Details

## GitHub Issue

```text
[Frontend] Complete Vehicle Details UI
```

## Tasks

- [x] Create or complete Vehicle Details page
- [x] Display vehicle images
- [x] Display vehicle name
- [ ] Display description
- [x] Display vehicle specifications
- [x] Display vehicle type
- [x] Display seating capacity
- [x] Display transmission
- [x] Display rental type
- [x] Display rental pricing
- [x] Display selected pickup location
- [x] Display selected rental schedule
- [x] Display availability
- [x] Display important rental information
- [x] Add primary rental/request CTA
- [x] Preserve search context
- [x] Preserve selected vehicle when continuing
- [x] Add loading state
- [x] Add unavailable state
- [x] Add error state
- [ ] Verify mobile layout
- [ ] Verify tablet layout
- [ ] Verify desktop layout

---

# 10. Login

## Existing Status

- [x] Login functional

## Remaining UI Tasks

- [ ] Perform final Login UI review
- [x] Preserve existing API integration
- [x] Verify required-field validation
- [x] Verify authentication errors
- [x] Verify loading state
- [x] Verify password show/hide
- [x] Verify navigation after Login
- [x] Verify authenticated menu update
- [ ] Verify mobile layout
- [ ] Verify desktop layout

---

# 11. Registration

## Existing Status

- [x] Registration functional

## Remaining UI Tasks

- [x] Perform final Registration UI review
- [x] Preserve existing API integration
- [x] Verify required-field validation
- [x] Verify password confirmation
- [x] Verify loading state
- [x] Verify success state
- [x] Verify API errors
- [x] Verify existing approval workflow
- [ ] Verify mobile layout
- [ ] Verify desktop layout

---

# 12. Rental / Booking Request

## GitHub Issue

```text
[Frontend] Complete Rental Request Flow
```

## Tasks

- [x] Create or complete Rental Request page
- [x] Display selected vehicle
- [x] Display pickup location
- [x] Display pickup date/time
- [x] Display return date/time or duration
- [x] Display renter information
- [x] Display pricing when available
- [x] Display important rental instructions
- [x] Add final review section
- [x] Clearly explain rental request status
- [x] Add validation
- [x] Add submission loading state
- [x] Add submission error state
- [x] Add success handling
- [x] Prevent accidental duplicate submission
- [x] Preserve search/vehicle context
- [ ] Verify mobile layout
- [ ] Verify tablet layout
- [ ] Verify desktop layout

---

# 13. Booking Confirmation

## GitHub Issue

```text
[Frontend] Complete Booking Confirmation
```

## Tasks

- [x] Create Booking Confirmation UI
- [x] Display successful request message
- [x] Display booking/request reference
- [x] Display selected vehicle
- [x] Display pickup location
- [x] Display rental schedule
- [x] Display current status
- [x] Display clear next-step instructions
- [x] Add My Bookings action
- [x] Add Home / Find a Car action
- [ ] Verify mobile layout
- [ ] Verify desktop layout

---

# 14. My Bookings

## Priority

High

## GitHub Issue

```text
[Frontend] Complete My Bookings
```

## Tasks

- [x] Create or complete My Bookings page
- [x] Add authenticated route
- [x] Protect route
- [x] Display booking reference
- [x] Display vehicle
- [x] Display pickup location
- [x] Display rental schedule
- [x] Display booking status
- [x] Display reservation/payment status when available
- [x] Add clear View Details action
- [x] Add simple status filtering where useful
- [x] Add loading state
- [x] Add empty state
- [x] Add error state
- [x] Add retry action where appropriate
- [ ] Verify mobile layout
- [ ] Verify tablet layout
- [ ] Verify desktop layout

If the required API is unavailable, complete the UI using the approved frontend service/mock approach.

---

# 15. Booking Details

## GitHub Issue

```text
[Frontend] Complete Booking Details
```

## Tasks

- [x] Create or complete Booking Details page
- [x] Display booking reference
- [x] Display vehicle information
- [x] Display pickup location
- [x] Display rental schedule
- [x] Display booking status
- [x] Display payment/reservation status
- [x] Display rental request information
- [x] Display renter instructions
- [x] Display clear next step
- [x] Add status/history timeline only when data supports it
- [x] Add loading state
- [x] Add error state
- [ ] Verify mobile layout
- [ ] Verify tablet layout
- [ ] Verify desktop layout

---

# 16. My Profile

## Priority

High

## GitHub Issue

```text
[Frontend] Complete My Profile
```

## Tasks

- [x] Create or complete My Profile page
- [x] Add authenticated route
- [x] Protect route
- [x] Add profile photo or initials area
- [x] Display full name
- [x] Display email
- [x] Display mobile number
- [x] Display address
- [x] Display account approval status
- [x] Display verification status
- [x] Display document status when available
- [x] Do not expose backend-only identifiers
- [x] Do not expose tokens
- [x] Create Edit Profile UI
- [x] Add form validation
- [x] Add loading state
- [x] Add success state
- [x] Add error state
- [ ] Verify mobile layout
- [ ] Verify tablet layout
- [ ] Verify desktop layout

If Update Profile API is missing, complete the interface and record the API requirement.

---

# 17. Change Password

## Priority

High

## GitHub Issue

```text
[Frontend] Complete Change Password
```

## Tasks

- [x] Create Change Password page
- [x] Add authenticated route
- [x] Protect route
- [x] Add Current Password
- [x] Add New Password
- [x] Add Confirm New Password
- [x] Add show/hide controls
- [x] Add required validation
- [x] Add password-policy validation
- [x] Validate matching passwords
- [x] Validate new password differs from current password
- [x] Add submit loading state
- [x] Add success feedback
- [x] Add error feedback
- [x] Never store passwords in mock data
- [x] Never log password values
- [ ] Verify mobile layout
- [ ] Verify desktop layout

If Change Password API is unavailable, finish the UI and record the missing API.

---

# 18. How to Delete My Account?

## GitHub Issue

```text
[Frontend] Create Delete Account Information Page
```

## Tasks

- [x] Create informational page
- [x] Add authenticated route
- [x] Explain account deletion request process using approved information
- [x] Explain active/pending booking considerations
- [x] Explain possible record-retention requirements without inventing policies
- [x] Display configured support/contact information
- [x] Do not invent support contact details
- [x] Do not invent retention periods
- [x] Do not add destructive account deletion unless explicitly approved
- [ ] Verify mobile layout
- [ ] Verify desktop layout

---

# 19. Sign Out

## Priority

High

## GitHub Issue

```text
[Frontend] Complete Sign Out Flow
```

## Tasks

- [x] Add Sign Out to authenticated menu
- [x] Clear renter authentication state
- [x] Update menu immediately
- [x] Redirect to appropriate public page
- [x] Prevent protected pages from remaining accessible
- [ ] Verify browser Back behavior
- [x] Verify expired-session behavior
- [x] Preserve unrelated renter preferences where appropriate

---

# 20. Standard UI States

Every applicable page must support the appropriate state.

## Loading

- [x] Show loading feedback
- [x] Avoid blank screens
- [x] Prevent duplicate actions while submitting

## Empty

- [x] Explain why no data is available
- [x] Give the renter a useful next action

## Error

- [x] Display understandable error messages
- [x] Provide retry where appropriate
- [x] Avoid exposing technical/server information

## Success

- [x] Clearly confirm successful renter actions

## Validation

- [x] Show validation near the relevant field
- [x] Make required information clear

## Unavailable

- [x] Explain unavailable actions when appropriate

---

# 21. Responsive Design

All renter-facing screens must be reviewed.

## Pages

- [ ] Home
- [ ] Search
- [ ] Available Cars
- [ ] Vehicle Details
- [ ] Login
- [ ] Registration
- [ ] Rental Request
- [ ] Booking Confirmation
- [ ] My Bookings
- [ ] Booking Details
- [ ] My Profile
- [ ] Change Password
- [ ] Delete Account Information
- [ ] Navigation

## Screen Sizes

- [ ] Mobile
- [ ] Tablet
- [ ] Laptop
- [ ] Desktop
- [ ] Large desktop

## Responsive Quality

- [ ] No unintended horizontal scrolling
- [ ] No clipped content
- [ ] No overlapping elements
- [ ] No inaccessible actions
- [ ] Appropriate touch targets
- [ ] Readable text
- [ ] Correct image scaling
- [ ] Correct menu behavior

---

# 22. Frontend Code Quality

- [x] Review existing implementation before modifying it
- [x] Reuse existing shared components
- [x] Reuse existing SCSS variables/design tokens
- [x] Reduce duplicated styles
- [x] Create reusable components where appropriate
- [x] Use TypeScript interfaces/models
- [x] Keep mock data out of components
- [x] Use service-based mock implementations
- [x] Preserve environment-based configuration
- [x] Do not hardcode API URLs
- [x] Do not hardcode `lessor_id`
- [x] Do not hardcode tenant/client identifiers
- [x] Preserve existing working API integrations
- [x] Avoid unnecessary dependencies
- [x] Keep frontend implementation consistent with existing Angular architecture

---

# 23. API Dependency Handling

API work is not the current frontend priority.

For each frontend feature:

- [x] Determine whether an API is actually required
- [x] Verify whether the required API already exists
- [x] Use existing verified APIs where available
- [x] Do not guess endpoint paths
- [x] Do not invent backend responses
- [x] Do not modify Laravel as part of frontend work
- [x] Complete UI even when API is unavailable
- [x] Define typed frontend models
- [x] Define frontend service contract
- [x] Use service-based mock data when necessary
- [x] Record confirmed missing API
- [x] Keep API integration status separate from UI status

---

# 24. Confirmed API Gaps

Only confirmed API gaps should be added to this table.

Do not classify an API as missing until the existing implementation/configuration has been inspected.

| Feature | Required Operation | API Status | Frontend Status |
|---|---|---|---|
| Vehicle Details | Retrieve a renter-visible vehicle detail record | Not available in verified renter frontend contracts | UI Complete with selected-result service data |
| Rental Request | Submit a renter rental/booking request | Not available in verified renter frontend contracts | UI Complete with typed preview service |
| My Bookings | Retrieve renter bookings | Not available in verified renter frontend contracts | UI Complete with typed preview service |
| Booking Details | Retrieve booking details | Not available in verified renter frontend contracts | UI Complete with typed preview service |
| My Profile | Retrieve renter profile | Not available in verified renter frontend contracts | UI Complete with token-safe preview profile |
| Edit Profile | Update renter profile | Not available in verified renter frontend contracts | UI Complete with session-only preview update |
| Change Password | Change renter password | Not available in verified renter frontend contracts | UI Complete; passwords are not stored or sent |
| Sign Out | Logout/end renter server session | Not available in verified renter frontend contracts | UI Complete with local token removal |

Account deletion remains informational unless explicitly approved as a functional feature.

Do not assign endpoint paths until they have been verified.

---

# 25. API Missing Workflow

When the Frontend Agent discovers a confirmed missing API:

1. Do not modify the Laravel backend.
2. Do not invent the endpoint.
3. Complete as much of the frontend UI as possible.
4. Define the required TypeScript model/service contract.
5. Use service-based mock data if required.
6. Document what data/action the frontend requires.
7. Create or request a separate `[API]` GitHub Issue.
8. Mark the API dependency appropriately in the GitHub Project.
9. Continue unrelated frontend work.

Example API issue:

```text
[API] Renter My Bookings
```

The API issue should describe the required operation rather than inventing a route.

---

# 26. Regression Verification

Before marking the renter website UI milestone complete:

- [ ] Login still works
- [ ] Registration still works
- [ ] Search Available Cars still works
- [ ] Pickup Location works
- [ ] Search criteria are preserved correctly
- [ ] Vehicle Details navigation works
- [ ] Guest navigation works
- [ ] Authenticated navigation works
- [ ] Protected routes work
- [ ] Authentication survives valid page reloads
- [ ] Sign Out works
- [ ] Mobile navigation works
- [ ] Tablet layout works
- [ ] Desktop layout works
- [ ] No critical console errors
- [x] Production build passes

---

# 27. QA

## GitHub Issue

```text
[QA] Full Renter UI Responsive and Regression Testing
```

## Verification

- [ ] Test complete guest journey
- [ ] Test complete authenticated renter journey
- [ ] Test Home
- [ ] Test Vehicle Search
- [ ] Test Pickup Location
- [ ] Test Available Cars
- [ ] Test Vehicle Details
- [ ] Test Login
- [ ] Test Registration
- [ ] Test Rental Request
- [ ] Test Booking Confirmation
- [ ] Test My Bookings
- [ ] Test Booking Details
- [ ] Test My Profile
- [ ] Test Change Password
- [ ] Test Delete Account Information
- [ ] Test Sign Out
- [ ] Test loading states
- [ ] Test empty states
- [ ] Test error states
- [ ] Test validation states
- [ ] Test mobile
- [ ] Test tablet
- [ ] Test desktop
- [x] Run production build
- [ ] Perform regression test of existing working features

---

# 28. Initial GitHub Issues

Create these frontend Issues:

```text
[Frontend] Improve Home and Vehicle Search UI
[Frontend] Complete Pickup Location UX
[Frontend] Complete Responsive Navigation
[Frontend] Redesign Available Cars Results
[Frontend] Complete Vehicle Details UI
[Frontend] Complete Rental Request Flow
[Frontend] Complete Booking Confirmation
[Frontend] Complete My Bookings
[Frontend] Complete Booking Details
[Frontend] Complete My Profile
[Frontend] Complete Change Password
[Frontend] Create Delete Account Information Page
[Frontend] Complete Sign Out Flow
[QA] Full Renter UI Responsive and Regression Testing
```

Do not create speculative API Issues yet.

API Issues should be created only after a dependency has been verified as genuinely missing.

---

# 29. Recommended Implementation Order

1. Home and Vehicle Search
2. Pickup Location
3. Responsive Navigation
4. Available Cars
5. Vehicle Details
6. Rental Request
7. Booking Confirmation
8. My Bookings
9. Booking Details
10. My Profile
11. Change Password
12. How to Delete My Account?
13. Sign Out
14. Standard loading/empty/error/success states
15. Responsive review
16. Regression testing
17. Record confirmed API gaps

---

# 30. Definition of UI Complete

The renter frontend milestone is complete when:

- [ ] Complete renter journey can be demonstrated
- [x] All required pages exist
- [x] Guest navigation is complete
- [x] Authenticated navigation is complete
- [x] Forms have appropriate validation
- [x] Loading states exist
- [x] Empty states exist
- [x] Error states exist
- [x] Success states exist
- [ ] Mobile layouts are usable
- [ ] Tablet layouts are usable
- [ ] Desktop layouts are usable
- [ ] Existing Login still works
- [ ] Existing Registration still works
- [ ] Existing Search Available Cars still works
- [ ] Pickup Location works correctly
- [x] Production build succeeds
- [x] Confirmed API gaps are documented

The frontend may still be considered:

```text
UI Complete + API Pending
```

when a backend dependency remains unavailable.

---

# 31. Current Milestone

> **100% Renter Website UI/UX Complete**

Backend API development and final API integration are tracked separately.

The frontend must be reviewable as a complete renter experience even when some verified backend APIs remain pending.
