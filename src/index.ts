export interface PoolMetrics {
  totalCount: number;
  idleCount: number;
  waitingCount: number;
  slowQueryCount: number;
}

export class PostgresPoolMonitor {
  private slowThresholdMs: number;
  private slowQueries: number = 0;

  constructor(slowThresholdMs = 200) {
    this.slowThresholdMs = slowThresholdMs;
  }

  recordQuery(durationMs: number) {
    if (durationMs > this.slowThresholdMs) {
      this.slowQueries++;
    }
  }

  getSlowCount() {
    return this.slowQueries;
  }
}
