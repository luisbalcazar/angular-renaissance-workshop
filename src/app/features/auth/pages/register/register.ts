import { Component, computed, effect, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { RegisterForm } from '../../components/register-form/register-form';
import { of } from 'rxjs';
import { AuthLogin } from '../../interfaces/auth-login.interface';
import { AuthService } from '../../services/auth.service';
import { AUTH_PAGES } from '../../auth.routes';

@Component({
  selector: 'app-register',
  imports: [RegisterForm],
  template: `<div class="flex items-center justify-center px-4 text-white">
    <div
      class="w-full max-w-md rounded-2xl bg-slate-800 shadow-xl border border-slate-700 p-8 flex flex-col items-center gap-6"
    >
      <h3 class="text-3xl font-bold text-white">Register</h3>
      <p class="text-slate-300 text-sm text-center">Ingresa tus datos para continuar</p>

      <div class="w-full flex flex-col items-center justify- gap-4">
        <app-register-form (sendRegister)="register($event)"></app-register-form>
      </div>

      @if (errorMessage()) {
        <div
          class="w-full rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 text-center"
        >
          {{ errorMessage() }}
        </div>
      }
    </div>
  </div>`,
  styles: ``,
})
export class Register {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  readonly registerSignal = signal<AuthLogin | undefined>(undefined);
  readonly errorMessage = computed(() => {
    const error = this.registerResource.error() as HttpErrorResponse | undefined;
    if (!error) return '';

    return (
      error.error?.msg ?? error.error?.message ?? error.message ?? 'Ocurrió un error inesperado'
    );
  });

  readonly registerResource = rxResource({
    stream: () => {
      const register: AuthLogin | undefined = this.registerSignal();
      if (!register) return of(null);

      return this.authService.register(register!);
    },
  });

  isRegisterResourceCompleted = computed(() => this.registerResource.status() === 'resolved');

  navigateEffect = effect(() => {
    const value = this.registerResource.value();

    if (value) {
      queueMicrotask(() => {
        this.router.navigate([AUTH_PAGES.AUTH, AUTH_PAGES.LOGIN]);
      });
    }
  });

  private isRegisterEmpty(login: AuthLogin | undefined): boolean {
    return !login?.username || !login?.password;
  }

  register(register: AuthLogin) {
    if (!this.isRegisterEmpty(register)) {
      this.registerSignal.set(register);
      this.registerResource.reload();
    }
  }
}
