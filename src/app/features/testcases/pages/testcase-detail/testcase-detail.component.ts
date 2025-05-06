import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TestCaseService } from '../../services/testcase.service';
import { TestCaseDetail } from '../../models/testcase.model';

@Component({
  selector: 'app-testcase-detail',
  templateUrl: './testcase-detail.component.html',
  styleUrls: ['./testcase-detail.component.css']
})
export class TestCaseDetailComponent implements OnInit {
  testCaseId: string;
  testCase: TestCaseDetail;
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testCaseService: TestCaseService
  ) { }

  ngOnInit(): void {
    this.testCaseId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.testCaseId) {
      this.error = 'Test case ID is missing. Please go back and try again.';
      return;
    }
    
    this.loadTestCaseDetails();
  }

  loadTestCaseDetails(): void {
    this.loading = true;
    this.testCaseService.getTestCaseById(this.testCaseId).subscribe(
      (testCase) => {
        if (testCase) {
          this.testCase = testCase;
        } else {
          this.error = 'Test case not found.';
        }
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load test case details.';
        console.error('Error loading test case details:', error);
        this.loading = false;
      }
    );
  }

  getTestDataKeys(): string[] {
    if (this.testCase && this.testCase.testData) {
      return Object.keys(this.testCase.testData);
    }
    return [];
  }

  goBack(): void {
    this.router.navigate(['/testcases']);
  }

  viewExecutionHistory(): void {
    this.router.navigate(['/testcases/history', this.testCaseId]);
  }
}