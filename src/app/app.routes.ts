import { Routes } from '@angular/router';
import { heroResolver } from './shared/guards/hero.resolve';
import { HeroIdMatcher } from './shared/matchers/hero-id.matcher';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'hero',
    children: [
      {
        path: 'new',
        loadComponent: () => import('./pages/hero/hero-new/hero-new').then((m) => m.HeroNew),
      },
      {
        path: 'update/:id',
        loadComponent: () =>
          import('./pages/hero/hero-update/hero-update').then((m) => m.HeroUpdate),
        resolve: { hero: heroResolver },
      },
      {
        loadComponent: () =>
          import('./pages/hero/hero-detail/hero-detail').then((m) => m.HeroDetail),
        matcher: HeroIdMatcher,
      },
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/auth/register/register').then((m) => m.Register),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
