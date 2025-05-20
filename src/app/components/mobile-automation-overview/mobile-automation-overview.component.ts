import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

interface Product {
  name: string;
  logoPath: string;
  platforms: string[];
  color: string;
  subheading?: string;
}

@Component({
  selector: 'app-mobile-automation-overview',
  templateUrl: './mobile-automation-overview.component.html',
  styleUrls: ['./mobile-automation-overview.component.css']
})
export class MobileAutomationOverviewComponent implements OnInit, AfterViewInit {
  flippedCards: { [key: string]: boolean } = {};
  currentStep: number = 1;
  @ViewChild('productSliderTrack') productSliderTrack: ElementRef;
  
  products: Product[] = [
    { name: 'Lightroom', logoPath: './assets/images/lightroom_new.png', platforms: ['android'], color: '#31A8FF' },
    { name: 'Photoshop', logoPath: './assets/images/photoshop_new.png', platforms: ['android'], color: '#00C8FF' },
    { name: 'LMS', logoPath: './assets/images/lms.png', platforms: ['android', 'ios'], color: '#F88F64' },
    { name: 'Elements Mobile', logoPath: './assets/images/elements_mobile.png', platforms: ['android'], color: '#00C8E1' },
    { name: 'Adobe Connect', logoPath: './assets/images/adobe_connect.png', platforms: ['android', 'ios'], color: '#25C39B' },
    { name: 'Fill & Sign-Acrobat', logoPath: '/assets/images/fill_sign_acrobat.png', platforms: ['android', 'ios'], color: '#8C52FF', subheading: 'InPipeline' },
    { name: 'Adobe Express', logoPath: './assets/images/adobe_express.png', platforms: ['android', 'ios'], color: '#FF1F4D', subheading: 'InPipeline' },
    { name: 'Ad-Cloud', logoPath: './assets/images/ad_cloud.png', platforms: ['android'], color: '#E649B3', subheading: 'Advertisement verification' },
    { name: 'Globalization-AdobeScan', logoPath: './assets/images/adobe_scan.png', platforms: ['android', 'ios'], color: '#000000' },
    { name: 'Globalization-Lightroom', logoPath: './assets/images/globalization_lightroom.png', platforms: ['android'], color: '#31A8FF' },
    { name: 'Globalization-AdobeConnect', logoPath: './assets/images/globalization_adobe_connect.png', platforms: ['android', 'ios'], color: '#25C39B' }
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

  /**
   * Gets products by platform support type
   * @param platforms Array of platform strings to filter by
   * @returns Products that match the criteria
   */
  getProductsByPlatform(platforms: string[]): Product[] {
    if (platforms.includes('android') && platforms.includes('ios')) {
      // Products with both Android and iOS support
      return this.products.filter(product => 
        product.platforms.includes('android') && product.platforms.includes('ios')
      );
    } else if (platforms.includes('android')) {
      // Products with Android only support
      return this.products.filter(product => 
        product.platforms.includes('android') && !product.platforms.includes('ios')
      );
    }
    return [];
  }

  toggleCard(cardId: string): void {
    this.flippedCards[cardId] = !this.flippedCards[cardId];
  }

  /**
   * Moves to the next step in the workflow
   */
  nextStep(): void {
    if (this.currentStep < 5) {
      this.currentStep++;
    }
  }

  /**
   * Moves to the previous step in the workflow
   */
  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  /**
   * Navigates to a specific step in the workflow
   * @param step The step number to navigate to
   */
  goToStep(step: number): void {
    if (step >= 1 && step <= 5) {
      this.currentStep = step;
    }
  }
}