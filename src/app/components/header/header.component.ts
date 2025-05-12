import { Component, OnInit, HostListener } from '@angular/core';
import { SmoothScrollService } from '../../services/smooth-scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isMenuCollapsed = true;
  activeDropdown: string | null = null;
  userName: string = '';

  // Functional automation dropdown options
  functionalAutomationOptions = [
    { id: 'endpoint', name: 'Endpoint', icon: 'fa-circle', route: '/endpoints' },
    { id: 'testcase', name: 'Testcase', icon: 'fa-circle', route: '/testcases' },
    { id: 'testsuite', name: 'Testsuite', icon: 'fa-circle', route: '/testsuites' },
    { id: 'mastersuite', name: 'Mastersuite', icon: 'fa-circle', route: '/mastersuites' }
  ];
  
  // Performance Lab dropdown options
  performanceLabOptions = [
    { id: 'overview', name: 'Overview', icon: 'fa-circle' },
    { id: 'test-manager', name: 'Test Manager', icon: 'fa-circle' },
    { id: 'test-results', name: 'Test Results', icon: 'fa-circle', route: '/performance-lab/test-results' },
    { id: 'review-testability', name: 'Review Testability Comparison', icon: 'fa-circle', route: '/performance-lab/review-testability' }
  ];
  
  // Chaos Simulator dropdown options
  chaosSimulatorOptions = [
    { id: 'overview', name: 'Overview', icon: 'fa-circle' },
    { id: 'getting-started', name: 'Getting started', icon: 'fa-circle' }
  ];
  
  // Mobile Automation dropdown options
  mobileAutomationOptions = [
    { id: 'overview', name: 'Overview', icon: 'fa-circle' },
    { id: 'mobile-locator', name: 'Mobile Locator', icon: 'fa-circle' },
    { id: 'instructions', name: 'Instructions', icon: 'fa-circle' },
    { id: 'executions', name: 'Executions', icon: 'fa-circle' }
  ];
  
  // Desktop Automation dropdown options
  desktopAutomationOptions = [
    { id: 'overview', name: 'Overview', icon: 'fa-circle' },
    { id: 'locator', name: 'Locator', icon: 'fa-circle' },
    { id: 'instruction', name: 'Instruction', icon: 'fa-circle' },
    { id: 'executions', name: 'Executions', icon: 'fa-circle' }
  ];
  
  // Execution History dropdown options
  executionHistoryOptions = [
    { id: 'recent', name: 'Recent Executions', icon: 'fa-circle' },
    { id: 'scheduled', name: 'Scheduled Tests', icon: 'fa-circle' },
    { id: 'reports', name: 'Reports', icon: 'fa-circle' }
  ];
  
  // More dropdown options
  moreOptions = [
    { id: 'demo-videos', name: 'Demo Videos', icon: 'fa-video', route: '#demo-videos' },
    { id: 'users', name: 'Users', icon: 'fa-users', route: '/users' },
    { id: 'documentation', name: 'Documentation', icon: 'fa-book' },
    { id: 'settings', name: 'Settings', icon: 'fa-cog' },
    { id: 'support', name: 'Support', icon: 'fa-question-circle' }
  ];

  constructor(private smoothScrollService: SmoothScrollService) { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 20;
  }

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  toggleDropdown(dropdown: string) {
    if (this.activeDropdown === dropdown) {
      this.activeDropdown = null;
    } else {
      this.activeDropdown = dropdown;
    }
  }

  isDropdownActive(dropdown: string): boolean {
    return this.activeDropdown === dropdown;
  }

  closeAllDropdowns(): void {
    this.activeDropdown = null;
  }
  
  /**
   * Handle mouse enter event on dropdown menu items
   * @param dropdown The dropdown menu to show
   */
  onMouseEnter(dropdown: string): void {
    this.activeDropdown = dropdown;
  }
  
  /**
   * Handle mouse leave event on dropdown menu items
   * @param dropdown The dropdown menu to hide
   */
  onMouseLeave(dropdown: string): void {
    this.activeDropdown = null;
  }
  
  /**
   * Scroll to a section using the smooth scroll service
   * @param sectionId The ID of the section to scroll to
   */
  scrollToSection(sectionId: string): void {
    this.smoothScrollService.scrollToElement(sectionId);
    this.closeAllDropdowns();
    this.isMenuCollapsed = true; // Close mobile menu after clicking
  }
  
  /**
   * Handle menu item clicks for the More dropdown
   * @param option The menu option that was clicked
   * @param event The click event
   */
  handleMenuClick(option: any, event: MouseEvent): void {
    if (option.route && option.route.startsWith('#')) {
      // Handle anchor links for scrolling
      this.scrollToSection(option.route.substring(1));
      event.preventDefault();
    } else if (option.route) {
      // For other routes, just close dropdowns
      this.closeAllDropdowns();
    } else {
      // Prevent default for items without routes
      event.preventDefault();
    }
  }
}
