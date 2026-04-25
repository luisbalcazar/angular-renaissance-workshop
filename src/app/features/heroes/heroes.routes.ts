import { Routes } from '@angular/router';
import { heroIdMatcher } from './matchers/hero-id.matcher';
import { heroResolver } from './guards/hero.resolver';

export enum HEROES_PAGES {
  HERO = '/hero',
  HOME = 'home',
  NEW = 'new',
  UPDATE = 'update',
}

export const HEROES_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: HEROES_PAGES.HOME,
      },
      {
        path: HEROES_PAGES.HOME,
        loadComponent: () => import('./pages/home/home').then((c) => c.Home),
      },
      {
        path: HEROES_PAGES.NEW,
        loadComponent: () => import('./pages/hero-new/hero-new').then((c) => c.HeroNew),
      },
      {
        path: `${HEROES_PAGES.UPDATE}/:id`,
        loadComponent: () => import('./pages/hero-update/hero-update').then((c) => c.HeroUpdate),
        resolve: { hero: heroResolver },
        /* TODO 834: Use the guard `features/heroes/guards/hero-unsaved-changes.guard.ts` for the route associated with updating heroes. */
      },
      {
        loadComponent: () => import('./pages/hero-detail/hero-detail').then((c) => c.HeroDetail),
        matcher: heroIdMatcher,
      },
    ],
  },
  { path: '**', redirectTo: HEROES_PAGES.HOME },
];
