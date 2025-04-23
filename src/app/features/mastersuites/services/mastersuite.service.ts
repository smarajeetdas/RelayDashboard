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
      name: 'end point with long nameeeeeeeeeeeeeeeeeeeee...',
      category: 'REST',
      testSuiteCount: 3,
      testCaseCount: 25,
      lastModified: '23-04-2025, 12:53:05 PM',
      updatedBy: 'Pravanni Panda',
      active: true,
      project: 'Prod_Sanity_Prava',
      parallel: true
    },
    {
      id: 'ms002',
      name: 'sprint_9 MS - Copy',
      category: 'REST',
      testSuiteCount: 2,
      testCaseCount: 18,
      lastModified: '23-04-2025, 12:09:25 PM',
      updatedBy: 'Pravanni Panda',
      active: true,
      project: 'Prod_Sanity_Prava',
      parallel: false
    },
    {
      id: 'ms003',
      name: 'sprint_9 MS',
      category: 'REST',
      testSuiteCount: 4,
      testCaseCount: 32,
      lastModified: '23-04-2025, 12:06:45 PM',
      updatedBy: 'Pravanni Panda',
      active: true,
      project: 'Prod_Sanity_Prava',
      parallel: false
    },
    {
      id: 'ms004',
      name: 'MS1',
      category: 'NA',
      testSuiteCount: 2,
      testCaseCount: 10,
      lastModified: '23-04-2025, 11:50:24 AM',
      updatedBy: 'Kavitha Venkatesan',
      active: true,
      project: '16.6ProdSanity',
      parallel: true
    },
    {
      id: 'ms005',
      name: 'CreateMasterSuite',
      category: 'REST',
      testSuiteCount: 1,
      testCaseCount: 8,
      lastModified: '23-04-2025, 07:41:11 AM',
      updatedBy: 'Relay-AWS-App-Service@AdobeID',
      active: true,
      project: 'PRODELAY IQ',
      parallel: true
    },
    {
      id: 'ms006',
      name: 'master suite test',
      category: 'REST',
      testSuiteCount: 3,
      testCaseCount: 15,
      lastModified: '16-04-2025, 08:28:35 PM',
      updatedBy: 'Sameer Samantra',
      active: true,
      project: 'Sameer_Playwright_Project',
      parallel: true
    },
    {
      id: 'ms007',
      name: 'MS-Email',
      category: 'REST',
      testSuiteCount: 1,
      testCaseCount: 5,
      lastModified: '09-04-2025, 07:19:03 PM',
      updatedBy: 'Manish Sharma',
      active: true,
      project: 'Test_new_project',
      parallel: true
    },
    {
      id: 'ms008',
      name: 'Sprint-7 sanity MS - Copy',
      category: 'REST',
      testSuiteCount: 2,
      testCaseCount: 12,
      lastModified: '02-04-2025, 03:53:24 PM',
      updatedBy: 'Pravanni Panda',
      active: true,
      project: 'Prod_Sanity_Prava',
      parallel: false
    },
    {
      id: 'ms009',
      name: 'Sprint-7 sanity MS',
      category: 'REST',
      testSuiteCount: 2,
      testCaseCount: 12,
      lastModified: '02-04-2025, 02:50:55 PM',
      updatedBy: 'Pravanni Panda',
      active: true,
      project: 'Prod_Sanity_Prava',
      parallel: true
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
      description: 'This master suite contains multiple test suites for comprehensive testing.',
      environment: 'Production',
      domain: 'https://stage-webapp.adobe.com',
      envType: 'stage',
      score: 92,
      testSuites: this.generateMockTestSuites(id)
    };

    return of(masterSuiteDetail);
  }

  private generateMockTestSuites(masterSuiteId: string): MasterSuiteTestSuite[] {
    // Generate different test suites based on the master suite ID
    if (masterSuiteId === 'ms001') {
      return [
        {
          id: 'ts001',
          name: 'TS-parallel',
          category: 'REST',
          testCaseCount: 15,
          active: true,
          order: 1
        },
        {
          id: 'ts004',
          name: 'Mobile App Sanity',
          category: 'NA',
          testCaseCount: 8,
          active: true,
          order: 2
        }
      ];
    } else if (masterSuiteId === 'ms002') {
      return [
        {
          id: 'ts002',
          name: 'End point with long name',
          category: 'REST',
          testCaseCount: 12,
          active: true,
          order: 1
        },
        {
          id: 'ts003',
          name: 'Sanity_sprint_9_Ts',
          category: 'REST',
          testCaseCount: 6,
          active: true,
          order: 2
        },
        {
          id: 'ts005',
          name: 'TS1 - Copy',
          category: 'REST',
          testCaseCount: 5,
          active: false,
          order: 3
        }
      ];
    } else {
      return [
        {
          id: 'ts006',
          name: 'Test Suite 1',
          category: 'REST',
          testCaseCount: 10,
          active: true,
          order: 1
        },
        {
          id: 'ts007',
          name: 'Test Suite 2',
          category: 'WEB',
          testCaseCount: 8,
          active: true,
          order: 2
        }
      ];
    }
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
    
    // Apply active filter if present
    if (filters.active !== undefined) {
      filteredMasterSuites = filteredMasterSuites.filter(ms => ms.active === filters.active);
    }

    return of(filteredMasterSuites);
  }

  deleteMasterSuite(id: string): Observable<boolean> {
    const initialLength = this.mockMasterSuites.length;
    this.mockMasterSuites = this.mockMasterSuites.filter(ms => ms.id !== id);
    return of(initialLength > this.mockMasterSuites.length);
  }
}