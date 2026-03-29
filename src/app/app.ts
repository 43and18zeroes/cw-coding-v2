import { Component, ElementRef, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  // imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('cw-coding-v2');

  protected readonly activeSection = signal('s1');

  private readonly el = inject(ElementRef);

  ngAfterViewInit(): void {
    const sections = this.el.nativeElement.querySelectorAll('.screen');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection.set(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    sections.forEach((section: Element) => observer.observe(section));
  }

  protected scrollTo(id: string): void {
    const target = this.el.nativeElement.querySelector(`#${id}`);
    target?.scrollIntoView({ behavior: 'smooth' });
  }
}