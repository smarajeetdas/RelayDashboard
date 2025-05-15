import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestTestResult, RestTestStep } from '../../models/test-result.model';
import { TestResultService } from '../../services/test-result.service';
import { TestCaseService } from '../../services/testcase.service';

@Component({
  selector: 'app-testcase-result',
  templateUrl: './testcase-result.component.html',
  styleUrls: ['./testcase-result.component.css']
})
export class TestcaseResultComponent implements OnInit {
  testCaseId: string = '';
  resultId: string = '';
  testResult: RestTestResult | undefined;
  testSteps: RestTestStep[] = [];
  filteredTestSteps: RestTestStep[] = [];
  loading: boolean = true;
  error: string | null = null;
  activeTab: 'overview' | 'detail' | 'response' | 'validation' | 'report' = 'overview';
  
  // Filters
  statusFilter: 'All' | 'PASSED' | 'FAILED' | 'IN_PROGRESS' | 'SCHEDULED' | 'ABORTED' | 'PENDING' = 'All';
  endpointStatusFilter: 'All' | 'PASSED' | 'FAILED' = 'All';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testResultService: TestResultService,
    private testCaseService: TestCaseService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const resultIdParam = this.route.snapshot.paramMap.get('resultId');
    
    if (!idParam || !resultIdParam) {
      this.error = 'Invalid test case or result ID.';
      this.loading = false;
      return;
    }
    
    this.testCaseId = idParam;
    this.resultId = resultIdParam;
    this.loadTestResult();
  }

  loadTestResult(): void {
    this.testResultService.getRestTestResult(this.testCaseId, this.resultId)
      .subscribe(
        (result) => {
          this.testResult = result;
          this.loadTestSteps();
        },
        (error) => {
          this.error = 'Failed to load test result. ' + error.message;
          this.loading = false;
        }
      );
  }
  
  loadTestSteps(): void {
    this.testResultService.getTestSteps(this.testCaseId, this.resultId)
      .subscribe(
        (steps) => {
          this.testSteps = steps;
          this.filteredTestSteps = [...steps]; // Initialize filtered steps
          this.loading = false;
        },
        (error) => {
          this.error = 'Failed to load test steps. ' + error.message;
          this.loading = false;
        }
      );
  }
  
  applyFilters(): void {
    this.filteredTestSteps = this.testSteps.filter(step => {
      // Apply test case status filter
      if (this.statusFilter !== 'All' && this.testResult && this.testResult.status !== this.statusFilter) {
        return false;
      }
      
      // Apply endpoint status filter
      if (this.endpointStatusFilter !== 'All' && step.status !== this.endpointStatusFilter) {
        return false;
      }
      
      return true;
    });
  }
  
  resetFilters(): void {
    this.statusFilter = 'All';
    this.endpointStatusFilter = 'All';
    this.filteredTestSteps = [...this.testSteps];
  }
  
  goBack(): void {
    this.router.navigate(['/testcases', this.testCaseId]);
  }
  
  setActiveTab(tab: 'overview' | 'detail' | 'response' | 'validation' | 'report'): void {
    this.activeTab = tab;
  }
  
  getStatusClass(status: string): string {
    switch (status) {
      case 'PASSED':
        return 'success';
      case 'FAILED':
        return 'danger';
      case 'IN_PROGRESS':
        return 'primary';
      case 'SCHEDULED':
        return 'info';
      case 'ABORTED':
        return 'warning';
      case 'PENDING':
        return 'secondary';
      default:
        return 'secondary';
    }
  }
  
  getStatusIcon(status: string): string {
    switch (status) {
      case 'PASSED':
        return 'check-circle';
      case 'FAILED':
        return 'times-circle';
      case 'IN_PROGRESS':
        return 'spinner fa-pulse';
      case 'SCHEDULED':
        return 'clock';
      case 'ABORTED':
        return 'hand-paper';
      case 'PENDING':
        return 'hourglass-half';
      default:
        return 'question-circle';
    }
  }
  
  formatJson(json: string): string {
    if (!json) return '';
    try {
      const obj = JSON.parse(json);
      return JSON.stringify(obj, null, 2);
    } catch (e) {
      return json;
    }
  }
}