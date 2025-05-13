import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

interface AiFeature {
  title: string;
  description: string;
  isActive?: boolean;
  id?: string;
  status: 'completed' | 'in-progress';
}

@Component({
  selector: 'app-ai-features',
  templateUrl: './ai-features.component.html',
  styleUrls: ['./ai-features.component.css']
})
export class AiFeaturesComponent implements OnInit, AfterViewInit {
  @ViewChild('sliderTrack') sliderTrack: ElementRef;
  aiFeatures: AiFeature[] = [
    {
      id: 'prompt-based-automation',
      title: 'Prompt Based Web Automation',
      description: 'Create and execute test automation using natural language prompts instead of code.',
      status: 'completed'
    },
    {
      id: 'intelligent-image-comparison',
      title: 'Intelligent Image Comparison',
      description: 'AI-powered visual comparison that understands context and ignores irrelevant differences.',
      status: 'completed'
    },
    {
      id: 'test-results-summary',
      title: 'Intelligent Test Results Summary',
      description: 'Automatically generate simplified summaries from complex test execution results for quick analysis.',
      status: 'in-progress'
    },
    {
      id: 'test-case-validation',
      title: 'Intelligent Test\nCase\nValidation',
      description: 'AI-driven validation of test cases to ensure comprehensive coverage and reliability.',
      status: 'in-progress'
    },
    {
      id: 'test-data-recommendation',
      title: 'Intelligent Test Data Recommendation',
      description: 'Smart suggestions for test data based on application behavior and patterns.',
      status: 'in-progress'
    }
  ];

  // Modal control variables
  showPromptAutomationModal: boolean = false;
  showImageComparisonModal: boolean = false;
  showTestResultsSummaryModal: boolean = false;
  showTestCaseValidationModal: boolean = false;
  showTestDataRecommendationModal: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // Initialize isActive property for all features
    this.aiFeatures.forEach(feature => feature.isActive = false);
  }
  
  ngAfterViewInit(): void {
    // Set up infinite scrolling animation
    this.setupScrollAnimation();
  }
  
  /**
   * Set up the infinite scrolling animation for the AI features slider
   */
  private setupScrollAnimation(): void {
    if (this.sliderTrack && this.sliderTrack.nativeElement) {
      // Animation logic is handled by CSS
      // This method can be used to add additional JavaScript animations if needed
    }
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
    if (feature.id === 'prompt-based-automation' && feature.isActive) {
      this.openPromptAutomationModal();
    } else if (feature.id === 'intelligent-image-comparison' && feature.isActive) {
      this.openImageComparisonModal();
    } else if (feature.id === 'test-results-summary' && feature.isActive) {
      this.openTestResultsSummaryModal();
    } else if (feature.id === 'test-case-validation' && feature.isActive) {
      this.openTestCaseValidationModal();
    } else if (feature.id === 'test-data-recommendation' && feature.isActive) {
      this.openTestDataRecommendationModal();
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

  openTestCaseValidationModal(): void {
    this.showTestCaseValidationModal = true;
  }

  closeTestCaseValidationModal(): void {
    this.showTestCaseValidationModal = false;
    
    // Reset the active state of the related feature
    const feature = this.aiFeatures.find(f => f.id === 'test-case-validation');
    if (feature) {
      feature.isActive = false;
    }
  }

  openTestDataRecommendationModal(): void {
    this.showTestDataRecommendationModal = true;
  }

  closeTestDataRecommendationModal(): void {
    this.showTestDataRecommendationModal = false;
    
    // Reset the active state of the related feature
    const feature = this.aiFeatures.find(f => f.id === 'test-data-recommendation');
    if (feature) {
      feature.isActive = false;
    }
  }

  openPromptAutomationModal(): void {
    this.showPromptAutomationModal = true;
  }

  closePromptAutomationModal(): void {
    this.showPromptAutomationModal = false;
    
    // Reset the active state of the related feature
    const feature = this.aiFeatures.find(f => f.id === 'prompt-based-automation');
    if (feature) {
      feature.isActive = false;
    }
  }

  openImageComparisonModal(): void {
    this.showImageComparisonModal = true;
  }

  closeImageComparisonModal(): void {
    this.showImageComparisonModal = false;
    
    // Reset the active state of the related feature
    const feature = this.aiFeatures.find(f => f.id === 'intelligent-image-comparison');
    if (feature) {
      feature.isActive = false;
    }
  }
}
