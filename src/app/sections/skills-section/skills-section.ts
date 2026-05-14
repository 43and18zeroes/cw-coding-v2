import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NavigationService } from '../../services/navigation-service';
import { SKILLS_DATA } from './skills.data';

interface Skill {
  name: string;
  svg: SafeHtml;
}

@Component({
  selector: 'app-skills-section',
  standalone: true,
  host: {
    class: 'snap-section-base',
  },
  templateUrl: './skills-section.html',
  styleUrl: './skills-section.scss',
})
export class SkillsSection {
  private nav = inject(NavigationService);
  private san = inject(DomSanitizer);

  protected skills: Skill[] = SKILLS_DATA.map(skill => ({
    name: skill.name,
    svg: this.san.bypassSecurityTrustHtml(skill.svg),
  }));

  protected onNavigate(sectionId: string): void {
    this.nav.navigateTo(sectionId);
  }
}