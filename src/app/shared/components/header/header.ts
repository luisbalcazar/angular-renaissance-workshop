import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AUTH_PAGES } from '../../../features/auth/auth.routes';
import { TokenStorageService } from '../../../features/auth/services/token-storage.service';
import { HEROES_PAGES } from '../../../features/heroes/heroes.routes';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
})
export class Header {
  navigation = {
    home: [HEROES_PAGES.HERO, HEROES_PAGES.HOME],
    heroNew: [HEROES_PAGES.HERO, HEROES_PAGES.NEW],
    login: [AUTH_PAGES.AUTH, AUTH_PAGES.LOGIN],
    register: [AUTH_PAGES.AUTH, AUTH_PAGES.REGISTER],
  };
  readonly #tokenStorageService = inject(TokenStorageService);
  readonly #router = inject(Router);
  isLogin = this.#tokenStorageService.isLogin;

  logout() {
    const isSure = window.confirm('Are you sure?');
    if (isSure) {
      this.#tokenStorageService.logout();
      this.#router.navigate([AUTH_PAGES.AUTH, AUTH_PAGES.LOGIN]);
    }
  }
}
