# Bazar Dor

A web app for checking daily essential product prices in Bangladesh. Users can browse products by category, compare price changes, and view market prices after signing in.

## Features

- Daily product prices with a scrolling price ticker.
- Separate sections for the six largest price increases and decreases.
- Product categories with sorting by price.
- Protected product details with market prices and minimum, maximum, and average price summaries.
- Email and password authentication, plus Google and GitHub sign-in.
- Profile name updates and account sign-out.
- Responsive layouts for mobile, tablet, and desktop.
- Loading skeletons, retry options, toast notifications, and a custom 404 page.
- A fallback API when the primary product API is unavailable.

## Tech Stack

- Next.js App Router
- React
- Tailwind CSS
- Better Auth
- PostgreSQL hosted on Neon
- React Hot Toast

## Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/yourmohammadanayet/Bazar-Dor.git
cd Bazar-Dor
npm ci
```

### 2. Configure environment variables

Create `.env.local` in the project root and add these variables with your own values:

```dotenv
DATABASE_URL=
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

Use the PostgreSQL connection string from Neon for `DATABASE_URL`, with `sslmode=verify-full`.

Generate a secret for `BETTER_AUTH_SECRET`:

```bash
openssl rand -base64 32
```

Copy the generated value into `.env.local`. Keep this file private.

### 3. Configure OAuth

Create a Google OAuth web client and a GitHub OAuth app.

For Google, use this local origin:

```text
http://localhost:3000
```

Use these callback URLs:

| Provider | Callback URL |
| --- | --- |
| Google | http://localhost:3000/api/auth/callback/google |
| GitHub | http://localhost:3000/api/auth/callback/github |

Add each provider's client ID and client secret to `.env.local`.

### 4. Create authentication tables

```bash
npx auth@latest migrate --config ./src/lib/auth.js
```

Review and confirm the migration when prompted.

### 5. Start the app

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Available Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Create a production build |
| `npm start` | Run the production build |

## Routes

| Route | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Daily prices and product listings |
| `/category/[slug]` | Public | Category products and price sorting |
| `/product/[slug]` | Signed-in users | Product details and market prices |
| `/sign-up` | Public | Create an account |
| `/sign-in` | Public | Sign in |
| `/profile` | Signed-in users | View account information and update name |
| `/link-github` | Requires authentication to link | Connect GitHub to an existing account |

If GitHub sign-in returns `account_not_linked` for an existing email account, visit `/link-github` and sign in with that account's email and password to connect GitHub.

## Product API

Primary API:

```text
https://api.api-store.workers.dev/api/bazardor/products
```

Fallback API:

```text
https://api.abcz.workers.dev/api/bazardor/products
```

Prices come from the supplied API and may differ from prices at individual markets.

## Deployment Configuration

Set the environment variables in the hosting dashboard. Use the deployed site's URL for `BETTER_AUTH_URL` and register the corresponding Google and GitHub callback URLs.

Run the production build before deployment and check authentication again on the deployed site.

## Repository

https://github.com/yourmohammadanayet/Bazar-Dor