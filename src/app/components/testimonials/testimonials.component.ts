import { Component, OnInit } from '@angular/core';

interface Testimonial {
  name: string;
  title: string;
  quote: string;
  avatarClass: string;
}

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = [
    {
      name: 'James Davidson',
      title: 'Sr. QA Engineer, Adobe Creative Cloud',
      quote: 'Relay has transformed our testing process. The no-code automation capabilities have allowed our teams to accelerate testing needs, not just those with programming skills. We\'ve seen a 40% reduction in our maintenance overhead.',
      avatarClass: 'bg-danger'
    },
    {
      name: 'Sarah Liu',
      title: 'Technical Lead, Adobe Document Cloud',
      quote: 'The Chaos Simulator helped us identify critical performance bottlenecks in our service that our load testing missed. Now, we\'ve built more resilient systems that maintain performance even during unexpected events.',
      avatarClass: 'bg-primary'
    },
    {
      name: 'Robert Mehta',
      title: 'Quality Manager, Adobe Experience Cloud',
      quote: 'Integrating Relay into our CI/CD pipeline has given us confidence in our releases. The automated testing has helped us identify bottlenecks early, resulting in a 40% improvement in application response times.',
      avatarClass: 'bg-warning'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
