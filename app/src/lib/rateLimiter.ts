/**
 * Client-side rate limiter using localStorage
 * Tracks form submissions and enforces limits
 */

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
  storageKey: string;
}

interface SubmissionRecord {
  timestamps: number[];
}

export class RateLimiter {
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  /**
   * Check if the user can submit (hasn't exceeded rate limit)
   */
  canSubmit(): { allowed: boolean; remainingAttempts: number; resetTime: number | null } {
    const record = this.getRecord();
    const now = Date.now();
    const windowStart = now - this.config.windowMs;

    // Filter out timestamps outside the current window
    const recentTimestamps = record.timestamps.filter(ts => ts > windowStart);

    const remainingAttempts = Math.max(0, this.config.maxAttempts - recentTimestamps.length);
    const allowed = recentTimestamps.length < this.config.maxAttempts;

    // Calculate when the oldest timestamp expires
    let resetTime = null;
    if (recentTimestamps.length > 0 && !allowed) {
      resetTime = recentTimestamps[0] + this.config.windowMs;
    }

    return { allowed, remainingAttempts, resetTime };
  }

  /**
   * Record a submission attempt
   */
  recordSubmission(): void {
    const record = this.getRecord();
    const now = Date.now();
    const windowStart = now - this.config.windowMs;

    // Keep only recent timestamps and add the new one
    record.timestamps = [...record.timestamps.filter(ts => ts > windowStart), now];

    this.saveRecord(record);
  }

  /**
   * Get the current record from localStorage
   */
  private getRecord(): SubmissionRecord {
    try {
      const stored = localStorage.getItem(this.config.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed to read rate limit record:', e);
    }
    return { timestamps: [] };
  }

  /**
   * Save the record to localStorage
   */
  private saveRecord(record: SubmissionRecord): void {
    try {
      localStorage.setItem(this.config.storageKey, JSON.stringify(record));
    } catch (e) {
      console.warn('Failed to save rate limit record:', e);
    }
  }

  /**
   * Format the remaining time until reset
   */
  static formatResetTime(resetTime: number): string {
    const now = Date.now();
    const diffMs = resetTime - now;
    
    if (diffMs <= 0) return 'now';

    const minutes = Math.floor(diffMs / 60000);
    const seconds = Math.floor((diffMs % 60000) / 1000);

    if (minutes > 0) {
      return `${minutes} min ${seconds} sec`;
    }
    return `${seconds} sec`;
  }
}

// Default rate limiter for contact form
export const contactFormRateLimiter = new RateLimiter({
  maxAttempts: 3, // 3 submissions
  windowMs: 60 * 60 * 1000, // per hour
  storageKey: 'contact_form_rate_limit',
});
