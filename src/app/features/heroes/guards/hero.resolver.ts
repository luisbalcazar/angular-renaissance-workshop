import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { HeroInterface } from '../interfaces/hero.interface';
import { inject } from '@angular/core';
import { Hero } from '../services/hero';

export const heroResolver: ResolveFn<HeroInterface> = (route: ActivatedRouteSnapshot) =>
  inject(Hero).findOne(parseInt(route.paramMap.get('id')!, 10));
