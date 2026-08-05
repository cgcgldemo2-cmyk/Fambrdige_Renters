# FamBridge Renters — Product Requirements Document

## 1. Product Overview

FamBridge Renters is the renter-facing web application of the FamBridge rental platform.

The website allows renters to:

- Search available vehicles
- Select pickup location and rental schedule
- View available vehicles
- View vehicle information
- Register an account
- Login
- Submit a rental/booking request
- Monitor their bookings
- Manage their renter profile
- Manage account security

FamBridge Renters is not intended to behave like a large multi-lessor marketplace.

Each deployed renter website represents a specific rental business/lessor and should provide a simple, direct, and user-friendly rental experience.

---

## 2. Current Development Priority

### UI-First Development

The current priority is to complete the FamBridge Renters frontend UI/UX.

The objective is to make the complete renter journey visually usable and testable before requiring every backend API to be available.

Frontend development must not stop because an API is missing.

When an API is unavailable:

1. Complete the UI.
2. Create appropriate TypeScript models/interfaces.
3. Define the frontend service contract.
4. Use service-based mock data where necessary.
5. Record the missing API.
6. Allow the Backend/API Agent to implement the API separately.
7. Replace the mock implementation during API integration.

Frontend developers and AI agents must never invent production API endpoints.

Existing working API integrations must be preserved.

---

## 3. Confirmed Working Features

The following features are currently working:

- Renter Login
- Renter Registration
- Search Available Cars

These features must not be broken while completing the remaining UI.

---

## 4. Design Goal

The FamBridge Renters website should be:

- Simple
- Modern
- Mobile-first
- Fast to understand
- Easy to navigate
- Trustworthy
- Suitable for non-technical renters
- Consistent across all pages

A renter should not need instructions to understand how to find and request a vehicle.

Avoid unnecessary screens, complicated filters, or marketplace-style complexity.

---

## 5. Design References

Use the following websites only as UX/design references:

- https://www.carbnbrentals.com/
- https://vpicars.com/
- https://www.anistransport.com/
- https://www.doon.ph/
- https://book2wheel.com/

Do not directly copy any website.

Study and combine useful ideas such as:

- Clear search experience
- Prominent pickup location
- Pickup and return scheduling
- Easy-to-read vehicle cards
- Clear pricing
- Strong vehicle imagery
- Simple calls to action
- Mobile-friendly booking flow
- Clear rental status
- Trust-oriented information

The final FamBridge design must remain consistent with the existing project branding.

---

## 6. Primary Renter Journey

The primary renter journey is:

1. Open renter website
2. Select pickup location
3. Select rental schedule
4. Search available cars
5. Browse available vehicles
6. View vehicle information
7. Login or create an account if authentication is required
8. Submit rental request
9. Receive confirmation
10. Monitor the request through My Bookings

The number of steps should remain as small as reasonably possible.

---

## 7. Main Navigation

The hamburger/burger navigation must always be available regardless of screen size.

It must remain available on:

- Mobile
- Tablet
- Laptop
- Desktop
- Large desktop

Do not replace it with separate desktop navigation.

### Guest Menu

Guest users should see:

- Home
- Find a Car
- Login
- Create Account

Login and Create Account should not be displayed separately in the desktop header.

They belong inside the dropdown menu.

### Authenticated Renter Menu

Authenticated renters should see:

- Home
- Find a Car
- My Bookings
- My Profile
- Change Password
- How to Delete My Account?
- Sign Out

Login and Create Account must not appear while authenticated.

The menu must correctly update after:

- Login
- Registration
- Page reload
- Token expiration
- Sign Out

---

## 8. Home / Vehicle Search

The home page should immediately communicate that the renter can find an available vehicle.

The primary search should include:

- Pickup Location
- Pickup Date
- Pickup Time
- Rental duration or Return Date/Time
- Search Available Cars button

The search form must work well on mobile and desktop.

Pickup Location is a high-priority feature and must be clearly visible.

The selected search values should be retained when navigating to vehicle search results.

---

## 9. Pickup Location

The renter must be able to clearly select the vehicle pickup location.

Requirements:

- Easy-to-understand selector
- Clear location names
- Loading state
- Empty state
- Error state
- Selected-location state
- Mobile-friendly selection
- Desktop-friendly selection
- Retain selection during search
- Retain selection when viewing a vehicle
- Carry selection into the booking flow

Pickup Location must not be confused with renter address or vehicle current location.

---

## 10. Available Cars

Search results must provide an easy way to compare vehicles.

Each vehicle card should display useful information when available:

- Vehicle image
- Vehicle name
- Vehicle type
- Seating capacity
- Transmission
- Rental type
- Pricing
- Availability
- Relevant badges/status
- View Details or equivalent primary action

The interface must include:

- Loading state
- No vehicles found state
- Search error state
- Filters
- Sort controls where useful
- Ability to modify the search

Avoid excessive filtering that makes the rental process complicated.

---

## 11. Vehicle Details

The Vehicle Details experience should provide enough information for the renter to make a decision.

Display when available:

- Vehicle images
- Vehicle name
- Vehicle description
- Vehicle type
- Passenger capacity
- Transmission
- Rental pricing
- Rental type
- Pickup location
- Rental schedule
- Availability
- Important rental information
- Primary rental/request action

The selected vehicle and search schedule must carry into the rental request flow.

---

## 12. Login

Login is already working and must remain functional.

The design should include:

- Email/username field as currently supported
- Password
- Show/hide password
- Validation
- Loading state
- Error state
- Link to Create Account
- Forgot Password only if currently supported or explicitly planned

Authentication errors must be clearly understandable.

---

## 13. Registration

Registration is already working and must remain functional.

Requirements:

- Clear required fields
- Validation
- Password confirmation
- Terms/privacy acknowledgement if required
- Loading state
- Success state
- Error state
- Login link

After registration, follow the existing approval/authentication workflow.

---

## 14. Rental / Booking Request

After selecting a vehicle, the renter should be able to review the rental information before submitting.

The review should clearly display:

- Vehicle
- Pickup location
- Pickup schedule
- Return schedule or rental duration
- Rental pricing when available
- Renter information
- Relevant rental instructions

The renter should clearly understand that they are submitting a rental request when the booking is not instantly confirmed.

The UI should include:

- Review state
- Submit state
- Loading state
- Validation errors
- Submission error
- Successful submission confirmation

Prevent accidental duplicate submissions.

---

## 15. Booking Confirmation

After a successful rental request:

Display:

- Success confirmation
- Booking/request reference
- Vehicle
- Schedule
- Pickup location
- Current booking status
- Clear next step

Provide navigation to:

- My Bookings
- Home or Find a Car

---

## 16. My Bookings

Authenticated renters need a My Bookings page.

Display renter bookings using clear status indicators.

Useful information includes:

- Booking reference
- Vehicle
- Pickup location
- Pickup date/time
- Return date/time
- Booking status
- Payment/reservation status when applicable

The page must provide:

- Loading state
- Empty state
- Error state
- Responsive layout
- View Booking Details action

Where useful, bookings may be grouped or filtered by:

- Active
- Pending
- Completed
- Cancelled/Rejected

Do not overcomplicate the initial interface.

---

## 17. Booking Details

The renter should be able to open a booking and view its complete status.

Display when available:

- Booking reference
- Vehicle information
- Rental schedule
- Pickup location
- Booking status
- Payment/reservation status
- Rental request information
- Important instructions
- Status/history timeline when supported

The renter must easily understand what happens next.

---

## 18. My Profile

Authenticated renters need a My Profile page.

Display when available:

- Profile photo or initials
- Full name
- Email
- Mobile number
- Address
- Account approval status
- Verification status
- Document status

Never display:

- Password
- Authentication token
- Sensitive backend identifiers

Provide an Edit Profile interface.

If updating the profile API does not exist yet, the UI should still be completed and the missing API documented separately.

---

## 19. Change Password

Authenticated renters need a Change Password page.

Fields:

- Current Password
- New Password
- Confirm New Password

Requirements:

- Required validation
- Password requirements
- Password confirmation matching
- Show/hide password
- Loading state
- Success feedback
- Error feedback

Password values must never be stored in frontend mock data or application logs.

If the API is missing, complete the interface and report the missing backend requirement.

---

## 20. How to Delete My Account?

Provide an informational page titled:

`How to Delete My Account?`

This is initially a help/information page.

The page should explain using approved project information:

- How account deletion can be requested
- What happens when there are active/pending bookings
- That some records may need to be retained when legally or operationally required
- How to contact support

Do not invent:

- Retention periods
- Support information
- Legal guarantees
- Backend endpoints

A destructive Delete Account button must not be added unless explicitly approved and supported by the backend.

---

## 21. Sign Out

Authenticated renters must be able to sign out from the hamburger menu.

After sign out:

- Clear renter authentication state
- Return to an appropriate public page
- Update navigation immediately
- Prevent protected pages from remaining accessible

Do not clear unrelated renter preferences unnecessarily.

---

## 22. Responsive Design

Every renter-facing screen must be tested at:

- Mobile
- Tablet
- Laptop
- Desktop
- Large desktop

There must be no critical horizontal scrolling, clipped content, unusable buttons, overlapping menus, or inaccessible actions.

Mobile usability is a primary requirement.

---

## 23. Standard UI States

Every data-driven page should consider:

### Loading

Show appropriate loading feedback.

### Empty

Explain what the renter can do next when no information exists.

### Error

Provide understandable feedback and a retry option when appropriate.

### Success

Clearly confirm successful renter actions.

### Disabled

Explain unavailable actions where appropriate instead of silently disabling important functionality.

---

## 24. API Dependency Rule

API availability must not block UI completion.

Each frontend feature should be classified as:

- UI Complete + API Integrated
- UI Complete + API Pending
- UI In Progress
- Not Started

Missing API requirements must be reported separately to the backend agents.

The frontend agent must not create Laravel endpoints as part of UI development.

---

## 25. Definition of UI Complete

The renter UI is considered complete when:

- All required renter pages exist
- The entire renter journey can be demonstrated
- Navigation is complete
- Guest/authenticated navigation works
- Forms have validation
- Loading states exist
- Empty states exist
- Error states exist
- Success states exist
- Mobile layouts are usable
- Desktop layouts are usable
- Existing Login works
- Existing Registration works
- Existing Search Available Cars works
- Missing APIs are documented
- No backend implementation is required to review the complete renter experience

API integration completion is tracked separately from UI completion.

---

## 26. Success Goal

The renter should be able to open the website and immediately understand:

1. Where to pick up the vehicle
2. When they need the vehicle
3. Which vehicles are available
4. How much the rental costs
5. How to request the vehicle
6. Where to monitor the booking
7. How to manage their account

The experience should feel simple, trustworthy, responsive, and ready for real renters.
