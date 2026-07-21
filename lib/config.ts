/**
 * Lead capture webhook.
 *
 * To save lead-gate submissions to a Google Sheet:
 * 1. Create a Google Sheet with an Apps Script web app (a few minutes of setup).
 * 2. Paste the deployed web app URL below.
 * 3. Set ALLOW_SKIP to false if details must be provided before the result is shown.
 *
 * Leaving WEBHOOK_URL empty keeps the form fully functional; submissions just
 * aren't persisted anywhere.
 */
export const WEBHOOK_URL = "";
export const ALLOW_SKIP = true;

export const VAPI_PUBLIC_KEY = "6e2fdc9a-d3aa-4ffa-93d2-354175b9e9c2";
export const VAPI_ASSISTANT_ID = "eed937f9-9f43-4566-a128-fb3c9a7ff618";
