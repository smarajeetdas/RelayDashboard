import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestSuiteDetail } from '../../models/testsuite.model';
import { TestSuiteService } from '../../services/testsuite.service';
import { SidebarItem } from '../../../../shared/components/detail-sidebar/detail-sidebar.component';

interface Environment {
  id: string;
  name: string;
  type: string;
}

@Component({
  selector: 'app-testsuite-detail',
  templateUrl: './testsuite-detail.component.html',
  styleUrls: ['./testsuite-detail.component.css', '../../../../shared/styles/icon-buttons.css']
})
export class TestSuiteDetailComponent implements OnInit {
  testSuiteId: string;
  testSuite: TestSuiteDetail | null = null;
  loading: boolean = true;
  error: string | null = null;
  
  // Tab management
  activeTab: string = 'info';
  
  // Environment dropdown
  environments: Environment[] = [
    { id: 'dev', name: 'Development', type: 'DEV' },
    { id: 'qa', name: 'Quality Assurance', type: 'QA' },
    { id: 'stage', name: 'Staging', type: 'STAGE' },
    { id: 'prod', name: 'Production', type: 'PROD' }
  ];
  selectedEnvironment: Environment = this.environments[0];
  isEnvironmentDropdownOpen: boolean = false;

  // Sidebar configuration
  sidebarItems: SidebarItem[] = [
    { id: 'basic', icon: 'info-circle', label: 'Basic Information' },
    { id: 'test-data', icon: 'database', label: 'Test Data' },
    { id: 'schedule', icon: 'calendar-alt', label: 'Schedule' },
    { id: 'validations', icon: 'check-circle', label: 'Validations' },
    { id: 'certification', icon: 'certificate', label: 'Certification' },
    { id: 'notification', icon: 'bell', label: 'Notification' },
    { id: 'with', icon: 'link', label: 'Associated with' },
    { id: 'history', icon: 'history', label: 'History' },
    { id: 'execution-history', icon: 'play-circle', label: 'Execution History' },
    { id: 'result', icon: 'chart-bar', label: 'Result' },
  ];
  activeSidebarItem: string = 'with'; // Default to "Associated with" as shown in screenshot
  
  // Latest result ID - in a real app this would come from an API
  latestResultId: string = '1234';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testSuiteService: TestSuiteService
  ) {
    this.testSuiteId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.loadTestSuiteDetails();
  }
  
  loadTestSuiteDetails(): void {
    if (!this.testSuiteId) {
      this.error = 'Test suite ID is missing';
      this.loading = false;
      return;
    }
    
    this.testSuiteService.getTestSuiteById(this.testSuiteId).subscribe(
      (testSuite) => {
        if (testSuite) {
          this.testSuite = testSuite;
          this.loading = false;
        } else {
          this.error = 'Test suite not found';
          this.loading = false;
        }
      },
      (error) => {
        this.error = 'Error loading test suite details. Please try again later.';
        this.loading = false;
        console.error('Error loading test suite details:', error);
      }
    );
  }
  
  setActiveTab(tabName: string): void {
    this.activeTab = tabName;
  }
  
  navigateBack(): void {
    this.router.navigate(['/testsuites']);
  }

  toggleEnvironmentDropdown(): void {
    this.isEnvironmentDropdownOpen = !this.isEnvironmentDropdownOpen;
  }

  selectEnvironment(env: Environment): void {
    this.selectedEnvironment = env;
    this.isEnvironmentDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event): void {
    const targetElement = event.target as HTMLElement;
    const environmentDropdownElement = document.querySelector('.environment-dropdown-wrapper');
    
    if (environmentDropdownElement && !environmentDropdownElement.contains(targetElement)) {
      this.isEnvironmentDropdownOpen = false;
    }
  }

  onSidebarItemSelect(itemId: string): void {
    this.activeSidebarItem = itemId;
    // In a real application, you might show different content based on the selected sidebar item
    if (itemId === 'with') {
      this.activeTab = 'testcases'; // Show the testcases tab when Associated with is selected
    }
    
    // Navigate to results page if result sidebar item is selected
    if (itemId === 'result') {
      this.viewTestSuiteResults();
    }
  }
  
  viewTestSuiteResults(): void {
    // Navigate to test suite results with the latest result ID
    if (this.testSuiteId) {
      this.router.navigate(['/testsuites', this.testSuiteId, 'results', this.latestResultId]);
    }
  }
  
  viewResults(testSuiteId: string, resultId: string): void {
    // Navigate to specific test suite result
    this.router.navigate(['/testsuites', testSuiteId, 'results', resultId]);
  }
}