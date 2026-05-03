import {
  Component,
  ElementRef,
  HostListener,
  Type,
  ViewChild,
  effect,
  inject,
  signal
} from '@angular/core';
import { HeroSection } from "./sections/hero-section/hero-section";
import { AboutMeSection } from "./sections/about-me-section/about-me-section";
import { SkillsSection } from "./sections/skills-section/skills-section";
import { PortfolioSection00 } from "./sections/portfolio-section-00/portfolio-section-00";
import { PortfolioSection01 } from "./sections/portfolio-section-01/portfolio-section-01";
import { ContactSection } from "./sections/contact-section/contact-section";
import { StickyHeaderComponent } from './components/sticky-header/sticky-header';
import { PortraitLockComponent } from './components/portrait-lock-component/portrait-lock-component';
import { NgComponentOutlet } from '@angular/common';
import { NavigationService } from './services/navigation-service';

type SectionItem = {
  id: string;
  title: string;
  component: Type<unknown>;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgComponentOutlet,
    StickyHeaderComponent,
    PortraitLockComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private nav = inject(NavigationService);

  constructor() {
    effect(() => {
      const id = this.nav.targetSectionId();
      if (id) {
        this.scrollToSectionById(id);
        this.nav.targetSectionId.set(null);
      }
    });
  }

  @ViewChild('scroller', { static: true }) scrollerRef!: ElementRef<HTMLElement>;

  protected readonly activeIndex = signal(0);

  protected readonly sections: SectionItem[] = [
    { id: 'hero', title: 'Start', component: HeroSection },
    { id: 'about', title: 'About me', component: AboutMeSection },
    { id: 'skills', title: 'Skills', component: SkillsSection },
    { id: 'portfolio-1', title: 'Portfolio', component: PortfolioSection00 },
    { id: 'portfolio-2', title: 'Portfolio', component: PortfolioSection01 },
    { id: 'contact', title: 'Contact', component: ContactSection }
  ];

  private readonly WHEEL_SCROLL_THRESHOLD = 30;
  private readonly SCROLL_ANIMATION_MS = 400;

  private scrollTicking = false;
  private isAnimatingScroll = false;
  private animationTimeout: ReturnType<typeof setTimeout> | null = null;
  private wheelAccumulator = 0;

  /* ngAfterViewInit Prod */

  // ngAfterViewInit(): void {
  //   this.updateActiveSection();
  // }

  /* ngAfterViewInit Dev */

  ngAfterViewInit(): void {
    this.updateActiveSection();

    setTimeout(() => {
      this.scrollToSection(1, true);
    });
  }

  protected onScroll(): void {
    if (this.scrollTicking || this.isAnimatingScroll) {
      return;
    }

    this.scrollTicking = true;

    requestAnimationFrame(() => {
      this.updateActiveSection();
      this.scrollTicking = false;
    });
  }

  /* scrollToSection Prod */

  // protected scrollToSection(index: number): void {
  //   const scroller = this.scrollerRef.nativeElement;
  //   const clampedIndex = this.normalizeIndex(index);
  //   const top = clampedIndex * scroller.clientHeight;

  //   this.isAnimatingScroll = true;
  //   this.activeIndex.set(clampedIndex);

  //   scroller.scrollTo({ top, behavior: 'smooth' });

  //   if (this.animationTimeout) {
  //     clearTimeout(this.animationTimeout);
  //   }

  //   this.animationTimeout = setTimeout(() => {
  //     this.isAnimatingScroll = false;
  //     this.updateActiveSection();
  //   }, this.SCROLL_ANIMATION_MS);
  // }

  /* scrollToSection Dev */

  protected scrollToSection(index: number, instant: boolean = false): void {
    const scroller = this.scrollerRef.nativeElement;
    const clampedIndex = this.normalizeIndex(index);
    const top = clampedIndex * scroller.clientHeight;

    this.isAnimatingScroll = true;
    this.activeIndex.set(clampedIndex);

    scroller.scrollTo({ top, behavior: instant ? 'auto' : 'smooth' });

    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }

    this.animationTimeout = setTimeout(() => {
      this.isAnimatingScroll = false;
      this.updateActiveSection();
    }, this.SCROLL_ANIMATION_MS);
  }

  protected scrollToSectionById(sectionId: string): void {
    if (sectionId === 'top' || sectionId === 'hero') {
      this.scrollToSection(0);
      return;
    }

    const index = this.sections.findIndex(section => section.id === sectionId);

    if (index !== -1) {
      this.scrollToSection(index);
    }
  }

  @HostListener('wheel', ['$event'])
  protected onWheel(event: WheelEvent): void {
    if (this.isCoarsePointerDevice()) {
      return;
    }

    const scroller = this.scrollerRef.nativeElement;

    if (!scroller.contains(event.target as Node)) {
      return;
    }

    event.preventDefault();

    if (this.isAnimatingScroll) {
      return;
    }

    this.wheelAccumulator += event.deltaY;

    if (Math.abs(this.wheelAccumulator) < this.WHEEL_SCROLL_THRESHOLD) {
      return;
    }

    const direction = this.wheelAccumulator > 0 ? 1 : -1;
    this.wheelAccumulator = 0;

    this.scrollToSection(this.activeIndex() + direction);
  }

  @HostListener('window:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    if (this.isAnimatingScroll) {
      return;
    }

    const target = event.target as HTMLElement | null;
    const tagName = target?.tagName?.toLowerCase();

    const isTypingField =
      tagName === 'input' ||
      tagName === 'textarea' ||
      target?.isContentEditable;

    if (isTypingField) {
      return;
    }

    const key = event.key.toLowerCase();

    if (key === 'arrowdown' || key === 's') {
      event.preventDefault();
      this.scrollToSection(this.activeIndex() + 1);
    }

    if (key === 'arrowup' || key === 'w') {
      event.preventDefault();
      this.scrollToSection(this.activeIndex() - 1);
    }
  }

  @HostListener('window:resize')
  protected onResize(): void {
    this.updateActiveSection();
  }

  private updateActiveSection(): void {
    const scroller = this.scrollerRef.nativeElement;
    const viewportHeight = scroller.clientHeight || window.innerHeight;
    const nextIndex = Math.round(scroller.scrollTop / viewportHeight);

    this.activeIndex.set(this.normalizeIndex(nextIndex));
  }

  private normalizeIndex(index: number): number {
    return Math.max(0, Math.min(index, this.sections.length - 1));
  }

  private isCoarsePointerDevice(): boolean {
    return window.matchMedia('(pointer: coarse)').matches;
  }
}