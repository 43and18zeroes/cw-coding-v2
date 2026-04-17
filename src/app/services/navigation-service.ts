import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  readonly targetSectionId = signal<string | null>(null);

  navigateTo(sectionId: string): void {
    this.targetSectionId.set(sectionId);
  }
}
