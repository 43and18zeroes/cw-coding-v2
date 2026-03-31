import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioSection01 } from './portfolio-section-01';

describe('PortfolioSection01', () => {
  let component: PortfolioSection01;
  let fixture: ComponentFixture<PortfolioSection01>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioSection01],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioSection01);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
