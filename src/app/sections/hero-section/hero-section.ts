import { Component } from '@angular/core';
import { HeroMobile } from "./hero-mobile/hero-mobile";

@Component({
  selector: 'app-hero-section',
  standalone: true,
  host: {
    'class': 'snap-section-base'
  },
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
  imports: [HeroMobile],
})
export class HeroSection { }
