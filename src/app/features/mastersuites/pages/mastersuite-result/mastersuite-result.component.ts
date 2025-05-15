import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterSuiteResult, TestSuiteOverview } from '../../models/mastersuite-result.model';

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
  statusFilter: 'All' | 'Passed' | 'Failed' = 'All';
  dateRangeFilter: { from: Date | null, to: Date | null } = { from: null, to: null };
  executedByFilter: string = '';
  filteredTestSuites: TestSuiteOverview[] = [];

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
    setTimeout(() => {
      this.masterSuiteResult = {
        id: this.resultId,
        masterSuiteId: this.masterSuiteId,
        masterSuiteName: 'Core API Test Suite',
        status: 'Failed',
        executionTime: 356000, // 5 minutes and 56 seconds
        lastRunTimestamp: new Date().toISOString(),
        executedBy: 'john.doe@example.com',
        testSuites: [
          {
            id: 'ts-001',
            name: 'Authentication Tests',
            status: 'Passed',
            executionDuration: 45000,
            lastRunTimestamp: new Date().toISOString(),
            passedCount: 12,
            failedCount: 0,
            skippedCount: 1,
            totalCount: 13
          },
          {
            id: 'ts-002',
            name: 'User Management Tests',
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
            name: 'Payment Processing Tests',
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
        totalCount: 58
      };
      
      this.filteredTestSuites = [...this.masterSuiteResult.testSuites];
      this.isLoading = false;
    }, 500);
  }

  applyFilters(): void {
    this.filteredTestSuites = this.masterSuiteResult.testSuites.filter(testSuite => {
      // Apply status filter
      if (this.statusFilter !== 'All' && testSuite.status !== this.statusFilter) {
        return false;
      }

      // Apply executed by filter (if implemented)
      
      // Apply date range filter (if implemented)
      
      return true;
    });
  }

  resetFilters(): void {
    this.statusFilter = 'All';
    this.dateRangeFilter = { from: null, to: null };
    this.executedByFilter = '';
    this.filteredTestSuites = [...this.masterSuiteResult.testSuites];
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