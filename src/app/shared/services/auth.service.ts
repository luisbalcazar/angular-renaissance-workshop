import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthLogin } from '../interfaces/auth-login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_ENDPINT = 'http://localhost.com:9000/user';
  private httpClient = inject(HttpClient);

  login(user: AuthLogin): Observable<AuthLogin> {
    return this.httpClient.post<AuthLogin>(`${this.API_ENDPINT}/login`, user);
  }

  register(user: AuthLogin): Observable<AuthLogin> {
    return this.httpClient.post<AuthLogin>(`${this.API_ENDPINT}/register`, user);
  }
}
