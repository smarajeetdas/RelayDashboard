export interface Endpoint {
  id: string;
  name: string;
  project: string;
  requestType: string;
  category: string;
  updatedOn: string;
  updatedBy: string;
  certified?: boolean;
  subFlow?: boolean;
}

export interface EndpointDetail extends Endpoint {
  description?: string;
  path?: string;
  method?: string;
  parameters?: EndpointParameter[];
  headers?: EndpointHeader[];
  testCases?: TestCase[];
  webInstructions?: WebInstruction[];
}

export interface WebInstruction {
  id: string;
  locator: string;
  element?: string;
  active: boolean;
  saveScreenshot: boolean;
  action: string;
  value?: string;
  optional?: boolean;
}

export interface EndpointParameter {
  id: string;
  name: string;
  type: string;
  required: boolean;
  defaultValue?: any;
  description?: string;
}

export interface EndpointHeader {
  id: string;
  name: string;
  value: string;
  description?: string;
}

export interface TestCase {
  id: string;
  name: string;
  project: string;
  status: 'passed' | 'failed' | 'pending';
  lastRun?: string;
  duration?: number;
}