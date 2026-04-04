import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-about-me-section',
  standalone: true,
  host: {
    'class': 'snap-section-base'
  },
  templateUrl: './about-me-section.html',
  styleUrl: './about-me-section.scss',
})
export class AboutMeSection {
  isActive = input<boolean>(false);

  next = output<void>();
}
