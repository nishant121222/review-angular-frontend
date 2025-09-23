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
/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = `${environment.apiUrl}reviews/`;

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
*/
/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = `${environment.apiUrl}reviews/`;

  constructor(private http: HttpClient) {}

  // ✅ Submit review (matches your views.py)
  submitReview(user_id: number, business_id: number, rating: number, comment: string): Observable<any> {
    return this.http.post(this.baseUrl, { user_id, business_id, rating, comment });
  }

  // ✅ Admin: get pending reviews
  getPendingReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}pending/`);
  }

  // ✅ Admin: approve review
  approveReview(review_id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}approve/${review_id}/`, {});
  }

  // ✅ Admin: reject review
  rejectReview(review_id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}reject/${review_id}/`, {});
  }
}
*/

/*
@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = environment.apiUrl + 'reviews/';  // ✅ matches Django urls.py
  private googleReviewUrl = environment.googleReviewUrl;

  constructor(private http: HttpClient) {}

  /**
   * Submit a review to Django backend
   
  submitReview(userId: number, businessId: number, rating: number, comment: string): Observable<any> {
    return this.http.post(this.apiUrl, {
      user_id: userId,
      business_id: businessId,
      rating,
      comment
    });
  }


  
  /**
   * Get list of pending reviews (for admin dashboard)
   
  getPendingReviews(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'pending/');
  }

  /**
   * Approve a review (admin only)
   
  approveReview(reviewId: number): Observable<any> {
    return this.http.post(this.apiUrl + `${reviewId}/approve/`, {});
  }

  /**
   * Reject a review (admin only)
   
  rejectReview(reviewId: number): Observable<any> {
    return this.http.post(this.apiUrl + `${reviewId}/reject/`, {});
  }

  /**
   * Open Google Reviews page (for rating >= 4)
   */
 /* openGoogleReview(): void {
    if (environment.googleReviewUrl) {
      window.open(environment.googleReviewUrl, '_blank');
    } else {
      console.warn('⚠️ Google Review URL not set in environment.ts');
    }
  }
  openGoogleReview(comment?: string): void {
    let url = this.googleReviewUrl;
    if (comment) {
      url += `&text=${encodeURIComponent(comment)}`;
    }
    window.open(url, '_blank');
  }



}
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface SubmitReviewResponse {
  status: boolean;
  message: string;
  data?: {
    id: number;
    rating: number;
    comment: string;
    google_review_link?: string;
    spin_page_url?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = environment.apiUrl + 'reviews/';

  constructor(private http: HttpClient) {}

  /**
   * Submit a review to Django backend
   
  submitReview(payload: SubmitReviewPayload): Observable<SubmitReviewResponse> {
    return this.http.post<SubmitReviewResponse>(this.apiUrl, payload);
  }
  
  /**
   * Get list of pending reviews (for admin dashboard)
   
  getPendingReviews(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'pending/');
  }

  /**
   * Approve a review (admin only)
   
  approveReview(reviewId: number): Observable<any> {
    return this.http.post(this.apiUrl + `${reviewId}/approve/`, {});
  }

  /**
   * Reject a review (admin only)
   
  rejectReview(reviewId: number): Observable<any> {
    return this.http.post(this.apiUrl + `${reviewId}/reject/`, {});
  }
}
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// ----------------------------
// ✅ Review Interfaces
// ----------------------------
export interface Review {
  id: number;
  user_id?: number;
  phone?: string;
  name?: string;
  business_id: number;
  rating: number;
  comment: string;
  status?: 'pending' | 'approved' | 'rejected';
  created_at?: string;
  updated_at?: string;
}

export interface SubmitReviewPayload {
  user_id?: number;
  phone?: string;
  name?: string;
  business_id: number;
  rating: number;
  comment: string;
}

export interface SubmitReviewResponse {
  status: boolean;
  message: string;
  data?: {
    id: number;
    rating: number;
    comment: string;
    google_review_link?: string;
    spin_page_url?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = environment.apiUrl + 'reviews/';

  constructor(private http: HttpClient) {}

  // ----------------------------
  // ✅ Submit a review
  // ----------------------------
  submitReview(payload: SubmitReviewPayload): Observable<SubmitReviewResponse> {
    return this.http.post<SubmitReviewResponse>(this.apiUrl, payload);
  }

  // ----------------------------
  // ✅ Get list of pending reviews
  // ----------------------------
  getPendingReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl + 'pending/');
  }

  // ----------------------------
  // ✅ Approve a review (admin only)
  // ----------------------------
  approveReview(reviewId: number): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}${reviewId}/approve/`, {});
  }

  // ----------------------------
  // ✅ Reject a review (admin only)
  // ----------------------------
  rejectReview(reviewId: number): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}${reviewId}/reject/`, {});
  }
}
