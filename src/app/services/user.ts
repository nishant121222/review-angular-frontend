/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class User {
  private apiUrl = 'http://localhost:3000/api/users'; //  Your backend API

  constructor(private http: HttpClient) {}

  //  Check if phone exists → return boolean directly
  checkPhoneExists(phone: string): Observable<boolean> {
    return this.http
      .get<{ exists: boolean }>(`${this.apiUrl}/check-phone/${phone}`)
      .pipe(map(res => res.exists));
  }

  //  Send OTP
  sendOtp(phone: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-otp`, { phone });
  }

  //  Verify OTP → backend should return { valid: true/false }
  verifyOtp(phone: string, otp: string): Observable<boolean> {
    return this.http
      .post<{ valid: boolean }>(`${this.apiUrl}/verify-otp`, { phone, otp })
      .pipe(map(res => res.valid));
  }
}
*//*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class User {

private apiUrl = 'http://127.0.0.1:8000/api/users/'; // Django backend usually runs on 8000

  constructor(private http: HttpClient) {}

  // Create new user (name + phone)
  createUser(name: string, phone: string): Observable<any> {
    return this.http.post(this.apiUrl, { name, phone });
  }

  // Check if phone exists
  checkPhoneExists(phone: string): Observable<boolean> {
    return this.http
      .get<{ exists: boolean }>(`${this.apiUrl}check-phone/${phone}/`)
      .pipe(map(res => res.exists));
  }
}*/import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Create new user
  createUser(name: string, phone: string): Observable<{ id: number, phone: string, created: boolean }> {
    return this.http.post<{ id: number, phone: string, created: boolean }>(
      `${this.baseUrl}create-user/`,
      { name, phone, business_id: environment.businessId }   // ✅ include businessId
    );
  }

  // Check if user exists
  checkPhoneExists(phone: string): Observable<{ returning_user: boolean, user_id: number | null }> {
    return this.http.get<{ returning_user: boolean, user_id: number | null }>(
      `${this.baseUrl}check-user/?phone=${phone}`
    );
  }
}
