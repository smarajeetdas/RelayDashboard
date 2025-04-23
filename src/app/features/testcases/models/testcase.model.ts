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
}

export interface TestCaseStep {
  id: string;
  name: string;
  category: string;
  thinkTime: string;
  active?: boolean;
  description?: string;
}