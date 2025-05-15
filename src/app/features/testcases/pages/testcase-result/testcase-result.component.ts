import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestResult } from '../../models/test-result.model';

@Component({
  selector: 'app-testcase-result',
  templateUrl: './testcase-result.component.html',
  styleUrls: ['./testcase-result.component.css']
})
export class TestCaseResultComponent implements OnInit {
  testCaseId: string = '';
  resultId: string = '';
  loading: boolean = true;
  error: string = '';
  testResult: TestResult;
  activeTab: string = 'overview';
  
  // Filtering
  statusFilter: 'All' | 'PASSED' | 'FAILED' | 'IN_PROGRESS' | 'ABORTED' | 'SCHEDULED' | 'PENDING' = 'All';
  endpointStatusFilter: 'All' | 'PASSED' | 'FAILED' = 'All';
  filteredTestSteps: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.testCaseId = this.route.snapshot.paramMap.get('id') || '';
    this.resultId = this.route.snapshot.paramMap.get('resultId') || '';
    this.loadTestResult();
  }

  loadTestResult(): void {
    // Mock data for demonstration - in a real app, this would come from a service
    setTimeout(() => {
      this.testResult = {
        id: this.resultId,
        testCaseId: this.testCaseId,
        testCaseName: 'User Authentication Test',
        status: 'PASSED',
        executedAt: new Date(),
        executedBy: 'automation@example.com',
        duration: 2500,
        requestType: 'POST',
        requestUrl: 'https://api.example.com/auth/login',
        requestBody: JSON.stringify({
          username: 'testuser',
          password: 'password123'
        }, null, 2),
        responseCode: 200,
        responseTime: 320,
        responseSize: 1240,
        responseBody: JSON.stringify({
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
          user: {
            id: 123,
            username: 'testuser',
            email: 'test@example.com',
            role: 'user'
          }
        }, null, 2),
        responseHeaders: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
        },
        executionSuccess: true,
        validationStatus: 'PASSED',
        runReport: 'Daily Regression - May 15, 2025',
        startTime: new Date(Date.now() - 2500),
        endTime: new Date(),
        testSteps: [
          {
            id: '1',
            name: 'Initialize Test Environment',
            category: 'Setup',
            status: 'PASSED',
            startTime: new Date(Date.now() - 2500),
            endTime: new Date(Date.now() - 2300),
            requestType: 'N/A',
            responseCode: 0,
            responseTime: 200
          },
          {
            id: '2',
            name: 'Login API Request',
            category: 'API',
            status: 'PASSED',
            startTime: new Date(Date.now() - 2300),
            endTime: new Date(Date.now() - 1800),
            requestType: 'POST',
            responseCode: 200,
            responseTime: 320
          },
          {
            id: '3',
            name: 'Token Validation',
            category: 'Validation',
            status: 'PASSED',
            startTime: new Date(Date.now() - 1800),
            endTime: new Date(Date.now() - 1500),
            requestType: 'N/A',
            responseCode: 0,
            responseTime: 300
          },
          {
            id: '4',
            name: 'Profile Data Retrieval',
            category: 'API',
            status: 'PASSED',
            startTime: new Date(Date.now() - 1500),
            endTime: new Date(Date.now() - 900),
            requestType: 'GET',
            responseCode: 200,
            responseTime: 600
          },
          {
            id: '5',
            name: 'User Permissions Check',
            category: 'Validation',
            status: 'PASSED',
            startTime: new Date(Date.now() - 900),
            endTime: new Date(Date.now() - 0),
            requestType: 'N/A',
            responseCode: 0,
            responseTime: 900
          }
        ]
      };

      this.filteredTestSteps = [...this.testResult.testSteps];
      this.loading = false;
    }, 1000);
  }

  setActiveTab(tabName: string): void {
    this.activeTab = tabName;
  }

  applyFilters(): void {
    this.filteredTestSteps = this.testResult.testSteps.filter(step => {
      const matchesStatus = this.statusFilter === 'All' || step.status === this.statusFilter;
      const matchesEndpoint = this.endpointStatusFilter === 'All' || 
        (step.category === 'API' && step.status === this.endpointStatusFilter);
      
      return matchesStatus && matchesEndpoint;
    });
  }

  resetFilters(): void {
    this.statusFilter = 'All';
    this.endpointStatusFilter = 'All';
    this.filteredTestSteps = [...this.testResult.testSteps];
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PASSED':
        return 'passed';
      case 'FAILED':
        return 'failed';
      case 'IN_PROGRESS':
        return 'in-progress';
      case 'ABORTED':
        return 'aborted';
      case 'SCHEDULED':
        return 'scheduled';
      case 'PENDING':
        return 'pending';
      default:
        return '';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'PASSED':
        return 'fa-check';
      case 'FAILED':
        return 'fa-times';
      case 'IN_PROGRESS':
        return 'fa-spinner fa-spin';
      case 'ABORTED':
        return 'fa-hand-paper';
      case 'SCHEDULED':
        return 'fa-clock';
      case 'PENDING':
        return 'fa-hourglass-half';
      default:
        return 'fa-question';
    }
  }

  formatJson(jsonString: string): string {
    try {
      const obj = JSON.parse(jsonString);
      return JSON.stringify(obj, null, 2);
    } catch (e) {
      return jsonString;
    }
  }

  goBack(): void {
    this.router.navigate(['/testcases', this.testCaseId]);
  }
}