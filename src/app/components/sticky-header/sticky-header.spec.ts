import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyHeaderComponent } from './sticky-header';

describe('StickyHeaderComponent', () => {
  let component: StickyHeaderComponent;
  let fixture: ComponentFixture<StickyHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickyHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StickyHeaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
