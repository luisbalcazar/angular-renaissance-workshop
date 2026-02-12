import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HeroInterface, Powerstat } from '../interfaces/hero.interface';
import { HeroServiceAbstract } from './hero.abstract';

@Injectable({
  providedIn: 'root',
})
export class Hero extends HeroServiceAbstract {
  private readonly httpClient = inject(HttpClient);
  private readonly heroSignal = signal<HeroInterface[]>([]);
  public readonly heroes = computed(() => this.heroSignal());

  load(): Observable<{ heroes: HeroInterface[]; total: number }> {
    return this.httpClient.get<{ heroes: HeroInterface[]; total: number }>(this.baseUrl).pipe(
      tap((result) => this.heroSignal.set(result.heroes)),
      catchError((error) => {
        console.error('Error loading heroes:', error);
        return throwError(() => error);
      }),
    );
  }

  add(hero: HeroInterface) {
    return this.httpClient.post<HeroInterface>(this.baseUrl, hero).pipe(
      tap((newHero) => {
        this.heroSignal.update((currentHeroes) => [...currentHeroes, newHero]);
      }),
      catchError((error) => {
        console.error('Error adding hero:', error);
        return throwError(() => error);
      }),
    );
  }

  update(heroUpdate: HeroInterface): Observable<HeroInterface> {
    return this.httpClient.put<HeroInterface>(`${this.baseUrl}/${heroUpdate.id}`, heroUpdate).pipe(
      tap((updatedHero) => {
        const currentHeroes = this.heroSignal();
        const updatedHeroes = currentHeroes.map((hero) =>
          hero.id === updatedHero.id ? updatedHero : hero,
        );
        this.heroSignal.update(() => updatedHeroes);
      }),
      catchError((error) => {
        console.error('Error updating hero:', error);
        return throwError(() => error);
      }),
    );
  }

  updatePowerstat(hero: HeroInterface, stat: Powerstat, value: number): Observable<HeroInterface> {
    const updatedHero = {
      ...hero,
      powerstats: {
        ...hero.powerstats,
        [stat]: hero.powerstats[stat] + value,
      },
    };
    return this.update(updatedHero);
  }

  remove(hero: HeroInterface): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${hero.id}`).pipe(
      tap(() => {
        const removeHero = this.heroSignal().filter((_hero) => hero.id !== hero.id);
        this.heroSignal.update(() => removeHero);
      }),
      catchError((error) => {
        console.error('Error removing hero:', error);
        return throwError(() => error);
      }),
    );
  }

  findOne(id: number): Observable<HeroInterface> {
    return this.httpClient.get<HeroInterface>(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error finding hero:', error);
        return throwError(() => error);
      }),
    );
  }

  findAll(): Observable<{ heroes: HeroInterface[]; total: number }> {
    return this.httpClient.get<{ heroes: HeroInterface[]; total: number }>(this.baseUrl).pipe(
      tap((result) => this.heroSignal.set(result.heroes)),
      catchError((error) => {
        console.error('Error finding all heroes:', error);
        return throwError(() => error);
      }),
    );
  }
}
