import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  signal
} from '@angular/core';
import { HeroSection } from "./sections/hero-section/hero-section";
import { AboutMeSection } from "./sections/about-me-section/about-me-section";
import { SkillsSection } from "./sections/skills-section/skills-section";
import { PortfolioSection00 } from "./sections/portfolio-section-00/portfolio-section-00";
import { PortfolioSection01 } from "./sections/portfolio-section-01/portfolio-section-01";
import { ContactSection } from "./sections/contact-section/contact-section";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeroSection, AboutMeSection, SkillsSection, PortfolioSection00, PortfolioSection01, ContactSection],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  @ViewChild('scroller', { static: true }) scrollerRef!: ElementRef<HTMLElement>;

  protected readonly activeIndexSignal = signal(0);

  protected readonly sections = [
    { id: 'hero', title: 'Hero' },
    { id: 'abou', title: 'About me' },
    { id: 'skil', title: 'Skills' },
    { id: 'po00', title: 'Portfolio 01' },
    { id: 'po01', title: 'Portfolio 02' },
    { id: 'cont', title: 'Contact' }
  ];

  private scrollTicking = false;
  private isAnimatingScroll = false;
  private animationTimeout: ReturnType<typeof setTimeout> | null = null;
  private wheelAccumulator = 0;
  private readonly wheelThreshold = 30;

  get activeIndex(): number {
    return this.activeIndexSignal();
  }

  ngAfterViewInit(): void {
    this.updateActiveSection();
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

  protected scrollToSection(index: number): void {
    const scroller = this.scrollerRef.nativeElement;
    const clampedIndex = this.normalizeIndex(index);
    const top = clampedIndex * scroller.clientHeight;

    this.isAnimatingScroll = true;
    this.activeIndexSignal.set(clampedIndex);

    scroller.scrollTo({
      top,
      behavior: 'smooth'
    });

    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }

    this.animationTimeout = setTimeout(() => {
      this.isAnimatingScroll = false;
      this.updateActiveSection();
    }, 400);
  }

  @HostListener('wheel', ['$event'])
  protected onWheel(event: WheelEvent): void {
    if (this.isTouchLikeDevice()) {
      return;
    }

    const scroller = this.scrollerRef.nativeElement;
    const isInsideScroller = scroller.contains(event.target as Node);

    if (!isInsideScroller) {
      return;
    }

    event.preventDefault();

    if (this.isAnimatingScroll) {
      return;
    }

    this.wheelAccumulator += event.deltaY;

    if (Math.abs(this.wheelAccumulator) < this.wheelThreshold) {
      return;
    }

    const direction = this.wheelAccumulator > 0 ? 1 : -1;
    this.wheelAccumulator = 0;

    this.scrollToSection(this.activeIndex + direction);
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
      this.scrollToSection(this.activeIndex + 1);
    }

    if (key === 'arrowup' || key === 'w') {
      event.preventDefault();
      this.scrollToSection(this.activeIndex - 1);
    }
  }

  @HostListener('window:resize')
  protected onResize(): void {
    this.updateActiveSection();
  }

  private updateActiveSection(): void {
    const scroller = this.scrollerRef.nativeElement;
    const viewportHeight = scroller.clientHeight || window.innerHeight;
    const rawIndex = scroller.scrollTop / viewportHeight;
    const nextIndex = Math.round(rawIndex);

    this.activeIndexSignal.set(
      Math.max(0, Math.min(nextIndex, this.sections.length - 1))
    );
  }

  private normalizeIndex(index: number): number {
    return Math.max(0, Math.min(index, this.sections.length - 1));
  }

  private isTouchLikeDevice(): boolean {
    return window.matchMedia('(pointer: coarse)').matches;
  }
}