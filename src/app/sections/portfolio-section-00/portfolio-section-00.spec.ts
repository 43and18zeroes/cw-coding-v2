import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioSection00 } from './portfolio-section-00';

describe('PortfolioSection00', () => {
  let component: PortfolioSection00;
  let fixture: ComponentFixture<PortfolioSection00>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioSection00],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioSection00);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
