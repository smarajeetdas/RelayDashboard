import { Component, Input, OnInit } from '@angular/core';
import { WebInstruction } from '../../models/endpoint.model';
import { EndpointService } from '../../services/endpoint.service';

@Component({
  selector: 'app-web-instructions',
  templateUrl: './web-instructions.component.html',
  styleUrls: ['./web-instructions.component.css']
})
export class WebInstructionsComponent implements OnInit {
  @Input() endpointId: string;
  webInstructions: WebInstruction[] = [];
  loading = false;
  
  constructor(private endpointService: EndpointService) { }

  ngOnInit(): void {
    this.loadWebInstructions();
  }

  loadWebInstructions(): void {
    this.loading = true;
    this.endpointService.getWebInstructionsForEndpoint(this.endpointId).subscribe(
      (instructions) => {
        this.webInstructions = instructions;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading web instructions:', error);
        this.loading = false;
      }
    );
  }

  toggleActive(instruction: WebInstruction): void {
    instruction.active = !instruction.active;
    // In a real implementation, you would save changes to the server
  }

  toggleScreenshot(instruction: WebInstruction): void {
    instruction.saveScreenshot = !instruction.saveScreenshot;
    // In a real implementation, you would save changes to the server
  }

  recordInstruction(): void {
    // Logic for recording a new instruction
    console.log('Recording instruction');
  }

  copyInstruction(): void {
    // Logic for copying instruction
    console.log('Copying instruction');
  }

  createIteratableInstruction(): void {
    // Logic for creating an iteratable instruction
    console.log('Creating iteratable instruction');
  }

  createWebInstruction(): void {
    // Logic for creating a new web instruction
    console.log('Creating web instruction');
  }

  cloneInstruction(id: string): void {
    // Logic for cloning an instruction
    console.log('Cloning instruction', id);
  }

  editInstruction(id: string): void {
    // Logic for editing an instruction
    console.log('Editing instruction', id);
  }

  deleteInstruction(id: string): void {
    // Logic for deleting an instruction
    console.log('Deleting instruction', id);
  }
}