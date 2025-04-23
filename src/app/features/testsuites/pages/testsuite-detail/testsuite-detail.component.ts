import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestSuiteDetail } from '../../models/testsuite.model';
import { TestSuiteService } from '../../services/testsuite.service';

@Component({
  selector: 'app-testsuite-detail',
  templateUrl: './testsuite-detail.component.html',
  styleUrls: ['./testsuite-detail.component.css']
})
export class TestSuiteDetailComponent implements OnInit {
  testSuiteId: string;
  testSuite: TestSuiteDetail | null = null;
  loading: boolean = true;
  error: string | null = null;
  
  // Tab management
  activeTab: string = 'info';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testSuiteService: TestSuiteService
  ) {
    this.testSuiteId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.loadTestSuiteDetails();
  }
  
  loadTestSuiteDetails(): void {
    if (!this.testSuiteId) {
      this.error = 'Test suite ID is missing';
      this.loading = false;
      return;
    }
    
    this.testSuiteService.getTestSuiteById(this.testSuiteId).subscribe(
      (testSuite) => {
        if (testSuite) {
          this.testSuite = testSuite;
          this.loading = false;
        } else {
          this.error = 'Test suite not found';
          this.loading = false;
        }
      },
      (error) => {
        this.error = 'Error loading test suite details. Please try again later.';
        this.loading = false;
        console.error('Error loading test suite details:', error);
      }
    );
  }
  
  setActiveTab(tabName: string): void {
    this.activeTab = tabName;
  }
  
  navigateBack(): void {
    this.router.navigate(['/testsuites']);
  }
}