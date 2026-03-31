import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  host: {
    'class': 'snap-section-base'
  },
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.scss',
})
export class ContactSection { }
