import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

interface AdobeService {
  name: string;
  logo: string;
  color: string;
}

@Component({
  selector: 'app-adobe-services',
  templateUrl: './adobe-services.component.html',
  styleUrls: ['./adobe-services.component.css']
})
export class AdobeServicesComponent implements OnInit, AfterViewInit {
  adobeServices: AdobeService[] = [
    { name: 'Lightroom', logo: 'fa-camera-retro', color: '#ADD8E6' },
    { name: 'Photoshop', logo: 'fa-image', color: '#31A8FF' },
    { name: 'Adobe Connect', logo: 'fa-video', color: '#69C8C8' },
    { name: 'Acrobat', logo: 'fa-file-pdf', color: '#ED2224' },
    { name: 'Adobe Express', logo: 'fa-palette', color: '#FF61F6' },
    { name: 'Illustrator', logo: 'fa-pen-nib', color: '#FF9A00' },
    { name: 'After Effects', logo: 'fa-film', color: '#9999FF' },
    { name: 'Adobe Learning Manager', logo: 'fa-graduation-cap', color: '#4B99D8' },
    { name: 'Adobe Experience Platform', logo: 'fa-cogs', color: '#FA0F00' }
  ];

  constructor(private scrollAnimationService: ScrollAnimationService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Initialize scroll animations after view is initialized
    setTimeout(() => {
      this.scrollAnimationService.init();
    }, 100);
  }
}