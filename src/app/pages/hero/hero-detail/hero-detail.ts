import { Component, inject, input, signal, effect, DestroyRef } from '@angular/core';
import { HeroItem } from '../../../components/hero-item/hero-item';
import { Hero } from '../../../shared/services/hero';
import { HeroInterface } from '../../../shared/interfaces/hero.interface';
import { HeroItemNotFound } from '../../../components/hero-item-not-found/hero-item-not-found';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hero-detail',
  imports: [HeroItem, HeroItemNotFound],
  template: `
    @if (hero()) {
      <app-hero-item [hero]="hero()" />
    } @else {
      <app-hero-item-not-found />
    }
  `,
})
export class HeroDetail {
  private readonly heroService = inject(Hero);

  id = input(0, { transform: Number });
  hero = signal<HeroInterface>(this.heroService.nullHero);

  constructor(private destroyRef$: DestroyRef) {
    effect(() =>
      this.heroService
        .findOne(this.id())
        .pipe(takeUntilDestroyed(this.destroyRef$))
        .subscribe({
          next: (_hero) => this.hero.set(_hero),
        }),
    );
  }
}
