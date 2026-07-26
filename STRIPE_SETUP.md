# Stripe Configuration Setup Guide

## Overview
This project uses Stripe for payment processing. API keys must be configured securely and are NOT committed to the repository.

## Setup Instructions

### 1. Local Development

#### Option A: Load from API (Recommended)
The recommended approach is to fetch Stripe keys from your backend API at runtime:

```typescript
// In your service
export class StripeService {
  constructor(private http: HttpClient) {}

  getStripeKeys(): Observable<{clientKey: string, secretKey: string}> {
    return this.http.get('/api/stripe/keys');
  }
}

// In your component
export class ApiKeyGenerationComponent {
  constructor(private stripeService: StripeService) {
    this.stripeService.getStripeKeys().subscribe(keys => {
      this.clientKey = keys.clientKey;
      this.secretKey = keys.secretKey;
    });
  }
}
```

#### Option B: Use Environment-Specific Files
Create environment-specific configuration files:

**src/environment/environment.ts** (local development)
```typescript
export const environment = {
  clientKey: 'pk_test_YOUR_TEST_KEY',
  secretKey: 'sk_test_YOUR_TEST_SECRET',
};
```

**src/environment/environment.prod.ts** (production)
```typescript
export const environment = {
  clientKey: '', // Will be injected at build time
  secretKey: '', // Will be injected at build time
};
```

Then update `angular.json` to use different configs:
```json
{
  "configurations": {
    "development": {
      "fileReplacements": [{
        "replace": "src/environment/environment.ts",
        "with": "src/environment/environment.ts"
      }]
    },
    "production": {
      "fileReplacements": [{
        "replace": "src/environment/environment.ts",
        "with": "src/environment/environment.prod.ts"
      }]
    }
  }
}
```

### 2. Build Environment Variables

For CI/CD pipelines, inject keys at build time:

```bash
# During build
ng build --prod \
  --configuration production \
  --define environment.clientKey="$STRIPE_PUBLISHABLE_KEY" \
  --define environment.secretKey="$STRIPE_SECRET_KEY"
```

Or use a build script that generates the environment file:

```bash
#!/bin/bash
cat > src/environment/environment.prod.ts << EOF
export const environment = {
  clientKey: '${STRIPE_PUBLISHABLE_KEY}',
  secretKey: '${STRIPE_SECRET_KEY}',
};
EOF
```

### 3. GitHub Secrets Setup

Store your Stripe keys in GitHub Secrets:

1. Go to: **Settings → Secrets and variables → Actions**
2. Click **"New repository secret"**
3. Add:
   - `STRIPE_PUBLISHABLE_KEY` = `pk_live_...`
   - `STRIPE_SECRET_KEY` = `sk_live_...`

Use in GitHub Actions:

```yaml
name: Deploy

on: [push]

jobs:
  deploy:
    runs-on: ubuntu-latest
    env:
      STRIPE_PUBLISHABLE_KEY: ${{ secrets.STRIPE_PUBLISHABLE_KEY }}
      STRIPE_SECRET_KEY: ${{ secrets.STRIPE_SECRET_KEY }}
    steps:
      - uses: actions/checkout@v2
      - name: Build
        run: npm run build
```

### 4. Using .env Files Locally (Not Committed)

Create a `.env.local` file (NOT in git):

```
STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_secret
```

Then load it with a custom builder script:

```typescript
// build-env.js
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const envContent = `export const environment = {
  clientKey: '${process.env.STRIPE_PUBLISHABLE_KEY || ''}',
  secretKey: '${process.env.STRIPE_SECRET_KEY || ''}',
};`;

fs.writeFileSync(
  path.join(__dirname, 'src/environment/environment.ts'),
  envContent
);
```

Add to `package.json`:

```json
{
  "scripts": {
    "prebuild": "node build-env.js",
    "build": "ng build",
    "preserve": "node build-env.js",
    "serve": "ng serve"
  }
}
```

## Security Best Practices

✅ **DO:**
- Use Stripe test keys (`pk_test_`, `sk_test_`) for development
- Store production keys in CI/CD secrets, NOT in code
- Load keys from API backend when possible
- Rotate keys regularly
- Use different keys per environment (dev, staging, prod)

❌ **DON'T:**
- Commit API keys to version control
- Hard-code secrets in components
- Share keys in chat or email
- Use the same key across environments
- Store keys in localStorage or sessionStorage

## Testing

Stripe provides test card numbers: https://stripe.com/docs/testing

Use test key for local development:
- Publishable Key: `pk_test_51234567890...`
- Secret Key: `sk_test_51234567890...`

## Additional Resources

- [Stripe Keys Documentation](https://stripe.com/docs/keys)
- [Angular Environment Setup](https://angular.dev/guide/build/environment)
- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)
