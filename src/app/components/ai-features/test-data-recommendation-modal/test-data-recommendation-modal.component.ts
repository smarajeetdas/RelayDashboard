import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-test-data-recommendation-modal',
  templateUrl: './test-data-recommendation-modal.component.html',
  styleUrls: ['./test-data-recommendation-modal.component.css']
})
export class TestDataRecommendationModalComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.closeModal.emit();
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}