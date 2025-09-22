/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// ✅ Response interfaces
export interface CheckUserResponse {
  returning_user: boolean;
  user_id: number | null;
}

export interface CreateUserResponse {
  id: number;
  phone: string;
  created: boolean;
}
// ✅ Response interface
export interface GetUserResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    username: string;
    is_superuser: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = `${environment.apiUrl}accounts/`;
  //private baseUrl = environment.apiUrl;        // ✅ Root: http://localhost:8000/
  //private usersUrl = `${this.baseUrl}accounts/`; // ✅ http://localhost:8000/accounts/

  private authUrl = `${environment.apiUrl}auth/`;

  constructor(private http: HttpClient) { }

  // ✅ Check if phone exists
  checkPhoneExists(phone: string): Observable<CheckUserResponse> {
    return this.http.get<CheckUserResponse>(`${this.usersUrl}users/?phone=${phone}`);
  }

  // ✅ Create or update user
  createUser(
    name: string,
    phone: string
  ): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(
      `${this.usersUrl}users/create/`,
      { name, phone, business_id: "1" }
    );
  }


}*/
/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// ✅ Response interfaces
export interface CheckUserResponse {
  returning_user: boolean;
  user_id: number | null;
}

export interface CreateUserResponse {
  id: number;
  phone: string;
  created: boolean;
}

export interface GetUserResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    username: string;
    is_superuser: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = `${environment.apiUrl}accounts/`;
  private authUrl = `${environment.apiUrl}auth/`;

  constructor(private http: HttpClient) {}

  // ✅ Check if phone exists
  checkPhoneExists(phone: string): Observable<CheckUserResponse> {
    return this.http.get<CheckUserResponse>(`${this.usersUrl}users/?phone=${phone}`);
  }

  // ✅ Create or update user
  createUser(name: string, phone: string): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(
      `${this.usersUrl}users/create/`,
      { name, phone, business_id: "1" }
    );
  }

  // ✅ Get user details by ID
  getUser(userId: number): Observable<GetUserResponse> {
    return this.http.get<GetUserResponse>(`${this.usersUrl}users/latest/${userId}/`);
  }
}


*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// ✅ Response interfaces
export interface CheckUserResponse {
  returning_user: boolean;
  user_id: number | null;
}

export interface CreateUserResponse {
  id: number;
  phone: string;
  created: boolean;
}

export interface GetUserResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    username: string;
    is_superuser: boolean;
  } | null;
}

// ✅ New interface for list of users
export interface ListUsersResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    username: string;
    is_superuser: boolean;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = `${environment.apiUrl}accounts/`;
  private authUrl = `${environment.apiUrl}auth/`;

  constructor(private http: HttpClient) {}

  // ----------------------------
  // ✅ Check if phone exists
  // ----------------------------
  checkPhoneExists(phone: string): Observable<CheckUserResponse> {
    return this.http.get<CheckUserResponse>(`${this.usersUrl}users/?phone=${phone}`);
  }

  // ----------------------------
  // ✅ Create or update user
  // ----------------------------
  createUser(name: string, phone: string): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(`${this.usersUrl}users/create/`, {
      name,
      phone,
      business_id: "1"
    });
  }

  // ----------------------------
  // ✅ Get latest user
  // ----------------------------
  getLatestUser(): Observable<GetUserResponse> {
    return this.http.get<GetUserResponse>(`${this.usersUrl}users/latest/`);
  }

  // ----------------------------
  // ✅ Get all users
  // ----------------------------
  getAllUsers(): Observable<ListUsersResponse> {
    return this.http.get<ListUsersResponse>(`${this.usersUrl}users/`);
  }
}
