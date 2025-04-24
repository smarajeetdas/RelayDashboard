import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { SidebarItem } from '../../../../shared/components/detail-sidebar/detail-sidebar.component';

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
  
  // Sidebar configuration
  sidebarItems: SidebarItem[] = [
    { id: 'user-details', label: 'User Details', icon: 'user' },
    { id: 'projects', label: 'Projects', icon: 'project-diagram' },
    { id: 'project-configuration', label: 'Project Configuration', icon: 'cogs' },
    { id: 'environments', label: 'Environments', icon: 'server' },
    { id: 'schedule-executions', label: 'Schedule Executions', icon: 'calendar-alt' },
    { id: 'global-testdata', label: 'Global Testdata', icon: 'globe' },
    { id: 'secret-management', label: 'Secret Management', icon: 'key' },
    { id: 'inbox', label: 'Inbox', icon: 'inbox' },
    { id: 'file-management', label: 'File Management', icon: 'file-alt' },
    { id: 'web-locator', label: 'Web Locator', icon: 'search-location' },
    { id: 'admin-settings', label: 'Admin settings', icon: 'cog' },
    { id: 'schedule-triggers', label: 'Schedule triggers', icon: 'clock' },
    { id: 'masking-config', label: 'Masking config', icon: 'mask' },
    { id: 'browser-extension', label: 'Browser Extension', icon: 'browser' },
    { id: 'perf-admin-config', label: 'Perf Admin Config', icon: 'tachometer-alt' },
    { id: 'web-cluster', label: 'Web Cluster', icon: 'server' },
    { id: 'code-coverage', label: 'Code coverage', icon: 'code' },
    { id: 'audit-trial', label: 'Audit Trial', icon: 'history' },
    { id: 'feedback-list', label: 'FeedBack List', icon: 'comment-alt' },
    { id: 'review-certification', label: 'Review & Certification', icon: 'certificate' }
  ];
  
  activeSidebarItemId: string = 'user-details';
  activeView: string = 'list';
  
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
  
  onSidebarItemSelect(itemId: string): void {
    this.activeSidebarItemId = itemId;
    
    // For all sidebar items, just display the user list view as demo
    this.activeView = 'list';
    
    // Just for demonstration purposes - in a real app these would show different content
    if (itemId === 'admin-settings') {
      this.activeView = 'admin';
    } else if (itemId === 'global-testdata' || itemId === 'projects') {
      this.activeView = 'grid';
    }
  }
}