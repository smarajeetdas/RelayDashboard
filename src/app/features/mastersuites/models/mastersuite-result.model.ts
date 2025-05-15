import { TestSuiteOverview } from '../../testsuites/models/testsuite-result.model';

export interface MasterSuiteResult {
  id: string;
  masterSuiteId: string;
  masterSuiteName: string;
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
  testSuites: TestSuiteOverview[];
}

export { TestSuiteOverview };