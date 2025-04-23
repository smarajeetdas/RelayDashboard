import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Endpoint } from '../../models/endpoint.model';
import { EndpointService } from '../../services/endpoint.service';

@Component({
  selector: 'app-endpoint-list',
  templateUrl: './endpoint-list.component.html',
  styleUrls: ['./endpoint-list.component.css']
})
export class EndpointListComponent implements OnInit {
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
  
  projects: string[] = [];
  endpointTypes: string[] = [];
  
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
          
          // Update the icon to show current state
          if (filterIcon) {
            if (this.isFilterVisible) {
              filterIcon.className = 'fas fa-filter me-2';
            } else {
              filterIcon.className = 'fas fa-plus me-2';
            }
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
      this.endpointTypes = Array.from(new Set(endpoints.map(e => e.category)));
    });
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
    switch(this.selectedSortOption) {
      case 'name':
        this.filteredEndpoints = [...endpoints].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'updatedOn':
        this.filteredEndpoints = [...endpoints].sort((a, b) => new Date(b.updatedOn).getTime() - new Date(a.updatedOn).getTime());
        break;
      case 'createdOn':
        // Assuming there's a createdOn property - if not, fallback to updatedOn
        this.filteredEndpoints = [...endpoints].sort((a, b) => {
          const dateA = a['createdOn'] ? new Date(a['createdOn']).getTime() : new Date(a.updatedOn).getTime();
          const dateB = b['createdOn'] ? new Date(b['createdOn']).getTime() : new Date(b.updatedOn).getTime();
          return dateB - dateA;
        });
        break;
      default:
        this.filteredEndpoints = endpoints;
    }
  }
  
  resetFilters(): void {
    this.searchKeyword = '';
    this.selectedProject = '';
    this.selectedEndpointType = '';
    this.selectedSortOption = 'name';
    this.showCertifiedOnly = false;
    this.showSubFlowOnly = false;
    this.searchUpdatedBy = '';
    this.searchCreatedBy = '';
    this.filteredEndpoints = [...this.endpoints];
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
}