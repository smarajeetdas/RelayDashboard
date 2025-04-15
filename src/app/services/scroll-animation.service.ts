import { Injectable, NgZone } from '@angular/core';

/**
 * Service to handle scroll-based animations with IntersectionObserver
 */
@Injectable({
  providedIn: 'root'
})
export class ScrollAnimationService {
  private observer: IntersectionObserver;

  constructor(private ngZone: NgZone) { }

  /**
   * Initialize the scroll animation by setting up an IntersectionObserver
   * to apply animation classes when elements become visible in the viewport
   */
  init(): void {
    this.ngZone.runOutsideAngular(() => {
      const options = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
      };

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // If the element is in the viewport
          if (entry.isIntersecting) {
            // Adds the animation classes
            this.ngZone.run(() => {
              const classList = entry.target.classList;
              if (!classList.contains('animated')) {
                // Add animation class based on data attribute
                const animationType = entry.target.getAttribute('data-animation') || 'fade-in-up';
                classList.add('animate', animationType, 'animated');
                
                // Add delay if specified
                const delay = entry.target.getAttribute('data-animation-delay');
                if (delay) {
                  classList.add(`animate-delay-${delay}`);
                }
              }
            });
          }
        });
      }, options);

      // Target all elements that should be animated on scroll
      document.querySelectorAll('[data-animation]').forEach(el => {
        this.observer.observe(el);
      });
    });
  }

  /**
   * Manually trigger the animation on an element
   * @param element The element to animate
   */
  animateElement(element: HTMLElement): void {
    if (!element) return;
    const animationType = element.getAttribute('data-animation') || 'fade-in-up';
    element.classList.add('animate', animationType);
  }

  /**
   * Disconnect the IntersectionObserver when no longer needed
   */
  destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}