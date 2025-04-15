import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.css']
})
export class FeatureCardComponent implements OnInit {
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() iconBgColor: string = '#dc3545';

  constructor() { }

  ngOnInit(): void {
  }

}
