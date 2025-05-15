export interface MasterSuiteResult {
  id: string;
  masterSuiteId: string;
  masterSuiteName: string;
  status: 'Passed' | 'Failed' | 'In Progress' | 'Aborted';
  executionTime: number; // in milliseconds
  lastRunTimestamp: string;
  executedBy: string;
  testSuites: TestSuiteOverview[];
  passedCount: number;
  failedCount: number;
  skippedCount: number;
  totalCount: number;
}

export interface TestSuiteOverview {
  id: string;
  name: string;
  status: 'Passed' | 'Failed' | 'In Progress' | 'Aborted';
  executionDuration: number; // in milliseconds
  lastRunTimestamp: string;
  passedCount: number;
  failedCount: number;
  skippedCount: number;
  totalCount: number;
}