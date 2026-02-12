import { Component, DestroyRef, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { HeroList } from '../../components/hero-list/hero-list';
import { HeroInterface } from '../../shared/interfaces/hero.interface';
import { Hero } from '../../shared/services/hero';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [HeroList, AsyncPipe],
  template: `
    @let heroes = heroes$ | async;
    @if (heroes) {
      <app-hero-list [heroes]="heroes" />
    }
  `,
})
export class Home {
  private readonly heroService = inject(Hero);
  private readonly destroyRef$ = inject(DestroyRef);
  heroes$ = this.heroService.heroes$;

  constructor() {
    this.heroService.load().pipe(takeUntilDestroyed(this.destroyRef$)).subscribe();
  }
}
