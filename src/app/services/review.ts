/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Review {
  private baseUrl = 'http://localhost:3000/api/review';

  constructor(private http: HttpClient) {}

  // Submit review
  submitReview(phone: string, rating: number, comment: string): Observable<any> {
    return this.http.post(`${this.baseUrl}`, { phone, rating, comment });
  }

  // Get pending reviews for admin
  getPendingReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/pending`);
  }

  // Approve a pending review
  approveReview(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/approve`, { id });
  }

  // Reject a pending review
  rejectReview(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reject`, { id });
  }
}
*/

/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Review {
  private baseUrl = 'https://miramata.tech/reviewsystem/api/reviews/';

  constructor(private http: HttpClient) {}

  // Submit review
  // Here We are sending without status 
  /*submitReview(phone: string, rating: number, comment: string): Observable<any> {
    return this.http.post(`${this.baseUrl}`, { phone, rating, comment });
  }
  submitReview(phone: string, rating: number, comment: string, status: string): Observable<any> {
    return this.http.post(`${this.baseUrl}`, { phone, rating, comment, status });
  }
  

  // Get pending reviews for admin
  getPendingReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/pending`);
  }

  // Approve a pending review
  approveReview(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/approve`, { id });
  }

  // Reject a pending review
  rejectReview(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reject`, { id });
  }
}
*/
/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = 'https://miramata.tech/reviewsystem/api/reviews/';

  constructor(private http: HttpClient) {}

  // Submit review with status
  submitReview(phone: string, rating: number, comment: string, status: string): Observable<any> {
    return this.http.post(${this.baseUrl}, { phone, rating, comment, status });
  }

  // Get pending reviews for admin
  getPendingReviews(): Observable<any[]> {
    return this.http.get<any[]>(${this.baseUrl}pending/);
  }

  // Approve a pending review
  approveReview(id: string): Observable<any> {
    return this.http.post(${this.baseUrl}approve/, { id });
  }

  // Reject a pending review
  rejectReview(id: string): Observable<any> {
    return this.http.post(${this.baseUrl}reject/, { id });
  }
}*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = 'https://miramata.tech/reviewsystem/api/reviews/';

  constructor(private http: HttpClient) {}

  // Submit review with status
  submitReview(phone: string, rating: number, comment: string, status: string): Observable<any> {
    return this.http.post(this.baseUrl, { phone, rating, comment, status });
  }

  // Get pending reviews for admin
  getPendingReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}pending/`);
  }

  // Approve a pending review
  approveReview(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}approve/`, { id });
  }

  // Reject a pending review
  rejectReview(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}reject/`, { id });
  }
}
