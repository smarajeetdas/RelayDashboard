import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-functional-automation-overview',
  templateUrl: './functional-automation-overview.component.html',
  styleUrls: ['./functional-automation-overview.component.css']
})
export class FunctionalAutomationOverviewComponent implements OnInit {
  // Track the state of flipped cards
  flippedCards: { [key: string]: boolean } = {
    'what-you-can-do': false,
    'unified-framework': false,
    'cicd-ready': false,
    'reusable-components': false,
    'rich-reporting': false,
    'integration': false,
    'test-data': false,
    'post-operations': false,
    'validation': false, 
    'execution-history': false,
    'video-execution': false,
    'code-coverage': false,
    'configuration-simplicity': false,
    'ai-integrations': false,
    'platform-support': false,
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
}