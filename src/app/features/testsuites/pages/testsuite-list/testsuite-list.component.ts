import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestSuite } from '../../models/testsuite.model';
import { TestSuiteService } from '../../services/testsuite.service';

@Component({
  selector: 'app-testsuite-list',
  templateUrl: './testsuite-list.component.html',
  styleUrls: ['./testsuite-list.component.css', '../../../../shared/styles/icon-buttons.css']
})
export class TestSuiteListComponent implements OnInit {
  // Add Math property for template use
  Math = Math;
  
  // TestSuites data
  testSuites: TestSuite[] = [];
  filteredTestSuites: TestSuite[] = [];
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
    private testSuiteService: TestSuiteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTestSuites();
  }
  
  loadTestSuites(): void {
    this.loading = true;
    this.error = null;
    
    this.testSuiteService.getTestSuites().subscribe(
      (testSuites) => {
        this.testSuites = testSuites;
        this.applyFiltersAndSort();
        this.loading = false;
      },
      (error) => {
        this.error = 'Error loading test suites. Please try again later.';
        this.loading = false;
        console.error('Error loading test suites:', error);
      }
    );
  }
  
  applyFiltersAndSort(): void {
    // Apply filters
    let filtered = [...this.testSuites];
    
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(ts => 
        ts.name.toLowerCase().includes(query) || 
        ts.id.toLowerCase().includes(query) || 
        (ts.project && ts.project.toLowerCase().includes(query))
      );
    }
    
    if (this.selectedCategory) {
      filtered = filtered.filter(ts => ts.category === this.selectedCategory);
    }
    
    // Apply sorting
    filtered = this.sortTestSuites(filtered);
    
    // Update filtered data and pagination
    this.filteredTestSuites = filtered;
    this.totalItems = filtered.length;
  }
  
  sortTestSuites(testSuites: TestSuite[]): TestSuite[] {
    return [...testSuites].sort((a, b) => {
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
  
  searchTestSuites(): void {
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
  viewTestSuiteDetails(testSuite: TestSuite): void {
    this.router.navigate(['/testsuites', testSuite.id]);
  }
  
  deleteTestSuite(event: Event, id: string): void {
    event.stopPropagation(); // Prevent row click
    if (confirm('Are you sure you want to delete this test suite?')) {
      this.testSuiteService.deleteTestSuite(id).subscribe(
        (success) => {
          if (success) {
            this.loadTestSuites();
          } else {
            this.error = 'Failed to delete test suite. Please try again.';
          }
        },
        (error) => {
          this.error = 'Error deleting test suite. Please try again.';
          console.error('Error deleting test suite:', error);
        }
      );
    }
  }
}