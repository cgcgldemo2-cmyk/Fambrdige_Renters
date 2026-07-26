<!-- Backend Implementation Guide for Stripe Keys API Endpoint -->

# Backend: Stripe Keys API Endpoint

This guide shows how to implement the `/api/stripe/keys` endpoint in your Laravel backend (platform-api).

## Prerequisites

Ensure your Stripe keys are stored securely:
- In `.env` file: `STRIPE_PUBLIC_KEY` and `STRIPE_SECRET_KEY`
- In database encrypted config (recommended)
- In Laravel Key Management service

## Implementation Steps

### Step 1: Create a Controller

```bash
php artisan make:controller Api/StripeController
```

### Step 2: Add the Route

**routes/api.php**:
```php
Route::prefix('api')->group(function () {
    // Public endpoints (no auth required for keys)
    Route::get('/stripe/keys', [StripeController::class, 'getKeys']);
    
    // Protected endpoints (auth required)
    Route::middleware('auth:api')->group(function () {
        Route::post('/stripe/keys/regenerate', [StripeController::class, 'regenerateKeys']);
    });
});
```

### Step 3: Implement the Controller

**app/Http/Controllers/Api/StripeController.php**:

```php
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class StripeController extends Controller
{
    /**
     * Get Stripe API keys for client integration
     * 
     * @return JsonResponse
     */
    public function getKeys(): JsonResponse
    {
        try {
            // Option 1: Load from .env (development)
            $clientKey = config('services.stripe.public_key') ?? env('STRIPE_PUBLIC_KEY');
            $secretKey = config('services.stripe.secret_key') ?? env('STRIPE_SECRET_KEY');

            // Option 2: Load from database config (more secure for production)
            // $clientKey = \App\Models\Config::where('key', 'stripe_public_key')->value('value');
            // $secretKey = \App\Models\Config::where('key', 'stripe_secret_key')->value('value');

            if (!$clientKey || !$secretKey) {
                Log::warning('Stripe keys not configured');
                return response()->json([
                    'error' => 'Stripe keys not configured',
                    'clientKey' => '',
                    'secretKey' => '',
                ], 500);
            }

            // Note: Only return public key to client, never return secret key
            return response()->json([
                'clientKey' => $clientKey,
                'secretKey' => '', // Never expose secret key to frontend
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching Stripe keys', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'error' => 'Failed to fetch Stripe configuration',
                'clientKey' => '',
                'secretKey' => '',
            ], 500);
        }
    }

    /**
     * Regenerate Stripe API keys (admin only)
     * 
     * @return JsonResponse
     */
    public function regenerateKeys(): JsonResponse
    {
        // Verify user is admin
        if (!auth()->user() || !auth()->user()->is_admin) {
            return response()->json([
                'error' => 'Unauthorized',
            ], 403);
        }

        try {
            // TODO: Implement key regeneration logic
            // This would typically involve:
            // 1. Calling Stripe API to generate new restricted keys
            // 2. Saving to secure config storage
            // 3. Rotating old keys

            return response()->json([
                'message' => 'Keys regenerated successfully',
            ]);
        } catch (\Exception $e) {
            Log::error('Error regenerating Stripe keys', [
                'message' => $e->getMessage(),
            ]);

            return response()->json([
                'error' => 'Failed to regenerate keys',
            ], 500);
        }
    }
}
```

### Step 4: Configure Stripe in Laravel

**config/services.php**:

```php
'stripe' => [
    'public_key' => env('STRIPE_PUBLIC_KEY'),
    'secret_key' => env('STRIPE_SECRET_KEY'),
],
```

**.env**:

```
STRIPE_PUBLIC_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
```

### Step 5: Add CORS Configuration (if needed)

**config/cors.php**:

```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_methods' => ['*'],
'allowed_origins' => ['*'],
'allowed_origins_patterns' => [],
'allowed_headers' => ['*'],
'exposed_headers' => [],
'max_age' => 0,
'supports_credentials' => false,
```

## Security Best Practices

### ✅ DO:
- Store secret keys in `.env` or encrypted config
- Never expose secret key to frontend
- Use HTTPS only
- Add rate limiting to the endpoint
- Log all key access attempts
- Rotate keys regularly
- Use Stripe restricted keys where possible

### ❌ DON'T:
- Commit `.env` file with real keys
- Return secret key to frontend
- Store keys in plain text database
- Expose the endpoint to public without auth for sensitive operations
- Use same keys across environments

## Example Responses

### Success Response
```json
{
  "clientKey": "pk_test_51234567890abcdef",
  "secretKey": ""
}
```

### Error Response
```json
{
  "error": "Stripe keys not configured",
  "clientKey": "",
  "secretKey": ""
}
```

## Testing

**Test with curl**:
```bash
curl -X GET http://localhost:8000/api/stripe/keys \
  -H "Content-Type: application/json"
```

**Test with Laravel artisan**:
```bash
php artisan tinker
# Then in tinker:
app('App\Http\Controllers\Api\StripeController')->getKeys()
```

## Environment Setup

Create `.env.example` with template values:

```
STRIPE_PUBLIC_KEY=pk_test_example
STRIPE_SECRET_KEY=sk_test_example
```

Developers copy to `.env` and add real keys:

```bash
cp .env.example .env
# Edit .env with actual keys
php artisan key:generate
php artisan serve
```

## References

- [Stripe API Documentation](https://stripe.com/docs/api)
- [Laravel Configuration](https://laravel.com/docs/configuration)
- [Laravel CORS Configuration](https://laravel.com/docs/cors)
