export interface TestCase {
  id: string;
  name: string;
  category: string;
  thinkTime: string;
  exitOnFailure: boolean;
  mobile?: boolean;
  lastModified?: string;
  updatedBy?: string;
  active?: boolean;
  project?: string;
}

export interface TestCaseDetail extends TestCase {
  description?: string;
  pacedTime?: string;
  environment?: string;
  domain?: string;
  envType?: string;
  score?: number;
  steps?: TestCaseStep[];
  testData?: any;
  recentResults?: TestCaseResult[];
}

export interface TestCaseResult {
  id: string;
  executedAt: string;
  status: 'PASSED' | 'FAILED' | 'PENDING' | 'IN_PROGRESS' | 'SCHEDULED' | 'ABORTED';
  executedBy?: string;
  responseTime?: number;
  responseCode?: number;
}

export interface TestCaseStep {
  id: string;
  name: string;
  category: string;
  thinkTime: string;
  active?: boolean;
  description?: string;
}