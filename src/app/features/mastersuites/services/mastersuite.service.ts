import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MasterSuite, MasterSuiteDetail, MasterSuiteTestSuite } from '../models/mastersuite.model';

@Injectable({
  providedIn: 'root'
})
export class MasterSuiteService {
  private mockMasterSuites: MasterSuite[] = [
    {
      id: 'ms001',
      name: 'Complete User Journey',
      category: 'WEB',
      testSuiteCount: 3,
      testCaseCount: 12,
      lastModified: '23-04-2025, 04:30:42 PM',
      updatedBy: 'Jane',
      active: true
    },
    {
      id: 'ms002',
      name: 'End-to-End eCommerce Flow',
      category: 'WEB',
      testSuiteCount: 4,
      testCaseCount: 15,
      lastModified: '22-04-2025, 02:15:20 PM',
      updatedBy: 'John',
      active: true
    },
    {
      id: 'ms003',
      name: 'Backend API Integration Tests',
      category: 'API',
      testSuiteCount: 5,
      testCaseCount: 22,
      lastModified: '21-04-2025, 11:40:10 AM',
      updatedBy: 'Sarah',
      active: true
    },
    {
      id: 'ms004',
      name: 'Mobile App Release Validation',
      category: 'MOBILE',
      testSuiteCount: 3,
      testCaseCount: 18,
      lastModified: '20-04-2025, 09:25:35 AM',
      updatedBy: 'Mike',
      active: true
    }
  ];

  constructor() { }

  getMasterSuites(): Observable<MasterSuite[]> {
    return of(this.mockMasterSuites);
  }

  getMasterSuiteById(id: string): Observable<MasterSuiteDetail | undefined> {
    const masterSuite = this.mockMasterSuites.find(ms => ms.id === id);
    if (!masterSuite) {
      return of(undefined);
    }

    // Create a detailed master suite with additional information
    const masterSuiteDetail: MasterSuiteDetail = {
      ...masterSuite,
      description: 'This master suite provides a comprehensive verification of the complete application.',
      environment: 'Production',
      domain: 'https://stage-webapp.adobe.com',
      envType: 'stage',
      score: 97,
      testSuites: this.generateMockTestSuites(masterSuite.testSuiteCount, masterSuite.testCaseCount)
    };

    return of(masterSuiteDetail);
  }

  private generateMockTestSuites(count: number, totalTestCases: number): MasterSuiteTestSuite[] {
    const testSuites: MasterSuiteTestSuite[] = [];
    const categories = ['WEB', 'API', 'MOBILE'];
    
    // Distribute test cases among test suites
    let remainingTestCases = totalTestCases;
    
    for (let i = 1; i <= count; i++) {
      // Determine how many test cases to assign to this test suite
      const isLastSuite = i === count;
      let testCaseCount: number;
      
      if (isLastSuite) {
        testCaseCount = remainingTestCases;
      } else {
        // Distribute testCases fairly among suites
        testCaseCount = Math.floor(remainingTestCases / (count - i + 1));
        // Add some randomness
        testCaseCount += Math.floor(Math.random() * 2) - 1;
        testCaseCount = Math.max(1, testCaseCount); // Ensure at least 1 test case
      }
      
      remainingTestCases -= testCaseCount;
      
      testSuites.push({
        id: `ts00${i}`,
        name: `Test Suite ${i}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        testCaseCount: testCaseCount,
        active: Math.random() > 0.2, // 80% chance of being active
        order: i
      });
    }
    
    return testSuites;
  }

  searchMasterSuites(query: string, filters: any = {}): Observable<MasterSuite[]> {
    let filteredMasterSuites = [...this.mockMasterSuites];
    
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filteredMasterSuites = filteredMasterSuites.filter(ms => 
        ms.name.toLowerCase().includes(lowercaseQuery) || 
        ms.id.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    // Apply category filter if present
    if (filters.category) {
      filteredMasterSuites = filteredMasterSuites.filter(ms => ms.category === filters.category);
    }

    return of(filteredMasterSuites);
  }

  deleteMasterSuite(id: string): Observable<boolean> {
    const initialLength = this.mockMasterSuites.length;
    this.mockMasterSuites = this.mockMasterSuites.filter(ms => ms.id !== id);
    return of(initialLength > this.mockMasterSuites.length);
  }
}