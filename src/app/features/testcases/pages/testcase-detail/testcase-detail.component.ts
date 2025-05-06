import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestCaseDetail, TestCaseStep } from '../../models/testcase.model';
import { TestCaseService } from '../../services/testcase.service';
import { SidebarItem } from '../../../../shared/components/detail-sidebar/detail-sidebar.component';

@Component({
  selector: 'app-testcase-detail',
  templateUrl: './testcase-detail.component.html',
  styleUrls: ['./testcase-detail.component.css']
})
export class TestCaseDetailComponent implements OnInit {
  testCase: TestCaseDetail | undefined;
  loading: boolean = true;
  activeTab: 'details' | 'steps' | 'testData' = 'details';
  error: string | null = null;
  
  // Sidebar configuration
  sidebarItems: SidebarItem[] = [
    { id: 'basic', icon: 'info-circle', label: 'Basic' },
    { id: 'test-data', icon: 'database', label: 'Test data' },
    { id: 'schedule', icon: 'calendar-alt', label: 'Schedule' },
    { id: 'validations', icon: 'check-circle', label: 'Validations' },
    { id: 'certification', icon: 'certificate', label: 'Certification' },
    { id: 'notification', icon: 'bell', label: 'Notification' },
    { id: 'with', icon: 'link', label: 'Associated with' },
    { id: 'history', icon: 'history', label: 'History' },
    { id: 'execution-history', icon: 'play-circle', label: 'Execution History' },
    { id: 'result', icon: 'chart-bar', label: 'Result' },
  ];
  activeSidebarItem: string = 'basic';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testCaseService: TestCaseService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadTestCaseDetails(id);
      } else {
        this.error = 'Invalid test case ID';
        this.loading = false;
      }
    });
  }

  loadTestCaseDetails(id: string): void {
    this.loading = true;
    this.testCaseService.getTestCaseById(id).subscribe(
      (testCase) => {
        this.testCase = testCase;
        this.loading = false;
        
        if (!testCase) {
          this.error = 'Test case not found';
        }
      },
      (error) => {
        this.error = 'Failed to load test case details. Please try again.';
        this.loading = false;
        console.error('Error loading test case details:', error);
      }
    );
  }

  onSidebarItemSelect(itemId: string): void {
    this.activeSidebarItem = itemId;
    
    // Set the active tab based on sidebar selection
    if (itemId === 'basic') {
      this.activeTab = 'details';
    } else if (itemId === 'test-data') {
      this.activeTab = 'testData';
    }
  }

  setActiveTab(tab: 'details' | 'steps' | 'testData'): void {
    this.activeTab = tab;
  }

  getStatusClass(active: boolean | undefined): string {
    return active ? 'text-success' : 'text-danger';
  }

  getStatusIcon(active: boolean | undefined): string {
    return active ? 'fa-check-circle' : 'fa-times-circle';
  }

  goBack(): void {
    this.router.navigate(['/testcases']);
  }

  editTestCase(): void {
    // Placeholder for edit functionality
    alert('Edit feature will be implemented soon');
  }

  deleteTestCase(): void {
    if (confirm('Are you sure you want to delete this test case?')) {
      if (this.testCase) {
        this.testCaseService.deleteTestCase(this.testCase.id).subscribe(
          (success) => {
            if (success) {
              this.router.navigate(['/testcases']);
            }
          },
          (error) => {
            console.error('Error deleting test case:', error);
          }
        );
      }
    }
  }

  runStep(step: TestCaseStep): void {
    // Placeholder for run step functionality
    alert(`Running step: ${step.name}`);
  }
}