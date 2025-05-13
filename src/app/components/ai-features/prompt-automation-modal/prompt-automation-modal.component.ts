import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-prompt-automation-modal',
  templateUrl: './prompt-automation-modal.component.html',
  styleUrls: ['./prompt-automation-modal.component.css']
})
export class PromptAutomationModalComponent implements OnInit {
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