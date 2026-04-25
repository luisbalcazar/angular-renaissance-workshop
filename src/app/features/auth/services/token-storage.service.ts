import { computed, effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  // Signal privado para el token
  private tokenSignal = signal<string>(localStorage.getItem('heroes-token') || '');

  // Signal público (readonly)
  readonly token = this.tokenSignal.asReadonly();

  // Computed para isLogin
  readonly isLogin = computed(() => this.token() !== '');

  logout(): void {
    this.clearToken();
  }

  // Método para actualizar el token
  setToken(token: string): void {
    localStorage.setItem('heroes-token', token);
    this.tokenSignal.set(token);
  }

  // Método para limpiar el token
  clearToken(): void {
    localStorage.removeItem('heroes-token');
    this.tokenSignal.set('');
  }
}
