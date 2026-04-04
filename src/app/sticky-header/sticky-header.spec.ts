import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyHeader } from './sticky-header';

describe('StickyHeader', () => {
  let component: StickyHeader;
  let fixture: ComponentFixture<StickyHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickyHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(StickyHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
