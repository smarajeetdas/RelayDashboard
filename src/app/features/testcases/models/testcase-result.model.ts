export interface TestCaseResult {
  id: string;
  testCaseId: string;
  testCaseName: string;
  status: 'Passed' | 'Failed' | 'In Progress' | 'Aborted';
  executionTime: number; // in milliseconds
  lastRunTimestamp: string;
  executedBy: string;
  endpoints: EndpointResult[];
  passedCount: number;
  failedCount: number;
  skippedCount: number;
  totalCount: number;
}

export interface EndpointResult {
  id: string;
  name: string;
  endpointUrl: string;
  requestType: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  status: 'Passed' | 'Failed' | 'Skipped'; 
  responseTime: number; // in milliseconds
  responseCode: number;
  errorMessage?: string;
  category?: string;
}