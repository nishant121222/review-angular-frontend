import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginResponse {
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}auth/`; // ✅ Django endpoint (e.g. http://localhost:8000/api/auth/)

  constructor(private http: HttpClient) {}

  // 🔑 Admin login (get JWT tokens)
  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}token/`, { username, password }).pipe(
      tap((tokens) => {
        localStorage.setItem('access_token', tokens.access);
        localStorage.setItem('refresh_token', tokens.refresh);
      })
    );
  }

  // ✅ Refresh token when access token expires
  refreshToken(): Observable<any> {
    const refresh = localStorage.getItem('refresh_token');
    return this.http.post(`${this.apiUrl}token/refresh/`, { refresh }).pipe(
      tap((res: any) => {
        localStorage.setItem('access_token', res.access);
      })
    );
  }

  // ✅ Logout → clear tokens
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  // ✅ Get token for attaching in requests
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // ✅ Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
