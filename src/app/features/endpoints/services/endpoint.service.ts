import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Endpoint, EndpointDetail, TestCase } from '../models/endpoint.model';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {
  private mockEndpoints: Endpoint[] = [
    {
      id: '1',
      name: 'multipart_alltype',
      project: 'Prod_Sandy_Prava',
      requestType: 'POST',
      category: 'REST',
      updatedOn: '16-04-2025, 11:52:13 AM',
      updatedBy: 'Pravasini Panda',
      certified: true
    },
    {
      id: '2',
      name: 'Verify Clone Stamp',
      project: 'Photoshop Android App',
      requestType: 'NA',
      category: 'MOBILE',
      updatedOn: '16-04-2025, 11:48:32 AM',
      updatedBy: 'Asha S Madarakhandi'
    },
    {
      id: '3',
      name: 'multipart_alltype',
      project: 'Pravasini_Project',
      requestType: 'POST',
      category: 'REST',
      updatedOn: '16-04-2025, 11:48:25 AM',
      updatedBy: 'Pravasini Panda'
    },
    {
      id: '4',
      name: 'Clear filters in SMB accounts',
      project: 'LEadSmart',
      requestType: 'NA',
      category: 'WEB',
      updatedOn: '16-04-2025, 11:38:50 AM',
      updatedBy: 'Sayantan Bhowmik',
      subFlow: true
    },
    {
      id: '5',
      name: 'Create SMB account',
      project: 'LEadSmart',
      requestType: 'NA',
      category: 'WEB',
      updatedOn: '16-04-2025, 11:21:45 AM',
      updatedBy: 'Subodh Subramanian Puthran',
      subFlow: true
    },
    {
      id: '6',
      name: 'Verify Book and Whiteboard',
      project: 'Adobe Scan Mobile Automation',
      requestType: 'NA',
      category: 'MOBILE',
      updatedOn: '16-04-2025, 11:13:29 AM',
      updatedBy: 'Ganesh Kumar'
    }
  ];

  constructor() { }

  getEndpoints(): Observable<Endpoint[]> {
    return of(this.mockEndpoints);
  }

  getEndpointById(id: string): Observable<EndpointDetail | undefined> {
    const endpoint = this.mockEndpoints.find(e => e.id === id);
    
    if (!endpoint) {
      return of(undefined);
    }
    
    // Mock additional details
    const endpointDetail: EndpointDetail = {
      ...endpoint,
      description: `This is a detailed description for ${endpoint.name}`,
      path: endpoint.category === 'REST' ? '/api/v1/' + endpoint.name.toLowerCase().replace(/\s+/g, '-') : '',
      method: endpoint.requestType !== 'NA' ? endpoint.requestType : '',
      parameters: endpoint.category === 'REST' ? [
        {
          id: '1',
          name: 'id',
          type: 'string',
          required: true,
          description: 'Unique identifier'
        },
        {
          id: '2',
          name: 'data',
          type: 'object',
          required: false,
          description: 'Request data payload'
        }
      ] : [],
      headers: endpoint.category === 'REST' ? [
        {
          id: '1',
          name: 'Content-Type',
          value: 'application/json',
          description: 'Content type of the request'
        },
        {
          id: '2',
          name: 'Authorization',
          value: 'Bearer {token}',
          description: 'Authorization header'
        }
      ] : [],
      testCases: this.generateMockTestCases(endpoint.id)
    };
    
    return of(endpointDetail);
  }
  
  private generateMockTestCases(endpointId: string): TestCase[] {
    const statuses: ('passed' | 'failed' | 'pending')[] = ['passed', 'failed', 'pending'];
    const count = 2; // Fixed to match the screenshot example
    const testCases: TestCase[] = [];
    
    // Get the endpoint to access its project name
    const endpoint = this.mockEndpoints.find(e => e.id === endpointId);
    
    // Always use testsaam-1 as the project name to match the screenshot
    const projectName = 'testsaam-1';
    
    // Create test cases to match the screenshot
    testCases.push({
      id: `${endpointId}-tc-1`,
      name: 'TC-Newone',
      project: projectName,
      status: 'passed',
      lastRun: '16-04-2025',
      duration: 245
    });
    
    testCases.push({
      id: `${endpointId}-tc-2`,
      name: 'java script expression-1',
      project: projectName,
      status: 'passed',
      lastRun: '16-04-2025',
      duration: 312
    });
    
    return testCases;
  }
  
  searchEndpoints(query: string, filters: any = {}): Observable<Endpoint[]> {
    let results = [...this.mockEndpoints];
    
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      results = results.filter(endpoint => 
        endpoint.name.toLowerCase().includes(lowerCaseQuery) || 
        endpoint.project.toLowerCase().includes(lowerCaseQuery)
      );
    }
    
    if (filters.project) {
      results = results.filter(endpoint => endpoint.project === filters.project);
    }
    
    if (filters.category) {
      results = results.filter(endpoint => endpoint.category === filters.category);
    }
    
    if (filters.certified !== undefined) {
      results = results.filter(endpoint => endpoint.certified === filters.certified);
    }
    
    if (filters.subFlow !== undefined) {
      results = results.filter(endpoint => endpoint.subFlow === filters.subFlow);
    }
    
    return of(results);
  }
  
  deleteEndpoint(id: string): Observable<boolean> {
    const initialLength = this.mockEndpoints.length;
    this.mockEndpoints = this.mockEndpoints.filter(endpoint => endpoint.id !== id);
    return of(this.mockEndpoints.length !== initialLength);
  }
  
  getTestCasesForEndpoint(endpointId: string): Observable<TestCase[]> {
    return of(this.generateMockTestCases(endpointId));
  }
}