import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ScrollAnimationService } from '../../services/scroll-animation.service';

interface AdobeService {
  name: string;
  logoPath: string;
  color: string;
}

@Component({
  selector: 'app-adobe-services',
  templateUrl: './adobe-services.component.html',
  styleUrls: ['./adobe-services.component.css']
})
export class AdobeServicesComponent implements OnInit, AfterViewInit {
  adobeServices: AdobeService[] = [
    { name: 'Lightroom', logoPath: 'assets/images/adobe-logos/lightroom.svg', color: '#ADD8E6' },
    { name: 'Photoshop', logoPath: 'assets/images/adobe-logos/photoshop.svg', color: '#31A8FF' },
    { name: 'Adobe Connect', logoPath: 'assets/images/adobe-logos/connect.svg', color: '#69C8C8' },
    { name: 'Acrobat', logoPath: 'assets/images/adobe-logos/acrobat.svg', color: '#ED2224' },
    { name: 'Adobe Express', logoPath: 'assets/images/adobe-logos/express.svg', color: '#FF61F6' },
    { name: 'Illustrator', logoPath: 'assets/images/adobe-logos/illustrator.svg', color: '#FF9A00' },
    { name: 'After Effects', logoPath: 'assets/images/adobe-logos/after-effects.svg', color: '#9999FF' },
    { name: 'Adobe Learning Manager', logoPath: 'assets/images/adobe-logos/learning-manager.svg', color: '#4B99D8' },
    { name: 'Adobe Experience Platform', logoPath: 'assets/images/adobe-logos/experience.svg', color: '#FA0F00' }
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