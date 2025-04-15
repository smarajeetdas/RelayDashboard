import { Component, OnInit } from '@angular/core';

interface Capability {
  id: string;
  icon: string;
  title: string;
  description: string;
  iconBgColor: string;
}

@Component({
  selector: 'app-capabilities',
  templateUrl: './capabilities.component.html',
  styleUrls: ['./capabilities.component.css']
})
export class CapabilitiesComponent implements OnInit {
  capabilities: Capability[] = [
    {
      id: 'mobile',
      icon: 'fa-mobile-alt',
      title: 'Mobile Automation',
      description: 'Comprehensive Mobile Testing',
      iconBgColor: '#f8f9fa'
    },
    {
      id: 'desktop',
      icon: 'fa-desktop',
      title: 'Desktop Automation',
      description: 'Cross-Platform Desktop Testing',
      iconBgColor: '#f8f9fa'
    },
    {
      id: 'chaos',
      icon: 'fa-random',
      title: 'Chaos Simulator',
      description: 'Controlled Chaos Engineering',
      iconBgColor: '#f8f9fa'
    },
    {
      id: 'functional',
      icon: 'fa-check-circle',
      title: 'Functional Automation',
      description: 'End-to-End Automation Framework',
      iconBgColor: '#f8f9fa'
    },
    {
      id: 'performance',
      icon: 'fa-tachometer-alt',
      title: 'Performance Lab',
      description: 'Real-World Performance',
      iconBgColor: '#f8f9fa'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
