export interface TestSuiteResult {
  id: string;
  testSuiteId: string;
  testSuiteName: string;
  status: 'Passed' | 'Failed' | 'In Progress' | 'Aborted';
  executionTime: number; // in milliseconds
  lastRunTimestamp: string;
  executedBy: string;
  testCases: TestCaseOverview[];
  passedCount: number;
  failedCount: number;
  skippedCount: number;
  totalCount: number;
}

export interface TestCaseOverview {
  id: string;
  name: string;
  status: 'Passed' | 'Failed' | 'In Progress' | 'Aborted';
  executionDuration: number; // in milliseconds
  assertionsSummary: string; // e.g., "3/5 passed"
  passedAssertions: number;
  totalAssertions: number;
  tags: string[]; // categories or tags
}