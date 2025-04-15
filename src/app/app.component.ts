import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ScrollAnimationService } from './services/scroll-animation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'RelayAngular';

  constructor(private scrollAnimationService: ScrollAnimationService) {}

  ngOnInit(): void {
    // Any initialization logic
  }

  ngAfterViewInit(): void {
    // Initialize the scroll animations after the view is fully rendered
    setTimeout(() => {
      this.scrollAnimationService.init();
    }, 100);
  }

  ngOnDestroy(): void {
    // Clean up the observer when the component is destroyed
    this.scrollAnimationService.destroy();
  }
}
