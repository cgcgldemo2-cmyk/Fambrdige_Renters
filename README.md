# FambridgeRentalPlatform

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# Renter vehicle-search API integration

The renter search uses two public FamBridge API endpoints. Their base URL and paths are configured in `src/environments/environment.ts`; no credential is stored in the frontend.

Configure the storefront's lessor business code in `src/index.html`:

```html
<meta name="fambridge-business-code" content="FB-YOUR-BUSINESS-CODE">
```

For local or shared-link testing, the `code` query parameter overrides the meta tag.

## Pickup locations

- Method and route: `GET /api/pickup-locations`
- Purpose: load active pickup-location suggestions for the renter search form.
- Authentication: public; no bearer token is sent.
- Request parameters and body: none.
- Billing: no frontend charge is applied; backend billing behavior is not confirmed in this repository.
- Frontend source: `PickupLocationsService.getPickupLocations()` and `BookingSearchComponent.loadPickupLocations()`.

```bash
curl --location '{{domain}}/api/pickup-locations' \
  --header 'Accept: application/json'
```

Example success response:

```json
{
  "success": true,
  "message": "Pickup locations loaded.",
  "data": [
    {
      "id": 1,
      "name": "Airport Terminal",
      "shortName": "Terminal",
      "category": "Airport",
      "city": "Sample City",
      "province": "Sample Province",
      "region": "Sample Region",
      "isActive": true
    }
  ]
}
```

An HTTP error, `success: false`, HTML response, malformed JSON, or malformed `data` array is shown as a retryable pickup-location error.

## Available vehicles

- Method and route: `GET /api/renter/available-vehicles`
- Purpose: return the lessor's available vehicles for the renter's requested local pickup period.
- Authentication: public; a valid lessor business `code` provides tenant scope.
- Required query parameters: `starts_at`, `ends_at`.
- Optional query parameters: `code`, `pickup_location_id`, `rental_type`, `transmission`, `vehicle_type`, `fuel_type`, `min_price`, `max_price`, `sort_by`, `page`, and `per_page`.
- Response envelope: vehicle results are read from `data.vehicles`; pagination is read from `data.pagination`.
- Billing: no frontend charge is applied; the backend may log or bill API usage according to the lessor's agreement.
- Frontend source: `RenterVehicleSearchService.search()` and `RentersSearchResultsComponent` on `feature/renter-api-integration`.

```bash
curl --get '{{domain}}/api/renter/available-vehicles' \
  --header 'Accept: application/json' \
  --data-urlencode 'code=FB-SAMPLE-BUSINESS' \
  --data-urlencode 'starts_at=2026-08-10T10:00:00' \
  --data-urlencode 'ends_at=2026-08-12T10:00:00' \
  --data-urlencode 'rental_type=without_driver' \
  --data-urlencode 'page=1' \
  --data-urlencode 'per_page=10'
```

Example success response:

```json
{
  "success": true,
  "message": "Available vehicles loaded successfully.",
  "data": {
    "lessor": { "id": 1, "code": "FB-SAMPLE-BUSINESS", "name": "Sample Rental Business" },
    "vehicles": [],
    "pagination": {
      "current_page": 1,
      "per_page": 10,
      "total": 0,
      "last_page": 1,
      "from": null,
      "to": null
    }
  }
}
```

Validation failures return HTTP `422`. Invalid tenant scope may return `404`, and unexpected backend failures return `500`. The UI keeps loading, retryable error, empty, and populated success states separate. Local pickup time is preserved when constructing `starts_at` and `ends_at`, and backend-calculated totals are preferred when present.

# Renter registration API integration

- Method and route: `POST /api/v1/renters/register`
- Purpose: create a renter account before protected search or booking actions.
- Authentication and tenant: public registration endpoint; no bearer token or tenant parameter is sent.
- Headers: `Content-Type: application/json`.
- Required JSON fields: `name`, `email`, `mobile`, and `password`.
- Billing: free authentication/registration endpoint according to the Phase 1 API inventory.
- Backend source: `routes/api/renter.php`, `RenterRegistrationController::store`, and `LandlordUser` / `landlord_users`.
- Frontend source: `RenterAuthService.register()` and `RenterRegistrationComponent` on `feature/renter-api-integration-v2`.

```bash
curl --location '{{domain}}/api/v1/renters/register' \
  --header 'Content-Type: application/json' \
  --data '{
    "name": "Test Renter V1",
    "email": "test.renter.v1@example.com",
    "mobile": "9179876543",
    "password": "Password@123"
  }'
```

The frontend requires a successful JSON response containing `status: true` and a non-empty `message`. A `status: false` response, malformed response, network error, or HTTP validation error is shown as a registration error. Validation failures return HTTP `422` with a `message` and field-specific `errors`; the form displays the first safe validation message returned by the API.

Example success response:

```json
{
  "status": true,
  "message": "Renter registered successfully."
}
```

Example validation response (`422 Unprocessable Entity`):

```json
{
  "message": "Validation error.",
  "errors": {
    "email": ["The email field is required."]
  }
}
```
