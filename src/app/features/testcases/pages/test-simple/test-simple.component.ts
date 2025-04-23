import { Component, OnInit } from '@angular/core';
import { TestCase } from '../../models/testcase.model';

@Component({
  selector: 'app-test-simple',
  template: `
    <div class="container mt-4">
      <h2>Simple Test List</h2>
      <div class="mb-3">
        <button class="btn btn-primary" (click)="loadTestCases()">Load Test Cases</button>
      </div>
      
      <div *ngIf="loading" class="alert alert-info">Loading...</div>
      
      <table class="table table-striped" *ngIf="!loading && testCases.length > 0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Project</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let testCase of testCases">
            <td>{{ testCase.id }}</td>
            <td>{{ testCase.name }}</td>
            <td>
              <span class="badge badge-pill" 
                    [ngClass]="{
                      'badge-primary': testCase.category === 'WEB',
                      'badge-success': testCase.category === 'REST',
                      'badge-warning': testCase.category === 'MOBILE',
                      'badge-info': testCase.category === 'NA',
                      'badge-secondary': testCase.category !== 'WEB' && testCase.category !== 'REST' && 
                                         testCase.category !== 'MOBILE' && testCase.category !== 'NA'
                    }">
                {{ testCase.category }}
              </span>
            </td>
            <td>{{ testCase.project }}</td>
          </tr>
        </tbody>
      </table>
      
      <div *ngIf="!loading && testCases.length === 0" class="alert alert-warning">
        No test cases found.
      </div>
      
      <div class="mt-3">
        <div *ngFor="let testCase of testCases">
          <div><strong>ID:</strong> {{testCase.id}}</div>
          <div><strong>Name:</strong> {{testCase.name}}</div>
          <div><strong>Category:</strong> {{testCase.category}}</div>
          <hr>
        </div>
      </div>
    </div>
  `
})
export class TestSimpleComponent implements OnInit {
  testCases: TestCase[] = [];
  loading = false;
  JSON = JSON; // Make JSON available to template
  
  // Hardcoded sample data
  sampleTestCases: TestCase[] = [
    {
      id: 'tc001',
      name: 'Basic Web Test',
      category: 'WEB',
      thinkTime: '00:00:10',
      exitOnFailure: true,
      mobile: false,
      project: 'Sample Project',
      lastModified: '2025-04-23',
      updatedBy: 'Test User'
    },
    {
      id: 'tc002',
      name: 'API Integration Test',
      category: 'REST',
      thinkTime: '00:00:05',
      exitOnFailure: true,
      mobile: false,
      project: 'API Project',
      lastModified: '2025-04-22',
      updatedBy: 'API User'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Load test cases initially
    this.loadTestCases();
  }

  loadTestCases(): void {
    this.loading = true;
    
    // Simulate API call with timeout
    setTimeout(() => {
      console.log('Loading hardcoded test cases');
      this.testCases = [...this.sampleTestCases];
      this.loading = false;
      console.log('Test cases loaded:', this.testCases);
    }, 500);
  }
}