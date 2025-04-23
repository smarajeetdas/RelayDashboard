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
      name: 'Login & Authentication Suite',
      category: 'WEB',
      testCaseCount: 5,
      lastModified: '23-04-2025, 04:30:42 PM',
      updatedBy: 'Jane',
      active: true
    },
    {
      id: 'ts002',
      name: 'User Registration Flow',
      category: 'WEB',
      testCaseCount: 3,
      lastModified: '22-04-2025, 02:15:20 PM',
      updatedBy: 'John',
      active: true
    },
    {
      id: 'ts003',
      name: 'Payment Processing',
      category: 'API',
      testCaseCount: 8,
      lastModified: '21-04-2025, 11:40:10 AM',
      updatedBy: 'Sarah',
      active: true
    },
    {
      id: 'ts004',
      name: 'Mobile App Navigation',
      category: 'MOBILE',
      testCaseCount: 4,
      lastModified: '20-04-2025, 09:25:35 AM',
      updatedBy: 'Mike',
      active: true
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
      description: 'This test suite verifies the complete flow of the application.',
      environment: 'Production',
      domain: 'https://stage-webapp.adobe.com',
      envType: 'stage',
      score: 95,
      testCases: this.generateMockTestCases(testSuite.testCaseCount)
    };

    return of(testSuiteDetail);
  }

  private generateMockTestCases(count: number): TestSuiteTestCase[] {
    const testCases: TestSuiteTestCase[] = [];
    const categories = ['WEB', 'API', 'MOBILE'];
    
    for (let i = 1; i <= count; i++) {
      testCases.push({
        id: `tc00${i}`,
        name: `Test Case ${i}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        active: Math.random() > 0.2, // 80% chance of being active
        order: i
      });
    }
    
    return testCases;
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

    return of(filteredTestSuites);
  }

  deleteTestSuite(id: string): Observable<boolean> {
    const initialLength = this.mockTestSuites.length;
    this.mockTestSuites = this.mockTestSuites.filter(ts => ts.id !== id);
    return of(initialLength > this.mockTestSuites.length);
  }
}