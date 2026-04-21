import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { HeroItem } from '../hero-item/hero-item';
import { HeroInterface } from '../../shared/interfaces/hero.interface';
import { HeroPowerstatsChange } from '../../shared/interfaces/hero-powerstats-change.interface';
import { Hero } from '../../shared/services/hero';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-list',
  imports: [HeroItem],
  template: `
    <div class="flex flex-wrap gap-4">
      @for (hero of heroes(); track hero.id) {
        <app-hero-item
          [hero]="hero"
          (powerstatsChange)="powerstatsChange.emit($event)"
          (removeHero)="removeHero.emit($event)"
        />
      } @empty {
        <h1>There are no heroes</h1>
      }
    </div>
  `,
})
export class HeroList {
  public heroes = input<HeroInterface[]>();
  powerstatsChange = output<HeroPowerstatsChange>();
  removeHero = output<HeroInterface>();
}
