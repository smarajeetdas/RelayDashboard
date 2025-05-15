export interface TestResult {
  id: string;
  testCaseId: string;
  testCaseName: string;
  status: string;
  executedAt: Date;
  executedBy: string;
  duration: number;
  requestType: string;
  requestUrl: string;
  requestBody?: string;
  responseCode: number;
  responseTime: number;
  responseSize?: number;
  responseBody?: string;
  responseHeaders?: { [key: string]: string };
  executionSuccess: boolean;
  validationStatus: string;
  detail?: string;
  runReport: string;
  startTime: Date;
  endTime: Date;
  testSteps: TestStep[];
}

export interface TestStep {
  id: string;
  name: string;
  category: string;
  status: string;
  startTime: Date;
  endTime: Date;
  requestType: string;
  responseCode: number;
  responseTime: number;
}