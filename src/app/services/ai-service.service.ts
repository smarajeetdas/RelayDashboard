import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private baseUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient) {}

  /**
   * Generate a personalized greeting using OpenAI
   * @param context Information to personalize the greeting (time of day, etc.)
   * @returns Observable with the generated greeting
   */
  generateGreeting(context: { timeOfDay: string, location?: string }): Observable<string> {
    // Use fallback greetings since we don't have an API key
    console.info('Using built-in greetings based on time of day.');
    
    // If we have a username, create a more personalized greeting
    if (context.location) {
      return this.getPersonalizedGreeting(context.timeOfDay, context.location);
    }
    
    return this.getFallbackGreeting(context.timeOfDay);
  }

  /**
   * Provide a fallback greeting when API is unavailable
   */
  private getFallbackGreeting(timeOfDay: string): Observable<string> {
    const greetings = {
      morning: [
        "Start your day with automated testing power!",
        "Morning insights, automated with precision.",
        "Fresh day, fresh tests. Let's make it count!"
      ],
      afternoon: [
        "Keep the momentum going with smart test automation.",
        "Afternoon productivity boost, powered by AI.",
        "Your afternoon testing journey, simplified."
      ],
      evening: [
        "Evening check-ins made seamless with Relay.",
        "Wrapping up with confidence in your test coverage.",
        "Evening insights, morning-ready results."
      ]
    };

    // Select random greeting based on time of day
    const timeGreetings = greetings[timeOfDay as keyof typeof greetings] || greetings.afternoon;
    const randomIndex = Math.floor(Math.random() * timeGreetings.length);
    
    return of(timeGreetings[randomIndex]);
  }

  /**
   * Create a personalized greeting with the user's name
   */
  private getPersonalizedGreeting(timeOfDay: string, name: string): Observable<string> {
    const personalGreetings = {
      morning: [
        `Welcome back, ${name}! Your automated tests are ready for a fresh start.`,
        `Rise and shine, ${name}! Let's automate with confidence today.`,
        `Good morning, ${name}! Your testing dashboard is ready for a productive day.`
      ],
      afternoon: [
        `Welcome, ${name}! Your automated testing suite awaits your command.`,
        `Hello ${name}! Afternoon is perfect for running those critical test scenarios.`,
        `${name}, your test automation just got smarter this afternoon.`
      ],
      evening: [
        `Good evening, ${name}. Let's wrap up those tests with confidence.`,
        `Evening check-in, ${name}. Your automation reports are ready for review.`,
        `Welcome back, ${name}! Evening is a great time to plan tomorrow's test strategy.`
      ]
    };

    // Select random greeting based on time of day
    const timeGreetings = personalGreetings[timeOfDay as keyof typeof personalGreetings] || personalGreetings.afternoon;
    const randomIndex = Math.floor(Math.random() * timeGreetings.length);
    
    return of(timeGreetings[randomIndex]);
  }
}