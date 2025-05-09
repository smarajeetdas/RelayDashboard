import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Endpoint } from '../../models/endpoint.model';
import { EndpointService } from '../../services/endpoint.service';
import { TestCasesModalComponent } from '../../components/test-cases-modal/test-cases-modal.component';

@Component({
  selector: 'app-endpoint-list',
  templateUrl: './endpoint-list.component.html',
  styleUrls: ['./endpoint-list.component.css', '../../../../shared/styles/icon-buttons.css']
})
export class EndpointListComponent implements OnInit {
  @ViewChild(TestCasesModalComponent) testCasesModal: TestCasesModalComponent;
  
  // Adding Math property for use in the template
  Math = Math;
  
  endpoints: Endpoint[] = [];
  filteredEndpoints: Endpoint[] = [];
  searchKeyword: string = '';
  selectedProject: string = '';
  selectedEndpointType: string = '';
  selectedSortOption: string = 'name';
  showCertifiedOnly: boolean = false;
  showSubFlowOnly: boolean = false;
  searchUpdatedBy: string = '';
  searchCreatedBy: string = '';
  
  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  
  // Filter section display control
  showFilterSection: boolean = false;
  paginatedEndpoints: Endpoint[] = [];
  availablePerPage: number[] = [10, 25, 50, 100];
  
  projects: string[] = [];
  filteredProjects: string[] = [];
  endpointTypes: string[] = [];
  
  // Project search autocomplete properties
  projectSearchTerm: string = '';
  showProjectDropdown: boolean = false;
  
  // Endpoint type dropdown properties
  showEndpointTypeDropdown: boolean = false;
  
  // Sort dropdown properties
  showSortDropdown: boolean = false;
  
  constructor(
    private endpointService: EndpointService,
    private router: Router
  ) { }

  isFilterVisible: boolean = true;

  ngOnInit(): void {
    this.loadEndpoints();
    this.setupFilterToggle();
  }

  /**
   * Sets up the filter toggle functionality
   */
  private setupFilterToggle(): void {
    setTimeout(() => {
      const toggleBtn = document.getElementById('toggleFilters');
      const filterIcon = toggleBtn?.querySelector('i');
      const filterSections = document.querySelectorAll('.filter-section');
      
      if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
          this.isFilterVisible = !this.isFilterVisible;
          
          // Update the icon to show current state - always keep as filter icon
          if (filterIcon) {
            filterIcon.className = 'fas fa-filter';
          }
          
          // Toggle the visibility of filter sections
          filterSections.forEach(section => {
            if (this.isFilterVisible) {
              section.classList.remove('d-none');
            } else {
              section.classList.add('d-none');
            }
          });
        });
      }
    }, 500);
  }
  
  loadEndpoints(): void {
    this.endpointService.getEndpoints().subscribe(endpoints => {
      this.endpoints = endpoints;
      this.filteredEndpoints = [...endpoints];
      
      // Extract unique projects and endpoint types for filters
      this.projects = Array.from(new Set(endpoints.map(e => e.project)));
      this.filteredProjects = [...this.projects]; // Initialize filtered projects
      this.endpointTypes = Array.from(new Set(endpoints.map(e => e.category)));
      
      // Initialize pagination
      this.totalItems = endpoints.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.updatePaginatedData();
    });
  }
  
  /**
   * Filter projects based on search term
   */
  filterProjects(): void {
    if (!this.projectSearchTerm.trim()) {
      this.filteredProjects = [...this.projects];
    } else {
      const searchTerm = this.projectSearchTerm.toLowerCase();
      this.filteredProjects = this.projects.filter(project => 
        project.toLowerCase().includes(searchTerm)
      );
    }
  }
  
  /**
   * Handle project selection from dropdown
   */
  selectProject(project: string): void {
    this.selectedProject = project;
    this.projectSearchTerm = project;
    this.showProjectDropdown = false;
    this.applyFilters();
  }
  
  /**
   * Handle input blur for project search
   */
  onProjectInputBlur(): void {
    // Small delay to allow click events on dropdown items
    setTimeout(() => {
      this.showProjectDropdown = false;
    }, 200);
  }
  
  /**
   * Handle endpoint type selection
   */
  selectEndpointType(type: string): void {
    this.selectedEndpointType = type;
    this.showEndpointTypeDropdown = false;
    this.applyFilters();
  }
  
  /**
   * Handle sort option selection
   */
  selectSortOption(option: string): void {
    this.selectedSortOption = option;
    this.showSortDropdown = false;
    this.applyFilters();
  }
  
  /**
   * Get the placeholder text for sort dropdown based on selected option
   */
  getSortPlaceholder(): string {
    switch(this.selectedSortOption) {
      case 'name':
        return 'Sort by Name';
      case 'updatedOn':
        return 'Sort by Updated On';
      case 'createdOn':
        return 'Sort by Created On';
      default:
        return 'Sort by Name';
    }
  }
  
  applyFilters(): void {
    const filters: any = {};
    
    if (this.selectedProject) {
      filters.project = this.selectedProject;
    }
    
    if (this.selectedEndpointType) {
      filters.category = this.selectedEndpointType;
    }
    
    if (this.showCertifiedOnly) {
      filters.certified = true;
    }
    
    if (this.showSubFlowOnly) {
      filters.subFlow = true;
    }
    
    if (this.searchUpdatedBy) {
      filters.updatedBy = this.searchUpdatedBy;
    }
    
    if (this.searchCreatedBy) {
      filters.createdBy = this.searchCreatedBy;
    }
    
    this.endpointService.searchEndpoints(this.searchKeyword, filters).subscribe(results => {
      // Sort the results based on the selected sort option
      this.sortEndpoints(results);
    });
  }
  
  sortEndpoints(endpoints: Endpoint[]): void {
    let sorted: Endpoint[] = [];
    
    switch(this.selectedSortOption) {
      case 'name':
        sorted = [...endpoints].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'updatedOn':
        sorted = [...endpoints].sort((a, b) => new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime());
        break;
      case 'createdOn':
        // Assuming there's a createdOn property - if not, fallback to updatedOn
        sorted = [...endpoints].sort((a, b) => {
          const dateA = a['createdOn'] ? new Date(a['createdOn']).getTime() : new Date(a.updatedOn).getTime();
          const dateB = b['createdOn'] ? new Date(b['createdOn']).getTime() : new Date(b.updatedOn).getTime();
          return dateB - dateA;
        });
        break;
      default:
        sorted = endpoints;
    }
    
    this.filteredEndpoints = sorted;
    this.totalItems = sorted.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.updatePaginatedData();
  }
  
  /**
   * Update the paginated data based on current page and items per page
   */
  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEndpoints = this.filteredEndpoints.slice(startIndex, endIndex);
  }
  
  /**
   * Go to a specific page
   */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedData();
    }
  }
  
  /**
   * Go to the previous page
   */
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }
  
  /**
   * Go to the next page
   */
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }
  
  /**
   * Change the number of items shown per page
   */
  changeItemsPerPage(items: number): void {
    this.itemsPerPage = items;
    this.currentPage = 1; // Reset to first page
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.updatePaginatedData();
  }
  
  /**
   * Generate an array of page numbers for pagination display
   */
  getPageNumbers(): number[] {
    const totalVisible = 5; // Number of visible page buttons
    const pages: number[] = [];
    
    if (this.totalPages <= totalVisible) {
      // If we have fewer pages than the max visible, show all pages
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Otherwise, show a range around the current page
      let startPage = Math.max(1, this.currentPage - Math.floor(totalVisible / 2));
      let endPage = Math.min(this.totalPages, startPage + totalVisible - 1);
      
      // Adjust if we're near the end
      if (endPage - startPage + 1 < totalVisible) {
        startPage = Math.max(1, endPage - totalVisible + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }
  
  resetFilters(): void {
    this.searchKeyword = '';
    this.selectedProject = '';
    this.projectSearchTerm = '';
    this.selectedEndpointType = '';
    this.selectedSortOption = 'name';
    this.showCertifiedOnly = false;
    this.showSubFlowOnly = false;
    this.searchUpdatedBy = '';
    this.searchCreatedBy = '';
    this.filteredEndpoints = [...this.endpoints];
    this.filteredProjects = [...this.projects];
    
    // Close all dropdowns
    this.showProjectDropdown = false;
    this.showEndpointTypeDropdown = false;
    this.showSortDropdown = false;
    
    // Reset pagination
    this.currentPage = 1;
    this.totalItems = this.filteredEndpoints.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.updatePaginatedData();
  }
  
  viewEndpointDetails(endpoint: Endpoint): void {
    this.router.navigate(['/endpoints', endpoint.id]);
  }
  
  createNewEndpoint(): void {
    // Navigate to creation form or open modal
    console.log('Create new endpoint');
  }
  
  deleteEndpoint(id: string, event: Event): void {
    event.stopPropagation(); // Prevent row click
    if (confirm('Are you sure you want to delete this endpoint?')) {
      this.endpointService.deleteEndpoint(id).subscribe(success => {
        if (success) {
          this.loadEndpoints(); // Reload the list
        }
      });
    }
  }
  
  /**
   * Toggle the filter section visibility
   */
  toggleFilterSection(): void {
    this.showFilterSection = !this.showFilterSection;
  }
  
  /**
   * Open modal to view test cases associated with an endpoint
   */
  viewTestCases(endpointId: string, event: Event): void {
    event.stopPropagation(); // Prevent the row click event
    this.testCasesModal.openModal(endpointId);
  }
}