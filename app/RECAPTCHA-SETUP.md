# Google reCAPTCHA v3 Setup Guide

## Multi-Layer Spam Protection

This contact form uses **three layers of protection**:

1. **Client-side rate limiting** (localStorage) - 3 submissions per hour
2. **reCAPTCHA v3** (invisible) - Behavioral analysis and bot detection
3. **Formspree validation** - Server-side verification

See [RATE-LIMITING.md](./RATE-LIMITING.md) for details on the rate limiting implementation.

## What is reCAPTCHA v3?
reCAPTCHA v3 runs invisibly in the background and scores user interactions without requiring any user action (no checkboxes or challenges). It returns a score (0.0 - 1.0) indicating how likely the interaction is from a human.

## Setup Steps

### 1. Get Your reCAPTCHA Keys

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click "+" to create a new site
3. Fill in the form:
   - **Label**: Your website name (e.g., "Kasper Portfolio")
   - **reCAPTCHA type**: Select **reCAPTCHA v3**
   - **Domains**: Add your domains:
     - `localhost` (for local testing)
     - `yourdomain.com` (your production domain)
     - `*.pages.dev` (if using Cloudflare Pages preview URLs)
   - Accept the terms
4. Click "Submit"
5. You'll receive two keys:
   - **Site Key** (public key - used in frontend)
   - **Secret Key** (private key - used in backend validation)

### 2. Configure Cloudflare Pages Environment Variable

1. Go to your [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** → Select your project
3. Go to **Settings** → **Environment variables**
4. Add a new variable:
   - **Variable name**: `VITE_RECAPTCHA_SITE_KEY`
   - **Value**: Your reCAPTCHA site key
   - **Environment**: Select both "Production" and "Preview"
5. Click "Save"
6. Redeploy your site for the changes to take effect

### 3. Local Development Setup

For local development, create a `.env` file in the `app/` directory:

```bash
VITE_RECAPTCHA_SITE_KEY=your_site_key_here
```

This file is gitignored and won't be committed to your repository.

### 4. Configure Formspree (Backend Validation)

Since you're using Formspree, you need to configure it to validate the reCAPTCHA token:

1. Go to [Formspree Dashboard](https://formspree.io/forms)
2. Select your form (ID: mnjybgrr)
3. Go to "Settings" → "Spam Protection"
4. Enable "Google reCAPTCHA"
5. Enter your **Secret Key** (not the site key)
6. Save settings

That's it! Formspree will now automatically validate the reCAPTCHA token on every submission.

## How It Works

1. When a user submits the form, reCAPTCHA v3 silently analyzes their behavior
2. A token is generated with a score (0.0 = likely bot, 1.0 = likely human)
3. The token is sent to Formspree along with the form data
4. Formspree validates the token with Google's servers using your secret key
5. If the score is too low, Formspree can reject the submission

## Deployment Checklist

- [ ] Get reCAPTCHA v3 keys from Google
- [ ] Add site key to Cloudflare Pages environment variables
- [ ] Configure Formspree with secret key
- [ ] Add production domain to reCAPTCHA admin console
- [ ] Redeploy on Cloudflare Pages
- [ ] Test form submission on production

## Testing

- The reCAPTCHA will work on `localhost` for testing
- You'll see a small reCAPTCHA badge in the bottom-right corner of your page
- During development, you may want to hide it with CSS (optional):
  ```css
  .grecaptcha-badge {
    visibility: hidden;
  }
  ```

## Troubleshooting

- **Badge shows but form doesn't submit**: Check browser console for errors
- **"Execute recaptcha not yet available"**: The reCAPTCHA script is still loading, try again
- **Domain not allowed**: Add your domain in the Google reCAPTCHA admin console
- **Environment variable not working**: Make sure you redeployed after adding it to Cloudflare Pages
- **Preview deploys failing**: Add `*.pages.dev` to allowed domains in reCAPTCHA console

## Security Note

- The site key is public and safe to expose in your frontend code
- Never expose your secret key in the frontend
- The secret key should only be used on your backend (Formspree handles this)
- Cloudflare Pages automatically injects environment variables at build time
