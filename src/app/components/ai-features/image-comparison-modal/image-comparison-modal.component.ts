import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-comparison-modal',
  templateUrl: './image-comparison-modal.component.html',
  styleUrls: ['./image-comparison-modal.component.css']
})
export class ImageComparisonModalComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Handle closing the modal
   * This method is called from the template
   */
  handleClose(): void {
    this.closeModalEvent.emit();
  }
}