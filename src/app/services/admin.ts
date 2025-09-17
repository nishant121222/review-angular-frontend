/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Admin {
  private apiUrl = 'http://localhost:5000/api/admin'; // update base URL if needed

  constructor(private http: HttpClient) {}

  // -------------------
  // 🔑 Login
  // -------------------
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  // -------------------
  // 📝 Review actions
  // -------------------
  approveReview(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews/${id}/approve`, {});
  }

  rejectReview(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews/${id}/reject`, {});
  }

  // -------------------
  // 📊 Review fetching
  // -------------------
  getPendingReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reviews/pending`);
  }

  getApprovedReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reviews/approved`);
  }

  getRejectedReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reviews/rejected`);
  }

  // -------------------
  // 🎮 Game outcomes
  // -------------------
  getGameOutcomes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/game-outcomes`);
  }
}
*/


/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review, GameOutcome } from '../components/admin-dashboard/admin-dashboard';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api'; // update with your backend URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  // Fetch pending reviews
  getPendingReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/reviews/pending`);
  }

  // Fetch approved reviews
  getApprovedReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/reviews/approved`);
  }

  // Fetch rejected reviews
  getRejectedReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/reviews/rejected`);
  }

  // Approve a single review
  approveReview(phone: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews/approve`, { phone });
  }
  
  rejectReview(phone: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews/reject`, { phone });
  }
  
  // Fetch game outcomes
  getGameResults(): Observable<GameOutcome[]> {
    return this.http.get<GameOutcome[]>(`${this.apiUrl}/game/outcomes`);
  }

  // Export data
  exportData(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export`, { responseType: 'blob' });
  }
}
*/
/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review, GameOutcome } from '../components/admin-dashboard/admin-dashboard';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/api'; // update with your backend URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  // Fetch pending reviews
  getPendingReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/reviews/pending`);
  }

  // Fetch approved reviews
  getApprovedReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/reviews/approved`);
  }

  // Fetch rejected reviews
  getRejectedReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/reviews/rejected`);
  }

  // Approve a single review
  approveReview(phone: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews/approve`, { phone });
  }
  
  rejectReview(phone: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews/reject`, { phone });
  }
  
  // Fetch game outcomes
  getGameResults(): Observable<GameOutcome[]> {
    return this.http.get<GameOutcome[]>(`${this.apiUrl}/game/outcomes`);
  }

  // Export data
  exportData(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export`, { responseType: 'blob' });
  }
}*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review, GameOutcome } from '../components/admin-dashboard/admin-dashboard';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // Update with your Django backend API root
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login/`, { username, password });
  }

  // Fetch pending reviews
  getPendingReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/reviews/?status=pending`);
  }

  // Approve a review
  approveReview(phone: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews/approve/`, { phone });
  }

  // Reject a review
  rejectReview(phone: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reviews/reject/`, { phone });
  }

  // Fetch game outcomes
  getGameResults(): Observable<GameOutcome[]> {
    return this.http.get<GameOutcome[]>(`${this.apiUrl}/games/outcomes/`);
  }

  // Export data
  exportData(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export/`, { responseType: 'blob' });
  }
}

