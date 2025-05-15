import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestSuiteResult, TestCaseOverview } from '../../models/testsuite-result.model';

@Component({
  selector: 'app-testsuite-result',
  templateUrl: './testsuite-result.component.html',
  styleUrls: ['./testsuite-result.component.css']
})
export class TestSuiteResultComponent implements OnInit {
  testSuiteId: string = '';
  resultId: string = '';
  isLoading: boolean = true;
  testSuiteResult: TestSuiteResult;
  
  // Filters
  statusFilter: 'All' | 'Passed' | 'Failed' | 'In Progress' | 'Aborted' = 'All';
  testCaseStatusFilter: 'All' | 'Passed' | 'Failed' | 'In Progress' | 'Aborted' = 'All';
  endpointStatusFilter: 'All' | 'Passed' | 'Failed' = 'All';
  dateRangeFilter: { from: Date | null, to: Date | null } = { from: null, to: null };
  tagFilter: string = '';
  filteredTestCases: TestCaseOverview[] = [];

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
      this.testSuiteResult = {
        id: this.resultId,
        testSuiteId: this.testSuiteId,
        testSuiteName: 'REST API Test Suite',
        status: 'Passed',
        executionTime: 12500, // 12.5 seconds
        lastRunTimestamp: new Date().toISOString(),
        executedBy: 'automated@system.com',
        testCases: [
          {
            id: 'tc1',
            name: 'Login Authentication Test',
            status: 'Passed',
            executionDuration: 2500,
            assertionsSummary: '5/5 passed',
            passedAssertions: 5,
            totalAssertions: 5,
            tags: ['login', 'authentication']
          },
          {
            id: 'tc2',
            name: 'User Profile API Test',
            status: 'Failed',
            executionDuration: 1800,
            assertionsSummary: '3/5 passed',
            passedAssertions: 3,
            totalAssertions: 5,
            tags: ['profile', 'user-data']
          },
          {
            id: 'tc3',
            name: 'Payment Gateway Integration',
            status: 'Passed',
            executionDuration: 3200,
            assertionsSummary: '8/8 passed',
            passedAssertions: 8,
            totalAssertions: 8,
            tags: ['payment', 'gateway', 'integration']
          },
          {
            id: 'tc4',
            name: 'Data Export API',
            status: 'In Progress',
            executionDuration: 5000,
            assertionsSummary: '2/6 passed',
            passedAssertions: 2,
            totalAssertions: 6,
            tags: ['export', 'data']
          }
        ],
        passedCount: 2,
        failedCount: 1,
        skippedCount: 1,
        abortedCount: 0,
        totalCount: 4
      };
      
      // Initialize filtered testcases
      this.filteredTestCases = [...this.testSuiteResult.testCases];
      this.isLoading = false;
    }, 1000);
  }
  
  applyFilters(): void {
    if (!this.testSuiteResult) return;
    
    this.filteredTestCases = this.testSuiteResult.testCases.filter(testCase => {
      // Apply TestSuite status filter
      if (this.statusFilter !== 'All' && this.testSuiteResult.status !== this.statusFilter) {
        return false;
      }
      
      // Apply TestCase status filter
      if (this.testCaseStatusFilter !== 'All' && testCase.status !== this.testCaseStatusFilter) {
        return false;
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
      this.filteredTestCases = [...this.testSuiteResult.testCases];
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
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Passed': return 'passed';
      case 'Failed': return 'failed';
      case 'In Progress': return 'in-progress';
      case 'Aborted': return 'aborted';
      default: return '';
    }
  }
}