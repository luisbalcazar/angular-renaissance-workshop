import { CanDeactivateFn } from '@angular/router';
import { HeroUpdate } from '../pages/hero-update/hero-update';

export const heroUnsavedChangesGuard: CanDeactivateFn<HeroUpdate> = (component) =>
  component.canDeactivate();
