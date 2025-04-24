import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

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
export class DetailSidebarComponent implements OnChanges {
  @Input() items: SidebarItem[] = [];
  @Input() activeItemId: string = '';
  @Input() title: string = 'Navigation';
  @Output() itemSelect = new EventEmitter<string>();
  
  activeIndex: number = 0;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['activeItemId'] || changes['items']) {
      this.updateActiveIndex();
    }
  }
  
  updateActiveIndex(): void {
    const index = this.items.findIndex(item => item.id === this.activeItemId);
    this.activeIndex = index >= 0 ? index : 0;
  }
  
  selectItem(itemId: string): void {
    this.activeItemId = itemId;
    this.updateActiveIndex();
    this.itemSelect.emit(itemId);
  }
  
  isActive(itemId: string): boolean {
    return this.activeItemId === itemId;
  }
}