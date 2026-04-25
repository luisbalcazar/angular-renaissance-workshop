import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthLogin } from '../interfaces/auth-login.interface';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_ENDPINT = 'http://localhost:9000/user';
  private httpClient = inject(HttpClient);
  private tokenService = inject(TokenStorageService);

  login(user: AuthLogin): Observable<AuthLogin> {
    return this.httpClient
      .post<AuthLogin & { token: string }>(`${this.API_ENDPINT}/login`, user)
      .pipe(
        map((response) => {
          this.tokenService.setToken(response.token);
          return response;
        }),
      );
  }

  register(user: AuthLogin): Observable<AuthLogin> {
    console.log('llega al servicio', user);
    return this.httpClient.post<AuthLogin>(`${this.API_ENDPINT}/register`, user);
  }
}
