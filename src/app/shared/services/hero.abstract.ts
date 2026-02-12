import { Observable } from 'rxjs';
import { HeroInterface } from '../interfaces/hero.interface';

export abstract class HeroServiceAbstract {
  protected readonly baseUrl = 'http://localhost:9000/heroes';

  readonly defaultHero: HeroInterface = {
    id: Math.floor(Math.random() * 10000),
    name: 'Joker',
    powerstats: {
      intelligence: 100,
      strength: 10,
      speed: 12,
      durability: 60,
      power: 43,
      combat: 90,
    },
    image: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/370-joker.jpg',
    alignment: 'bad',
  };

  readonly nullHero: HeroInterface = {
    id: 0,
    name: 'Unknown Hero',
    powerstats: {
      intelligence: 0,
      strength: 0,
      speed: 0,
      durability: 0,
      power: 0,
      combat: 0,
    },
    image: './assets/img/hero-not-found.png',
    alignment: 'good',
  };

  isDefaultHero(hero: HeroInterface): boolean {
    return hero.id === this.defaultHero.id;
  }

  isNullHero(hero: HeroInterface): boolean {
    return hero.id === this.nullHero.id;
  }

  abstract load(): Observable<{ heroes: HeroInterface[]; total: number }>;
  abstract add(hero: HeroInterface): Observable<HeroInterface>;
  abstract update(heroUpdate: HeroInterface): Observable<HeroInterface>;
  abstract updatePowerstat(
    hero: HeroInterface,
    stat: keyof HeroInterface['powerstats'],
    value: number,
  ): Observable<HeroInterface>;
  abstract remove(hero: HeroInterface): Observable<void>;
  abstract findOne(id: number): Observable<HeroInterface>;
  abstract findAll(params?: {
    page?: number;
    limit?: number;
  }): Observable<{ heroes: HeroInterface[]; total: number }>;
}
