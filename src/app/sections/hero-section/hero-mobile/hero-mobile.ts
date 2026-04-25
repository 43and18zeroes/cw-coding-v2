import { Component, inject, input, output } from '@angular/core';
import { NavigationService } from '../../../services/navigation-service';

@Component({
  selector: 'app-hero-mobile',
  imports: [],
  templateUrl: './hero-mobile.html',
  styleUrls: [
    './hero-mobile.scss',
    '../hero-section.scss'
  ]
})
export class HeroMobile {
  private nav = inject(NavigationService);
  isActive = input<boolean>(false);

  next = output<void>();

  protected onNavigate(sectionId: string): void {
    this.nav.navigateTo(sectionId);
  }
}
