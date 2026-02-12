import { Component, input, computed, output } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { HeroInterface, Powerstat } from '../../shared/interfaces/hero.interface';
import { HeroPowerstatsChange } from '../../shared/interfaces/hero-powerstats-change.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-item',
  imports: [KeyValuePipe, RouterLink],
  templateUrl: './hero-item.html',
})
export class HeroItem {
  hero = input.required<HeroInterface>();
  powerstatsChange = output<HeroPowerstatsChange>();
  removeHero = output<HeroInterface>();

  isHeroVillain = computed(() => this.hero().alignment === 'bad');

  decrementPowerstat(stat: Powerstat): void {
    this.powerstatsChange.emit({
      hero: this.hero(),
      powerstat: stat,
      value: -1,
    });
  }

  incrementPowerstat(stat: Powerstat): void {
    this.powerstatsChange.emit({
      hero: this.hero(),
      powerstat: stat,
      value: 1,
    });
  }

  remove(hero: HeroInterface): void {
    this.removeHero.emit(hero);
  }
}
