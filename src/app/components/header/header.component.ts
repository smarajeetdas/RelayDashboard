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
    { id: 'endpoint', name: 'Endpoint', icon: 'fa-circle' },
    { id: 'testcase', name: 'Testcase', icon: 'fa-circle' },
    { id: 'testsuite', name: 'Testsuite', icon: 'fa-circle' },
    { id: 'mastersuite', name: 'Mastersuite', icon: 'fa-circle' }
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
}
