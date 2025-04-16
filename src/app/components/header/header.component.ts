import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isMenuCollapsed = true;
  activeDropdown: string | null = null;
  userName: string = 'Smarajeet';

  // Functional automation dropdown options
  functionalAutomationOptions = [
    { id: 'endpoint', name: 'Endpoint', icon: 'fa-circle', route: '/endpoints' },
    { id: 'testcase', name: 'Testcase', icon: 'fa-circle' },
    { id: 'testsuite', name: 'Testsuite', icon: 'fa-circle' },
    { id: 'mastersuite', name: 'Mastersuite', icon: 'fa-circle' }
  ];
  
  // Performance Lab dropdown options
  performanceLabOptions = [
    { id: 'overview', name: 'Overview', icon: 'fa-circle' },
    { id: 'test-manager', name: 'Test Manager', icon: 'fa-circle' },
    { id: 'test-results', name: 'Test Results', icon: 'fa-circle' },
    { id: 'review-testability', name: 'Review Testability Comparison', icon: 'fa-circle' }
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
    { id: 'documentation', name: 'Documentation', icon: 'fa-book' },
    { id: 'settings', name: 'Settings', icon: 'fa-cog' },
    { id: 'support', name: 'Support', icon: 'fa-question-circle' }
  ];

  constructor() { }

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
}
