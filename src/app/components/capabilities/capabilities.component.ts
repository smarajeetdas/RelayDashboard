import { Component, OnInit } from '@angular/core';

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
  detailedDescription: string;
  features: CapabilityFeature[];
}

@Component({
  selector: 'app-capabilities',
  templateUrl: './capabilities.component.html',
  styleUrls: ['./capabilities.component.css']
})
export class CapabilitiesComponent implements OnInit {
  activeCapability: Capability | null = null;
  isDetailVisible: boolean = false;
  
  capabilities: Capability[] = [
    {
      id: 'mobile',
      icon: 'fa-mobile-alt',
      title: 'Mobile Automation',
      description: 'Comprehensive Mobile Testing',
      iconBgColor: 'rgba(250, 15, 0, 0.1)',
      bgClass: 'mobile-bg',
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
    // Initialize with the first capability active
    this.activeCapability = this.capabilities[0];
    setTimeout(() => {
      this.isDetailVisible = true;
    }, 500);
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
