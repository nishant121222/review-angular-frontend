/*import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Review } from '../../services/review';

@Component({
  selector: 'app-review-form',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule],
  template: `
  <mat-card class="container">
    <h2>Submit Your Review</h2>
    <form [formGroup]="reviewForm" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Rating (1-5)</mat-label>
        <input matInput type="number" formControlName="rating" min="1" max="5" />
        <mat-error *ngIf="reviewForm.controls['rating'].invalid">Rating 1-5 is required</mat-error>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Comment</mat-label>
        <textarea matInput formControlName="comment" rows="4"></textarea>
        <mat-error *ngIf="reviewForm.controls['comment'].invalid">Comment is required</mat-error>
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit" [disabled]="reviewForm.invalid">Submit Review</button>
    </form>
  </mat-card>
`,
  styles:[`
  .container {
    max-width: 500px;
    margin: 40px auto;
    padding: 20px;
    text-align: center;
  }
  .full-width { width: 100%; }
  button { margin-top: 20px; width: 100%; }
`]
})
export class ReviewForm  implements OnInit {
  reviewForm!: FormGroup;
  phone!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private reviewService: Review,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.reviewForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required]
    });

    // Get phone number from query params
    this.route.queryParams.subscribe(params => {
      this.phone = params['phone'] || '';
    });
  }

  onSubmit() {
    if (this.reviewForm.invalid) return;

    const { rating, comment } = this.reviewForm.value;

    const reviewData = {
      phone: this.phone,
      rating: Number(rating),
      comment,
      status: rating >= 4 ? 'approved' : 'pending'
    };

    this.reviewService.submitReview(this.phone, rating, comment).subscribe({
      next: () => {
        // Navigate to mini-game after review
        this.router.navigate(['/mini-game'], { queryParams: { phone: this.phone } });
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to submit review. Try again.', 'Close', { duration: 3000 });
      }
    });
  }

}
*/
/*
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { Review } from '../../services/review';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule
  ],
  template: `
    <div class="container">
      <mat-card>
        <div class="header">
          <mat-icon color="primary" fontIcon="rate_review" class="icon"></mat-icon>
          <h2>Submit Your Review</h2>
          <p class="subtitle">Your feedback helps us improve</p>
        </div>

        <form [formGroup]="reviewForm" (ngSubmit)="onSubmit()">
          <!-- Rating -->
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Rating (1–5)</mat-label>
            <input matInput type="number" formControlName="rating" min="1" max="5" />
            <mat-error *ngIf="reviewForm.get('rating')?.invalid && reviewForm.get('rating')?.touched">
              Please enter a rating between 1 and 5
            </mat-error>
          </mat-form-field>

          <!-- Comment -->
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Comment</mat-label>
            <textarea matInput formControlName="comment" rows="4" placeholder="Write your feedback here..."></textarea>
            <mat-error *ngIf="reviewForm.get('comment')?.invalid && reviewForm.get('comment')?.touched">
              Comment is required
            </mat-error>
          </mat-form-field>

          <!-- Submit -->
          <button mat-raised-button color="primary" class="full-width action-btn"
                  [disabled]="reviewForm.invalid">
            Submit Review
          </button>
        </form>
      </mat-card>
    </div>
  `,
  styles:[`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 1rem;
      background: linear-gradient(135deg, #1976d2, #42a5f5);
    }
    mat-card {
      max-width: 380px;
      width: 100%;
      padding: 24px;
      border-radius: 20px;
      background: #ffffff;
      box-shadow: 0 6px 20px rgba(0,0,0,0.15);
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .header h2 {
      margin: 8px 0 4px;
      font-weight: 600;
      color: #1976d2;
    }
    .subtitle {
      font-size: 14px;
      color: #666;
    }
    .icon {
      font-size: 40px;
    }
    .full-width {
      width: 100%;
    }
    .action-btn {
      margin-top: 12px;
      font-weight: 600;
      border-radius: 30px;
      height: 45px;
    }
  `]
})
export class ReviewForm implements OnInit {
  reviewForm!: FormGroup;
  phone!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private reviewService: Review,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.reviewForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      this.phone = params['phone'] || '';
    });
  }

  onSubmit() {
    if (this.reviewForm.invalid) return;

    const { rating, comment } = this.reviewForm.value;
    const reviewData = {
      phone: this.phone,
      rating: Number(rating),
      comment,
      status: rating >= 4 ? 'approved' : 'pending'
    };

    this.reviewService.submitReview(this.phone, rating, comment).subscribe({
      next: () => {
        this.router.navigate(['/app-mini-game'], { queryParams: { phone: this.phone } });
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to submit review. Try again.', 'Close', { duration: 3000 });
      }
    });
  }
}

/*
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule
  ],template: `
  <div class="container">
    <mat-card>
      <div class="header">
        <mat-icon color="primary" fontIcon="rate_review" class="icon"></mat-icon>
        <h2>Submit Your Review</h2>
        <p class="subtitle">Your feedback helps us improve</p>
      </div>

      <form [formGroup]="reviewForm" (ngSubmit)="onSubmit()">
        <!-- Rating -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Rating (1–5)</mat-label>
          <input matInput type="number" formControlName="rating" min="1" max="5" />
          <mat-error *ngIf="reviewForm.get('rating')?.invalid && reviewForm.get('rating')?.touched">
            Please enter a rating between 1 and 5
          </mat-error>
        </mat-form-field>

        <!-- Comment -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Comment</mat-label>
          <textarea matInput formControlName="comment" rows="4" placeholder="Write your feedback here..."></textarea>
          <mat-error *ngIf="reviewForm.get('comment')?.invalid && reviewForm.get('comment')?.touched">
            Comment is required
          </mat-error>
        </mat-form-field>

        <!-- Submit -->
        <button mat-raised-button color="primary" class="full-width action-btn"
                [disabled]="reviewForm.invalid">
          Submit Review
        </button>
      </form>
    </mat-card>
  </div>
`,
styles:[`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 1rem;
    background: linear-gradient(135deg, #1976d2, #42a5f5);
  }
  mat-card {
    max-width: 380px;
    width: 100%;
    padding: 24px;
    border-radius: 20px;
    background: #ffffff;
    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  }
  .header {
    text-align: center;
    margin-bottom: 20px;
  }
  .header h2 {
    margin: 8px 0 4px;
    font-weight: 600;
    color: #1976d2;
  }
  .subtitle {
    font-size: 14px;
    color: #666;
  }
  .icon {
    font-size: 40px;
  }
  .full-width {
    width: 100%;
  }
  .action-btn {
    margin-top: 12px;
    font-weight: 600;
    border-radius: 30px;
    height: 45px;
  }
`]
})
export class ReviewForm implements OnInit {
  reviewForm!: FormGroup;
  phone!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.reviewForm = this.fb.group({
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      this.phone = params['phone'] || '';
    });
  }

  onSubmit() {
    if (this.reviewForm.invalid) return;

    const { rating, comment } = this.reviewForm.value;

    // Create review data object (local only)
    const reviewData = {
      phone: this.phone,
      rating: Number(rating),
      comment,
      status: Number(rating) >= 4 ? 'approved' : 'pending'
    };

    console.log('✅ Review submitted (local):', reviewData);

    // Show snackbar confirmation
    this.snackBar.open('Review submitted successfully!', 'Close', { duration: 3000 });

    // Navigate directly to mini-game
    this.router.navigate(['/app-mini-game'], { queryParams: { phone: this.phone } });
  }
}*/



/*

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
  <div class="container">
    <div class="background-decoration">
      <div class="decoration-circle circle-1"></div>
      <div class="decoration-circle circle-2"></div>
      <div class="decoration-circle circle-3"></div>
    </div>
    
    <mat-card class="review-card">
      <div class="header">
        <div class="icon-container">
          <mat-icon color="primary" fontIcon="rate_review" class="icon"></mat-icon>
        </div>
        <h2 class="title">Submit Your Review</h2>
        <p class="subtitle">Your feedback helps us improve</p>
      </div>

      <form [formGroup]="reviewForm" (ngSubmit)="onSubmit()" class="form">
        
        <!-- ⭐ Star Rating -->
        <div class="rating-container">
          <span *ngFor="let star of stars; let i = index" 
                (click)="setRating(i+1)">
            <mat-icon [ngClass]="{'filled': i < reviewForm.get('rating')?.value}">
              {{ i < reviewForm.get('rating')?.value ? 'star' : 'star_border' }}
            </mat-icon>
          </span>
        </div>
        <div class="error" *ngIf="reviewForm.get('rating')?.invalid && reviewForm.get('rating')?.touched">
          Please select a rating
        </div>

        <!-- Comment -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Your Feedback</mat-label>
          <textarea matInput formControlName="comment" rows="4" placeholder="Share your experience with us..."></textarea>
          <mat-icon matPrefix>rate_review</mat-icon>
          <mat-error *ngIf="reviewForm.get('comment')?.invalid && reviewForm.get('comment')?.touched">
            Please provide your feedback
          </mat-error>
        </mat-form-field>

        <!-- Submit -->
        <button 
          mat-raised-button 
          color="primary" 
          class="submit-btn" 
          type="submit"
          [disabled]="reviewForm.invalid || isLoading">
          <span *ngIf="!isLoading">Submit Review</span>
          <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
        </button>

        <div class="privacy-note">
          <p>Your review will be publicly visible after moderation</p>
        </div>
      </form>
    </mat-card>
  </div>
`,
  styles:[`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }

  .background-decoration {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
  }

  .decoration-circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
  }

  .circle-1 {
    width: 300px;
    height: 300px;
    top: -150px;
    right: -150px;
  }

  .circle-2 {
    width: 200px;
    height: 200px;
    bottom: -100px;
    left: -100px;
  }

  .circle-3 {
    width: 150px;
    height: 150px;
    top: 50%;
    left: 10%;
  }

  .review-card {
    width: 100%;
    max-width: 450px;
    padding: 32px 28px;
    border-radius: 16px;
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    z-index: 1;
    position: relative;
  }

  .header {
    text-align: center;
    margin-bottom: 32px;
  }

  .icon-container {
    background: linear-gradient(135deg, #ffb400, #ff7300);
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    box-shadow: 0 4px 6px rgba(255, 180, 0, 0.2);
  }

  .icon {
    font-size: 40px;
    width: 40px;
    height: 40px;
    color: white;
  }

  .title {
    margin: 0 0 8px;
    color: #333;
    font-weight: 600;
    font-size: 26px;
    background: linear-gradient(135deg, #ffb400, #ff7300);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    margin: 0;
    color: #666;
    font-size: 15px;
    font-weight: 400;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .full-width {
    width: 100%;
  }

  .rating-container {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
    gap: 8px;
  }
  
  .rating-container mat-icon {
    font-size: 40px;
    cursor: pointer;
    color: #e0e0e0;
    transition: all 0.2s ease;
  }
  
  .rating-container mat-icon:hover {
    transform: scale(1.2);
  }
  
  .rating-container mat-icon.filled {
    color: #ffb400;
  }

  .error {
    color: #f44336;
    font-size: 13px;
    text-align: center;
    margin-top: -10px;
    margin-bottom: 10px;
  }

  .mat-form-field {
    --mat-form-field-container-height: auto;
  }

  .mat-form-field-appearance-outline .mat-form-field-outline {
    color: rgba(63, 81, 181, 0.2);
  }

  .mat-form-field-appearance-outline.mat-focused .mat-form-field-outline-thick {
    color: #3f51b5;
  }

  .submit-btn {
    width: 100%;
    padding: 14px;
    margin-top: 10px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
    height: 50px;
    background: linear-gradient(135deg, #3f51b5, #2196f3);
    box-shadow: 0 4px 6px rgba(63, 81, 181, 0.2);
    transition: all 0.3s ease;
  }

  .submit-btn:hover:not([disabled]) {
    transform: translateY(-2px);
    box-shadow: 0 7px 14px rgba(63, 81, 181, 0.3);
  }

  .submit-btn:active:not([disabled]) {
    transform: translateY(0);
  }

  .privacy-note {
    text-align: center;
    margin-top: 24px;
    padding-top: 16px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .privacy-note p {
    margin: 0;
    font-size: 12px;
    color: #666;
  }

  /* Mobile responsiveness 
  @media (max-width: 600px) {
    .container {
      padding: 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .review-card {
      padding: 24px 20px;
      box-shadow: 0 10px 20px rgba(50, 50, 93, 0.1), 0 3px 8px rgba(0, 0, 0, 0.07);
    }

    .title {
      font-size: 22px;
    }

    .icon-container {
      width: 70px;
      height: 70px;
    }

    .icon {
      font-size: 35px;
      width: 35px;
      height: 35px;
    }
    
    .circle-1, .circle-2, .circle-3 {
      display: none;
    }

    .rating-container mat-icon {
      font-size: 36px;
    }
  }

  /* Animation for form elements 
  .mat-form-field {
    transition: all 0.3s ease;
  }

  .mat-form-field:hover {
    transform: translateY(-2px);
  }

  /* Focus styles for better accessibility 
  button:focus-visible, 
  input:focus-visible,
  textarea:focus-visible {
    outline: 2px solid #3f51b5;
    outline-offset: 2px;
  }

  /* Custom styles for the spinner 
  .mat-progress-spinner circle {
    stroke: white;
  }
`]
})
export class ReviewForm implements OnInit {
  reviewForm!: FormGroup;
  phone!: string;
  stars = [1, 2, 3, 4, 5];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.reviewForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      this.phone = params['phone'] || '';
    });
  }

  setRating(value: number) {
    this.reviewForm.get('rating')?.setValue(value);
  }

  onSubmit() {
    if (this.reviewForm.invalid) return;

    this.isLoading = true;
    const { rating, comment } = this.reviewForm.value;

    const reviewData = {
      phone: this.phone,
      rating: Number(rating),
      comment,
      status: Number(rating) >= 4 ? 'approved' : 'pending'
    };

    console.log('✅ Review submitted (local):', reviewData);

    // Simulate API call delay
    setTimeout(() => {
      this.isLoading = false;
      this.snackBar.open('Review submitted successfully!', 'Close', { 
        duration: 3000,
        panelClass: ['success-snackbar']
      });

      this.router.navigate(['/mini-game'], { queryParams: { phone: this.phone } });
    }, 1500);
  }
}
*/
/*
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Review } from '../../services/review';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
  <div class="container">
    <div class="background-decoration">
      <div class="decoration-circle circle-1"></div>
      <div class="decoration-circle circle-2"></div>
      <div class="decoration-circle circle-3"></div>
    </div>
    
    <mat-card class="review-card">
      <div class="header">
        <div class="icon-container">
          <mat-icon color="primary" fontIcon="rate_review" class="icon"></mat-icon>
        </div>
        <h2 class="title">Submit Your Review</h2>
        <p class="subtitle">Your feedback helps us improve</p>
      </div>

      <form [formGroup]="reviewForm" (ngSubmit)="onSubmit()" class="form">
        
        <!-- ⭐ Star Rating -->
        <div class="rating-container">
          <span *ngFor="let star of stars; let i = index" (click)="setRating(i+1)">
            <mat-icon [ngClass]="{'filled': i < reviewForm.get('rating')?.value}">
              {{ i < reviewForm.get('rating')?.value ? 'star' : 'star_border' }}
            </mat-icon>
          </span>
        </div>
        <div class="error" *ngIf="reviewForm.get('rating')?.invalid && reviewForm.get('rating')?.touched">
          Please select a rating
        </div>

        <!-- Comment -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Your Feedback</mat-label>
          <textarea matInput formControlName="comment" rows="4" placeholder="Share your experience with us..."></textarea>
          <mat-icon matPrefix>rate_review</mat-icon>
          <mat-error *ngIf="reviewForm.get('comment')?.invalid && reviewForm.get('comment')?.touched">
            Please provide your feedback
          </mat-error>
        </mat-form-field>

        <!-- Submit -->
        <button 
          mat-raised-button 
          color="primary" 
          class="submit-btn" 
          type="submit"
          [disabled]="reviewForm.invalid || isLoading">
          <span *ngIf="!isLoading">Submit Review</span>
          <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
        </button>

        <div class="privacy-note">
          <p>Your review will be publicly visible after moderation</p>
        </div>
      </form>
    </mat-card>
  </div>
`,
  styles:[`
  /* 🎨 same styles as your second snippet 
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }
  .background-decoration { position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 0; }
  .decoration-circle { position: absolute; border-radius: 50%; background: rgba(255, 255, 255, 0.1); }
  .circle-1 { width: 300px; height: 300px; top: -150px; right: -150px; }
  .circle-2 { width: 200px; height: 200px; bottom: -100px; left: -100px; }
  .circle-3 { width: 150px; height: 150px; top: 50%; left: 10%; }
  .review-card { width: 100%; max-width: 450px; padding: 32px 28px; border-radius: 16px;
    box-shadow: 0 15px 35px rgba(50,50,93,0.1), 0 5px 15px rgba(0,0,0,0.07);
    background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); z-index: 1; position: relative;
  }
  .header { text-align: center; margin-bottom: 32px; }
  .icon-container { background: linear-gradient(135deg, #ffb400, #ff7300); border-radius: 50%; width: 80px; height: 80px;
    display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; box-shadow: 0 4px 6px rgba(255,180,0,0.2);
  }
  .icon { font-size: 40px; width: 40px; height: 40px; color: white; }
  .title { margin: 0 0 8px; color: #333; font-weight: 600; font-size: 26px;
    background: linear-gradient(135deg, #ffb400, #ff7300);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .subtitle { margin: 0; color: #666; font-size: 15px; font-weight: 400; }
  .form { display: flex; flex-direction: column; gap: 20px; }
  .full-width { width: 100%; }
  .rating-container { display: flex; justify-content: center; margin-bottom: 16px; gap: 8px; }
  .rating-container mat-icon { font-size: 40px; cursor: pointer; color: #e0e0e0; transition: all 0.2s ease; }
  .rating-container mat-icon:hover { transform: scale(1.2); }
  .rating-container mat-icon.filled { color: #ffb400; }
  .error { color: #f44336; font-size: 13px; text-align: center; margin-top: -10px; margin-bottom: 10px; }
  .submit-btn { width: 100%; padding: 14px; margin-top: 10px; font-size: 16px; font-weight: 500; border-radius: 8px;
    height: 50px; background: linear-gradient(135deg, #3f51b5, #2196f3); box-shadow: 0 4px 6px rgba(63,81,181,0.2);
    transition: all 0.3s ease;
  }
  .submit-btn:hover:not([disabled]) { transform: translateY(-2px); box-shadow: 0 7px 14px rgba(63,81,181,0.3); }
  .privacy-note { text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(0,0,0,0.1); }
  .privacy-note p { margin: 0; font-size: 12px; color: #666; }
  `]
})
export class ReviewForm implements OnInit {
  reviewForm!: FormGroup;
  phone!: string;
  name!: string; 
  stars = [1, 2, 3, 4, 5];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private reviewService: Review,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.reviewForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      this.phone = params['phone'] || '';
    });
  }

  setRating(value: number) {
    this.reviewForm.get('rating')?.setValue(value);
  }

  onSubmit() {
    if (this.reviewForm.invalid) return;

    this.isLoading = true;
    const { rating, comment } = this.reviewForm.value;

    this.reviewService.submitReview(this.name,this.phone, rating, comment).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('Review submitted successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/app-mini-game'], { queryParams: { phone: this.phone } });
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.snackBar.open('Failed to submit review. Try again.', 'Close', { duration: 3000 });
      }
    });
  }
}*/
/*
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Review } from '../../services/review';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
  <div class="container">
    <div class="background-decoration">
      <div class="decoration-circle circle-1"></div>
      <div class="decoration-circle circle-2"></div>
      <div class="decoration-circle circle-3"></div>
    </div>
    
    <mat-card class="review-card">
      <div class="header">
        <div class="icon-container">
          <mat-icon color="primary" fontIcon="rate_review" class="icon"></mat-icon>
        </div>
        <h2 class="title">Submit Your Review</h2>
        <p class="subtitle">Your feedback helps us improve</p>
      </div>

      <form [formGroup]="reviewForm" (ngSubmit)="onSubmit()" class="form">
        
        <!-- ⭐ Star Rating -->
        <div class="rating-container">
          <span *ngFor="let star of stars; let i = index" (click)="setRating(i+1)">
            <mat-icon [ngClass]="{'filled': i < reviewForm.get('rating')?.value}">
              {{ i < reviewForm.get('rating')?.value ? 'star' : 'star_border' }}
            </mat-icon>
          </span>
        </div>
        <div class="error" *ngIf="reviewForm.get('rating')?.invalid && reviewForm.get('rating')?.touched">
          Please select a rating
        </div>

        <!-- Comment -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Your Feedback</mat-label>
          <textarea matInput formControlName="comment" rows="4" placeholder="Share your experience with us..."></textarea>
          <mat-icon matPrefix>rate_review</mat-icon>
          <mat-error *ngIf="reviewForm.get('comment')?.invalid && reviewForm.get('comment')?.touched">
            Please provide your feedback
          </mat-error>
        </mat-form-field>

        <!-- Submit -->
        <button 
          mat-raised-button 
          color="primary" 
          class="submit-btn" 
          type="submit"
          [disabled]="reviewForm.invalid || isLoading">
          <span *ngIf="!isLoading">Submit Review</span>
          <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
        </button>

        <div class="privacy-note">
          <p>Your review will be publicly visible after moderation</p>
        </div>
      </form>
    </mat-card>
  </div>
`,
  styles:[`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }
  .background-decoration { position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 0; }
  .decoration-circle { position: absolute; border-radius: 50%; background: rgba(255, 255, 255, 0.1); }
  .circle-1 { width: 300px; height: 300px; top: -150px; right: -150px; }
  .circle-2 { width: 200px; height: 200px; bottom: -100px; left: -100px; }
  .circle-3 { width: 150px; height: 150px; top: 50%; left: 10%; }
  .review-card { width: 100%; max-width: 450px; padding: 32px 28px; border-radius: 16px;
    box-shadow: 0 15px 35px rgba(50,50,93,0.1), 0 5px 15px rgba(0,0,0,0.07);
    background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); z-index: 1; position: relative;
  }
  .header { text-align: center; margin-bottom: 32px; }
  .icon-container { background: linear-gradient(135deg, #ffb400, #ff7300); border-radius: 50%; width: 80px; height: 80px;
    display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; box-shadow: 0 4px 6px rgba(255,180,0,0.2);
  }
  .icon { font-size: 40px; width: 40px; height: 40px; color: white; }
  .title { margin: 0 0 8px; color: #333; font-weight: 600; font-size: 26px;
    background: linear-gradient(135deg, #ffb400, #ff7300);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .subtitle { margin: 0; color: #666; font-size: 15px; font-weight: 400; }
  .form { display: flex; flex-direction: column; gap: 20px; }
  .full-width { width: 100%; }
  .rating-container { display: flex; justify-content: center; margin-bottom: 16px; gap: 8px; }
  .rating-container mat-icon { font-size: 40px; cursor: pointer; color: #e0e0e0; transition: all 0.2s ease; }
  .rating-container mat-icon:hover { transform: scale(1.2); }
  .rating-container mat-icon.filled { color: #ffb400; }
  .error { color: #f44336; font-size: 13px; text-align: center; margin-top: -10px; margin-bottom: 10px; }
  .submit-btn { width: 100%; padding: 14px; margin-top: 10px; font-size: 16px; font-weight: 500; border-radius: 8px;
    height: 50px; background: linear-gradient(135deg, #3f51b5, #2196f3); box-shadow: 0 4px 6px rgba(63,81,181,0.2);
    transition: all 0.3s ease;
  }
  .submit-btn:hover:not([disabled]) { transform: translateY(-2px); box-shadow: 0 7px 14px rgba(63,81,181,0.3); }
  .privacy-note { text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(0,0,0,0.1); }
  .privacy-note p { margin: 0; font-size: 12px; color: #666; }
  `]
})
export class ReviewForm implements OnInit {
  reviewForm!: FormGroup;
  phone!: string;
  stars = [1, 2, 3, 4, 5];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private reviewService: Review,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.reviewForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      this.phone = params['phone'] || '';
    });
  }

  setRating(value: number) {
    this.reviewForm.get('rating')?.setValue(value);
  }

  onSubmit() {
    if (this.reviewForm.invalid) return;

    this.isLoading = true;
    const { rating, comment } = this.reviewForm.value;
    const reviewData = {
      phone: this.phone,
      rating: Number(rating),
      comment,
      status: rating >= 4 ? 'approved' : 'pending'
    };

    this.reviewService.submitReview(this.phone, rating, comment).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('Review submitted successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/mini-game'], { queryParams: { phone: this.phone } });
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.snackBar.open('Failed to submit review. Try again.', 'Close', { duration: 3000 });
      }
    });
  }
}
*/
/*

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Review } from '../../services/review';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
  <div class="container">
    <div class="background-decoration">
      <div class="decoration-circle circle-1"></div>
      <div class="decoration-circle circle-2"></div>
      <div class="decoration-circle circle-3"></div>
    </div>
    
    <mat-card class="review-card">
      <div class="header">
        <div class="icon-container">
          <mat-icon color="primary" fontIcon="rate_review" class="icon"></mat-icon>
        </div>
        <h2 class="title">Submit Your Review</h2>
        <p class="subtitle">Your feedback helps us improve</p>
      </div>

      <form [formGroup]="reviewForm" (ngSubmit)="onSubmit()" class="form">
        
        <!-- ⭐ Star Rating -->
        <div class="rating-container">
          <span *ngFor="let star of stars; let i = index" (click)="setRating(i+1)">
            <mat-icon [ngClass]="{'filled': i < reviewForm.get('rating')?.value}" class="star-icon">
              {{ i < reviewForm.get('rating')?.value ? 'star' : 'star_border' }}
            </mat-icon>
          </span>
        </div>
        <div class="error" *ngIf="reviewForm.get('rating')?.invalid && reviewForm.get('rating')?.touched">
          Please select a rating
        </div>

        <!-- Comment -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Your Feedback</mat-label>
          <textarea matInput formControlName="comment" rows="4" placeholder="Share your experience with us..."></textarea>
          <mat-icon matPrefix>rate_review</mat-icon>
          <mat-error *ngIf="reviewForm.get('comment')?.invalid && reviewForm.get('comment')?.touched">
            Please provide your feedback
          </mat-error>
        </mat-form-field>

        <!-- Submit -->
        <button 
          mat-raised-button 
          color="primary" 
          class="submit-btn" 
          type="submit"
          [disabled]="reviewForm.invalid || isLoading">
          <span *ngIf="!isLoading">Submit Review</span>
          <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
        </button>

        <div class="privacy-note">
          <p>Your review will be publicly visible after moderation</p>
        </div>
      </form>
    </mat-card>
  </div>
`,
  styles:[`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }
  .background-decoration { position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 0; }
  .decoration-circle { position: absolute; border-radius: 50%; background: rgba(255, 255, 255, 0.1); }
  .circle-1 { width: 300px; height: 300px; top: -150px; right: -150px; }
  .circle-2 { width: 200px; height: 200px; bottom: -100px; left: -100px; }
  .circle-3 { width: 150px; height: 150px; top: 50%; left: 10%; }
  .review-card { width: 100%; max-width: 450px; padding: 32px 28px; border-radius: 16px;
    box-shadow: 0 15px 35px rgba(50,50,93,0.1), 0 5px 15px rgba(0,0,0,0.07);
    background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); z-index: 1; position: relative;
  }
  .header { text-align: center; margin-bottom: 32px; }
  .icon-container { background: linear-gradient(135deg, #ffb400, #ff7300); border-radius: 50%; width: 80px; height: 80px;
    display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; box-shadow: 0 4px 6px rgba(255,180,0,0.2);
  }
  .icon { font-size: 40px; width: 40px; height: 40px; color: white; }
  .title { margin: 0 0 8px; color: #ff7300; font-weight: 600; font-size: 24px; }
  .subtitle { margin: 0; color: #666; font-size: 15px; font-weight: 400; }
  .form { display: flex; flex-direction: column; gap: 20px; }
  .full-width { width: 100%; }
  .rating-container { display: flex; justify-content: center; margin-bottom: 16px; gap: 4px; }
  .star-icon { font-size: 40px; width: 40px; height: 40px; cursor: pointer; color: #e0e0e0; transition: all 0.2s ease; }
  .star-icon:hover { transform: scale(1.2); }
  .star-icon.filled { color: #ffb400; }
  .error { color: #f44336; font-size: 13px; text-align: center; margin-top: -10px; margin-bottom: 10px; }
  .submit-btn { width: 100%; padding: 14px; margin-top: 10px; font-size: 16px; font-weight: 500; border-radius: 8px;
    height: 50px; background: linear-gradient(135deg, #3f51b5, #2196f3); box-shadow: 0 4px 6px rgba(63,81,181,0.2);
    transition: all 0.3s ease;
  }
  .submit-btn:hover:not([disabled]) { transform: translateY(-2px); box-shadow: 0 7px 14px rgba(63,81,181,0.3); }
  .privacy-note { text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(0,0,0,0.1); }
  .privacy-note p { margin: 0; font-size: 12px; color: #666; }
  
  /* Mobile responsiveness 
  @media (max-width: 600px) {
    .review-card { padding: 24px 20px; }
    .title { font-size: 22px; }
    .icon-container { width: 70px; height: 70px; }
    .icon { font-size: 35px; width: 35px; height: 35px; }
    .star-icon { font-size: 35px; width: 35px; height: 35px; }
    .circle-1, .circle-2, .circle-3 { display: none; }
  }
  `]
})
export class ReviewForm implements OnInit {
  reviewForm!: FormGroup;
  phone!: string;
  stars = [1, 2, 3, 4, 5];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private reviewService: Review,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.reviewForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      this.phone = params['phone'] || '';
    });
  }

  setRating(value: number) {
    this.reviewForm.get('rating')?.setValue(value);
  }

  onSubmit() {
    if (this.reviewForm.invalid) return;

    this.isLoading = true;
    const { rating, comment } = this.reviewForm.value;
    const reviewData = {
      phone: this.phone,
      rating: Number(rating),
      comment,
      status: rating >= 4 ? 'approved' : 'pending'
    };

    this.reviewService.submitReview(this.phone, rating, comment).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('Review submitted successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/app-mini-game'], { queryParams: { phone: this.phone } });
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.snackBar.open('Failed to submit review. Try again.', 'Close', { duration: 3000 });
      }
    });
  }
}*/

/*

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
  <div class="container">
    <div class="background-decoration">
      <div class="decoration-circle circle-1"></div>
      <div class="decoration-circle circle-2"></div>
      <div class="decoration-circle circle-3"></div>
    </div>
    
    <mat-card class="review-card">
      <div class="header">
        <div class="icon-container">
          <mat-icon color="primary" fontIcon="rate_review" class="icon"></mat-icon>
        </div>
        <h2 class="title">Submit Your Review</h2>
        <p class="subtitle">Your feedback helps us improve</p>
      </div>

      <form [formGroup]="reviewForm" (ngSubmit)="onSubmit()" class="form">
        
        <!-- ⭐ Star Rating -->
        <div class="rating-container">
          <span *ngFor="let star of stars; let i = index" (click)="setRating(i+1)">
            <mat-icon [ngClass]="{'filled': i < reviewForm.get('rating')?.value}" class="star-icon">
              {{ i < reviewForm.get('rating')?.value ? 'star' : 'star_border' }}
            </mat-icon>
          </span>
        </div>
        <div class="error" *ngIf="reviewForm.get('rating')?.invalid && reviewForm.get('rating')?.touched">
          Please select a rating
        </div>

        <!-- Comment -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Your Feedback</mat-label>
          <textarea matInput formControlName="comment" rows="4" placeholder="Share your experience with us..."></textarea>
          <mat-icon matPrefix>rate_review</mat-icon>
          <mat-error *ngIf="reviewForm.get('comment')?.invalid && reviewForm.get('comment')?.touched">
            Please provide your feedback
          </mat-error>
        </mat-form-field>

        <!-- Submit -->
        <button 
          mat-raised-button 
          color="primary" 
          class="submit-btn" 
          type="submit"
          [disabled]="reviewForm.invalid || isLoading">
          <span *ngIf="!isLoading">Submit Review</span>
          <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
        </button>

        <div class="privacy-note">
          <p>Your review will be publicly visible after moderation</p>
        </div>
      </form>
    </mat-card>
  </div>
`,
  styles:[`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }
  .background-decoration { position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 0; }
  .decoration-circle { position: absolute; border-radius: 50%; background: rgba(255, 255, 255, 0.1); }
  .circle-1 { width: 300px; height: 300px; top: -150px; right: -150px; }
  .circle-2 { width: 200px; height: 200px; bottom: -100px; left: -100px; }
  .circle-3 { width: 150px; height: 150px; top: 50%; left: 10%; }
  .review-card { width: 100%; max-width: 450px; padding: 32px 28px; border-radius: 16px;
    box-shadow: 0 15px 35px rgba(50,50,93,0.1), 0 5px 15px rgba(0,0,0,0.07);
    background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); z-index: 1; position: relative;
  }
  .header { text-align: center; margin-bottom: 32px; }
  .icon-container { background: linear-gradient(135deg, #ffb400, #ff7300); border-radius: 50%; width: 80px; height: 80px;
    display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; box-shadow: 0 4px 6px rgba(255,180,0,0.2);
  }
  .icon { font-size: 40px; width: 40px; height: 40px; color: white; }
  .title { margin: 0 0 8px; color: #ff7300; font-weight: 600; font-size: 24px; }
  .subtitle { margin: 0; color: #666; font-size: 15px; font-weight: 400; }
  .form { display: flex; flex-direction: column; gap: 20px; }
  .full-width { width: 100%; }
  .rating-container { display: flex; justify-content: center; margin-bottom: 16px; gap: 4px; }
  .star-icon { font-size: 40px; width: 40px; height: 40px; cursor: pointer; color: #e0e0e0; transition: all 0.2s ease; }
  .star-icon:hover { transform: scale(1.2); }
  .star-icon.filled { color: #ffb400; }
  .error { color: #f44336; font-size: 13px; text-align: center; margin-top: -10px; margin-bottom: 10px; }
  .submit-btn { width: 100%; padding: 14px; margin-top: 10px; font-size: 16px; font-weight: 500; border-radius: 8px;
    height: 50px; background: linear-gradient(135deg, #3f51b5, #2196f3); box-shadow: 0 4px 6px rgba(63,81,181,0.2);
    transition: all 0.3s ease;
  }
  .submit-btn:hover:not([disabled]) { transform: translateY(-2px); box-shadow: 0 7px 14px rgba(63,81,181,0.3); }
  .privacy-note { text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(0,0,0,0.1); }
  .privacy-note p { margin: 0; font-size: 12px; color: #666; }
  
  @media (max-width: 600px) {
    .review-card { padding: 24px 20px; }
    .title { font-size: 22px; }
    .icon-container { width: 70px; height: 70px; }
    .icon { font-size: 35px; width: 35px; height: 35px; }
    .star-icon { font-size: 35px; width: 35px; height: 35px; }
    .circle-1, .circle-2, .circle-3 { display: none; }
  }
  `]
})
export class ReviewForm implements OnInit {
  reviewForm!: FormGroup;
  phone!: string;
  stars = [1, 2, 3, 4, 5];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.reviewForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      this.phone = params['phone'] || '';
    });
  }

  setRating(value: number) {
    this.reviewForm.get('rating')?.setValue(value);
  }

  onSubmit() {
    if (this.reviewForm.invalid) return;

    this.isLoading = true;

    // Direct navigation to mini-game after validation
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/app-mini-game'], { queryParams: { phone: this.phone } });
    }, 500); // optional spinner delay
  }
}
*/
// Here Angular decide status Pending or Approved

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReviewService } from '../../services/review';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
  <div class="container">
    <div class="background-decoration">
      <div class="decoration-circle circle-1"></div>
      <div class="decoration-circle circle-2"></div>
      <div class="decoration-circle circle-3"></div>
    </div>
    
    <mat-card class="review-card">
      <div class="header">
        <div class="icon-container">
          <mat-icon color="primary" fontIcon="rate_review" class="icon"></mat-icon>
        </div>
        <h2 class="title">Submit Your Review</h2>
        <p class="subtitle">Your feedback helps us improve</p>
      </div>

      <form [formGroup]="reviewForm" (ngSubmit)="onSubmit()" class="form">
        
        <!-- ⭐ Star Rating -->
        <div class="rating-container">
          <span *ngFor="let star of stars; let i = index" (click)="setRating(i+1)">
            <mat-icon [ngClass]="{'filled': i < reviewForm.get('rating')?.value}" class="star-icon">
              {{ i < reviewForm.get('rating')?.value ? 'star' : 'star_border' }}
            </mat-icon>
          </span>
        </div>
        <div class="error" *ngIf="reviewForm.get('rating')?.invalid && reviewForm.get('rating')?.touched">
          Please select a rating
        </div>

        <!-- Comment -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Your Feedback</mat-label>
          <textarea matInput formControlName="comment" rows="4" placeholder="Share your experience with us..."></textarea>
          <mat-icon matPrefix>rate_review</mat-icon>
          <mat-error *ngIf="reviewForm.get('comment')?.invalid && reviewForm.get('comment')?.touched">
            Please provide your feedback
          </mat-error>
        </mat-form-field>

        <!-- Submit -->
        <button 
          mat-raised-button 
          color="primary" 
          class="submit-btn" 
          type="submit"
          [disabled]="reviewForm.invalid || isLoading">
          <span *ngIf="!isLoading">Submit Review</span>
          <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
        </button>

        <div class="privacy-note">
          <p>Your review will be publicly visible after moderation</p>
        </div>
      </form>
    </mat-card>
  </div>
`,
  styles:[`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }
  .background-decoration { position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 0; }
  .decoration-circle { position: absolute; border-radius: 50%; background: rgba(255, 255, 255, 0.1); }
  .circle-1 { width: 300px; height: 300px; top: -150px; right: -150px; }
  .circle-2 { width: 200px; height: 200px; bottom: -100px; left: -100px; }
  .circle-3 { width: 150px; height: 150px; top: 50%; left: 10%; }
  .review-card { width: 100%; max-width: 450px; padding: 32px 28px; border-radius: 16px;
    box-shadow: 0 15px 35px rgba(50,50,93,0.1), 0 5px 15px rgba(0,0,0,0.07);
    background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); z-index: 1; position: relative;
  }
  .header { text-align: center; margin-bottom: 32px; }
  .icon-container { background: linear-gradient(135deg, #ffb400, #ff7300); border-radius: 50%; width: 80px; height: 80px;
    display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; box-shadow: 0 4px 6px rgba(255,180,0,0.2);
  }
  .icon { font-size: 40px; width: 40px; height: 40px; color: white; }
  .title { margin: 0 0 8px; color: #ff7300; font-weight: 600; font-size: 24px; }
  .subtitle { margin: 0; color: #666; font-size: 15px; font-weight: 400; }
  .form { display: flex; flex-direction: column; gap: 20px; }
  .full-width { width: 100%; }
  .rating-container { display: flex; justify-content: center; margin-bottom: 16px; gap: 4px; }
  .star-icon { font-size: 40px; width: 40px; height: 40px; cursor: pointer; color: #e0e0e0; transition: all 0.2s ease; }
  .star-icon:hover { transform: scale(1.2); }
  .star-icon.filled { color: #ffb400; }
  .error { color: #f44336; font-size: 13px; text-align: center; margin-top: -10px; margin-bottom: 10px; }
  .submit-btn { width: 100%; padding: 14px; margin-top: 10px; font-size: 16px; font-weight: 500; border-radius: 8px;
    height: 50px; background: linear-gradient(135deg, #3f51b5, #2196f3); box-shadow: 0 4px 6px rgba(63,81,181,0.2);
    transition: all 0.3s ease;
  }
  .submit-btn:hover:not([disabled]) { transform: translateY(-2px); box-shadow: 0 7px 14px rgba(63,81,181,0.3); }
  .privacy-note { text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(0,0,0,0.1); }
  .privacy-note p { margin: 0; font-size: 12px; color: #666; }
  
  /* Mobile responsiveness */
  @media (max-width: 600px) {
    .review-card { padding: 24px 20px; }
    .title { font-size: 22px; }
    .icon-container { width: 70px; height: 70px; }
    .icon { font-size: 35px; width: 35px; height: 35px; }
    .star-icon { font-size: 35px; width: 35px; height: 35px; }
    .circle-1, .circle-2, .circle-3 { display: none; }
  }
  `]
})
export class ReviewForm implements OnInit {
  reviewForm!: FormGroup;
  phone!: string;
  stars = [1, 2, 3, 4, 5];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.reviewForm = this.fb.group({
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {
      this.phone = params['phone'] || '';
    });
  }

  setRating(value: number) {
    this.reviewForm.get('rating')?.setValue(value);
  }

  onSubmit() {
    if (this.reviewForm.invalid) return;
  
    this.isLoading = true;
    const { rating, comment } = this.reviewForm.value;
    const status = rating >= 4 ? 'approved' : 'pending';
  
    this.reviewService.submitReview(this.phone, rating, comment, status).subscribe({
      next: () => {
        this.isLoading = false;
  
        if (rating >= 4) {
          // Good review → Google Business API
          this.snackBar.open('Thanks! Redirecting to Google Reviews...', 'Close', { duration: 3000 });
          window.open('https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review', '_blank');
        } else {
          //  Low review → stored for Admin Dashboard
          this.snackBar.open('Your review will be sent for admin approval.', 'Close', { duration: 3000 });
        }
  
        // ✅ In both cases, continue spin game
        this.router.navigate(['/app-mini-game'], { queryParams: { phone: this.phone } });
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.snackBar.open('Failed to submit review. Try again.', 'Close', { duration: 3000 });
      }
    });
  }
  
}