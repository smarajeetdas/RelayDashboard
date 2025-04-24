import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchQuery: string = '';
  loading: boolean = true;
  error: string | null = null;
  
  // Filter options
  roleOptions: string[] = ['Admin', 'Developer', 'Tester', 'Viewer'];
  statusOptions: string[] = ['Active', 'Inactive'];
  geographyOptions: string[] = ['USA', 'Canada', 'UK', 'India', 'Europe', 'APAC'];
  
  // Selected filters
  selectedRole: string = '';
  selectedStatus: string = '';
  selectedGeography: string = '';
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }
  
  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe(
      (users) => {
        this.users = users;
        this.applyFilters();
        this.loading = false;
      },
      (error) => {
        this.error = 'Error loading users. Please try again later.';
        this.loading = false;
        console.error('Error loading users:', error);
      }
    );
  }
  
  applyFilters(): void {
    let filtered = [...this.users];
    
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(user => 
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
      );
    }
    
    if (this.selectedRole) {
      filtered = filtered.filter(user => user.role === this.selectedRole);
    }
    
    if (this.selectedStatus) {
      filtered = filtered.filter(user => user.status === this.selectedStatus);
    }
    
    if (this.selectedGeography) {
      filtered = filtered.filter(user => user.geography === this.selectedGeography);
    }
    
    this.filteredUsers = filtered;
    this.totalItems = this.filteredUsers.length;
  }
  
  onSearch(): void {
    this.currentPage = 1;
    this.applyFilters();
  }
  
  clearFilters(): void {
    this.searchQuery = '';
    this.selectedRole = '';
    this.selectedStatus = '';
    this.selectedGeography = '';
    this.currentPage = 1;
    this.applyFilters();
  }
  
  viewUserDetails(userId: string): void {
    this.router.navigate(['/users', userId]);
  }
  
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
  
  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, startIndex + this.itemsPerPage);
  }
  
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
  
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  
  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}