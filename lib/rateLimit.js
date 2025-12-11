// Client-side rate limiting
// Max 5 attempts per 60 seconds per action type

const rateLimitStore = {};

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60000; 
export function canSubmit(actionKey) {
  const now = Date.now();
  const record = rateLimitStore[actionKey] || { attempts: [], lockedUntil: null };

  if (record.lockedUntil && now < record.lockedUntil) {
    return false;
  }

  record.attempts = record.attempts.filter((timestamp) => now - timestamp < WINDOW_MS);

  if (record.attempts.length >= MAX_ATTEMPTS) {
    record.lockedUntil = now + WINDOW_MS;
    rateLimitStore[actionKey] = record;
    return false;
  }

  return true;
}

export function registerSubmit(actionKey) {
  const now = Date.now();
  const record = rateLimitStore[actionKey] || { attempts: [], lockedUntil: null };
  
  record.attempts.push(now);
  rateLimitStore[actionKey] = record;
}

export function getRetryAfter(actionKey) {
  const now = Date.now();
  const record = rateLimitStore[actionKey];
  
  if (!record) return 0;
  
  if (record.lockedUntil && now < record.lockedUntil) {
    return Math.ceil((record.lockedUntil - now) / 1000);
  }
  
  return 0;
}