export interface TestExecution {
  id: string;
  testCaseId: string;
  startTime: string;
  endTime: string;
  status: 'PASSED' | 'FAILED' | 'IN_PROGRESS' | 'SCHEDULED' | 'ABORTED' | 'PENDING';
  executedBy: string;
  environment: string;
  browser?: string;
  device?: string;
  duration: number; // in seconds
  errorMessage?: string;
}