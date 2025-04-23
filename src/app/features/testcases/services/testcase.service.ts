import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TestCase, TestCaseDetail, TestCaseStep } from '../models/testcase.model';

@Injectable({
  providedIn: 'root'
})
export class TestCaseService {
  private mockTestCases: TestCase[] = [
    {
      id: 'tc001',
      name: 'Open web application',
      category: 'WEB',
      thinkTime: '00:00:00',
      exitOnFailure: true,
      mobile: false,
      lastModified: '23-04-2025, 04:30:42 PM',
      updatedBy: 'Jane',
      active: true
    },
    {
      id: 'tc002',
      name: 'Verify home page',
      category: 'WEB',
      thinkTime: '00:00:45',
      exitOnFailure: false,
      mobile: false,
      lastModified: '22-04-2025, 02:15:20 PM',
      updatedBy: 'John',
      active: true
    },
    {
      id: 'tc003',
      name: 'Login functionality',
      category: 'WEB',
      thinkTime: '00:00:30',
      exitOnFailure: true,
      mobile: false,
      lastModified: '21-04-2025, 11:40:10 AM',
      updatedBy: 'Sarah',
      active: true
    },
    {
      id: 'tc004',
      name: 'Mobile TestCase',
      category: 'MOBILE',
      thinkTime: '00:00:20',
      exitOnFailure: true,
      mobile: true,
      lastModified: '20-04-2025, 09:25:35 AM',
      updatedBy: 'Mike',
      active: true
    }
  ];

  constructor() { }

  getTestCases(): Observable<TestCase[]> {
    return of(this.mockTestCases);
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
}