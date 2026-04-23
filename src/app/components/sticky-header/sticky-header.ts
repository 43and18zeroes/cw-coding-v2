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

  private readonly BASE_HIDDEN_IDS = new Set(['hero', 'portfolio-2']);
  private readonly mediaQuery = window.matchMedia('(min-width: 600px)');

  isMenuOpen = signal(false);
  isWide = signal(this.mediaQuery.matches);

  constructor() {
    this.mediaQuery.addEventListener('change', (event) => {
      this.isWide.set(event.matches);
    });
  }

  get visibleSections() {
    const hiddenIds = new Set(this.BASE_HIDDEN_IDS);

    if (this.isWide()) {
      hiddenIds.add('contact');
    }

    return this.sections.filter(s => !hiddenIds.has(s.id));
  }

  toggleMenu() {
    this.isMenuOpen.update(val => !val);
  }

  protected onNavigate(sectionId: string): void {
    this.isMenuOpen.set(false);
    this.navigate.emit(sectionId);
  }
}