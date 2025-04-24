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
  
  filters: TestabilityFilter[] = [
    { name: 'project', placeholder: 'Select Project(s)' },
    { name: 'version', placeholder: 'Select Version' },
    { name: 'type', placeholder: 'Select Type' },
    { name: 'status', placeholder: 'Select Status' }
  ];
  
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
  
  constructor() { 
    this.filteredProjects = [...this.projects];
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
    this.selectedLocation = '';
    this.startDate = '';
    this.endDate = '';
    this.selectedLoadType = 'API';
    this.projectSearchTerm = '';
    this.selectedProject = '';
    console.log('Filters cleared');
  }
  
  selectLocation(location: string): void {
    this.selectedLocation = location;
    this.showLocationDropdown = false;
  }
  
  setLoadType(type: string): void {
    this.selectedLoadType = type;
  }
  
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
}