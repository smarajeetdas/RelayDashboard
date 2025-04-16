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

  ngOnInit(): void {
    this.loadEndpoints();
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
    
    this.endpointService.searchEndpoints(this.searchKeyword, filters).subscribe(results => {
      this.filteredEndpoints = results;
    });
  }
  
  resetFilters(): void {
    this.searchKeyword = '';
    this.selectedProject = '';
    this.selectedEndpointType = '';
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