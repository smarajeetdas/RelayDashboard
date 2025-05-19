import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestSuiteResult, TestCaseOverview } from '../../models/testsuite-result.model';

interface TestCaseWithExpand extends TestCaseOverview {
  isExpanded?: boolean;
  endpoints?: {
    url: string;
    method: string;
    status: string;
    responseTime: number;
    responseCode: number;
  }[];
}

@Component({
  selector: 'app-testsuite-result',
  templateUrl: './testsuite-result.component.html',
  styleUrls: ['./testsuite-result.component.css']
})
export class TestSuiteResultComponent implements OnInit {
  testSuiteId: string = '';
  resultId: string = '';
  isLoading: boolean = true;
  testSuiteResult: TestSuiteResult & {
    passRate: number;
    avgExecutionTime: number;
    totalEndpoints: number;
  };
  filtersExpanded: boolean = true;
  selectedEndpoint: any = null;
  selectedTestCase: any = null;
  
  // Filters
  statusFilter: 'All' | 'Passed' | 'Failed' | 'In Progress' | 'Aborted' = 'All';
  testCaseStatusFilter: 'All' | 'Passed' | 'Failed' | 'Skipped' = 'All';
  endpointStatusFilter: 'All' | 'Passed' | 'Failed' = 'All';
  dateRangeFilter: { from: Date | null, to: Date | null } = { from: null, to: null };
  tagFilter: string = '';
  filteredTestCases: TestCaseWithExpand[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const resultId = this.route.snapshot.paramMap.get('resultId');
    
    this.testSuiteId = id || '';
    this.resultId = resultId || '';
    this.loadTestSuiteResult();
  }
  
  loadTestSuiteResult(): void {
    this.isLoading = true;
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock data
      const testCasesWithExpand: TestCaseWithExpand[] = [
        {
          id: 'tc1',
          name: 'Login Authentication Test',
          status: 'Passed',
          executionDuration: 2500,
          assertionsSummary: '5/5 passed',
          passedAssertions: 5,
          totalAssertions: 5,
          tags: ['login', 'authentication'],
          isExpanded: false,
          endpoints: [
            {
              url: '/api/auth/login',
              method: 'POST',
              status: 'Passed',
              responseTime: 320,
              responseCode: 200
            },
            {
              url: '/api/auth/verify',
              method: 'GET',
              status: 'Passed',
              responseTime: 180,
              responseCode: 200
            }
          ]
        },
        {
          id: 'tc2',
          name: 'User Profile API Test',
          status: 'Failed',
          executionDuration: 1800,
          assertionsSummary: '3/5 passed',
          passedAssertions: 3,
          totalAssertions: 5,
          tags: ['profile', 'user-data'],
          isExpanded: false,
          endpoints: [
            {
              url: '/api/users/profile',
              method: 'GET',
              status: 'Passed',
              responseTime: 250,
              responseCode: 200
            },
            {
              url: '/api/users/settings',
              method: 'GET',
              status: 'Failed',
              responseTime: 350,
              responseCode: 404
            }
          ]
        },
        {
          id: 'tc3',
          name: 'Payment Gateway Integration',
          status: 'Passed',
          executionDuration: 3200,
          assertionsSummary: '8/8 passed',
          passedAssertions: 8,
          totalAssertions: 8,
          tags: ['payment', 'gateway', 'integration'],
          isExpanded: false,
          endpoints: [
            {
              url: '/api/payments/initialize',
              method: 'POST',
              status: 'Passed',
              responseTime: 420,
              responseCode: 201
            },
            {
              url: '/api/payments/confirm',
              method: 'POST',
              status: 'Passed',
              responseTime: 350,
              responseCode: 200
            },
            {
              url: '/api/payments/status',
              method: 'GET',
              status: 'Passed',
              responseTime: 180,
              responseCode: 200
            }
          ]
        },
        {
          id: 'tc4',
          name: 'Data Export API',
          status: 'Skipped',
          executionDuration: 0,
          assertionsSummary: '0/0 passed',
          passedAssertions: 0,
          totalAssertions: 0,
          tags: ['export', 'data'],
          isExpanded: false,
          endpoints: []
        }
      ];
      
      // Calculate total endpoints
      const totalEndpoints = testCasesWithExpand.reduce((sum, testCase) => 
        sum + (testCase.endpoints?.length || 0), 0);
      
      // Calculate average execution time
      const totalExecutionTime = testCasesWithExpand.reduce((sum, testCase) => 
        sum + testCase.executionDuration, 0);
      const avgExecutionTime = testCasesWithExpand.length > 0 ? 
        totalExecutionTime / (testCasesWithExpand.length - 1) : 0; // Exclude skipped tests
      
      this.testSuiteResult = {
        id: this.resultId,
        testSuiteId: this.testSuiteId,
        testSuiteName: 'REST API Test Suite',
        status: 'Passed',
        executionTime: 12500, // 12.5 seconds
        lastRunTimestamp: new Date().toISOString(),
        executedBy: 'automated@system.com',
        testCases: testCasesWithExpand,
        passedCount: 2,
        failedCount: 1,
        skippedCount: 1,
        abortedCount: 0,
        totalCount: 4,
        
        // Additional computed fields
        passRate: 2 / 3, // Exclude skipped from calculation
        avgExecutionTime: avgExecutionTime,
        totalEndpoints: totalEndpoints
      };
      
      // Initialize filtered testcases
      this.filteredTestCases = [...testCasesWithExpand];
      this.isLoading = false;
    }, 1000);
  }
  
  toggleTestCase(testCase: TestCaseWithExpand): void {
    testCase.isExpanded = !testCase.isExpanded;
  }
  
  applyFilters(): void {
    if (!this.testSuiteResult) return;
    
    this.filteredTestCases = (this.testSuiteResult.testCases as TestCaseWithExpand[]).filter(testCase => {
      // Apply TestCase status filter
      if (this.testCaseStatusFilter !== 'All' && testCase.status !== this.testCaseStatusFilter) {
        return false;
      }
      
      // Apply endpoint status filter if test case has endpoints
      if (this.endpointStatusFilter !== 'All' && testCase.endpoints && testCase.endpoints.length > 0) {
        const hasMatchingEndpoint = testCase.endpoints.some(endpoint => 
          endpoint.status === this.endpointStatusFilter
        );
        if (!hasMatchingEndpoint) {
          return false;
        }
      }
      
      // Apply tag filter if specified
      if (this.tagFilter && this.tagFilter.trim() !== '') {
        const tagFilterLower = this.tagFilter.toLowerCase().trim();
        const hasMatchingTag = testCase.tags.some(tag => 
          tag.toLowerCase().includes(tagFilterLower)
        );
        if (!hasMatchingTag) {
          return false;
        }
      }
      
      return true;
    });
  }
  
  resetFilters(): void {
    this.statusFilter = 'All';
    this.testCaseStatusFilter = 'All';
    this.endpointStatusFilter = 'All';
    this.dateRangeFilter = { from: null, to: null };
    this.tagFilter = '';
    
    if (this.testSuiteResult) {
      this.filteredTestCases = [...this.testSuiteResult.testCases as TestCaseWithExpand[]];
    }
  }

  goToTestCaseResult(testCaseId: string): void {
    // Navigate to test case result
    this.router.navigate(['/testcases', testCaseId, 'results', this.resultId]);
  }
  
  goBack(): void {
    // Navigate back to test suite details
    this.router.navigate(['/testsuites', this.testSuiteId]);
  }

  formatDuration(milliseconds: number): string {
    if (!milliseconds) return '0s';
    
    const seconds = Math.floor(milliseconds / 1000);
    if (seconds < 60) {
      return `${seconds}s`;
    }
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Passed': return 'passed';
      case 'Failed': return 'failed';
      case 'In Progress': return 'in-progress';
      case 'Skipped': return 'skipped';
      case 'Aborted': return 'aborted';
      default: return '';
    }
  }
  
  viewEndpointDetails(endpoint: any, testCase: any): void {
    this.selectedEndpoint = endpoint;
    this.selectedTestCase = testCase;
  }
  
  closeEndpointDetails(): void {
    this.selectedEndpoint = null;
    this.selectedTestCase = null;
  }
  
  isSelectedEndpoint(endpoint: any): boolean {
    return this.selectedEndpoint === endpoint;
  }
  
  formatDate(dateString: string): string {
    if (!dateString) {
      return new Date().toLocaleString();
    }
    return new Date(dateString).toLocaleString();
  }
}