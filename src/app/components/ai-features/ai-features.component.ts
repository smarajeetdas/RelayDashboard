import { Component, OnInit } from '@angular/core';

interface AiFeature {
  title: string;
  description: string;
  isActive?: boolean;
  id?: string;
}

@Component({
  selector: 'app-ai-features',
  templateUrl: './ai-features.component.html',
  styleUrls: ['./ai-features.component.css']
})
export class AiFeaturesComponent implements OnInit {
  aiFeatures: AiFeature[] = [
    {
      id: 'test-results-summary',
      title: 'Intelligent Test Results Summary',
      description: 'Automatically generate simplified summaries from complex test execution results for quick analysis.'
    },
    {
      id: 'test-case-validation',
      title: 'Intelligent Test Case Validation',
      description: 'AI-driven validation of test cases to ensure comprehensive coverage and reliability.'
    },
    {
      id: 'test-data-recommendation',
      title: 'Intelligent Test Data Recommendation',
      description: 'Smart suggestions for test data based on application behavior and patterns.'
    }
  ];

  // Modal control variables
  showTestResultsSummaryModal: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // Initialize isActive property for all features
    this.aiFeatures.forEach(feature => feature.isActive = false);
  }

  toggleFeature(feature: AiFeature): void {
    // Reset all features to inactive
    this.aiFeatures.forEach(f => {
      if (f !== feature) {
        f.isActive = false;
      }
    });
    
    // Toggle the clicked feature
    feature.isActive = !feature.isActive;

    // Handle specific feature actions
    if (feature.id === 'test-results-summary' && feature.isActive) {
      this.openTestResultsSummaryModal();
    }
  }

  openTestResultsSummaryModal(): void {
    this.showTestResultsSummaryModal = true;
  }

  closeTestResultsSummaryModal(): void {
    this.showTestResultsSummaryModal = false;
    
    // Reset the active state of the related feature
    const feature = this.aiFeatures.find(f => f.id === 'test-results-summary');
    if (feature) {
      feature.isActive = false;
    }
  }
}
