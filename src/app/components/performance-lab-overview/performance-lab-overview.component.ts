import { Component, OnInit } from '@angular/core';

interface ServiceTeam {
  name: string;
  logoPath: string;
  color: string;
  subheading?: string;
}

@Component({
  selector: 'app-performance-lab-overview',
  templateUrl: './performance-lab-overview.component.html',
  styleUrls: ['./performance-lab-overview.component.css']
})
export class PerformanceLabOverviewComponent implements OnInit {
  flippedCards: { [key: string]: boolean } = {};
  
  // Service Teams using Performance Lab
  serviceTeams: ServiceTeam[] = [
    { name: 'Doc Cloud', logoPath: 'assets/images/adobe-logos-official/acrobat.webp', color: '#EC1C24' },
    { name: 'DTPF', logoPath: 'assets/images/adobe_express.png', color: '#1473e6' },
    { name: 'S4 Hana', logoPath: 'assets/images/adobe_express.png', color: '#1473e6' },
    { name: 'Creative Cloud', logoPath: 'assets/images/adobe-logos-official/illustrator.png', color: '#FF9A00' },
    { name: 'Firefly-Highlevel', logoPath: 'assets/images/adobe-logos-official/after-effects.png', color: '#9999FF' },
    { name: 'Hendrix Commerce Services', logoPath: 'assets/images/adobe_express.png', color: '#1473e6' },
    { name: 'Adobe Unified Platform', logoPath: 'assets/images/adobe-logos-official/experience.png', color: '#FF0000' },
    { name: 'Phantom Service', logoPath: 'assets/images/adobe_express.png', color: '#1473e6' },
    { name: 'Enterprise Solution Services', logoPath: 'assets/images/adobe_express.png', color: '#1473e6' },
    { name: 'Customer One', logoPath: 'assets/images/adobe_express.png', color: '#1473e6' },
    { name: 'RPS', logoPath: 'assets/images/adobe_express.png', color: '#1473e6' },
    { name: 'Redhawk-CommentingService', logoPath: 'assets/images/adobe_express.png', color: '#1473e6' }
  ];

  constructor() { }

  ngOnInit(): void {
    // Initialize all cards to non-flipped state
    this.flippedCards = {
      'core-features': false,
      'configuration-simplicity': false,
      'platform-compatibility': false,
      'coming-soon': false
    };
  }

  toggleCard(cardId: string): void {
    this.flippedCards[cardId] = !this.flippedCards[cardId];
  }
}