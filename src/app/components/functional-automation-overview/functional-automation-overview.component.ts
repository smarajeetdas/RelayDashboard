import { Component, OnInit } from '@angular/core';

interface Product {
  name: string;
  logoPath: string;
  color: string;
  subheading?: string;
}

@Component({
  selector: 'app-functional-automation-overview',
  templateUrl: './functional-automation-overview.component.html',
  styleUrls: ['./functional-automation-overview.component.css']
})
export class FunctionalAutomationOverviewComponent implements OnInit {
  // Current step for workflow
  currentStep: number = 1;
  
  // Track the state of flipped cards
  flippedCards: { [key: string]: boolean } = {
    'core-features': false,
    'configuration-simplicity': false,
    'platform-support': false,
    'ai-integrations': false,
    'coming-soon': false
  };
  
  // Product data for Functional Automation
  products: Product[] = [
    { name: 'Adobe Express', logoPath: 'assets/images/adobe-logos-official/express.png', color: '#1473e6', subheading: 'Your-Stuff' },
    { name: 'Project X', logoPath: 'assets/images/adobe_express.png', color: '#1473e6', subheading: 'Productivity' },
    { name: 'CC Education', logoPath: 'assets/images/adobe_express.png', color: '#1473e6' },
    { name: 'Adobe Sign', logoPath: 'assets/images/fill_sign_acrobat.png', color: '#1473e6' },
    { name: 'Adobe Experience Platform', logoPath: 'assets/images/adobe-logos-official/experience.png', color: '#1473e6' },
    { name: 'Adobe.com', logoPath: 'assets/images/adobe_express.png', color: '#1473e6' },
    { name: 'Adobe Learning Manager', logoPath: 'assets/images/adobe-logos-official/learning-manager.webp', color: '#1473e6' },
    { name: 'CPQ', logoPath: 'assets/images/adobe_express.png', color: '#1473e6' },
    { name: 'AGX-DTP', logoPath: 'assets/images/adobe_express.png', color: '#1473e6' },
    { name: 'CLM', logoPath: 'assets/images/adobe_express.png', color: '#1473e6' },
    { name: 'Supernova', logoPath: 'assets/images/adobe_express.png', color: '#1473e6' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Toggle the flipped state of a card
   * @param cardId The unique identifier for the card to toggle
   */
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