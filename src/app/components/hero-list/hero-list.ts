import { Component, DestroyRef, inject, input } from '@angular/core';
import { HeroItem } from '../hero-item/hero-item';
import { HeroInterface } from '../../shared/interfaces/hero.interface';
import { HeroPowerstatsChange } from '../../shared/interfaces/hero-powerstats-change.interface';
import { Hero } from '../../shared/services/hero';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hero-list',
  imports: [HeroItem],
  template: `
    <div class="flex flex-wrap gap-4">
      @for (hero of heroes(); track hero.id) {
        <app-hero-item
          [hero]="hero"
          (powerstatsChange)="savePowerstat($event)"
          (removeHero)="removeHero($event)"
        />
      } @empty {
        <h1>There are no heroes</h1>
      }
    </div>
  `,
})
export class HeroList {
  public heroes = input<HeroInterface[]>();
  private readonly heroService = inject(Hero);
  private readonly destroyRef = inject(DestroyRef);

  savePowerstat({ hero, powerstat, value }: HeroPowerstatsChange) {
    this.heroService
      .updatePowerstat(hero, powerstat, value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (updatedHero) => console.log('Powerstat updated successfully:', updatedHero),
        error: (error) => console.error('Error updating powerstat: ', error),
        complete: () => console.log('Update powerstat operation completed'),
      });
  }

  removeHero(hero: HeroInterface) {
    this.heroService
      .remove(hero)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => console.log('Hero removed successfully'),
        error: (error) => console.error('Error removing hero: ', error),
        complete: () => console.log('Remove hero operation completed'),
      });
  }
}
