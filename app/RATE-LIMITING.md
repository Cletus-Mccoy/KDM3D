# Rate Limiting Implementation

## Overview

This project implements **client-side rate limiting** using browser localStorage to prevent spam submissions without requiring any third-party services or backend infrastructure.

## How It Works

### Multi-Layer Protection

The contact form uses a **defense-in-depth** approach with multiple layers:

1. **Client-side rate limiting** (localStorage) - First line of defense
2. **reCAPTCHA v3** (invisible) - Behavioral analysis
3. **Formspree validation** - Server-side verification

### Rate Limit Configuration

**Default Settings:**
- **3 submissions per hour** per browser/device
- Uses localStorage to track submission timestamps
- Automatic cleanup of old timestamps outside the time window

### Technical Details

The rate limiter (`app/src/lib/rateLimiter.ts`) provides:

- **Sliding window algorithm**: Only counts submissions within the last hour
- **Automatic expiry**: Old timestamps are removed automatically
- **Graceful degradation**: If localStorage is unavailable, rate limiting is skipped
- **User-friendly feedback**: Shows exactly when they can submit again

### Storage

Data is stored in localStorage with the key: `contact_form_rate_limit`

```json
{
  "timestamps": [1234567890000, 1234567950000, 1234568010000]
}
```

## Customizing Rate Limits

You can adjust the rate limiting settings in `app/src/lib/rateLimiter.ts`:

```typescript
export const contactFormRateLimiter = new RateLimiter({
  maxAttempts: 3,              // Number of allowed submissions
  windowMs: 60 * 60 * 1000,    // Time window in milliseconds (1 hour)
  storageKey: 'contact_form_rate_limit',
});
```

### Common Configurations

**More restrictive (2 per hour):**
```typescript
maxAttempts: 2,
windowMs: 60 * 60 * 1000,
```

**Less restrictive (5 per day):**
```typescript
maxAttempts: 5,
windowMs: 24 * 60 * 60 * 1000,
```

**Moderate (3 per 30 minutes):**
```typescript
maxAttempts: 3,
windowMs: 30 * 60 * 1000,
```

## Limitations & Considerations

### What This Prevents
✅ Casual spam and accidental multiple submissions  
✅ Simple bots without localStorage clearing capabilities  
✅ User errors (clicking submit repeatedly)  

### What This Doesn't Prevent
❌ Sophisticated bots that clear localStorage  
❌ Users who clear their browser data  
❌ Users in private/incognito mode (each session is independent)  
❌ Distributed attacks from multiple IPs/devices  

### Why This Is Still Valuable

1. **No external dependencies**: Works entirely client-side
2. **No backend required**: Perfect for static sites on Cloudflare Pages
3. **No cost**: Unlike API-based rate limiting services
4. **Layered security**: Combined with reCAPTCHA v3 and Formspree validation
5. **Good UX**: Provides immediate feedback without server round-trip
6. **Reduces load**: Prevents unnecessary API calls to Formspree

## User Experience

When a user exceeds the rate limit, they see a friendly dialog:

```
⚠️ Te veel aanvragen

Je hebt de limiet bereikt van 3 berichten per uur. 
Dit helpt ons spam te voorkomen.

Probeer opnieuw over: 45 min 23 sec
```

## Testing Rate Limiting

1. Submit the contact form 3 times in quick succession
2. On the 4th attempt, you should see the rate limit dialog
3. The dialog shows when you can submit again
4. To reset for testing: Open browser DevTools → Application → Local Storage → Delete `contact_form_rate_limit`

## Alternative Approaches

If you need more robust rate limiting, consider:

### Server-Side Options
- **Cloudflare Rate Limiting**: Built into Cloudflare (paid feature)
- **Cloudflare Workers**: Write custom rate limiting logic
- **Formspree's built-in limits**: Already included in your plan

### Why We Chose Client-Side
- Zero cost
- No infrastructure changes needed
- Works on static hosting
- Combined with reCAPTCHA provides adequate protection for a portfolio contact form
- Simple to implement and maintain

## Security Notes

- This is **not** a replacement for server-side validation
- Always validate on the backend (Formspree does this)
- Client-side rate limiting is a UX enhancement and light spam deterrent
- Sophisticated attackers can bypass it, but reCAPTCHA v3 and Formspree provide additional protection
- The combination of all three layers provides reasonable security for a contact form

## Monitoring

To check if rate limiting is working:

1. Open browser DevTools → Console
2. Submit the form multiple times
3. Watch for rate limit triggers
4. Check localStorage to see stored timestamps

You can also monitor Formspree dashboard for submission patterns to see if spam is getting through.
