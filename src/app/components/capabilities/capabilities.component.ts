import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

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
      detailedDescription: 'Introduce failure. Build confidence. Empower your teams with controlled chaos engineering to uncover weaknesses before your service teams do.',
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

  constructor() { }

  ngOnInit(): void {
    // Don't initialize any capability as active
    this.activeCapability = null;
    this.isDetailVisible = false;
  }
  
  ngAfterViewInit(): void {
    // Set up auto scroll for mobile
    this.startAutoScroll();
  }
  
  // Function to scroll left within the carousel
  scrollLeft(): void {
    if (this.sliderTrack && this.sliderTrack.nativeElement) {
      const scrollElement = this.sliderTrack.nativeElement.parentElement;
      const currentScroll = scrollElement.scrollLeft;
      scrollElement.scrollTo({
        left: currentScroll - 300,
        behavior: 'smooth'
      });
    }
  }

  // Function to scroll right within the carousel
  scrollRight(): void {
    if (this.sliderTrack && this.sliderTrack.nativeElement) {
      const scrollElement = this.sliderTrack.nativeElement.parentElement;
      const currentScroll = scrollElement.scrollLeft;
      scrollElement.scrollTo({
        left: currentScroll + 300,
        behavior: 'smooth'
      });
    }
  }
  
  startAutoScroll(): void {
    // Auto scroll on smaller screens
    if (window.innerWidth < 992) {
      let direction = 1; // 1 is right, -1 is left
      let scrollAmount = 0;
      
      setInterval(() => {
        if (this.sliderTrack && this.sliderTrack.nativeElement) {
          const scrollElement = this.sliderTrack.nativeElement.parentElement;
          const maxScroll = this.sliderTrack.nativeElement.scrollWidth - scrollElement.clientWidth;
          
          // Change direction when reaching the beginning or end
          if (scrollAmount >= maxScroll) direction = -1;
          if (scrollAmount <= 0) direction = 1;
          
          scrollAmount += 1 * direction;
          scrollElement.scrollLeft = scrollAmount;
        }
      }, 20);
    }
  }

  selectCapability(capability: Capability): void {
    if (this.activeCapability?.id === capability.id) {
      return;
    }
    
    this.isDetailVisible = false;
    
    setTimeout(() => {
      this.activeCapability = capability;
      setTimeout(() => {
        this.isDetailVisible = true;
      }, 100);
    }, 300);
  }
  
  isActive(capability: Capability): boolean {
    return this.activeCapability?.id === capability.id;
  }
}
