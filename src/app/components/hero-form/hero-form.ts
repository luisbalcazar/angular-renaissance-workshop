import { Component, inject, input, output, Signal, computed } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HeroInterface } from '../../shared/interfaces/hero.interface';
import { heroNameValidator } from '../../shared/validators/hero-name.validator';
import { TitleCasePipe } from '@angular/common';
import { Hero } from '../../shared/services/hero';

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
        id: this.hero().id,
        powerstats: { ...this.heroForm().value.powerstats },
      };
      this.add.emit(hero);
      console.log('Hero added:', hero);
    }
  }
}
