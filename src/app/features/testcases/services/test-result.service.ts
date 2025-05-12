import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { RestTestResult, RestTestStep } from '../models/test-result.model';

@Injectable({
  providedIn: 'root'
})
export class TestResultService {

  constructor() { }

  getRestTestResult(testCaseId: string, resultId: string): Observable<RestTestResult> {
    // Mock data for development
    const mockResult: RestTestResult = {
      id: resultId,
      testCaseId: testCaseId,
      status: 'PASSED',
      executedAt: '2025-05-12T11:17:54',
      executedBy: 'user123@adobe.com',
      duration: 234,
      runReport: 'Test executed successfully.',
      requestType: 'GET',
      requestUrl: 'https://example.org/api/resource',
      responseTime: 125,
      responseCode: 200,
      responseSize: 326,
      startTime: '2025-05-12T11:17:54',
      endTime: '2025-05-12T11:17:54',
      executionSuccess: true,
      requestBody: '',
      responseBody: `{
  "id": "res_12345",
  "name": "Resource name",
  "status": "active",
  "description": "null"
}`,
      responseHeaders: {
        'Content-Type': 'application/json',
        'Content-Length': '326',
        'Date': 'Mon, 12 May 2025 11:17:54 GMT',
        'Connection': 'keep-alive',
        'Keep-Alive': 'timeout=5'
      }
    };

    return of(mockResult).pipe(delay(500));
  }

  getTestSteps(testCaseId: string, resultId: string): Observable<RestTestStep[]> {
    // Mock data for development
    const mockSteps: RestTestStep[] = [
      {
        name: 'TestEndpoint_GET_Authenticate',
        category: 'REST',
        startTime: '2025-05-12T11:17:54',
        endTime: '2025-05-12T11:17:54',
        requestType: 'GET', 
        responseTime: 125,
        responseCode: 200,
        status: 'PASSED'
      }
    ];

    return of(mockSteps).pipe(delay(300));
  }
}