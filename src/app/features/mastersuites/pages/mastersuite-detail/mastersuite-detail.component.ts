import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterSuiteDetail } from '../../models/mastersuite.model';
import { MasterSuiteService } from '../../services/mastersuite.service';

@Component({
  selector: 'app-mastersuite-detail',
  templateUrl: './mastersuite-detail.component.html',
  styleUrls: ['./mastersuite-detail.component.css']
})
export class MasterSuiteDetailComponent implements OnInit {
  masterSuiteId: string;
  masterSuite: MasterSuiteDetail | null = null;
  loading: boolean = true;
  error: string | null = null;
  
  // Tab management
  activeTab: string = 'info';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private masterSuiteService: MasterSuiteService
  ) {
    this.masterSuiteId = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit(): void {
    this.loadMasterSuiteDetails();
  }
  
  loadMasterSuiteDetails(): void {
    if (!this.masterSuiteId) {
      this.error = 'Master suite ID is missing';
      this.loading = false;
      return;
    }
    
    this.masterSuiteService.getMasterSuiteById(this.masterSuiteId).subscribe(
      (masterSuite) => {
        if (masterSuite) {
          this.masterSuite = masterSuite;
          this.loading = false;
        } else {
          this.error = 'Master suite not found';
          this.loading = false;
        }
      },
      (error) => {
        this.error = 'Error loading master suite details. Please try again later.';
        this.loading = false;
        console.error('Error loading master suite details:', error);
      }
    );
  }
  
  setActiveTab(tabName: string): void {
    this.activeTab = tabName;
  }
  
  navigateBack(): void {
    this.router.navigate(['/mastersuites']);
  }
}