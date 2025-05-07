import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

interface CapabilityFeature {
  title: string;
  description: string;
}

interface Capability {
  id: string;
  icon: string;
  title: string;
  description: string;
  iconBgColor: string;
  bgClass: string;
  imageUrl: string;
  detailedDescription: string;
  features: CapabilityFeature[];
}

@Component({
  selector: 'app-capabilities',
  templateUrl: './capabilities.component.html',
  styleUrls: ['./capabilities.component.css']
})
export class CapabilitiesComponent implements OnInit, AfterViewInit {
  @ViewChild('sliderTrack') sliderTrack: ElementRef;
  
  activeCapability: Capability | null = null;
  isDetailVisible: boolean = false;
  scrollPosition: number = 0;
  
  capabilities: Capability[] = [
    {
      id: 'mobile',
      icon: 'fa-mobile-alt',
      title: 'Mobile Automation',
      description: 'Comprehensive Mobile Testing',
      iconBgColor: 'rgba(250, 15, 0, 0.1)',
      bgClass: 'mobile-bg',
      imageUrl: 'assets/images/capabilities/mobile-automation.svg',
      detailedDescription: 'Conduct seamless mobile application tests on physical and cloud-based devices',
      features: [
        { title: 'Multi-Device Testing', description: 'Executions on SauceLab & Physical Device' },
        { title: 'Localization Support', description: 'Real time capabilities of localization' },
        { title: 'Parallel Execution', description: 'Run sequential and parallel tests' },
        { title: 'Automatic Screenshots', description: 'Automatically capture screenshots' },
        { title: 'Manual Testing', description: 'Conduct manual testing on real browsers' }
      ]
    },
    {
      id: 'desktop',
      icon: 'fa-desktop',
      title: 'Desktop Automation',
      description: 'Cross-Platform Desktop Testing',
      iconBgColor: 'rgba(20, 115, 230, 0.1)',
      bgClass: 'desktop-bg',
      imageUrl: 'assets/images/capabilities/desktop-automation.svg',
      detailedDescription: 'Unified testing across Windows and macOS platforms',
      features: [
        { title: 'Script-Free Testing', description: 'Robust, script-free test creation' },
        { title: 'Cross-Platform', description: 'Compatible with Windows and MAC OS' },
        { title: 'Smart Automation', description: 'Smarter automation with locating strategies' },
        { title: 'Data-Driven', description: 'Data-driven tests with validations' },
        { title: 'Parallelization', description: 'Parallel execution runs' }
      ]
    },
    {
      id: 'chaos',
      icon: 'fa-random',
      title: 'Chaos Simulator',
      description: 'Controlled Chaos Engineering',
      iconBgColor: 'rgba(113, 44, 249, 0.1)',
      bgClass: 'chaos-bg',
      imageUrl: 'assets/images/capabilities/chaos-simulator.svg',
      detailedDescription: 'Introduce failure, Empower teams with controlled fault injection to uncover weaknesses, Build confidence.',
      features: [
        { title: 'Precision Fault Injection', description: 'Precision Fault Injection for infrastructure issues' },
        { title: 'Self-Service GameDays', description: 'Self-Service Chaos GameDays with unified interface' },
        { title: 'Multi-Tool Support', description: 'Support for Gremlin, AWS FIS, and Chaos Mesh' },
        { title: 'End-to-End Coverage', description: 'End-to-End coverage from VMs to Kubernetes' },
        { title: 'Multi-Environment', description: 'Multi-cloud and Ethos environment support' }
      ]
    },
    {
      id: 'functional',
      icon: 'fa-check-circle',
      title: 'Functional Automation',
      description: 'End-to-End Automation Framework',
      iconBgColor: 'rgba(0, 180, 120, 0.1)',
      bgClass: 'functional-bg',
      imageUrl: 'assets/images/capabilities/functional-automation.svg',
      detailedDescription: 'Orchestrate test flows effortlessly with a few clicks – no code needed',
      features: [
        { title: 'Framework Support', description: 'Automate execution using Selenium and Playwright frameworks' },
        { title: 'API Integration', description: 'Import APIs using Swagger for quick and structured test setups' },
        { title: 'Dynamic Testing', description: 'Test dynamic elements, apply validations, add custom JS' },
        { title: 'DevOps Integration', description: 'Integrate Vault configs, CI/CD pipelines, and JIRA' },
        { title: 'Test Organization', description: 'Create and organize filter, clone test cases, suites' }
      ]
    },
    {
      id: 'performance',
      icon: 'fa-tachometer-alt',
      title: 'Performance Lab',
      description: 'Real-World Performance',
      iconBgColor: 'rgba(255, 145, 0, 0.1)',
      bgClass: 'performance-bg',
      imageUrl: 'assets/images/capabilities/performance-lab.svg',
      detailedDescription: 'Reuse functional test cases to execute multi-region, scalable scenarios',
      features: [
        { title: 'Traffic Simulation', description: 'Design load configuration based on user traffic' },
        { title: 'Geo-Location Testing', description: 'Simulate load from multiple geo-locations' },
        { title: 'Live Monitoring', description: 'Visualize test progress with live monitoring' },
        { title: 'Bottleneck Identification', description: 'Identify Runtime bottlenecks' },
        { title: 'Trend Analysis', description: 'Analyze performance trends' }
      ]
    }
  ];

  constructor(private scrollAnimationService: ScrollAnimationService) { }

  ngOnInit(): void {
    // Initialize with Functional Automation as active by default
    const functionalAutomation = this.capabilities.find(cap => cap.id === 'functional');
    if (functionalAutomation) {
      this.activeCapability = functionalAutomation;
      this.isDetailVisible = true;
      
      // Allow time for DOM to render before initializing animations
      setTimeout(() => {
        this.initializeDetailAnimations();
      }, 300);
    }
  }
  
  ngAfterViewInit(): void {
    // First position the Functional Automation card in center, then start animation
    const sliderTrack = document.querySelector('.slider-track') as HTMLElement;
    if (sliderTrack) {
      // Position the functional card in the center by setting the initial transform
      sliderTrack.style.transform = 'translateX(calc(-250px * 3 - 60px))';
      
      // Pause animation initially
      sliderTrack.style.animationPlayState = 'paused';
      
      // Restart animation from beginning after a short delay
      setTimeout(() => {
        // Remove the transform to let animation take over
        sliderTrack.style.transform = '';
        
        // Set animation to start at its beginning
        sliderTrack.style.animationName = 'none';
        
        // Force a reflow to ensure the animation restart
        void sliderTrack.offsetWidth;
        
        // Restart animation
        sliderTrack.style.animationName = 'scroll';
        sliderTrack.style.animationPlayState = 'running';
      }, 2000);
    }
  }

  /**
   * Initialize animations for elements in the capability details section
   * This method removes any existing animation classes and re-adds them
   * to trigger the animation when a new capability is selected
   */
  private initializeDetailAnimations(): void {
    // Get all elements with data-animation in the capability-details section
    const detailsSection = document.querySelector('.capability-details');
    if (!detailsSection) return;
    
    const animatedElements = detailsSection.querySelectorAll('[data-animation]');
    
    // For each element with an animation attribute
    animatedElements.forEach(element => {
      // First, remove existing animation classes
      element.classList.remove('animate', 'animated', 'fade-in-up', 'fade-in-left', 'fade-in-right', 'scale-in');
      element.classList.remove('animate-delay-1', 'animate-delay-2', 'animate-delay-3', 'animate-delay-4');
      
      // Get the animation type from the data attribute
      const animationType = element.getAttribute('data-animation') || 'fade-in-up';
      
      // Re-add the animation classes after a short delay (forces re-animation)
      setTimeout(() => {
        element.classList.add('animate', animationType);
        
        // Add delay if specified
        const delay = element.getAttribute('data-animation-delay');
        if (delay) {
          element.classList.add(`animate-delay-${delay}`);
        }
        
        // Mark as animated
        element.classList.add('animated');
      }, 10);
    });
  }

  selectCapability(capability: Capability): void {
    if (this.activeCapability?.id === capability.id) {
      return;
    }
    
    // Set new capability immediately to highlight the card
    this.activeCapability = capability;
    
    // Hide current details first
    this.isDetailVisible = false;
    
    // Show the new details with a shorter delay (much faster)
    setTimeout(() => {
      this.isDetailVisible = true;
      
      // After the details section becomes visible, trigger animations on its elements
      setTimeout(() => {
        this.initializeDetailAnimations();
      }, 100);
    }, 50);
    
    // Pause the carousel animation when a card is selected
    const sliderTrack = document.querySelector('.slider-track') as HTMLElement;
    if (sliderTrack) {
      // Pause animation
      sliderTrack.style.animationPlayState = 'paused';
      
      // Resume animation after 5 seconds
      setTimeout(() => {
        // Ensure animation is running from right to left
        sliderTrack.style.animationName = 'none';
        void sliderTrack.offsetWidth; // Force reflow
        sliderTrack.style.animationName = 'scroll';
        sliderTrack.style.animationPlayState = 'running';
      }, 5000);
    }
  }
  
  isActive(capability: Capability): boolean {
    return this.activeCapability?.id === capability.id;
  }
}
