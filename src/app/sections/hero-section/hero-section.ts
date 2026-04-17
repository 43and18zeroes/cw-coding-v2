import { Component, EventEmitter, inject, input, Output, output } from '@angular/core';
import { NavigationService } from '../../services/navigation-service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  host: {
    'class': 'snap-section-base'
  },
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection {
  private nav = inject(NavigationService);
  isActive = input<boolean>(false);

  next = output<void>();

  protected onNavigate(sectionId: string): void {
    this.nav.navigateTo(sectionId);
  }
}
