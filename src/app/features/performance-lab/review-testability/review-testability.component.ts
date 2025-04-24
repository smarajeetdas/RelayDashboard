import { Component, OnInit } from '@angular/core';

interface TestabilityFilter {
  name: string;
  placeholder: string;
  options?: string[];
}

@Component({
  selector: 'app-review-testability',
  templateUrl: './review-testability.component.html',
  styleUrls: ['./review-testability.component.css']
})
export class ReviewTestabilityComponent implements OnInit {
  
  tableHeaders = [
    { name: 'Statement', sortable: true },
    { name: 'Type', sortable: true },
    { name: 'Location', sortable: true },
    { name: 'Users', sortable: true },
    { name: 'Schedule Date & Time', sortable: true },
    { name: 'Status', sortable: true }
  ];
  
  testabilityData = [];
  hasNoResults = true;
  
  // Location dropdown
  locations = ['US East', 'US West', 'EU Central', 'Asia Pacific', 'South America'];
  selectedLocation: string = '';
  showLocationDropdown: boolean = false;
  
  // Date pickers
  startDate: string = '';
  endDate: string = '';
  
  // Load type selection
  loadTypes = ['API', 'WEB', 'GRAPHQL'];
  selectedLoadType: string = 'API';
  
  // Project search
  projectSearchTerm: string = '';
  showProjectDropdown: boolean = false;
  projects = ['Adobe Express', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe Premiere Pro', 'Adobe XD'];
  filteredProjects: string[] = [];
  selectedProject: string = '';
  
  // Testcase search (replacing version)
  testcaseSearchTerm: string = '';
  showTestcaseDropdown: boolean = false;
  testcases = ['Login Authentication', 'Password Reset', 'User Registration', 'Profile Update', 'Payment Processing'];
  filteredTestcases: string[] = [];
  selectedTestcase: string = '';
  
  // Users search (replacing type)
  usersSearchTerm: string = '';
  showUsersDropdown: boolean = false;
  users = ['John Smith', 'Jane Doe', 'Robert Johnson', 'Maria Garcia', 'David Lee'];
  filteredUsers: string[] = [];
  selectedUser: string = '';
  
  // Status dropdown
  statuses = ['PASSED', 'FAILED'];
  selectedStatus: string = '';
  showStatusDropdown: boolean = false;
  
  constructor() { 
    this.filteredProjects = [...this.projects];
    this.filteredTestcases = [...this.testcases];
    this.filteredUsers = [...this.users];
  }

  ngOnInit(): void {
    // Initialize component
  }
  
  search(): void {
    // Implement search functionality
    console.log('Search initiated');
  }
  
  clearFilter(): void {
    // Reset all filters
    this.selectedProject = '';
    this.projectSearchTerm = '';
    this.selectedTestcase = '';
    this.testcaseSearchTerm = '';
    this.selectedUser = '';
    this.usersSearchTerm = '';
    this.selectedStatus = '';
    this.selectedLocation = '';
    this.startDate = '';
    this.endDate = '';
    this.selectedLoadType = 'API';
    console.log('Filters cleared');
  }
  
  selectLocation(location: string): void {
    this.selectedLocation = location;
    this.showLocationDropdown = false;
  }
  
  setLoadType(type: string): void {
    this.selectedLoadType = type;
  }
  
  // Project methods
  filterProjects(): void {
    if (this.projectSearchTerm) {
      this.filteredProjects = this.projects.filter(project => 
        project.toLowerCase().includes(this.projectSearchTerm.toLowerCase())
      );
    } else {
      this.filteredProjects = [...this.projects];
    }
  }
  
  selectProject(project: string): void {
    this.selectedProject = project;
    this.projectSearchTerm = project;
    this.showProjectDropdown = false;
  }
  
  onProjectInputBlur(): void {
    // Delay closing the dropdown to allow for click events to complete
    setTimeout(() => {
      this.showProjectDropdown = false;
    }, 200);
  }
  
  // Testcase methods
  filterTestcases(): void {
    if (this.testcaseSearchTerm) {
      this.filteredTestcases = this.testcases.filter(testcase => 
        testcase.toLowerCase().includes(this.testcaseSearchTerm.toLowerCase())
      );
    } else {
      this.filteredTestcases = [...this.testcases];
    }
  }
  
  selectTestcase(testcase: string): void {
    this.selectedTestcase = testcase;
    this.testcaseSearchTerm = testcase;
    this.showTestcaseDropdown = false;
  }
  
  onTestcaseInputBlur(): void {
    setTimeout(() => {
      this.showTestcaseDropdown = false;
    }, 200);
  }
  
  // Users methods
  filterUsers(): void {
    if (this.usersSearchTerm) {
      this.filteredUsers = this.users.filter(user => 
        user.toLowerCase().includes(this.usersSearchTerm.toLowerCase())
      );
    } else {
      this.filteredUsers = [...this.users];
    }
  }
  
  selectUser(user: string): void {
    this.selectedUser = user;
    this.usersSearchTerm = user;
    this.showUsersDropdown = false;
  }
  
  onUserInputBlur(): void {
    setTimeout(() => {
      this.showUsersDropdown = false;
    }, 200);
  }
  
  // Status methods
  selectStatus(status: string): void {
    this.selectedStatus = status;
    this.showStatusDropdown = false;
  }
}