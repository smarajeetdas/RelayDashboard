import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestCase } from '../../models/testcase.model';
import { TestCaseService } from '../../services/testcase.service';

// Make Math available in the template
declare const Math: any;

@Component({
  selector: 'app-testcase-list',
  templateUrl: './testcase-list.component.html',
  styleUrls: ['./testcase-list.component.css', '../../../../shared/styles/icon-buttons.css']
})
export class TestCaseListComponent implements OnInit {
  testCases: TestCase[] = [];
  filteredTestCases: TestCase[] = [];
  loading: boolean = true;
  error: string | null = null;
  
  // Make Math available to template
  Math = Math;
  
  // Search and filter variables
  searchQuery: string = '';
  selectedCategory: string = '';
  selectedMobile: string = '';
  filterMobile: boolean | undefined = undefined;
  sortBy: string = 'lastModified';
  sortDirection: 'asc' | 'desc' = 'desc';
  
  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  
  // Dropdown visibility
  showCategoryDropdown: boolean = false;
  showMobileDropdown: boolean = false;
  showSortDropdown: boolean = false;
  
  // Filter section visibility
  showFilterSection: boolean = true;
  
  categoryOptions: string[] = ['WEB', 'MOBILE', 'API', 'DESKTOP'];
  mobileOptions: { value: string, label: string }[] = [
    { value: '', label: 'All Types' },
    { value: 'true', label: 'Mobile' },
    { value: 'false', label: 'Desktop' }
  ];
  
  sortOptions: { value: string, label: string }[] = [
    { value: 'name', label: 'Name' },
    { value: 'category', label: 'Category' },
    { value: 'lastModified', label: 'Last Modified' }
  ];

  constructor(
    private testCaseService: TestCaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Use setTimeout to ensure component is fully initialized
    setTimeout(() => {
      this.loadTestCases();
    }, 0);
  }

  loadTestCases(): void {
    this.loading = true;
    console.log('Loading test cases from service...');
    this.testCaseService.getTestCases().subscribe(
      (testCases) => {
        console.log('Received test cases in component:', testCases);
        console.log('Is testCases array? ', Array.isArray(testCases));
        console.log('Test cases length:', testCases ? testCases.length : 0);
        
        // Safety check
        if (!testCases || !Array.isArray(testCases)) {
          console.error('TestCases is not a valid array:', testCases);
          this.testCases = [];
        } else {
          this.testCases = testCases;
        }
        
        this.applyFilters();
        console.log('Filtered test cases:', this.filteredTestCases);
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load test cases. Please try again.';
        this.loading = false;
        console.error('Error loading test cases:', error);
      }
    );
  }

  applyFilters(): void {
    // Start with all test cases
    let result = [...this.testCases];
    
    // Apply search query filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      result = result.filter(tc => 
        tc.name.toLowerCase().includes(query) || 
        tc.id.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (this.selectedCategory) {
      result = result.filter(tc => tc.category === this.selectedCategory);
    }
    
    // Apply mobile filter
    if (this.filterMobile !== undefined) {
      result = result.filter(tc => tc.mobile === this.filterMobile);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let aValue: any = a[this.sortBy as keyof TestCase];
      let bValue: any = b[this.sortBy as keyof TestCase];
      
      // Handle string comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      // Handle boolean comparison
      if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
        return this.sortDirection === 'asc' 
          ? (aValue ? 1 : -1) 
          : (aValue ? -1 : 1);
      }
      
      // Default comparison
      return this.sortDirection === 'asc' 
        ? (aValue > bValue ? 1 : -1) 
        : (aValue < bValue ? 1 : -1);
    });
    
    this.totalItems = result.length;
    
    // Apply pagination
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.filteredTestCases = result.slice(startIndex, startIndex + this.pageSize);
  }

  searchTestCases(): void {
    this.currentPage = 1; // Reset to first page
    this.applyFilters();
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.selectedMobile = '';
    this.filterMobile = undefined;
    this.currentPage = 1;
    this.applyFilters();
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.showCategoryDropdown = false;
    this.currentPage = 1;
    this.applyFilters();
  }

  selectMobileFilter(value: string): void {
    this.selectedMobile = value;
    this.filterMobile = value === '' ? undefined : value === 'true';
    this.showMobileDropdown = false;
    this.currentPage = 1;
    this.applyFilters();
  }

  selectSortOption(option: string): void {
    if (this.sortBy === option) {
      // Toggle sort direction if clicking the same field
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = option;
      this.sortDirection = 'asc'; // Default to ascending when changing sort field
    }
    this.showSortDropdown = false;
    this.applyFilters();
  }

  toggleFilterSection(): void {
    this.showFilterSection = !this.showFilterSection;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.applyFilters();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.currentPage = 1; // Reset to first page when changing page size
    this.applyFilters();
  }

  viewTestCaseDetails(testCase: TestCase): void {
    this.router.navigate(['/testcases', testCase.id]);
  }

  deleteTestCase(event: Event, id: string): void {
    event.stopPropagation(); // Prevent row click navigation
    if (confirm('Are you sure you want to delete this test case?')) {
      this.testCaseService.deleteTestCase(id).subscribe(
        (success) => {
          if (success) {
            this.loadTestCases();
          }
        },
        (error) => {
          console.error('Error deleting test case:', error);
        }
      );
    }
  }
  
  viewExecutionHistory(event: Event, id: string): void {
    event.stopPropagation(); // Prevent row click navigation
    // Navigate to execution history page/modal
    this.router.navigate(['/testcases/history', id]);
  }

  // Helper methods for UI
  getMobileLabel(mobile: boolean | undefined): string {
    return mobile === true ? 'Mobile' : mobile === false ? 'Desktop' : 'All';
  }

  getSortLabel(): string {
    const option = this.sortOptions.find(opt => opt.value === this.sortBy);
    return option ? option.label : 'Sort by';
  }

  // Methods for handling dropdown visibility
  toggleCategoryDropdown(event: Event): void {
    event.stopPropagation();
    this.showCategoryDropdown = !this.showCategoryDropdown;
    this.showMobileDropdown = false;
    this.showSortDropdown = false;
  }

  toggleMobileDropdown(event: Event): void {
    event.stopPropagation();
    this.showMobileDropdown = !this.showMobileDropdown;
    this.showCategoryDropdown = false;
    this.showSortDropdown = false;
  }

  toggleSortDropdown(event: Event): void {
    event.stopPropagation();
    this.showSortDropdown = !this.showSortDropdown;
    this.showCategoryDropdown = false;
    this.showMobileDropdown = false;
  }

  closeAllDropdowns(): void {
    this.showCategoryDropdown = false;
    this.showMobileDropdown = false;
    this.showSortDropdown = false;
  }

  // Helper for pagination display
  showPageNumber(page: number): boolean {
    // Always show first, last, and pages around current page
    return page === 1 || 
           page === Math.ceil(this.totalItems / this.pageSize) ||
           Math.abs(page - this.currentPage) <= 1;
  }
  
  // Debug function to log test cases to console
  logTestCases(): void {
    console.log('All Test Cases:', this.testCases);
    console.log('Filtered Test Cases:', this.filteredTestCases);
    console.log('Test Case Count:', this.testCases.length);
    console.log('Filtered Test Case Count:', this.filteredTestCases.length);
  }
}