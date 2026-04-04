import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-sticky-header',
  standalone: true,
  templateUrl: './sticky-header.html',
  styleUrl: './sticky-header.scss'
})
export class StickyHeaderComponent {
  @Input({ required: true }) sections: { id: string; title: string }[] = [];
  @Input({ required: true }) activeIndex = 0;

  @Output() navigate = new EventEmitter<number>();

  protected readonly menuOpen = signal(false);

  protected toggleMenu(): void {
    this.menuOpen.update(value => !value);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected onNavigate(index: number): void {
    this.navigate.emit(index);
    this.closeMenu();
  }
}