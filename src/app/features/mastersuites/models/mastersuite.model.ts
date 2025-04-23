export interface MasterSuite {
  id: string;
  name: string;
  category: string;
  testSuiteCount: number;
  testCaseCount: number;
  lastModified?: string;
  updatedBy?: string;
  active?: boolean;
}

export interface MasterSuiteDetail extends MasterSuite {
  description?: string;
  environment?: string;
  domain?: string;
  envType?: string;
  score?: number;
  testSuites?: MasterSuiteTestSuite[];
}

export interface MasterSuiteTestSuite {
  id: string;
  name: string;
  category: string;
  testCaseCount: number;
  active: boolean;
  order: number;
}