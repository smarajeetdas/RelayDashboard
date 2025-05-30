import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

interface Product {
  name: string;
  logoPath: string;
  platforms: string[];
  color: string;
}

@Component({
  selector: 'app-desktop-automation-overview',
  templateUrl: './desktop-automation-overview.component.html',
  styleUrls: ['./desktop-automation-overview.component.css']
})
export class DesktopAutomationOverviewComponent implements OnInit, AfterViewInit {
  flippedCards: { [key: string]: boolean } = {};
  @ViewChild('productSliderTrack') productSliderTrack: ElementRef;
  
  // Testcase Workflow state
  currentStep: number = 1;
  totalSteps: number = 5;
  
  products: Product[] = [
    { name: 'Lightroom', logoPath: './assets/images/lightroom_new.png', platforms: ['windows', 'mac'], color: '#31A8FF' },
    { name: 'Photoshop', logoPath: './assets/images/photoshop_new.png', platforms: ['windows', 'mac'], color: '#00C8FF' },
    { name: 'Illustrator', logoPath: './assets/images/illustrator_new.png', platforms: ['windows', 'mac'], color: '#FF9A00' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Initialize all cards to non-flipped state
    this.flippedCards = {
      'script-free': false,
      'one-click': false,
      'ui-automation': false,
      'cross-platform': false,
      'key-offerings': false,
      'easy-config': false,
      'platform-support': false,
      'ai-integrations': false,
      'whats-next': false
    };
  }
  
  ngAfterViewInit(): void {
    // Setup animation after view is initialized
    if (this.productSliderTrack) {
      // Any additional animation setup if needed
    }
  }

  toggleCard(cardId: string): void {
    this.flippedCards[cardId] = !this.flippedCards[cardId];
  }
  
  /**
   * Gets products by platform support type
   * @param platforms Array of platform strings to filter by
   * @returns Products that match the criteria
   */
  getProductsByPlatform(platforms: string[]): Product[] {
    if (platforms.includes('windows') && platforms.includes('mac')) {
      // Products with both Windows and Mac support
      return this.products.filter(product => 
        product.platforms.includes('windows') && product.platforms.includes('mac')
      );
    } else if (platforms.includes('windows')) {
      // Products with Windows only support
      return this.products.filter(product => 
        product.platforms.includes('windows') && !product.platforms.includes('mac')
      );
    }
    return [];
  }

  // Testcase Workflow navigation functions
  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  goToStep(stepNumber: number): void {
    if (stepNumber >= 1 && stepNumber <= this.totalSteps) {
      this.currentStep = stepNumber;
    }
  }
}