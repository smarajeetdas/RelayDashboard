import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestCaseService } from '../../services/testcase.service';
import { TestExecution } from '../../models/execution.model';

@Component({
  selector: 'app-execution-history',
  templateUrl: './execution-history.component.html',
  styleUrls: ['./execution-history.component.css']
})
export class ExecutionHistoryComponent implements OnInit {
  testCaseId: string;
  executionRecords: TestExecution[] = [];
  loading: boolean = true;
  error: string | null = null;
  testCaseName: string = '';
  
  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  
  // Filter options
  statusFilter: string = '';
  dateRangeStart: string = '';
  dateRangeEnd: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testCaseService: TestCaseService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Test case ID is missing. Please go back and try again.';
      return;
    }
    
    this.testCaseId = id;
    this.loadTestCaseDetails();
    this.loadExecutionHistory();
  }

  loadTestCaseDetails(): void {
    this.testCaseService.getTestCaseById(this.testCaseId).subscribe(
      (testCase) => {
        if (testCase) {
          this.testCaseName = testCase.name;
        } else {
          this.error = 'Test case not found.';
        }
      },
      (error) => {
        this.error = 'Failed to load test case details.';
        console.error('Error loading test case details:', error);
      }
    );
  }

  loadExecutionHistory(): void {
    this.loading = true;
    
    // Create filters object
    const filters: any = {};
    if (this.statusFilter) {
      filters.status = this.statusFilter;
    }
    if (this.dateRangeStart) {
      filters.startDate = this.dateRangeStart;
    }
    if (this.dateRangeEnd) {
      filters.endDate = this.dateRangeEnd;
    }
    
    this.testCaseService.getExecutionHistory(this.testCaseId, filters).subscribe(
      (records) => {
        this.executionRecords = records;
        this.totalItems = records.length;
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load execution history.';
        console.error('Error loading execution history:', error);
        this.loading = false;
      }
    );
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.loadExecutionHistory();
  }

  clearFilters(): void {
    this.statusFilter = '';
    this.dateRangeStart = '';
    this.dateRangeEnd = '';
    this.applyFilters();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadExecutionHistory();
  }

  goBack(): void {
    this.router.navigate(['/testcases']);
  }

  private generateMockExecutionHistory(): void {
    // This would be replaced with actual API calls in a real application
    const statuses: Array<TestExecution['status']> = ['PASSED', 'FAILED', 'IN_PROGRESS', 'SCHEDULED', 'ABORTED', 'PENDING'];
    const environments = ['Production', 'Staging', 'Development', 'QA'];
    const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];
    const users = ['admin', 'tester1', 'tester2', 'automatedJob'];
    
    const mockRecords: TestExecution[] = [];
    
    // Generate 30 mock execution records
    for (let i = 0; i < 30; i++) {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 30));
      const endDate = new Date(startDate);
      const durationSecs = Math.floor(Math.random() * 300) + 60; // 1-6 minutes
      endDate.setSeconds(endDate.getSeconds() + durationSecs);
      
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      mockRecords.push({
        id: `exec-${this.testCaseId}-${i}`,
        testCaseId: this.testCaseId,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
        status: status,
        executedBy: users[Math.floor(Math.random() * users.length)],
        environment: environments[Math.floor(Math.random() * environments.length)],
        browser: browsers[Math.floor(Math.random() * browsers.length)],
        duration: durationSecs,
        errorMessage: status === 'FAILED' ? 'Element not found: #login-button' : undefined
      });
    }
    
    // Sort by start time descending (newest first)
    mockRecords.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
    
    this.executionRecords = mockRecords;
    this.totalItems = mockRecords.length;
  }
  
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString();
  }
  
  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }
  
  getStatusClass(status: string): string {
    switch (status) {
      case 'PASSED': return 'badge-success';
      case 'FAILED': return 'badge-danger';
      case 'IN_PROGRESS': return 'badge-info animate-pulse';
      case 'SCHEDULED': return 'badge-primary';
      case 'ABORTED': return 'badge-warning';
      case 'PENDING': return 'badge-secondary';
      default: return 'badge-secondary';
    }
  }
  
  getStatusIcon(status: string): string {
    switch (status) {
      case 'PASSED': return 'fa-check';
      case 'FAILED': return 'fa-times';
      case 'IN_PROGRESS': return 'fa-spinner fa-spin';
      case 'SCHEDULED': return 'fa-clock';
      case 'ABORTED': return 'fa-hand-paper';
      case 'PENDING': return 'fa-hourglass-half';
      default: return 'fa-question';
    }
  }
}