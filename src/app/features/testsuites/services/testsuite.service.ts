import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TestSuite, TestSuiteDetail, TestSuiteTestCase } from '../models/testsuite.model';

@Injectable({
  providedIn: 'root'
})
export class TestSuiteService {
  private mockTestSuites: TestSuite[] = [
    {
      id: 'ts001',
      name: 'TS-parallel',
      category: 'REST',
      testCaseCount: 15,
      lastModified: '23-04-2025, 04:53:15 PM',
      updatedBy: 'Shruthi Ladage',
      active: true,
      project: 'PlayerScript_QA',
      parallel: true
    },
    {
      id: 'ts002',
      name: 'end point with long nameeeeeeeeeeeeeeeeeeeee...',
      category: 'REST',
      testCaseCount: 8,
      lastModified: '23-04-2025, 12:52:47 PM',
      updatedBy: 'Pravanni Panda',
      active: true,
      project: 'Prod_Sanity_Prava',
      parallel: true
    },
    {
      id: 'ts003',
      name: 'Sanity_sprint_9_Ts - Copy',
      category: 'REST',
      testCaseCount: 10,
      lastModified: '23-04-2025, 12:01:34 PM',
      updatedBy: 'Pravanni Panda',
      active: true,
      project: 'Prod_Sanity_Prava',
      parallel: false
    },
    {
      id: 'ts004',
      name: 'Sanity_sprint_9_Ts',
      category: 'REST',
      testCaseCount: 12,
      lastModified: '23-04-2025, 12:00:28 PM',
      updatedBy: 'Pravanni Panda',
      active: true,
      project: 'Prod_Sanity_Prava',
      parallel: true
    },
    {
      id: 'ts005',
      name: 'TS1 - Copy',
      category: 'REST',
      testCaseCount: 5,
      lastModified: '23-04-2025, 10:51:39 AM',
      updatedBy: 'Kavitha Venkatesan',
      active: true,
      project: '16.6ProdSanity',
      parallel: false
    },
    {
      id: 'ts006',
      name: 'TS1',
      category: 'REST',
      testCaseCount: 5,
      lastModified: '23-04-2025, 11:50:15 AM',
      updatedBy: 'Kavitha Venkatesan',
      active: true,
      project: '16.6ProdSanity',
      parallel: false
    },
    {
      id: 'ts007',
      name: 'Create-ts',
      category: 'REST',
      testCaseCount: 3,
      lastModified: '23-04-2025, 07:41:04 AM',
      updatedBy: 'Relay-AWS-App-Service@AdobeID',
      active: true,
      project: 'PRODELAY IQ',
      parallel: true
    },
    {
      id: 'ts008',
      name: 'Create7s',
      category: 'REST',
      testCaseCount: 2,
      lastModified: '23-04-2025, 07:36:03 AM',
      updatedBy: 'Relay-AWS-App-Service@AdobeID',
      active: true,
      project: 'PRODELAY IQ',
      parallel: true
    },
    {
      id: 'ts009',
      name: 'sanity_reg_ts',
      category: 'REST',
      testCaseCount: 7,
      lastModified: '17-04-2025, 10:31:29 AM',
      updatedBy: 'Pravanni Panda',
      active: true,
      project: 'Prod_Sanity_Prava',
      parallel: true
    }
  ];

  constructor() { }

  getTestSuites(): Observable<TestSuite[]> {
    return of(this.mockTestSuites);
  }

  getTestSuiteById(id: string): Observable<TestSuiteDetail | undefined> {
    const testSuite = this.mockTestSuites.find(ts => ts.id === id);
    if (!testSuite) {
      return of(undefined);
    }

    // Create a detailed test suite with additional information
    const testSuiteDetail: TestSuiteDetail = {
      ...testSuite,
      description: 'This test suite verifies the functionality of the application.',
      environment: 'Production',
      domain: 'https://stage-webapp.adobe.com',
      envType: 'stage',
      score: 92,
      testCases: this.generateMockTestCases(id)
    };

    return of(testSuiteDetail);
  }

  private generateMockTestCases(testSuiteId: string): TestSuiteTestCase[] {
    // Generate different test cases based on the test suite ID
    if (testSuiteId === 'ts001') {
      return [
        {
          id: 'tc001',
          name: 'tc1',
          category: 'REST',
          active: true,
          order: 1
        },
        {
          id: 'tc002',
          name: 'SC1: Inqaxy web',
          category: 'WEB',
          active: true,
          order: 2
        }
      ];
    } else if (testSuiteId === 'ts002') {
      return [
        {
          id: 'tc003',
          name: 'Prod Bud V3 Redition Datamerge',
          category: 'REST',
          active: true,
          order: 1
        },
        {
          id: 'tc004',
          name: 'Adobe Scan Test flow',
          category: 'NA',
          active: true,
          order: 2
        },
        {
          id: 'tc005',
          name: 'Catalog API+ Admin',
          category: 'REST',
          active: false,
          order: 3
        }
      ];
    } else {
      return [
        {
          id: 'tc006',
          name: 'Test case 1',
          category: 'REST',
          active: true,
          order: 1
        },
        {
          id: 'tc007',
          name: 'Test case 2',
          category: 'WEB',
          active: true,
          order: 2
        }
      ];
    }
  }

  searchTestSuites(query: string, filters: any = {}): Observable<TestSuite[]> {
    let filteredTestSuites = [...this.mockTestSuites];
    
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filteredTestSuites = filteredTestSuites.filter(ts => 
        ts.name.toLowerCase().includes(lowercaseQuery) || 
        ts.id.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Apply category filter if present
    if (filters.category) {
      filteredTestSuites = filteredTestSuites.filter(ts => ts.category === filters.category);
    }
    
    // Apply active filter if present
    if (filters.active !== undefined) {
      filteredTestSuites = filteredTestSuites.filter(ts => ts.active === filters.active);
    }

    return of(filteredTestSuites);
  }

  deleteTestSuite(id: string): Observable<boolean> {
    const initialLength = this.mockTestSuites.length;
    this.mockTestSuites = this.mockTestSuites.filter(ts => ts.id !== id);
    return of(initialLength > this.mockTestSuites.length);
  }
}