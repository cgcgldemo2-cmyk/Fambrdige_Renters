## Decision: UI-First Renter Development

### Status

Approved

### Decision

FamBridge Renters will temporarily use a UI-first development approach.

Frontend completion will not depend on backend API completion.

When the frontend requires data or an action for which no verified API exists:

1. Complete the frontend UI and UX.
2. Define the required frontend model/service contract.
3. Use service-based mock data when needed for demonstration.
4. Record the missing API requirement.
5. Assign the API requirement separately to the Backend/API Agent.
6. Replace the mock implementation during the integration phase.

Frontend agents must not create or invent backend endpoints.

### Goal

Allow the complete renter journey to be reviewed and tested visually before all backend integrations are finished.
