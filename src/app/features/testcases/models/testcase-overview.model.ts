export interface TestCaseOverview {
  id: string;
  name: string;
  status: string;
  executionDuration: number;
  lastRunTimestamp?: Date;
  assertionsSummary?: string;
  passedAssertions: number;
  totalAssertions: number;
  tags: string[];
}