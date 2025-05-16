import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterSuiteDetail } from '../../models/mastersuite.model';
import { MasterSuiteService } from '../../services/mastersuite.service';
import { SidebarItem } from '../../../../shared/components/detail-sidebar/detail-sidebar.component';

@Component({
  selector: 'app-mastersuite-detail',
  templateUrl: './mastersuite-detail.component.html',
  styleUrls: ['./mastersuite-detail.component.css', '../../../../shared/styles/icon-buttons.css']
})
export class MasterSuiteDetailComponent implements OnInit {
  masterSuiteId: string;
  masterSuite: MasterSuiteDetail | null = null;
  loading: boolean = true;
  error: string | null = null;
  
  // Tab management
  activeTab: string = 'info';
  
  // Sidebar items
  sidebarItems: SidebarItem[] = [
    { id: 'basic', icon: 'info-circle', label: 'Basic Information' },
    { id: 'schedule', icon: 'calendar-alt', label: 'Schedule' },
    { id: 'notification', icon: 'bell', label: 'Notification' },
    { id: 'history', icon: 'history', label: 'History' },
    { id: 'execution', icon: 'tasks', label: 'Execution History' },
    { id: 'results', icon: 'chart-bar', label: 'Results' }
  ];
  activeSidebarItemId: string = 'basic';
  
  // Execute dropdown options
  executionEnvironments: string[] = ['DEV', 'QA', 'STAGING', 'PROD'];
  selectedEnvironment: string = 'DEV';
  showEnvironmentDropdown: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private masterSuiteService: MasterSuiteService
  ) {
    this.masterSuiteId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.loadMasterSuiteDetails();
  }
  
  loadMasterSuiteDetails(): void {
    if (!this.masterSuiteId) {
      this.error = 'Master suite ID is missing';
      this.loading = false;
      return;
    }
    
    this.masterSuiteService.getMasterSuiteById(this.masterSuiteId).subscribe(
      (masterSuite) => {
        if (masterSuite) {
          this.masterSuite = masterSuite;
          this.loading = false;
        } else {
          this.error = 'Master suite not found';
          this.loading = false;
        }
      },
      (error) => {
        this.error = 'Error loading master suite details. Please try again later.';
        this.loading = false;
        console.error('Error loading master suite details:', error);
      }
    );
  }
  
  setActiveTab(tabName: string): void {
    this.activeTab = tabName;
  }
  
  navigateBack(): void {
    this.router.navigate(['/mastersuites']);
  }
  
  onSidebarItemSelect(itemId: string): void {
    this.activeSidebarItemId = itemId;
    
    // Map sidebar items to corresponding tabs or navigate if needed
    if (itemId === 'execution') {
      this.setActiveTab('execution');
    } else if (itemId === 'basic') {
      this.setActiveTab('info');
    } else if (itemId === 'results') {
      // Navigate to the master suite results page with a specific result ID
      // For demonstration purposes, we're using a hardcoded ID
      this.viewLatestResult();
    }
  }
  
  // Navigate to the latest result page
  viewLatestResult(): void {
    // In a real application, you would fetch the latest result ID from an API
    // For now, we're using a mock ID
    const latestResultId = 'e8726e04e623456fcaa';
    this.router.navigate(['/mastersuites', this.masterSuiteId, 'results', latestResultId]);
  }
  
  // Navigate to a specific execution result
  viewExecutionResult(resultId: string): void {
    this.router.navigate(['/mastersuites', this.masterSuiteId, 'results', resultId]);
  }
  
  toggleEnvironmentDropdown(event: Event): void {
    event.stopPropagation();
    this.showEnvironmentDropdown = !this.showEnvironmentDropdown;
  }
  
  selectEnvironment(environment: string): void {
    this.selectedEnvironment = environment;
    this.showEnvironmentDropdown = false;
  }
  
  executeInEnvironment(): void {
    console.log(`Executing master suite in ${this.selectedEnvironment} environment`);
    // Implement execution logic here
  }
}