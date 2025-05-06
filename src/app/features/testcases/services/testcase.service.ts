import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TestCase, TestCaseDetail, TestCaseStep } from '../models/testcase.model';
import { TestExecution } from '../models/execution.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {
  private mockTestCases: TestCase[] = [
    {
      id: 'tc001',
      name: 'tc1',
      category: 'REST',
      thinkTime: '00:00:00',
      exitOnFailure: true,
      mobile: false,
      lastModified: '23-04-2025, 07:33:04 PM',
      updatedBy: 'Relay-AWS-App-Service@AdobeID',
      active: true,
      project: 'PRODELAY IQ'
    },
    {
      id: 'tc002',
      name: 'SC1: Inqaxy web',
      category: 'WEB',
      thinkTime: '00:00:30',
      exitOnFailure: true,
      mobile: false,
      lastModified: '23-04-2025, 04:36:42 PM',
      updatedBy: 'Darshan N R',
      active: true,
      project: 'InQaxy_web_Selenium'
    },
    {
      id: 'tc003',
      name: 'Prod Bud V3 Redition Datamerge',
      category: 'REST',
      thinkTime: '00:00:15',
      exitOnFailure: true,
      mobile: false,
      lastModified: '23-04-2025, 04:27:56 PM',
      updatedBy: 'Relay-AWS-App-Service@AdobeID',
      active: true,
      project: 'InDesign Cloud Services'
    },
    {
      id: 'tc004',
      name: 'Adobe Scan Test flow',
      category: 'NA',
      thinkTime: '00:00:20',
      exitOnFailure: true,
      mobile: true,
      lastModified: '23-04-2025, 04:07:03 PM',
      updatedBy: 'Ganesh Kumar',
      active: true,
      project: 'Adobe Scan Mobile Automation'
    },
    {
      id: 'tc005',
      name: 'Catalog API+ Admin',
      category: 'REST',
      thinkTime: '00:00:25',
      exitOnFailure: true,
      mobile: false,
      lastModified: '23-04-2025, 02:58:28 PM',
      updatedBy: 'Pravanni Panda',
      active: true,
      project: 'Pravanni_Project'
    }
  ];

  constructor() { }

  getTestCases(): Observable<TestCase[]> {
    console.log('Fetching test cases:', this.mockTestCases);
    
    // Create hardcoded test cases if none exist yet
    if (this.mockTestCases.length === 0) {
      console.log('No test cases found, creating default data');
      this.mockTestCases = [
        {
          id: 'tc001',
          name: 'Sample Test Case 1',
          category: 'WEB',
          thinkTime: '00:00:10',
          exitOnFailure: true,
          mobile: false,
          project: 'Sample Project',
          lastModified: '2025-04-23',
          updatedBy: 'Test User',
          active: true
        },
        {
          id: 'tc002',
          name: 'Sample Test Case 2',
          category: 'REST',
          thinkTime: '00:00:15',
          exitOnFailure: true,
          mobile: false,
          project: 'API Project',
          lastModified: '2025-04-22',
          updatedBy: 'API User',
          active: true
        }
      ];
    }
    
    return of(this.mockTestCases.slice()).pipe(
      tap(testCases => {
        console.log('Emitting test cases:', testCases);
        console.log('Array length:', testCases.length);
        if (testCases.length === 0) {
          console.warn('Warning: Empty test cases array');
        }
      })
    );
  }

  getTestCaseById(id: string): Observable<TestCaseDetail | undefined> {
    const testCase = this.mockTestCases.find(tc => tc.id === id);
    if (!testCase) {
      return of(undefined);
    }

    // Create a detailed test case with additional information
    const testCaseDetail: TestCaseDetail = {
      ...testCase,
      description: 'This test case verifies the functionality of the web application.',
      pacedTime: '00:00:00',
      environment: 'Production',
      domain: 'https://stage-webapp.adobe.com',
      envType: 'stage',
      score: 92,
      steps: this.generateMockSteps(id),
      testData: {
        username: 'testuser',
        password: '******'
      }
    };

    return of(testCaseDetail);
  }

  private generateMockSteps(testCaseId: string): TestCaseStep[] {
    // Generate different steps based on the test case ID
    if (testCaseId === 'tc001') {
      return [
        {
          id: 'step001',
          name: 'Open web application',
          category: 'WEB',
          thinkTime: '00:00:00',
          active: true,
          description: 'Launch browser and navigate to the web application URL'
        },
        {
          id: 'step002',
          name: 'Verify page loaded',
          category: 'WEB',
          thinkTime: '00:00:05',
          active: true,
          description: 'Verify that the page has loaded successfully'
        }
      ];
    } else if (testCaseId === 'tc002') {
      return [
        {
          id: 'step001',
          name: 'Check homepage elements',
          category: 'WEB',
          thinkTime: '00:00:10',
          active: true,
          description: 'Verify all elements on homepage are displayed correctly'
        },
        {
          id: 'step002',
          name: 'Verify navigation menu',
          category: 'WEB',
          thinkTime: '00:00:15',
          active: true,
          description: 'Check that the navigation menu is functional'
        },
        {
          id: 'step003',
          name: 'Check responsive design',
          category: 'WEB',
          thinkTime: '00:00:20',
          active: false,
          description: 'Verify the responsive design on different screen sizes'
        }
      ];
    } else {
      return [
        {
          id: 'step001',
          name: 'Initial step',
          category: 'WEB',
          thinkTime: '00:00:05',
          active: true,
          description: 'First step in test case execution'
        },
        {
          id: 'step002',
          name: 'Secondary step',
          category: 'WEB',
          thinkTime: '00:00:10',
          active: true,
          description: 'Second step in test case execution'
        }
      ];
    }
  }

  searchTestCases(query: string, filters: any = {}): Observable<TestCase[]> {
    let filteredTestCases = [...this.mockTestCases];
    
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filteredTestCases = filteredTestCases.filter(tc => 
        tc.name.toLowerCase().includes(lowercaseQuery) || 
        tc.id.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Apply category filter if present
    if (filters.category) {
      filteredTestCases = filteredTestCases.filter(tc => tc.category === filters.category);
    }
    
    // Apply mobile filter if present
    if (filters.mobile !== undefined) {
      filteredTestCases = filteredTestCases.filter(tc => tc.mobile === filters.mobile);
    }

    return of(filteredTestCases);
  }

  deleteTestCase(id: string): Observable<boolean> {
    const initialLength = this.mockTestCases.length;
    this.mockTestCases = this.mockTestCases.filter(tc => tc.id !== id);
    return of(initialLength > this.mockTestCases.length);
  }
  
  getExecutionHistory(testCaseId: string, filters: any = {}): Observable<TestExecution[]> {
    // In a real application, this would make an API call to get execution history
    // For now, we'll generate some mock data
    const executionRecords: TestExecution[] = this.generateMockExecutionHistory(testCaseId);
    
    // Apply filtering
    let filteredRecords = [...executionRecords];
    
    // Filter by status
    if (filters.status) {
      filteredRecords = filteredRecords.filter(record => record.status === filters.status);
    }
    
    // Filter by date range
    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      filteredRecords = filteredRecords.filter(record => new Date(record.startTime) >= startDate);
    }
    
    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      // Add one day to include the end date in the range
      endDate.setDate(endDate.getDate() + 1);
      filteredRecords = filteredRecords.filter(record => new Date(record.startTime) <= endDate);
    }
    
    // Sort by start time descending (newest first)
    filteredRecords.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
    
    return of(filteredRecords);
  }
  
  private generateMockExecutionHistory(testCaseId: string): TestExecution[] {
    // This would be replaced with actual API calls in a real application
    const statuses: Array<TestExecution['status']> = ['PASSED', 'FAILED', 'IN_PROGRESS', 'SCHEDULED', 'ABORTED', 'PENDING'];
    const environments = ['Production', 'Staging', 'Development', 'QA'];
    const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];
    const users = ['admin', 'tester1', 'tester2', 'automatedJob'];
    
    const mockRecords: TestExecution[] = [];
    
    // Generate 30 mock execution records
    for (let i = 0; i < 30; i++) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 30));
      const endDate = new Date(startDate);
      const durationSecs = Math.floor(Math.random() * 300) + 60; // 1-6 minutes
      endDate.setSeconds(endDate.getSeconds() + durationSecs);
      
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      mockRecords.push({
        id: `exec-${testCaseId}-${i}`,
        testCaseId: testCaseId,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
        status: status,
        executedBy: users[Math.floor(Math.random() * users.length)],
        environment: environments[Math.floor(Math.random() * environments.length)],
        browser: browsers[Math.floor(Math.random() * browsers.length)],
        duration: durationSecs,
        errorMessage: status === 'FAILED' ? 'Element not found: #login-button' : undefined
      });
    }
    
    return mockRecords;
  }
}