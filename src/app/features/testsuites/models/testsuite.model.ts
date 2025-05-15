export interface TestSuite {
  id: string;
  name: string;
  category: string;
  testCaseCount: number;
  lastModified?: string;
  updatedBy?: string;
  active?: boolean;
  project?: string;
  parallel?: boolean;
}

export interface TestSuiteDetail extends TestSuite {
  description?: string;
  environment?: string;
  domain?: string;
  envType?: string;
  score?: number;
  testCases?: TestSuiteTestCase[];
  lastResultId?: string;
}

export interface TestSuiteTestCase {
  id: string;
  name: string;
  category: string;
  active: boolean;
  order: number;
}