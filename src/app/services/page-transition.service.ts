import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageTransitionService {
  private isTransitioning = new BehaviorSubject<boolean>(false);
  isTransitioning$ = this.isTransitioning.asObservable();

  private transitionType = new BehaviorSubject<string>('fade');
  transitionType$ = this.transitionType.asObservable();

  constructor() { }

  /**
   * Start page transition
   * @param type Transition type ('fade', 'slide-left', 'slide-right', 'slide-up', 'slide-down')
   * @returns Promise that resolves when transition is complete
   */
  startTransition(type: string = 'fade'): Promise<void> {
    this.transitionType.next(type);
    this.isTransitioning.next(true);
    
    return new Promise<void>((resolve) => {
      // Wait for CSS transition to complete (typically 300-500ms)
      setTimeout(() => {
        this.isTransitioning.next(false);
        resolve();
      }, 500);
    });
  }
}