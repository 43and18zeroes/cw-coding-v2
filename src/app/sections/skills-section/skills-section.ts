import { Component } from '@angular/core';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  host: {
    'class': 'snap-section-base'
  },
  templateUrl: './skills-section.html',
  styleUrl: './skills-section.scss',
})
export class SkillsSection { }
