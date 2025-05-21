import { Component, OnInit } from '@angular/core';

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