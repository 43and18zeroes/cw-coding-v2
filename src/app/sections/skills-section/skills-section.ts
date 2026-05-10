import { Component, inject } from '@angular/core';
import { NavigationService } from '../../services/navigation-service';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  host: {
    'class': 'snap-section-base'
  },
  templateUrl: './skills-section.html',
  styleUrl: './skills-section.scss',
})
export class SkillsSection {
  private nav = inject(NavigationService);

  protected onNavigate(sectionId: string): void {
    this.nav.navigateTo(sectionId);
  }
}
