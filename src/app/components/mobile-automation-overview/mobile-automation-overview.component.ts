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
  @ViewChild('productSliderTrack') productSliderTrack: ElementRef;
  
  products: Product[] = [
    { name: 'Lightroom', logoPath: './assets/images/lightroom_new.png', platforms: ['android', 'ios'], color: '#31A8FF' },
    { name: 'Photoshop', logoPath: './assets/images/photoshop_new.png', platforms: ['android', 'ios'], color: '#00C8FF' },
    { name: 'Illustrator', logoPath: './assets/images/illustrator.png', platforms: ['android', 'ios'], color: '#FF9A00' },
    { name: 'LMS', logoPath: './assets/images/lms.png', platforms: ['android', 'ios'], color: '#F88F64' },
    { name: 'Elements Mobile', logoPath: './assets/images/elements_mobile.png', platforms: ['android'], color: '#00C8E1' },
    { name: 'Adobe Connect', logoPath: './assets/images/adobe_connect.png', platforms: ['android', 'ios'], color: '#25C39B' },
    { name: 'Fill & Sign-Acrobat', logoPath: '/assets/images/fill_sign_acrobat.png', platforms: ['android', 'ios'], color: '#8C52FF', subheading: 'InPipeline' }
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
}