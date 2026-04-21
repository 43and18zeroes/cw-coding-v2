import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroMobile } from './hero-mobile';

describe('HeroMobile', () => {
  let component: HeroMobile;
  let fixture: ComponentFixture<HeroMobile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroMobile],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroMobile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
