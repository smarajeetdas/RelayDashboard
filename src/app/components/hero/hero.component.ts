import { Component, OnInit } from '@angular/core';
import { AiService } from '../../services/ai-service.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  welcomeMessage: string = '';
  isLoadingMessage: boolean = true;
  userName: string = '';
  showNameInput: boolean = false;

  constructor(private aiService: AiService) { }

  ngOnInit(): void {
    this.generateWelcomeMessage();
  }

  /**
   * Determine time of day for the greeting
   */
  private getTimeOfDay(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  }

  /**
   * Generate the welcome message using AI
   */
  generateWelcomeMessage(): void {
    this.isLoadingMessage = true;
    const timeOfDay = this.getTimeOfDay();
    
    this.aiService.generateGreeting({ 
      timeOfDay,
      location: this.userName ? this.userName : undefined // Pass username as location parameter
    }).subscribe(
      greeting => {
        this.welcomeMessage = greeting;
        this.isLoadingMessage = false;
      },
      error => {
        console.error('Error generating greeting:', error);
        this.welcomeMessage = 'Welcome to the future of test automation!';
        this.isLoadingMessage = false;
      }
    );
  }

  /**
   * Toggle the name input field visibility
   */
  toggleNameInput(): void {
    this.showNameInput = !this.showNameInput;
  }

  /**
   * Handle the personalization of the greeting with user's name
   */
  updateName(name: string): void {
    this.userName = name;
    this.generateWelcomeMessage();
    this.showNameInput = false;
  }
}
