import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface SidebarItem {
  id: string;
  icon: string;
  label: string;
  isActive?: boolean;
}

@Component({
  selector: 'app-detail-sidebar',
  templateUrl: './detail-sidebar.component.html',
  styleUrls: ['./detail-sidebar.component.css']
})
export class DetailSidebarComponent {
  @Input() items: SidebarItem[] = [];
  @Input() activeItemId: string = '';
  @Output() itemSelect = new EventEmitter<string>();
  
  selectItem(itemId: string): void {
    this.activeItemId = itemId;
    this.itemSelect.emit(itemId);
  }
  
  isActive(itemId: string): boolean {
    return this.activeItemId === itemId;
  }
}