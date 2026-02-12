import { Component, computed, inject, input, OnChanges, SimpleChanges } from '@angular/core';
import { HeroItem } from '../../../components/hero-item/hero-item';
import { Hero } from '../../../shared/services/hero';
import { HeroInterface } from '../../../shared/interfaces/hero.interface';
import { HeroItemNotFound } from '../../../components/hero-item-not-found/hero-item-not-found';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  imports: [HeroItem, HeroItemNotFound, AsyncPipe],
  template: `
    @let hero = this.hero$ | async;
    @if (hero) {
      <app-hero-item [hero]="hero" />
    } @else {
      <app-hero-item-not-found />
    }
  `,
})
export class HeroDetail implements OnChanges {
  private readonly heroService = inject(Hero);

  id = input(0, { transform: Number });
  hero$: Observable<HeroInterface> = of();

  ngOnChanges(): void {
    this.hero$ = this.heroService.findOne(this.id());
  }
}
