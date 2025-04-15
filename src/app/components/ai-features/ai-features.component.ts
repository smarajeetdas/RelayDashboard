import { Component, OnInit } from '@angular/core';

interface AiFeature {
  title: string;
  description: string;
  isActive?: boolean;
}

@Component({
  selector: 'app-ai-features',
  templateUrl: './ai-features.component.html',
  styleUrls: ['./ai-features.component.css']
})
export class AiFeaturesComponent implements OnInit {
  aiFeatures: AiFeature[] = [
    {
      title: 'Intelligent Test Results Summary',
      description: 'Automatically generate simplified summaries from complex test execution results for quick analysis.'
    },
    {
      title: 'Intelligent Test Case Validation',
      description: 'AI-driven validation of test cases to ensure comprehensive coverage and reliability.'
    },
    {
      title: 'Intelligent Test Data Recommendation',
      description: 'Smart suggestions for test data based on application behavior and patterns.'
    }
  ];

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
  }
}
