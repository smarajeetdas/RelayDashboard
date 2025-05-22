import { Component, OnInit } from '@angular/core';

// Interface for test result data
interface TestResult {
  id: number;
  testcaseName: string;
  testcaseId: number;
  startTime: string;
  duration: string;
  environment: string;
  status: string; // Allow any status value
  project: string;
  executedBy: string;
  category?: string;
}

// Interface for filter options
interface FilterOptions {
  projects: string[];
  users: string[];
  statuses: string[];
}

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})
export class TestResultsComponent implements OnInit {
  // Test results data
  testResults: TestResult[] = [];
  
  // Filtered test results 
  filteredResults: TestResult[] = [];
  
  // Filter section display state
  showFilters: boolean = false;
  
  // Filter values
  filterValues = {
    project: '',
    user: '',
    status: '',
    keyword: ''
  };
  
  // Filter options
  filterOptions: FilterOptions = {
    projects: ['Project A', 'Project B', 'Project C', 'E-commerce', 'Banking App'],
    users: ['John Doe', 'Jane Smith', 'Alex Johnson', 'Olivia Wilson', 'William Brown'],
    statuses: ['Scheduled', 'InProgress', 'Passed', 'Failed', 'Aborted', 'Pending']
  };
  
  // UI dropdown states
  dropdownState = {
    project: false,
    user: false,
    status: false
  };
  
  constructor() { }

  ngOnInit(): void {
    // Initialize with sample data
    this.loadTestResults();
    this.applyFilters();
  }
  
  loadTestResults(): void {
    // In a real app, this would be loaded from a service
    this.testResults = [
      { 
        id: 1, 
        testcaseName: 'Login Validation', 
        testcaseId: 10001,
        startTime: '2025-04-24 10:30:21', 
        duration: '00:01:45', 
        environment: 'Production',
        status: 'Pending', 
        project: 'E-commerce', 
        executedBy: 'Jane Smith',
        category: 'Web'
      },
      { 
        id: 2, 
        testcaseName: 'Product Search', 
        testcaseId: 10002,
        startTime: '2025-04-24 11:15:10', 
        duration: '00:02:33', 
        environment: 'Staging',
        status: 'Failed', 
        project: 'E-commerce', 
        executedBy: 'John Doe',
        category: 'API'
      },
      { 
        id: 3, 
        testcaseName: 'Payment Processing', 
        testcaseId: 10003,
        startTime: '2025-04-24 12:05:45', 
        duration: '00:03:21', 
        environment: 'Development',
        status: 'InProgress', 
        project: 'Banking App', 
        executedBy: 'Alex Johnson',
        category: 'Integration'
      },
      { 
        id: 4, 
        testcaseName: 'User Registration', 
        testcaseId: 10004,
        startTime: '2025-04-24 14:22:18', 
        duration: '00:01:30', 
        environment: 'Production',
        status: 'Passed', 
        project: 'Project B', 
        executedBy: 'Olivia Wilson',
        category: 'Web'
      },
      { 
        id: 5, 
        testcaseName: 'Cart Checkout', 
        testcaseId: 10005,
        startTime: '2025-04-24 15:10:33', 
        duration: '00:04:12', 
        environment: 'Staging',
        status: 'VALID_SKIP', 
        project: 'E-commerce', 
        executedBy: 'William Brown',
        category: 'Mobile'
      },
      { 
        id: 6, 
        testcaseName: 'Account Balance Check', 
        testcaseId: 10006,
        startTime: '2025-04-24 16:45:22', 
        duration: '00:02:05', 
        environment: 'Production',
        status: 'VALID_FAILED', 
        project: 'Banking App', 
        executedBy: 'Jane Smith',
        category: 'API'
      },
      { 
        id: 7, 
        testcaseName: 'Fund Transfer', 
        testcaseId: 10007,
        startTime: '2025-04-24 17:30:11', 
        duration: '00:03:56', 
        environment: 'Development',
        status: 'VALID_JUMP', 
        project: 'Banking App', 
        executedBy: 'Alex Johnson',
        category: 'Integration'
      },
      { 
        id: 8, 
        testcaseName: 'Product Listing', 
        testcaseId: 10008,
        startTime: '2025-04-24 09:15:40', 
        duration: '00:02:41', 
        environment: 'Staging',
        status: 'PAUSED', 
        project: 'Project C', 
        executedBy: 'John Doe',
        category: 'Web'
      },
      { 
        id: 9, 
        testcaseName: 'Security Scan Test', 
        testcaseId: 10009,
        startTime: '2025-04-24 13:45:37', 
        duration: '00:05:18', 
        environment: 'Staging',
        status: 'RELAY_ERROR', 
        project: 'Banking App', 
        executedBy: 'William Brown',
        category: 'Security'
      },
      { 
        id: 10, 
        testcaseName: 'Order Processing', 
        testcaseId: 10010,
        startTime: '2025-04-24 18:20:45', 
        duration: '00:03:12', 
        environment: 'Production',
        status: 'ACTION_SKIP', 
        project: 'E-commerce', 
        executedBy: 'Olivia Wilson',
        category: 'API'
      },
      { 
        id: 11, 
        testcaseName: 'Image Upload', 
        testcaseId: 10011,
        startTime: '2025-04-24 14:33:27', 
        duration: '00:02:18', 
        environment: 'Development',
        status: 'Scheduled', 
        project: 'Project A', 
        executedBy: 'Jane Smith',
        category: 'Web'
      },
      { 
        id: 12, 
        testcaseName: 'Customer Notification', 
        testcaseId: 10012,
        startTime: '2025-04-24 11:55:39', 
        duration: '00:01:57', 
        environment: 'Production',
        status: 'Aborted', 
        project: 'Project B', 
        executedBy: 'William Brown',
        category: 'Integration'
      }
    ];
  }
  
  // Toggle filter section visibility
  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }
  
  // Toggle dropdown visibility
  toggleDropdown(dropdown: string): void {
    // Close all other dropdowns first
    Object.keys(this.dropdownState).forEach(key => {
      if (key !== dropdown) {
        this.dropdownState[key] = false;
      }
    });
    
    // Toggle the selected dropdown
    this.dropdownState[dropdown] = !this.dropdownState[dropdown];
  }
  
  // Select a filter option
  selectFilterOption(type: string, value: string): void {
    this.filterValues[type] = value;
    this.dropdownState[type] = false;
    this.applyFilters();
  }
  
  // Apply all current filters
  applyFilters(): void {
    this.filteredResults = this.testResults.filter(result => {
      const projectMatch = !this.filterValues.project || result.project === this.filterValues.project;
      const userMatch = !this.filterValues.user || result.executedBy === this.filterValues.user;
      const statusMatch = !this.filterValues.status || result.status === this.filterValues.status;
      const keywordMatch = !this.filterValues.keyword || 
        result.testcaseName.toLowerCase().includes(this.filterValues.keyword.toLowerCase()) ||
        result.project.toLowerCase().includes(this.filterValues.keyword.toLowerCase()) ||
        result.executedBy.toLowerCase().includes(this.filterValues.keyword.toLowerCase());
      
      return projectMatch && userMatch && statusMatch && keywordMatch;
    });
  }
  
  // Clear all filters
  clearFilters(): void {
    this.filterValues = {
      project: '',
      user: '',
      status: '',
      keyword: ''
    };
    this.applyFilters();
  }
  
  // Rerun a test
  rerunTest(id: number): void {
    console.log(`Rerunning test with ID: ${id}`);
    // In a real app, this would call a service method
    alert(`Test with ID ${id} has been scheduled for rerun.`);
  }
  
  // Navigate to test case details
  navigateToTestCase(id: number): void {
    console.log(`Navigating to test case with ID: ${id}`);
    // In a real app, this would use the router
  }
  
  // Get icon class based on status
  getStatusIconClass(status: string): string {
    switch(status) {
      case 'Scheduled': return 'fa-clock';
      case 'InProgress': return 'fa-spinner fa-spin';
      case 'Passed': return 'fa-check-circle';
      case 'Failed': return 'fa-times-circle';
      case 'Aborted': return 'fa-hand-paper';
      case 'Pending': return 'fa-hourglass-half';
      default: return 'fa-question-circle';
    }
  }
  
  // Get color class based on status
  getStatusColorClass(status: string): string {
    switch(status) {
      case 'Scheduled': return 'text-info';
      case 'InProgress': return 'text-primary';
      case 'Passed': return 'text-success';
      case 'Failed': return 'text-danger';
      case 'Aborted': return 'text-warning';
      case 'Pending': return 'text-purple';
      default: return '';
    }
  }
}