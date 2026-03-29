import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  signal
} from '@angular/core';
import { DecimalPipe } from '@angular/common';

type SnapSection = {
  id: number;
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  metaLeft: string;
  metaRight: string;
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  @ViewChild('scroller', { static: true })
  scrollerRef!: ElementRef<HTMLElement>;

  protected readonly activeIndexSignal = signal(0);

  protected readonly sections: SnapSection[] = [
    {
      id: 1,
      eyebrow: 'Performance',
      title: 'Mechanical emotion',
      text: 'Großflächige Panels, starke Typografie und ein fast cineastischer Fullscreen-Wechsel – genau das bildet dieser Scroll-Snap-Ansatz nach.',
      image: 'https://cdn.pixabay.com/photo/2015/03/18/11/10/the-scenery-679134_960_720.jpg',
      metaLeft: 'Swiss precision',
      metaRight: 'Section 01'
    },
    {
      id: 2,
      eyebrow: 'Craft',
      title: 'Built in layers',
      text: 'Jede Section nimmt die gesamte Viewport-Höhe ein. Beim Scrollen rastet der Viewport sauber auf der nächsten Bühne ein – ohne zusätzliches Routing oder Slider-Library.',
      image: 'https://cdn.pixabay.com/photo/2022/12/07/20/15/earth-7641871_960_720.jpg',
      metaLeft: 'Advanced materials',
      metaRight: 'Section 02'
    },
    {
      id: 3,
      eyebrow: 'Design',
      title: 'Snap with presence',
      text: 'Das Layout kombiniert Scroll Snap mit festen Seitenelementen, dunklen Overlays und klarer Navigationslogik. Dadurch wirkt der Wechsel hochwertig und kontrolliert.',
      image: 'https://cdn.pixabay.com/photo/2017/09/20/14/37/sneaker-2768760_1280.jpg',
      metaLeft: 'Immersive layout',
      metaRight: 'Section 03'
    },
    {
      id: 4,
      eyebrow: 'Angular 21',
      title: 'Ready to adapt',
      text: 'Du kannst die Demo direkt erweitern: echte Produktdaten, Videos, Parallax-Layer, Wheel-Locking oder horizontale Snap-Bereiche innerhalb einzelner Sections.',
      image: 'https://cdn.pixabay.com/photo/2017/08/23/16/03/io-centers-2673317_960_720.jpg',
      metaLeft: 'Standalone component',
      metaRight: 'Section 04'
    }
  ];

  private scrollTicking = false;
  private isAnimatingScroll = false;
  private animationTimeout: ReturnType<typeof setTimeout> | null = null;
  private wheelAccumulator = 0;
  private readonly wheelThreshold = 45;

  get activeIndex(): number {
    return this.activeIndexSignal();
  }

  ngAfterViewInit(): void {
    this.updateActiveSection();
  }

  protected onScroll(): void {
    if (this.scrollTicking) {
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
    }, 850);
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
    if (index >= this.sections.length) {
      return 0;
    }

    if (index < 0) {
      return 0;
    }

    return index;
  }

  private isTouchLikeDevice(): boolean {
    return window.matchMedia('(pointer: coarse)').matches;
  }
}