import { Component, OnInit } from '@angular/core';

interface DemoVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  url: string;
}

@Component({
  selector: 'app-demo-videos',
  templateUrl: './demo-videos.component.html',
  styleUrls: ['./demo-videos.component.css']
})
export class DemoVideosComponent implements OnInit {
  demoVideos: DemoVideo[] = [
    {
      id: 'video1',
      title: 'Getting Started with Relay',
      description: 'Learn how to set up your first automation project using our platform.',
      thumbnail: 'assets/images/video-thumb-1.jpg',
      duration: '5:22',
      url: '#'
    },
    {
      id: 'video2',
      title: 'AI-Powered Test Creation',
      description: 'See how our AI creates intelligent test cases from minimal inputs.',
      thumbnail: 'assets/images/video-thumb-2.jpg',
      duration: '8:15', 
      url: '#'
    },
    {
      id: 'video3',
      title: 'Cross-Platform Testing',
      description: 'Test across Web, Mobile, and Desktop platforms with a single framework.',
      thumbnail: 'assets/images/video-thumb-3.jpg',
      duration: '6:47',
      url: '#'
    },
    {
      id: 'video4',
      title: 'Integrating with CI/CD',
      description: 'Learn how to integrate Relay with your existing CI/CD pipelines.',
      thumbnail: 'assets/images/video-thumb-4.jpg',
      duration: '7:33',
      url: '#'
    }
  ];
  
  activeVideo: DemoVideo | null = null;
  showVideoModal: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openVideoModal(video: DemoVideo): void {
    this.activeVideo = video;
    this.showVideoModal = true;
  }

  closeVideoModal(): void {
    this.showVideoModal = false;
    this.activeVideo = null;
  }
}