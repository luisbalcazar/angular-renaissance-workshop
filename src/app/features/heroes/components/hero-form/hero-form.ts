import { Component, inject, input, output, Signal, computed, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { HeroInterface } from '../../interfaces/hero.interface';
import { Hero } from '../../services/hero';
import { heroNameValidator } from '../../validators/hero-name.validator';

@Component({
  selector: 'app-hero-form',
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './hero-form.html',
  styleUrl: './hero-form.scss',
})
export class HeroForm {
  private readonly heroService = inject(Hero);
  private readonly formBuilder = inject(FormBuilder);
  public readonly powerstats = [
    'intelligence',
    'strength',
    'speed',
    'durability',
    'power',
    'combat',
  ];
  message = '';

  //Signals
  hero = input<HeroInterface>(this.heroService.defaultHero);
  add = output<HeroInterface>({ alias: 'sendHero' });
  isSubmitted = signal(false);
  isPendingSave = computed(() => !this.isSubmitted && this.heroForm().pending);
  sendFormButton = computed(() => {
    return this.heroService.isDefaultHero(this.hero()) ? 'Create' : 'Update';
  });

  heroForm: Signal<FormGroup> = computed(() =>
    this.formBuilder.group({
      name: [this.hero()?.name, [Validators.required, heroNameValidator]],
      powerstats: this.formBuilder.group({
        intelligence: [
          this.hero()?.powerstats.intelligence,
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
        strength: [
          this.hero()?.powerstats.strength,
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
        speed: [
          this.hero()?.powerstats.speed,
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
        durability: [
          this.hero()?.powerstats.durability,
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
        power: [
          this.hero()?.powerstats.power,
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
        combat: [
          this.hero()?.powerstats.combat,
          [Validators.required, Validators.min(0), Validators.max(100)],
        ],
      }),
      image: [this.hero()?.image],
      alignment: [this.hero()?.alignment],
    }),
  );

  addHero() {
    if (this.heroForm().invalid) {
      this.message = 'Please fill in the required fields.';
    } else {
      const hero: HeroInterface = {
        ...this.heroForm().value,
        powerstats: { ...this.heroForm().value.powerstats },
      };
      this.isSubmitted.set(true);
      this.add.emit(hero);
    }
  }
}
