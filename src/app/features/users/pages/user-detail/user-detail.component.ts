import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { SidebarItem } from '../../../../shared/components/detail-sidebar/detail-sidebar.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  userId: string;
  user: User | null = null;
  loading: boolean = true;
  error: string | null = null;
  
  // Sidebar configuration
  sidebarItems: SidebarItem[] = [
    { id: 'basic-info', label: 'Basic Information', icon: 'user' },
    { id: 'role-permissions', label: 'Role & Permissions', icon: 'shield-alt' },
    { id: 'projects', label: 'Projects', icon: 'project-diagram' },
    { id: 'notification', label: 'Notification', icon: 'bell' },
    { id: 'associated-with', label: 'Associated with', icon: 'users' },
    { id: 'history', label: 'History', icon: 'history' },
    { id: 'login-history', label: 'Login History', icon: 'sign-in-alt' }
  ];
  
  activeSidebarItemId: string = 'basic-info';
  activeTab: string = 'info';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.loadUserDetails();
  }
  
  loadUserDetails(): void {
    if (!this.userId) {
      this.error = 'User ID is required';
      this.loading = false;
      return;
    }
    
    this.loading = true;
    this.userService.getUserById(this.userId).subscribe(
      (user) => {
        this.user = user;
        this.loading = false;
        if (!user) {
          this.error = `User with ID ${this.userId} not found`;
        }
      },
      (error) => {
        this.error = 'Error loading user details. Please try again later.';
        this.loading = false;
        console.error('Error loading user details:', error);
      }
    );
  }
  
  onSidebarItemSelect(itemId: string): void {
    this.activeSidebarItemId = itemId;
    
    // Map sidebar item ID to tab if needed
    if (itemId === 'basic-info') {
      this.setActiveTab('info');
    } else if (itemId === 'projects') {
      this.setActiveTab('projects');
    } else if (itemId === 'associated-with') {
      this.setActiveTab('associated');
    }
  }
  
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}