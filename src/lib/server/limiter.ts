import { RetryAfterRateLimiter } from 'sveltekit-rate-limiter/server';

export const actionLimiter = new RetryAfterRateLimiter({
  IP: [500, '5s'],
  IPUA: [500, 'm'],
});

export const GETLimiter = new RetryAfterRateLimiter({
  IP: [500, '5s'],
  IPUA: [500, 'm'],
});
