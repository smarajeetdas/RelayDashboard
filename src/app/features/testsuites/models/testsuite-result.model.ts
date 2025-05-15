export interface TestCaseOverview {
  id: string;
  name: string;
  status: string;
  executionDuration: number;
  lastRunTimestamp?: string | Date;
  assertionsSummary?: string;
  passedAssertions: number;
  totalAssertions: number;
  tags: string[];
}

export interface TestSuiteResult {
  id: string;
  testSuiteId: string;
  testSuiteName: string;
  status: string;
  lastRunTimestamp: string | Date;
  executionTime: number;
  executedBy: string;
  totalCount: number;
  passedCount: number;
  failedCount: number;
  skippedCount: number;
  abortedCount: number;
  executionEnvironment?: string;
  tags?: string[];
  testCases: TestCaseOverview[];
}

export interface TestSuiteOverview {
  id: string;
  name: string;
  status: string;
  executionDuration: number;
  lastRunTimestamp: string | Date;
  totalCount: number;
  passedCount: number;
  failedCount: number;
  skippedCount: number;
}