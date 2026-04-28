import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { NEVER, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginForm } from '../../components/login-form/login-form';
import { AuthLogin } from '../../interfaces/auth-login.interface';
import { AuthService } from '../../services/auth.service';
import { HEROES_PAGES } from '../../../heroes/heroes.routes';

@Component({
  selector: 'app-login',
  imports: [LoginForm],
  template: `
    <div class="flex items-center justify-center px-4 text-white">
      <div
        class="w-full max-w-md rounded-2xl bg-slate-800 shadow-xl border border-slate-700 p-8 flex flex-col items-center gap-6"
      >
        <h3 class="text-3xl font-bold text-white">Login</h3>
        <p class="text-slate-300 text-sm text-center">Ingresa tus credenciales para continuar</p>

        <div class="w-full flex flex-col items-center justify- gap-4">
          <app-login-form (sendLogin)="login($event)"></app-login-form>
        </div>

        @if (errorMessage()) {
          <div
            class="w-full rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 text-center"
          >
            {{ errorMessage() }}
          </div>
        }
      </div>
    </div>
  `,
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly loginSignal = signal<AuthLogin | undefined>(undefined);

  readonly errorMessage = computed(() => {
    const error = this.loginResource.error() as HttpErrorResponse | undefined;
    if (!error) return '';

    return (
      error.error?.msg ?? error.error?.message ?? error.message ?? 'Ocurrió un error inesperado'
    );
  });

  readonly loginResource = rxResource({
    stream: () => {
      const login: AuthLogin | undefined = this.loginSignal();
      if (!login) return of(null);

      return this.authService.login(login!);
    },
  });

  isLoginResourceCompleted = computed(() => this.loginResource.status() === 'resolved');

  navigateEffect = effect(() => {
    const value = this.loginResource.value();

    if (value) {
      this.router.navigate([HEROES_PAGES.HERO, HEROES_PAGES.HOME]);
    }
  });

  private isLoginEmpty(login: AuthLogin): boolean {
    return !login.username || !login.password;
  }

  login(login: AuthLogin) {
    if (!this.isLoginEmpty(login)) {
      this.loginSignal.set(login);
      this.loginResource.reload();
    }
  }
}
