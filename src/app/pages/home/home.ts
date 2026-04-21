import { Component, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HeroList } from '../../components/hero-list/hero-list';
import { Hero } from '../../shared/services/hero';
import { HeroInterface } from '../../shared/interfaces/hero.interface';
import { HeroPowerstatsChange } from '../../shared/interfaces/hero-powerstats-change.interface';

@Component({
  selector: 'app-home',
  imports: [HeroList],
  template: `
    @if (heroes()) {
      <app-hero-list
        [heroes]="heroes()"
        (powerstatsChange)="onPowerstatsChange($event)"
        (removeHero)="onRemoveHero($event)"
      />
    }
  `,
})
export class Home {
  private readonly heroService = inject(Hero);
  heroes = this.heroService.heroes;
  heroesResource = rxResource({
    stream: () => this.heroService.load(),
  });

  reloadHeroes() {
    this.heroesResource.reload();
  }

  onRemoveHero(hero: HeroInterface) {
    this.heroService.remove(hero).subscribe({
      next: () => {
        this.heroesResource.reload();
      },
    });
  }

  onPowerstatsChange(change: HeroPowerstatsChange) {
    this.heroService.updatePowerstat(change.hero, change.powerstat, change.value).subscribe({
      next: () => {
        this.heroesResource.reload();
      },
    });
  }
}
