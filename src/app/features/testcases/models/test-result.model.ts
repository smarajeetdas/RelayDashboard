export interface TestResult {
  id: string;
  testCaseId: string;
  status: 'PASSED' | 'FAILED' | 'PENDING' | 'IN_PROGRESS' | 'SCHEDULED' | 'ABORTED';
  executedAt: string;
  executedBy: string;
  duration: number;
  runReport: string;
  detail?: string;
}

export interface RestTestResult extends TestResult {
  requestType: string;
  requestUrl: string;
  responseTime: number;
  responseCode: number;
  responseSize?: number;
  startTime: string;
  endTime: string;
  requestBody?: string;
  responseBody?: string;
  responseHeaders?: { [key: string]: string };
  validationStatus?: 'PASSED' | 'FAILED';
  executionSuccess?: boolean;
}

export interface RestTestStep {
  name: string;
  category: 'REST';
  startTime: string;
  endTime: string;
  requestType: string;
  responseTime: number;
  responseCode: number;
  status: 'PASSED' | 'FAILED';
}