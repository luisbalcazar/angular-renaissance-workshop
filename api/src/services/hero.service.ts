import { autoInjectable } from 'tsyringe';
import { heroes } from '../heroes-db-lite';
import { Hero } from '../interfaces/hero.interface';

@autoInjectable()
export class HeroService {
  private fakeID = 10000;
  private heroes: Hero[] = heroes;

  findAll(page: number = 1, limit: number = 10): { heroes: Hero[]; total: number } {
    const startIndex = (page - 1) * limit; //definimos el comienzo del array a retornar, dependiendo de la página y el límite
    const endIndex = page * limit; // definimos el final del array a retornar, dependiendo de la página y el límite
    return { heroes: this.heroes.slice(startIndex, endIndex), total: this.heroes.length };
  }

  findOne(id: number): Hero {
    return this.heroes.find((h) => h.id === id) || ({} as Hero);
  }

  add(hero: Hero): Hero {
    const id = hero.id || this.fakeID++;
    const newHero = { ...hero, id };
    this.heroes.push(newHero);
    return newHero;
  }

  delete(id: number): boolean {
    const index = this.heroes.findIndex((h) => h.id === id);
    if (index !== -1) {
      this.heroes.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  update(id: number, hero: Hero): Hero {
    const index = this.heroes.findIndex((h) => h.id === id);
    if (index !== -1) {
      this.heroes[index] = hero;
      return hero;
    }
    throw new Error('Hero not found');
  }
}
