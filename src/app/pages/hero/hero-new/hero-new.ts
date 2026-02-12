import { Component, DestroyRef, inject } from '@angular/core';
import { HeroForm } from '../../../components/hero-form/hero-form';
import { HeroInterface } from '../../../shared/interfaces/hero.interface';
import { Hero } from '../../../shared/services/hero';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private readonly destroyRef = inject(DestroyRef);

  addHero(hero: HeroInterface) {
    this.heroService
      .add(hero)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (hero) => console.log('Hero added:', hero),
        error: (error) => console.error('Error adding hero: ', error),
        complete: () => {
          console.log('Add hero operation completed');
          this.routerService.navigate(['/home']);
        },
      });
  }
}
