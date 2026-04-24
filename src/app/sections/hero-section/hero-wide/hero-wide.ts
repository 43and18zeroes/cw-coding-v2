import { Component, inject } from '@angular/core';
import { NavigationService } from '../../../services/navigation-service';

@Component({
  selector: 'app-hero-wide',
  imports: [],
  templateUrl: './hero-wide.html',
  styleUrl: './hero-wide.scss',
})
export class HeroWide {
  private nav = inject(NavigationService);

  protected onNavigate(sectionId: string): void {
    this.nav.navigateTo(sectionId);
  }
}
