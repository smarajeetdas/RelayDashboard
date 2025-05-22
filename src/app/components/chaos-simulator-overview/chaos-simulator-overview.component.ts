import { Component, OnInit } from '@angular/core';

interface ServiceTeam {
  name: string;
  logoPath: string;
  color: string;
  subheading?: string;
}

@Component({
  selector: 'app-chaos-simulator-overview',
  templateUrl: './chaos-simulator-overview.component.html',
  styleUrls: ['./chaos-simulator-overview.component.css']
})
export class ChaosSimulatorOverviewComponent implements OnInit {
  activeStep: number = 1;
  totalSteps: number = 8;
  
  // Service Teams conducted Chaos Testing
  serviceTeams: ServiceTeam[] = [
    { name: 'Sophia', logoPath: 'assets/images/adobe_express.png', color: '#1473e6' },
    { name: 'Lightroom', logoPath: 'assets/images/adobe-logos-official/lightroom.png', color: '#31A8FF' },
    { name: 'AdobeSign Monolith', logoPath: 'assets/images/fill_sign_acrobat.png', color: '#EC1C24' },
    { name: 'Storage Directory Service', logoPath: 'assets/images/adobe_express.png', color: '#1473e6' },
    { name: 'Content Storage Service', logoPath: 'assets/images/adobe_express.png', color: '#1473e6' },
    { name: 'Creative Cloud Extensibility Service', logoPath: 'assets/images/adobe-logos-official/illustrator.png', color: '#FF9A00' },
    { name: 'Coldfusion Community Portal', logoPath: 'assets/images/adobe_express.png', color: '#1473e6' },
    { name: 'Form As a Service', logoPath: 'assets/images/adobe_express.png', color: '#1473e6' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  setActiveStep(step: number): void {
    if (step >= 1 && step <= this.totalSteps) {
      this.activeStep = step;
    }
  }

  nextStep(): void {
    if (this.activeStep < this.totalSteps) {
      this.activeStep++;
    }
  }

  prevStep(): void {
    if (this.activeStep > 1) {
      this.activeStep--;
    }
  }
}