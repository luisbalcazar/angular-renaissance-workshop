import { Component, computed, DestroyRef, inject, input, signal } from '@angular/core';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HeroItemNotFound } from '../../../components/hero-item-not-found/hero-item-not-found';
import { HeroItem } from '../../../components/hero-item/hero-item';
import { HeroInterface } from '../../../shared/interfaces/hero.interface';
import { Hero } from '../../../shared/services/hero';
import { HeroPowerstatsChange } from '../../../shared/interfaces/hero-powerstats-change.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-detail',
  imports: [HeroItem, HeroItemNotFound],
  template: `
    @if (hero()) {
      <app-hero-item
        [hero]="hero()"
        (powerstatsChange)="savePowerstat($event)"
        (removeHero)="removeHero($event)"
      />
    } @else {
      <app-hero-item-not-found />
    }
  `,
})
export class HeroDetail {
  private readonly heroService = inject(Hero);
  private readonly destroyRef = inject(DestroyRef);
  private readonly routerService = inject(Router);

  id = input(0, { transform: Number });
  //hero = signal<HeroInterface>(this.heroService.nullHero);
  private readonly heroResource = rxResource({
    stream: () => {
      const id = this.id(); // ← Signal reactivoyy
      return this.heroService.findOne(id);
    },
  });
  hero = computed(() => this.heroResource.value() ?? this.heroService.nullHero);

  savePowerstat({ hero, powerstat, value }: HeroPowerstatsChange) {
    this.heroService
      .updatePowerstat(hero, powerstat, value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.heroResource.reload(),
        error: (error) => console.error('Error updating powerstat: ', error),
        complete: () => console.log('Update powerstat operation completed'),
      });
  }

  removeHero(hero: HeroInterface) {
    this.heroService
      .remove(hero)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => this.heroResource.reload(),
        error: (error) => console.error('Error removing hero: ', error),
        complete: () => this.routerService.navigate(['/home']),
      });
  }
}
