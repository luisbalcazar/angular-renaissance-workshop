import { Component, DestroyRef, computed, inject } from '@angular/core';
import { HeroForm } from '../../../components/hero-form/hero-form';
import { HeroInterface } from '../../../shared/interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Hero } from '../../../shared/services/hero';
import { HeroItemNotFound } from '../../../components/hero-item-not-found/hero-item-not-found';

@Component({
  selector: 'app-hero-update',
  imports: [HeroForm, HeroItemNotFound],
  template: `
    @if (this.isValidHero()) {
      <div class="flex flex-col items-center bg-[rgb(94,104,255)]">
        <h3 class="text-2xl font-bold ">Update Hero</h3>
        <app-hero-form [hero]="hero" class="col-span-1" (sendHero)="updateHero($event)" />
      </div>
    } @else {
      <app-hero-item-not-found />
    }
  `,
})
export class HeroUpdate {
  private readonly heroService = inject(Hero);
  private readonly routerService = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  hero: HeroInterface = this.activatedRoute.snapshot.data['hero'];

  isValidHero = computed(() => !this.heroService.isNullHero(this.hero));

  updateHero(hero: HeroInterface) {
    console.log('Hero updated:', hero);
    this.heroService
      .update(hero)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (updatedHero) => console.log('Hero updated successfully:', updatedHero),
        error: (error) => console.error('Error updating hero: ', error),
        complete: () => {
          console.log('Update hero operation completed');
          this.routerService.navigate(['/home']);
        },
      });
  }
}
