import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MasterSuite } from '../../models/mastersuite.model';
import { MasterSuiteService } from '../../services/mastersuite.service';

@Component({
  selector: 'app-mastersuite-list',
  templateUrl: './mastersuite-list.component.html',
  styleUrls: ['./mastersuite-list.component.css']
})
export class MasterSuiteListComponent implements OnInit {
  // Add Math property for template use
  Math = Math;
  
  // MasterSuites data
  masterSuites: MasterSuite[] = [];
  filteredMasterSuites: MasterSuite[] = [];
  loading: boolean = true;
  error: string | null = null;
  
  // Search and filter properties
  searchQuery: string = '';
  showFilterSection: boolean = true;
  selectedCategory: string = '';
  categoryOptions: string[] = ['REST', 'WEB', 'MOBILE', 'NA'];
  sortBy: string = 'lastModified';
  sortDirection: string = 'desc';
  sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'lastModified', label: 'Updated On' },
    { value: 'category', label: 'Category' }
  ];
  
  // Dropdowns visibility
  showCategoryDropdown: boolean = false;
  showSortDropdown: boolean = false;
  
  // Pagination properties
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  
  constructor(
    private masterSuiteService: MasterSuiteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadMasterSuites();
  }
  
  loadMasterSuites(): void {
    this.loading = true;
    this.error = null;
    
    this.masterSuiteService.getMasterSuites().subscribe(
      (masterSuites) => {
        this.masterSuites = masterSuites;
        this.applyFiltersAndSort();
        this.loading = false;
      },
      (error) => {
        this.error = 'Error loading master suites. Please try again later.';
        this.loading = false;
        console.error('Error loading master suites:', error);
      }
    );
  }
  
  applyFiltersAndSort(): void {
    // Apply filters
    let filtered = [...this.masterSuites];
    
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(ms => 
        ms.name.toLowerCase().includes(query) || 
        ms.id.toLowerCase().includes(query) || 
        (ms.project && ms.project.toLowerCase().includes(query))
      );
    }
    
    if (this.selectedCategory) {
      filtered = filtered.filter(ms => ms.category === this.selectedCategory);
    }
    
    // Apply sorting
    filtered = this.sortMasterSuites(filtered);
    
    // Update filtered data and pagination
    this.filteredMasterSuites = filtered;
    this.totalItems = filtered.length;
  }
  
  sortMasterSuites(masterSuites: MasterSuite[]): MasterSuite[] {
    return [...masterSuites].sort((a, b) => {
      let result = 0;
      
      switch (this.sortBy) {
        case 'name':
          result = a.name.localeCompare(b.name);
          break;
        case 'category':
          result = a.category.localeCompare(b.category);
          break;
        case 'lastModified':
          // Handle potential undefined values
          const dateA = a.lastModified ? new Date(a.lastModified).getTime() : 0;
          const dateB = b.lastModified ? new Date(b.lastModified).getTime() : 0;
          result = dateA - dateB;
          break;
        default:
          result = 0;
      }
      
      return this.sortDirection === 'asc' ? result : -result;
    });
  }
  
  toggleFilterSection(): void {
    this.showFilterSection = !this.showFilterSection;
  }
  
  toggleCategoryDropdown(event: Event): void {
    event.stopPropagation();
    this.showCategoryDropdown = !this.showCategoryDropdown;
    this.showSortDropdown = false;
  }
  
  toggleSortDropdown(event: Event): void {
    event.stopPropagation();
    this.showSortDropdown = !this.showSortDropdown;
    this.showCategoryDropdown = false;
  }
  
  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.showCategoryDropdown = false;
    this.applyFiltersAndSort();
  }
  
  selectSortOption(option: string): void {
    if (this.sortBy === option) {
      // Toggle sort direction if clicking the same option
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = option;
      this.sortDirection = 'desc'; // Default to descending when changing sort field
    }
    
    this.showSortDropdown = false;
    this.applyFiltersAndSort();
  }
  
  getSortLabel(): string {
    const option = this.sortOptions.find(o => o.value === this.sortBy);
    return option ? option.label : 'Name';
  }
  
  searchMasterSuites(): void {
    this.currentPage = 1; // Reset to first page
    this.applyFiltersAndSort();
  }
  
  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.sortBy = 'lastModified';
    this.sortDirection = 'desc';
    this.currentPage = 1;
    this.applyFiltersAndSort();
  }
  
  // Pagination methods
  onPageChange(page: number): void {
    if (page >= 1 && page <= Math.ceil(this.totalItems / this.pageSize)) {
      this.currentPage = page;
    }
  }
  
  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.currentPage = 1; // Reset to first page
  }
  
  showPageNumber(page: number): boolean {
    // Show page numbers that are close to the current page or first/last pages
    return (
      page === 1 ||
      page === Math.ceil(this.totalItems / this.pageSize) ||
      Math.abs(page - this.currentPage) <= 1
    );
  }
  
  // Data interaction methods
  viewMasterSuiteDetails(masterSuite: MasterSuite): void {
    this.router.navigate(['/mastersuites', masterSuite.id]);
  }
  
  deleteMasterSuite(event: Event, id: string): void {
    event.stopPropagation(); // Prevent row click
    if (confirm('Are you sure you want to delete this master suite?')) {
      this.masterSuiteService.deleteMasterSuite(id).subscribe(
        (success) => {
          if (success) {
            this.loadMasterSuites();
          } else {
            this.error = 'Failed to delete master suite. Please try again.';
          }
        },
        (error) => {
          this.error = 'Error deleting master suite. Please try again.';
          console.error('Error deleting master suite:', error);
        }
      );
    }
  }
}