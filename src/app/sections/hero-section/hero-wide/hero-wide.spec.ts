import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroWide } from './hero-wide';

describe('HeroWide', () => {
  let component: HeroWide;
  let fixture: ComponentFixture<HeroWide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroWide],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroWide);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
