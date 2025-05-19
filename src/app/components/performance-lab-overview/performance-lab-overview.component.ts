import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-performance-lab-overview',
  templateUrl: './performance-lab-overview.component.html',
  styleUrls: ['./performance-lab-overview.component.css']
})
export class PerformanceLabOverviewComponent implements OnInit {
  flippedCards: { [key: string]: boolean } = {};

  constructor() { }

  ngOnInit(): void {
    // Initialize all cards to non-flipped state
    this.flippedCards = {
      'automated-load-testing': false,
      'profiling': false,
      'simulation': false,
      'dashboard': false,
      'tuning-optimization': false,
      'server-performance': false
    };
  }

  toggleCard(cardId: string): void {
    this.flippedCards[cardId] = !this.flippedCards[cardId];
  }
}