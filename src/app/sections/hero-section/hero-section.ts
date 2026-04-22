import { Component } from '@angular/core';
import { HeroMobile } from "./hero-mobile/hero-mobile";
import { HeroWide } from "./hero-wide/hero-wide";

@Component({
  selector: 'app-hero-section',
  standalone: true,
  host: {
    'class': 'snap-section-base'
  },
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
  imports: [HeroMobile, HeroWide],
})
export class HeroSection { }
