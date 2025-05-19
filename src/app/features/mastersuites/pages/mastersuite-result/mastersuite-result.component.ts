import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterSuiteResult, TestSuiteOverview } from '../../models/mastersuite-result.model';

interface TestSuiteWithExpand extends TestSuiteOverview {
  expanded: boolean;
  testCases?: any[];
  activeTestCase?: number | null;
}

@Component({
  selector: 'app-mastersuite-result',
  templateUrl: './mastersuite-result.component.html',
  styleUrls: ['./mastersuite-result.component.css']
})
export class MasterSuiteResultComponent implements OnInit {
  masterSuiteId: string = '';
  resultId: string = '';
  isLoading: boolean = true;
  masterSuiteResult: MasterSuiteResult;
  filtersExpanded: boolean = true;
  selectedEndpoint: any = null;
  selectedTestSuite: any = null;
  
  // Filters
  statusFilter: 'All' | 'Passed' | 'Failed' | 'In Progress' | 'Aborted' = 'All';
  testSuiteStatusFilter: 'All' | 'Passed' | 'Failed' | 'In Progress' | 'Aborted' = 'All';
  testCaseStatusFilter: 'All' | 'Passed' | 'Failed' | 'Skipped' = 'All';
  endpointStatusFilter: 'All' | 'Passed' | 'Failed' = 'All';
  dateRangeFilter: { from: Date | null, to: Date | null } = { from: null, to: null };
  executedByFilter: string = '';
  filteredTestSuites: TestSuiteWithExpand[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const resultId = this.route.snapshot.paramMap.get('resultId');
    
    this.masterSuiteId = id || '';
    this.resultId = resultId || '';
    this.loadMasterSuiteResult();
  }

  loadMasterSuiteResult(): void {
    // In a real application, this would be a service call
    // For now, we'll use mock data
    this.isLoading = true;
    setTimeout(() => {
      this.masterSuiteResult = {
        id: this.resultId || 'e8726e04e623456fcaa',
        masterSuiteId: this.masterSuiteId,
        masterSuiteName: 'TS - UI Validation',
        status: 'Failed',
        executionTime: 356000, // 5 minutes and 56 seconds
        lastRunTimestamp: new Date().toISOString(),
        executedBy: 'tester@example.com',
        testSuites: [
          {
            id: 'ts-001',
            name: 'TS - UI Validation',
            status: 'Passed',
            executionDuration: 45000,
            lastRunTimestamp: new Date().toISOString(),
            passedCount: 23,
            failedCount: 0,
            skippedCount: 0,
            totalCount: 23
          },
          {
            id: 'ts-002',
            name: 'User Authentication Tests',
            status: 'Failed',
            executionDuration: 78000,
            lastRunTimestamp: new Date().toISOString(),
            passedCount: 8,
            failedCount: 3,
            skippedCount: 0,
            totalCount: 11
          },
          {
            id: 'ts-003',
            name: 'API Integration Tests',
            status: 'Passed',
            executionDuration: 120000,
            lastRunTimestamp: new Date().toISOString(),
            passedCount: 15,
            failedCount: 0,
            skippedCount: 2,
            totalCount: 17
          },
          {
            id: 'ts-004',
            name: 'Data Validation Tests',
            status: 'Passed',
            executionDuration: 65000,
            lastRunTimestamp: new Date().toISOString(),
            passedCount: 9,
            failedCount: 0,
            skippedCount: 0,
            totalCount: 9
          },
          {
            id: 'ts-005',
            name: 'Workflow Tests',
            status: 'Failed',
            executionDuration: 48000,
            lastRunTimestamp: new Date().toISOString(),
            passedCount: 5,
            failedCount: 2,
            skippedCount: 1,
            totalCount: 8
          }
        ],
        passedCount: 49,
        failedCount: 5,
        skippedCount: 4,
        abortedCount: 0,
        totalCount: 58
      };
      
      // Add expanded property to each test suite
      this.filteredTestSuites = this.masterSuiteResult.testSuites.map(suite => ({
        ...suite,
        expanded: false,
        testCases: [],
        activeTestCase: null
      }));
      
      // Expand the first test suite by default
      if (this.filteredTestSuites.length > 0) {
        this.filteredTestSuites[0].expanded = true;
      }
      
      this.isLoading = false;
    }, 500);
  }

  toggleFiltersPanel(): void {
    this.filtersExpanded = !this.filtersExpanded;
  }

  toggleTestSuiteExpand(testSuite: TestSuiteWithExpand): void {
    testSuite.expanded = !testSuite.expanded;
  }

  toggleTestCaseExpand(testSuite: TestSuiteWithExpand, testCaseIndex: number): void {
    // Toggle the active test case
    testSuite.activeTestCase = testSuite.activeTestCase === testCaseIndex ? null : testCaseIndex;
  }

  applyFilters(): void {
    console.log('Applying filters:', {
      statusFilter: this.statusFilter,
      testSuiteStatusFilter: this.testSuiteStatusFilter,
      testCaseStatusFilter: this.testCaseStatusFilter,
      endpointStatusFilter: this.endpointStatusFilter
    });

    // Filter test suites based on selected criteria
    this.filteredTestSuites = this.masterSuiteResult.testSuites
      .filter(testSuite => {
        // Skip master suite filter for now (it would filter all test suites out if master suite doesn't match)
        // if (this.statusFilter !== 'All' && this.masterSuiteResult.status !== this.statusFilter) {
        //   return false;
        // }
        
        // Apply test suite status filter
        if (this.testSuiteStatusFilter !== 'All' && testSuite.status !== this.testSuiteStatusFilter) {
          return false;
        }
        
        // Check if test suite has test cases that match test case status filter
        if (this.testCaseStatusFilter !== 'All') {
          switch(this.testCaseStatusFilter) {
            case 'Passed':
              if (testSuite.passedCount === 0) return false;
              break;
            case 'Failed':
              if (testSuite.failedCount === 0) return false;
              break;
            case 'Skipped':
              if (testSuite.skippedCount === 0) return false;
              break;
          }
        }
        
        return true;
      })
      .map(suite => ({
        ...suite,
        expanded: false,
        testCases: [],
        activeTestCase: null
      }));
    
    console.log('Filtered test suites:', this.filteredTestSuites.length);
  }

  resetFilters(): void {
    this.statusFilter = 'All';
    this.testSuiteStatusFilter = 'All';
    this.testCaseStatusFilter = 'All';
    this.endpointStatusFilter = 'All';
    this.dateRangeFilter = { from: null, to: null };
    this.executedByFilter = '';
    this.applyFilters();
  }

  goToTestSuiteResult(testSuiteId: string): void {
    this.router.navigate(['/testsuites', testSuiteId, 'results', 'latest']);
  }

  formatDuration(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  formatEndTime(startTimeIso: string, durationMs: number): string {
    const startTime = new Date(startTimeIso);
    const endTime = new Date(startTime.getTime() + durationMs);
    return endTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Passed':
      case 'PASSED':
        return 'passed';
      case 'Failed':
      case 'FAILED':
        return 'failed';
      case 'In Progress':
      case 'IN_PROGRESS':
        return 'in-progress';
      case 'Aborted':
      case 'ABORTED':
        return 'aborted';
      case 'Skipped':
      case 'SKIPPED':
        return 'skipped';
      default:
        return '';
    }
  }
  
  navigateBack(): void {
    this.router.navigate(['/mastersuites', this.masterSuiteId]);
  }
  
  generateRandomId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  
  // Endpoint details methods
  viewEndpointDetails(endpoint: any, testSuite: any): void {
    this.selectedEndpoint = endpoint;
    this.selectedTestSuite = testSuite;
  }
  
  closeEndpointDetails(): void {
    this.selectedEndpoint = null;
    this.selectedTestSuite = null;
  }
  
  isSelectedEndpoint(endpointId: number): boolean {
    return this.selectedEndpoint && this.selectedEndpoint.id === endpointId;
  }
  
  createMockEndpoint(id: number): any {
    const endpointNames = ['FT.Preferences', 'FT.STDOUT', 'FT.References|Check Nav|Javary', 'FT.CUSTOM'];
    const status = id === 2 ? 'FAILED' : 'PASSED';
    const responseTimes = ['99', 'N/A', '7658', '3741'];
    
    return {
      id: id,
      name: endpointNames[id-1] + ' - Validation',
      url: '/api/test/' + endpointNames[id-1].toLowerCase().replace(/[|]/g, '/'),
      method: 'GET',
      status: status,
      responseTime: responseTimes[id-1],
      category: 'DOM',
      startTime: new Date().toISOString(),
      responseCode: id === 2 ? 500 : 200,
      requestBody: id === 2 ? 
        '{\n  "test": "data",\n  "validate": true\n}' : 
        '{\n  "id": ' + id + ',\n  "action": "validate"\n}',
      responseBody: id === 2 ? 
        '{\n  "error": "Failed to process request",\n  "code": 500\n}' : 
        '{\n  "success": true,\n  "data": {\n    "id": ' + id + ',\n    "result": "validated"\n  }\n}'
    };
  }
}