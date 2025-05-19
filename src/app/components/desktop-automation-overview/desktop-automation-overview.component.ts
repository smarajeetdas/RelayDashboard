import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-desktop-automation-overview',
  templateUrl: './desktop-automation-overview.component.html',
  styleUrls: ['./desktop-automation-overview.component.css']
})
export class DesktopAutomationOverviewComponent implements OnInit {
  flippedCards: { [key: string]: boolean } = {};

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

  toggleCard(cardId: string): void {
    this.flippedCards[cardId] = !this.flippedCards[cardId];
  }
}