import { Component, computed, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HeroForm } from '../../../components/hero-form/hero-form';
import { HeroInterface } from '../../../shared/interfaces/hero.interface';
import { Hero } from '../../../shared/services/hero';

@Component({
  selector: 'app-hero-new',
  imports: [HeroForm],
  template: `
    <div class="flex flex-col items-center bg-[cadetblue]">
      <h3 class="text-2xl font-bold ">Create New Hero</h3>
      <app-hero-form class="col-span-1" (sendHero)="addHero($event)" />
    </div>
  `,
})
export class HeroNew {
  private readonly heroService = inject(Hero);
  private readonly routerService = inject(Router);
  private readonly heroResource = rxResource({
    stream: () => {
      const hero = this.heroSignal();

      console.log('isDefaultHero: ', this.heroService.isDefaultHero(hero));

      if (this.heroService.isDefaultHero(hero)) {
        return of(undefined);
      }

      return this.heroService.add(hero);
    },
  });

  heroSignal = signal<HeroInterface>(this.heroService.defaultHero);
  isLoading = this.heroResource.isLoading;
  error = this.heroResource.error;

  isHeroResourceCompleted = computed(() => {
    return this.heroResource.status() === 'resolved';
  });

  navigateEffect = effect(() => {
    if (!this.heroService.isDefaultHero(this.heroSignal()) && this.isHeroResourceCompleted()) {
      this.routerService.navigate(['/home']);
    }
  });

  errorEffect = effect(() => {
    if (this.error()) {
      console.log('Error: ', this.error());
    }
  });

  addHero(heroForm: HeroInterface) {
    const hero: HeroInterface = {
      ...heroForm,
      id: Math.floor(Math.random() * 1000) + 1,
    };
    console.log('addHero id: ', hero.id);
    this.heroSignal.set(hero);
    this.heroResource.reload();
  }
}
