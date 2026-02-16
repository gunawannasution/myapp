type Attempt = {
  count: number;
  lastAttempt: number;
};

const attempts = new Map<string, Attempt>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 60 * 1000;

export function checkRateLimit(key: string) {
  const now = Date.now();
  const attempt = attempts.get(key);

  if (!attempt) {
    attempts.set(key, { count: 1, lastAttempt: now });
    return;
  }

  if (now - attempt.lastAttempt > WINDOW_MS) {
    attempts.set(key, { count: 1, lastAttempt: now });
    return;
  }

  if (attempt.count >= MAX_ATTEMPTS) {
    throw new Error("Terlalu banyak percobaan login. Coba lagi nanti.");
  }

  attempt.count++;
  attempt.lastAttempt = now;
}
