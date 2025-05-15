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
  statusFilter: 'All' | 'Passed' | 'Failed' = 'All';
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
    // In a real application, this would be a service call
    // For now, we'll use mock data
    setTimeout(() => {
      this.testSuiteResult = {
        id: this.resultId,
        testSuiteId: this.testSuiteId,
        testSuiteName: 'User Management API Tests',
        status: 'Failed',
        executionTime: 78000, // 1 minute and 18 seconds
        lastRunTimestamp: new Date().toISOString(),
        executedBy: 'jane.smith@example.com',
        testCases: [
          {
            id: 'tc-001',
            name: 'Get User by ID',
            status: 'Passed',
            executionDuration: 1200,
            assertionsSummary: '5/5 passed',
            passedAssertions: 5,
            totalAssertions: 5,
            tags: ['User', 'GET', 'API']
          },
          {
            id: 'tc-002',
            name: 'Create New User',
            status: 'Passed',
            executionDuration: 1450,
            assertionsSummary: '7/7 passed',
            passedAssertions: 7,
            totalAssertions: 7,
            tags: ['User', 'POST', 'API']
          },
          {
            id: 'tc-003',
            name: 'Update User Information',
            status: 'Failed',
            executionDuration: 1300,
            assertionsSummary: '3/6 passed',
            passedAssertions: 3,
            totalAssertions: 6,
            tags: ['User', 'PUT', 'API']
          },
          {
            id: 'tc-004',
            name: 'Delete User',
            status: 'Passed',
            executionDuration: 980,
            assertionsSummary: '4/4 passed',
            passedAssertions: 4,
            totalAssertions: 4,
            tags: ['User', 'DELETE', 'API']
          },
          {
            id: 'tc-005',
            name: 'List All Users',
            status: 'Failed',
            executionDuration: 2500,
            assertionsSummary: '2/5 passed',
            passedAssertions: 2,
            totalAssertions: 5,
            tags: ['User', 'GET', 'API', 'Collection']
          },
          {
            id: 'tc-006',
            name: 'User Authentication',
            status: 'Passed',
            executionDuration: 1750,
            assertionsSummary: '6/6 passed',
            passedAssertions: 6,
            totalAssertions: 6,
            tags: ['User', 'AUTH', 'API', 'Security']
          }
        ],
        passedCount: 8,
        failedCount: 3,
        skippedCount: 0,
        totalCount: 11
      };
      
      this.filteredTestCases = [...this.testSuiteResult.testCases];
      this.isLoading = false;
    }, 500);
  }

  applyFilters(): void {
    this.filteredTestCases = this.testSuiteResult.testCases.filter(testCase => {
      // Apply status filter
      if (this.statusFilter !== 'All' && testCase.status !== this.statusFilter) {
        return false;
      }

      // Apply tag filter
      if (this.tagFilter && this.tagFilter.trim() !== '') {
        const lowerCaseTagFilter = this.tagFilter.toLowerCase().trim();
        const matchesTag = testCase.tags.some(tag => 
          tag.toLowerCase().includes(lowerCaseTagFilter)
        );
        if (!matchesTag) {
          return false;
        }
      }
      
      return true;
    });
  }

  resetFilters(): void {
    this.statusFilter = 'All';
    this.dateRangeFilter = { from: null, to: null };
    this.tagFilter = '';
    this.filteredTestCases = [...this.testSuiteResult.testCases];
  }

  goToTestCaseResult(testCaseId: string): void {
    this.router.navigate(['/testcases', testCaseId, 'results', 'latest']);
  }

  formatDuration(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Passed':
        return 'status-passed';
      case 'Failed':
        return 'status-failed';
      case 'In Progress':
        return 'status-in-progress';
      case 'Aborted':
        return 'status-aborted';
      default:
        return '';
    }
  }
}