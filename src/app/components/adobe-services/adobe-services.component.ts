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
    { name: 'Lightroom', logoPath: 'assets/images/adobe-logos-official/lightroom.png', color: '#31A8FF' },
    { name: 'Photoshop', logoPath: 'assets/images/adobe-logos-official/photoshop.png', color: '#31A8FF' },
    { name: 'Adobe Connect', logoPath: 'assets/images/adobe-logos-official/connect.webp', color: '#1D7854' },
    { name: 'Acrobat', logoPath: 'assets/images/adobe-logos-official/acrobat.webp', color: '#ED2224' },
    { name: 'Adobe Express', logoPath: 'assets/images/adobe-logos-official/express.png', color: '#FF61F6' },
    { name: 'Illustrator', logoPath: 'assets/images/adobe-logos-official/illustrator.png', color: '#FF9A00' },
    { name: 'After Effects', logoPath: 'assets/images/adobe-logos-official/after-effects.png', color: '#9999FF' },
    { name: 'Adobe Learning Manager', logoPath: 'assets/images/adobe-logos-official/learning-manager.webp', color: '#F44C34' },
    { name: 'Adobe Experience Platform', logoPath: 'assets/images/adobe-logos-official/experience.png', color: '#FA0F00' }
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