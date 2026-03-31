import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeSection } from './about-me-section';

describe('AboutMeSection', () => {
  let component: AboutMeSection;
  let fixture: ComponentFixture<AboutMeSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutMeSection],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutMeSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
