import { Injectable } from '@angular/core';

/**
 * Service to handle smooth scrolling to elements on the page
 */
@Injectable({
  providedIn: 'root'
})
export class SmoothScrollService {
  private scrollTopButton: HTMLElement | null = null;
  
  /**
   * Scroll to an element with a given ID with smooth scrolling effect
   * @param elementId The ID of the element to scroll to
   * @param offset Optional offset from the top of the element (default: 80px for header height)
   * @param duration Optional duration of the scroll animation in milliseconds (default: 800ms)
   */
  scrollToElement(elementId: string, offset: number = 80, duration: number = 800): void {
    // Find the target element
    const targetElement = document.getElementById(elementId);
    
    if (!targetElement) {
      console.warn(`Element with ID '${elementId}' not found`);
      return;
    }
    
    // Get the target's position relative to the viewport
    const targetPosition = targetElement.getBoundingClientRect().top;
    
    // Get the current scroll position
    const startPosition = window.pageYOffset;
    
    // Calculate the target position with offset
    const targetOffset = targetPosition + startPosition - offset;
    
    // Track timing
    let startTime: number | null = null;
    
    /**
     * Animation function that gets called on each frame of the scroll animation
     */
    function animation(currentTime: number) {
      if (startTime === null) {
        startTime = currentTime;
      }
      
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function for smooth scroll animation (easeInOutQuad)
      const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      
      // Apply the scroll
      window.scrollTo(0, startPosition + (targetOffset - startPosition) * ease(progress));
      
      // Continue the animation if not complete
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }
    
    // Start the animation
    requestAnimationFrame(animation);
  }
  
  /**
   * Scroll to the top of the page with smooth scrolling effect
   * @param duration Optional duration of the scroll animation in milliseconds (default: 800ms)
   */
  scrollToTop(duration: number = 800): void {
    const startPosition = window.pageYOffset;
    
    // If already at top, do nothing
    if (startPosition === 0) {
      return;
    }
    
    // Track timing
    let startTime: number | null = null;
    
    /**
     * Animation function that gets called on each frame of the scroll animation
     */
    function animation(currentTime: number) {
      if (startTime === null) {
        startTime = currentTime;
      }
      
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function for smooth scroll animation (easeInOutQuad)
      const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      
      // Apply the scroll
      window.scrollTo(0, startPosition * (1 - ease(progress)));
      
      // Continue the animation if not complete
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }
    
    // Start the animation
    requestAnimationFrame(animation);
  }
  
  /**
   * Add smooth scrolling to all anchor links on the page
   * This will automatically add smooth scrolling to any link with href="#section-id"
   */
  initSmoothScrolling(): void {
    // Get all anchor links in the document
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    // Add click event listeners to each anchor link
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Prevent default anchor behavior
        e.preventDefault();
        
        // Get the target ID from the href attribute (remove the # symbol)
        const targetId = (link.getAttribute('href') || '').substring(1);
        
        // Only proceed if we have a non-empty target ID
        if (targetId) {
          // Scroll to the target element
          this.scrollToElement(targetId);
        }
      });
    });
    
    // Initialize the scroll to top button
    this.initScrollToTopButton();
  }
  
  /**
   * Create and initialize the scroll to top button
   * The button will appear when the user scrolls down the page
   * and will scroll the page back to the top when clicked
   */
  initScrollToTopButton(): void {
    // Create the button element if it doesn't exist
    if (!this.scrollTopButton) {
      this.scrollTopButton = document.createElement('button');
      this.scrollTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
      this.scrollTopButton.className = 'scroll-to-top';
      this.scrollTopButton.setAttribute('aria-label', 'Scroll to top');
      this.scrollTopButton.setAttribute('title', 'Scroll to top');
      document.body.appendChild(this.scrollTopButton);
      
      // Add click event listener
      this.scrollTopButton.addEventListener('click', () => {
        this.scrollToTop();
      });
      
      // Add scroll event listener to show/hide the button
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          this.scrollTopButton.classList.add('visible');
        } else {
          this.scrollTopButton.classList.remove('visible');
        }
      });
    }
  }
  
  /**
   * Remove the scroll to top button and clean up event listeners
   */
  destroyScrollToTopButton(): void {
    if (this.scrollTopButton) {
      document.body.removeChild(this.scrollTopButton);
      this.scrollTopButton = null;
    }
  }
}