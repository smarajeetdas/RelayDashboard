import { Component, OnInit } from '@angular/core';

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  iconBgColor: string;
}

@Component({
  selector: 'app-quality-driven',
  templateUrl: './quality-driven.component.html',
  styleUrls: ['./quality-driven.component.css']
})
export class QualityDrivenComponent implements OnInit {
  features: Feature[] = [
    {
      id: 'no-code',
      icon: 'fa-code',
      title: 'No-Code Automation',
      description: 'Build complete testcases with drag-n-drop functionality',
      iconBgColor: '#6f42c1' // Purple
    },
    {
      id: 'cross-platform',
      icon: 'fa-laptop-code',
      title: 'Cross-Platform Support',
      description: 'Test across Web, iOS, Android, and Windows platforms with a single framework.',
      iconBgColor: '#e83e8c' // Pink
    },
    {
      id: 'ai-testing',
      icon: 'fa-robot',
      title: 'AI-Enhanced Testing',
      description: 'Leverage machine learning for intelligent test creation, execution, and optimization.',
      iconBgColor: '#fd7e14' // Orange
    },
    {
      id: 'ci/cd',
      icon: 'fa-cogs',
      title: 'CI/CD Integration',
      description: 'Seamlessly integrate into continuous development workflows with built-in connectors.',
      iconBgColor: '#20c997' // Teal
    },
    {
      id: 'analytics',
      icon: 'fa-chart-bar',
      title: 'Advanced Analytics',
      description: 'Gain insights through comprehensive reporting and advanced test analytics.',
      iconBgColor: '#0d6efd' // Blue
    },
    {
      id: 'resilience',
      icon: 'fa-shield-alt',
      title: 'Resilience Testing',
      description: 'Simulate real-world scenarios and validate your applications can withstand stress.',
      iconBgColor: '#dc3545' // Red
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
