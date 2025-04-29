import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ScrollAnimationService } from './services/scroll-animation.service';
import { SmoothScrollService } from './services/smooth-scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'RelayAngular';

  constructor(
    private scrollAnimationService: ScrollAnimationService,
    private smoothScrollService: SmoothScrollService
  ) {}

  ngOnInit(): void {
    // Any initialization logic
  }

  ngAfterViewInit(): void {
    // Initialize the scroll animations after the view is fully rendered
    setTimeout(() => {
      this.scrollAnimationService.init();
      // Initialize smooth scrolling for anchor links
      this.smoothScrollService.initSmoothScrolling();
    }, 100);
  }

  ngOnDestroy(): void {
    // Clean up the observer when the component is destroyed
    this.scrollAnimationService.destroy();
    
    // Clean up the scroll to top button
    this.smoothScrollService.destroyScrollToTopButton();
  }
}
