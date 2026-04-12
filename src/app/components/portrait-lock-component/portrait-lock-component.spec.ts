import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortraitLockComponent } from './portrait-lock-component';

describe('PortraitLockComponent', () => {
  let component: PortraitLockComponent;
  let fixture: ComponentFixture<PortraitLockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortraitLockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PortraitLockComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
