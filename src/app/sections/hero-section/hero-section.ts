import { Component, input, output } from '@angular/core';

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
  isActive = input<boolean>(false);

  next = output<void>();
}
