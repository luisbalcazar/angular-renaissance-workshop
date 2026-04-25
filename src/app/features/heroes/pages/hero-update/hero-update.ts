import {
  Component,
  computed,
  effect,
  inject,
  input,
  numberAttribute,
  signal,
  viewChild,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HeroForm } from '../../components/hero-form/hero-form';
import { HeroItemNotFound } from '../../components/hero-item-not-found/hero-item-not-found';
import { HeroInterface } from '../../interfaces/hero.interface';
import { Hero } from '../../services/hero';

@Component({
  selector: 'app-hero-update',
  imports: [HeroForm, HeroItemNotFound],
  template: `
    @if (this.isValidHero()) {
      <div class="flex flex-col items-center bg-[rgb(94,104,255)]">
        <h3 class="text-2xl font-bold ">Update Hero</h3>
        <app-hero-form
          #heroForm
          [hero]="hero()"
          class="col-span-1"
          (sendHero)="updateHero($event)"
        />
      </div>
    } @else {
      <app-hero-item-not-found />
    }
  `,
})
export class HeroUpdate {
  private readonly heroService = inject(Hero);
  private readonly routerService = inject(Router);
  readonly id = input(0, { transform: numberAttribute });
  readonly heroForm = viewChild.required<HeroForm>('heroForm');
  private readonly heroResource = rxResource({
    stream: () => {
      const id = this.id();
      return this.heroService.findOne(id);
    },
  });

  private readonly heroResourceUpdate = rxResource({
    stream: () => {
      const hero = this.heroSignal();

      if (this.heroService.isDefaultHero(hero)) {
        return of(undefined);
      }

      console.log(hero);

      return this.heroService.update(hero);
    },
    equal: (hero1, hero2) => hero1?.id === hero2?.id,
  });

  heroSignal = signal<HeroInterface>(this.heroService.defaultHero);
  readonly hero = computed(() => this.heroResource.value() ?? this.heroService.defaultHero);
  isValidHero = computed(() => !this.heroService.isNullHero(this.hero()));
  isLoading = this.heroResourceUpdate.isLoading;
  error = this.heroResourceUpdate.error;

  errorEffect = effect(() => {
    if (this.error()) {
      console.log('Error: ', this.error());
    }
  });

  isHeroResourceUpdateCompleted = computed(() => {
    return this.heroResourceUpdate.status() === 'resolved';
  });

  navigateEffect = effect(() => {
    if (
      !this.heroService.isDefaultHero(this.heroSignal()) &&
      this.isHeroResourceUpdateCompleted()
    ) {
      this.routerService.navigate(['/home']);
    }
  });

  updateHero(_hero: HeroInterface) {
    const hero = {
      ..._hero,
      id: this.id(),
    };
    this.heroSignal.set(hero);
    this.heroResourceUpdate.reload();
  }

  canDeactivate() {
    if (this.heroForm()) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }
}
