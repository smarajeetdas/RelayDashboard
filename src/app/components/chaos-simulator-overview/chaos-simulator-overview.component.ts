import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chaos-simulator-overview',
  templateUrl: './chaos-simulator-overview.component.html',
  styleUrls: ['./chaos-simulator-overview.component.css']
})
export class ChaosSimulatorOverviewComponent implements OnInit {
  activeStep: number = 1;
  totalSteps: number = 8;

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