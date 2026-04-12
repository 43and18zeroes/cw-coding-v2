import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-sticky-header',
  standalone: true,
  templateUrl: './sticky-header.html',
  styleUrl: './sticky-header.scss'
})
export class StickyHeaderComponent {
  @Input({ required: true }) sections: { id: string; title: string }[] = [];
  @Input() activeSectionId = '';

  @Output() navigate = new EventEmitter<string>();

  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update(val => !val);
  }

  protected onNavigate(sectionId: string): void {
    this.isMenuOpen.set(false);
    this.navigate.emit(sectionId);
  }
}