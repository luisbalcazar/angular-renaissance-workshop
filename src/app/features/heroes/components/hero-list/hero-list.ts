import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { HeroItem } from '../hero-item/hero-item';
import { HeroPowerstatsChange } from '../../interfaces/hero-powerstats-change.interface';
import { HeroInterface } from '../../interfaces/hero.interface';

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
