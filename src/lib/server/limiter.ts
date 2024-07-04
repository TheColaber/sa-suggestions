import { RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server';

export const actionLimiter = new RetryAfterRateLimiter({
  IP: [15, '5s']
});

export const GETLimiter = new RetryAfterRateLimiter({
  IP: [40, '5s']
});
