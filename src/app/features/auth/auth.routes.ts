import { Routes } from '@angular/router';

export enum AUTH_PAGES {
  AUTH = 'auth',
  LOGIN = 'login',
  REGISTER = 'register',
}

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: AUTH_PAGES.LOGIN,
      },
      {
        path: AUTH_PAGES.LOGIN,
        loadComponent: () => import('./pages/login/login').then((c) => c.Login),
      },
      {
        path: AUTH_PAGES.REGISTER,
        loadComponent: () => import('./pages/register/register').then((c) => c.Register),
      },
    ],
  },
  { path: '**', redirectTo: AUTH_PAGES.LOGIN },
];
