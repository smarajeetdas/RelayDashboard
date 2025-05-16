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
  activeTab: string = 'steps';
  
  // Filtering
  statusFilter: 'All' | 'Passed' | 'Failed' | 'In Progress' | 'Aborted' | 'Scheduled' | 'Pending' = 'All';
  endpointStatusFilter: 'All' | 'Passed' | 'Failed' = 'All';
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
        status: 'Passed',
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
        validationStatus: 'Passed',
        environment: 'Windows',
        browser: 'Chrome',
        runReport: 'Daily Regression - May 15, 2025',
        startTime: new Date(Date.now() - 2500),
        endTime: new Date(),
        testSteps: [
          {
            id: '1',
            name: 'Initialize Test Environment',
            category: 'Setup',
            status: 'Passed',
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
            status: 'Passed',
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
            status: 'Passed',
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
            status: 'Failed',
            startTime: new Date(Date.now() - 1500),
            endTime: new Date(Date.now() - 900),
            requestType: 'GET',
            responseCode: 404,
            responseTime: 600
          },
          {
            id: '5',
            name: 'User Permissions Check',
            category: 'Validation',
            status: 'Failed',
            startTime: new Date(Date.now() - 900),
            endTime: new Date(Date.now() - 0),
            requestType: 'N/A',
            responseCode: 0,
            responseTime: 900
          },
          {
            id: '6',
            name: 'Session Token Verification',
            category: 'API',
            status: 'Passed',
            startTime: new Date(Date.now() - 900),
            endTime: new Date(Date.now() - 600),
            requestType: 'POST',
            responseCode: 200,
            responseTime: 450
          },
          {
            id: '7',
            name: 'Role-based Access Check',
            category: 'Validation',
            status: 'Passed',
            startTime: new Date(Date.now() - 600),
            endTime: new Date(Date.now() - 300),
            requestType: 'N/A',
            responseCode: 0,
            responseTime: 320
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
      case 'Scheduled':
      case 'SCHEDULED':
        return 'scheduled';
      case 'Pending':
      case 'PENDING':
        return 'pending';
      default:
        return '';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'Passed':
      case 'PASSED':
        return 'check';
      case 'Failed':
      case 'FAILED':
        return 'times';
      case 'In Progress':
      case 'IN_PROGRESS':
        return 'spinner fa-spin';
      case 'Aborted':
      case 'ABORTED':
        return 'hand-paper';
      case 'Scheduled':
      case 'SCHEDULED':
        return 'clock';
      case 'Pending':
      case 'PENDING':
        return 'hourglass-half';
      default:
        return 'question';
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
  
  getPassedStepsCount(): number {
    return this.filteredTestSteps.filter(step => step.status === 'Passed').length;
  }
  
  getFailedStepsCount(): number {
    return this.filteredTestSteps.filter(step => step.status === 'Failed').length;
  }
  
  getAverageWaitTime(): string {
    if (this.filteredTestSteps.length === 0) return '0';
    
    const totalResponseTime = this.filteredTestSteps.reduce((sum, step) => sum + step.responseTime, 0);
    const avgTime = totalResponseTime / this.filteredTestSteps.length;
    
    // Format with 0 decimals if integer, otherwise 1 decimal place
    return avgTime % 1 === 0 ? avgTime.toString() : avgTime.toFixed(1);
  }
  
  getPassPercentage(): number {
    if (this.filteredTestSteps.length === 0) return 0;
    
    const passCount = this.getPassedStepsCount();
    const passPercentage = (passCount / this.filteredTestSteps.length) * 100;
    
    // Convert percentage to angle for pie chart (180 degrees = 50%)
    return (passPercentage / 100) * 360;
  }
  
  getBarHeight(responseTime: number): number {
    // Find the maximum response time to scale the bars
    const maxResponseTime = Math.max(...this.filteredTestSteps.map(step => step.responseTime));
    
    if (maxResponseTime === 0) return 0;
    
    // Scale the height as a percentage of the maximum (maxing out at 95% for visual purposes)
    return Math.min(95, (responseTime / maxResponseTime) * 95);
  }
}