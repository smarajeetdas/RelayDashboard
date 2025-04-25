import { Component, Input, OnInit } from '@angular/core';
import { TestCase } from '../../models/endpoint.model';
import { EndpointService } from '../../services/endpoint.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-cases-modal',
  templateUrl: './test-cases-modal.component.html',
  styleUrls: ['./test-cases-modal.component.css']
})
export class TestCasesModalComponent implements OnInit {
  @Input() endpointId: string;
  testCases: TestCase[] = [];
  loading = false;
  showModal = false;
  title = 'Associated Testcase';

  constructor(
    private endpointService: EndpointService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openModal(endpointId: string): void {
    this.endpointId = endpointId;
    this.loading = true;
    this.showModal = true;
    
    this.endpointService.getTestCasesForEndpoint(endpointId).subscribe(
      (testCases) => {
        this.testCases = testCases;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading test cases:', error);
        this.loading = false;
      }
    );
  }

  closeModal(): void {
    this.showModal = false;
  }

  navigateToTestCase(testCaseId: string): void {
    // Navigate to test case detail page
    this.closeModal();
    this.router.navigate(['/testcases', testCaseId]);
  }
}