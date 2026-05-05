import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  readonly isIOs = signal(this.checkIOs());

  private checkIOs(): boolean {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  }
}
