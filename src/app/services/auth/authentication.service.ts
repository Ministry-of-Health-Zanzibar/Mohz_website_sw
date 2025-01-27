import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // public apiUrl = environment.backendUrl;
  public apiUrl = 'http://localhost:9095';

  constructor(private httpClient: HttpClient) {}

  // public login(
  //   email: string,
  //   password: string
  // ): Observable<HttpResponse<any>> {
  //   return this.httpClient.post<any>(
  //     `${this.apiUrl}/api/login`,
  //     { email, password },
  //     {
  //       observe: 'response',
  //     }
  //   );
  // }

  public login(email: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/api/login`, {
      email,
      password,
    });
  }

  // public signup(signup: User): Observable<User> {
  //   return this.httpClient.post<User>(`${this.apiUrl}/api/signup`, signup);
  // }

  public saveToken(token: string | null): void {
    if (token) {
      localStorage.setItem('token', token);
    }
  }

  public getToken(): string {
    // return this.token;
    return localStorage.getItem('token')!;
  }

  public loadToken(): void {
    localStorage.getItem('token')!;
  }

  public addUserToLocalStorage(user: any | null): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalStorage(): any {
    // return JSON.parse(localStorage.getItem('user')!);
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  public isUserLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  public logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
