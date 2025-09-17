/*import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../services/user';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-phone-entry',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="container">
      <mat-card>
        <div class="header">
          <mat-icon color="primary" fontIcon="phone_android" class="icon"></mat-icon>
          <h2>Phone Verification</h2>
          <p class="subtitle">Enter your phone number to continue</p>
        </div>

        <!-- User Name Field -->
        <form *ngIf="!showOtpField" [formGroup]="phoneForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline" class="full-width">
        <mat-label>User Name</mat-label>
        <input matInput type="text" formControlName="userName" placeholder="Enter your name">
        <mat-error *ngIf="phoneForm.get('userName')?.invalid && phoneForm.get('userName')?.touched">
          User name is required
        </mat-error>
      </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
    <mat-label>Phone Number</mat-label>
    <input matInput type="tel" formControlName="phone" placeholder="Enter 10-digit number">
    <mat-error *ngIf="phoneForm.get('phone')?.invalid && phoneForm.get('phone')?.touched">
      Please enter a valid 10-digit phone number
    </mat-error>
  </mat-form-field>

  <button mat-raised-button color="primary" class="full-width action-btn"
          [disabled]="phoneForm.invalid">
    Continue
  </button>
</form>

        <!-- OTP Form -->
        <form *ngIf="showOtpField" [formGroup]="otpForm" (ngSubmit)="verifyOtp()" class="otp-form">
  <mat-form-field appearance="outline" class="full-width">
    <mat-label>Enter OTP</mat-label>
    <input matInput type="text" formControlName="otp" maxlength="6" placeholder="6-digit code">
  </mat-form-field>

  <button mat-raised-button color="accent" class="full-width action-btn"
          [disabled]="otpForm.invalid">
    Verify OTP
  </button>

  <!-- Back Button -->
  <button mat-stroked-button color="primary" class="full-width action-btn"
          type="button" (click)="goBack()">
    Back
  </button>
</form>
  `,
  styles: [`
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
  .otp-form {
    margin-top: 20px;
  }
  .action-btn {
    margin-top: 12px;
    font-weight: 600;
    border-radius: 30px;
    height: 45px;
  }
  `]
})
export class PhoneEntry implements OnInit {
  userForm!: FormGroup;
  phoneForm!: FormGroup;
  otpForm!: FormGroup;
  showOtpField = false;
  phoneNumber!: string;

  constructor(
    private fb: FormBuilder,
    private userService: User,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.phoneForm = this.fb.group({
     
     userName: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
    goBack() {
    this.showOtpField = false;   // hide OTP form
    this.otpForm.reset();        // clear OTP field
  }
  onSubmit() {
    this.phoneNumber = this.phoneForm.value.phone;

    this.userService.checkPhoneExists(this.phoneNumber).subscribe(exists => {
      if (exists) {
        this.router.navigate(['/app-mini-game']);
      } else {
        this.userService.sendOtp(this.phoneNumber).subscribe(() => {
          this.showOtpField = true;
        });
      }
    });
  }

  verifyOtp() {
    const otp = this.otpForm.value.otp;
    this.userService.verifyOtp(this.phoneNumber, otp).subscribe(valid => {
      if (valid) {
        this.router.navigate(['/review-form']);
      } else {
        alert('Invalid OTP, please try again.');
      }
    });
  }
}
*/

// Originl With API Calls
/*import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../services/user';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-phone-entry',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="container">
      <mat-card>
        <div class="header">
          <mat-icon color="primary" fontIcon="person" class="icon"></mat-icon>
          <h2>User Registration</h2>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <!-- Name Field -->
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Name</mat-label>
            <input matInput formControlName="name" placeholder="Enter your name">
            <mat-error *ngIf="form.get('name')?.hasError('required')">
              Name is required
            </mat-error>
          </mat-form-field>

          <!-- Phone Field -->
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Phone Number</mat-label>
            <input matInput formControlName="phone" placeholder="Enter phone number">
            <mat-error *ngIf="form.get('phone')?.hasError('required')">
              Phone number is required
            </mat-error>
          </mat-form-field>

          <button mat-raised-button color="primary" class="submit-btn" type="submit">
            Continue
          </button>
        </form>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      justify-content: center;
      padding: 20px;
    }
    mat-card {
      width: 100%;
      max-width: 400px;
      padding: 20px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }
    .icon {
      font-size: 32px;
    }
    .full-width {
      width: 100%;
    }
    .submit-btn {
      width: 100%;
      margin-top: 20px;
    }
  `]
})
export class PhoneEntryComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: User,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { name, phone } = this.form.value;

      // Step 1: Check if phone already exists
      this.userService.checkPhoneExists(phone).subscribe({
        next: (exists) => {
          if (exists) {
            // Navigate to mini-game if phone exists
            this.router.navigate(['/mini-game']);
          } else {
            // Otherwise, save user then navigate to review-form
            this.userService.createUser(name, phone).subscribe({
              next: () => {
                this.router.navigate(['/review-form']);
              },
              error: err => {
                console.error('Error saving user:', err);
                alert('Error saving user');
              }
            });
          }
        },
        error: err => {
          console.error('Error checking phone:', err);
          alert('Error verifying phone');
        }
      });
    }
  }
}

*/

/*import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../services/user';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-phone-entry',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="container">
      <mat-card class="registration-card">
        <div class="header">
          <div class="icon-container">
            <mat-icon color="primary" fontIcon="person" class="icon"></mat-icon>
          </div>
          <h2 class="title">User Registration</h2>
          <p class="subtitle">Please enter your details to continue</p>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form">
          <!-- Name Field -->
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Full Name</mat-label>
            <input matInput formControlName="name" placeholder="Enter your full name">
            <mat-icon matPrefix>person</mat-icon>
            <mat-error *ngIf="form.get('name')?.hasError('required')">
              Name is required
            </mat-error>
          </mat-form-field>

          <!-- Phone Field -->
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Phone Number</mat-label>
            <input matInput formControlName="phone" placeholder="Enter your phone number" type="tel">
            <mat-icon matPrefix>phone</mat-icon>
            <mat-error *ngIf="form.get('phone')?.hasError('required')">
              Phone number is required
            </mat-error>
            <mat-hint>Format: (123) 456-7890</mat-hint>
          </mat-form-field>

          <button 
            mat-raised-button 
            color="primary" 
            class="submit-btn" 
            type="submit"
            [disabled]="form.invalid || isLoading">
            <span *ngIf="!isLoading">Continue</span>
            <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
          </button>
        </form>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-height: 100vh;
      padding: 16px;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      box-sizing: border-box;
    }

    .registration-card {
      width: 100%;
      max-width: 450px;
      padding: 32px 24px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      margin-top: 2rem;
    }

    .header {
      text-align: center;
      margin-bottom: 32px;
    }

    .icon-container {
      background-color: rgba(63, 81, 181, 0.1);
      border-radius: 50%;
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
    }

    .icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
    }

    .title {
      margin: 0 0 8px;
      color: #3f51b5;
      font-weight: 500;
      font-size: 24px;
    }

    .subtitle {
      margin: 0;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .full-width {
      width: 100%;
    }

    .submit-btn {
      width: 100%;
      padding: 12px;
      margin-top: 8px;
      font-size: 16px;
      font-weight: 500;
      border-radius: 8px;
      height: 48px;
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
      color: rgba(0, 0, 0, 0.6);
    }

    .privacy-note a {
      color: #3f51b5;
      text-decoration: none;
    }

    /* Mobile responsiveness 
    @media (max-width: 600px) {
      .container {
        padding: 8px;
        align-items: center;
      }

      .registration-card {
        padding: 24px 16px;
        margin-top: 0;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .title {
        font-size: 20px;
      }

      .icon-container {
        width: 56px;
        height: 56px;
      }

      .icon {
        font-size: 28px;
        width: 28px;
        height: 28px;
      }
    }

    /* Animation for form elements 
    .mat-form-field {
      transition: transform 0.3s ease;
    }

    .mat-form-field:hover {
      transform: translateY(-2px);
    }

    /* Focus styles for better accessibility
    button:focus-visible, 
    input:focus-visible {
      outline: 2px solid #3f51b5;
      outline-offset: 2px;
    }
  `]
})
export class PhoneEntry implements OnInit {
  form!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: User,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;
      const { name, phone } = this.form.value;

      // Step 1: Check if phone already exists
      this.userService.checkPhoneExists(phone).subscribe({
        next: (exists) => {
          this.isLoading = false;
          if (exists) {
            // Navigate to mini-game if phone exists
            this.router.navigate(['/mini-game']);
          } else {
            // Otherwise, save user then navigate to review-form
            this.userService.createUser(name, phone).subscribe({
              next: () => {
                this.router.navigate(['/review-form']);
              },
              error: err => {
                console.error('Error saving user:', err);
                this.snackBar.open('Error saving user information. Please try again.', 'Dismiss', {
                  duration: 5000,
                  panelClass: ['error-snackbar']
                });
              }
            });
          }
        },
        error: err => {
          this.isLoading = false;
          console.error('Error checking phone:', err);
          this.snackBar.open('Error verifying phone number. Please check your connection and try again.', 'Dismiss', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
    }
  }
}
*/

// Final Code with Services Calling and Color Theme

/*import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../services/user';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-phone-entry',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="container">
      <div class="background-decoration">
        <div class="decoration-circle circle-1"></div>
        <div class="decoration-circle circle-2"></div>
        <div class="decoration-circle circle-3"></div>
      </div>
      
      <mat-card class="registration-card">
        <div class="header">
          <div class="icon-container">
            <mat-icon color="primary" fontIcon="person" class="icon"></mat-icon>
          </div>
          <h2 class="title">User Registration</h2>
          <p class="subtitle">Please enter your details to continue</p>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form">
          <!-- Name Field -->
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Full Name</mat-label>
            <input matInput formControlName="name" placeholder="Enter your full name">
            <mat-icon matPrefix>person</mat-icon>
            <mat-error *ngIf="form.get('name')?.hasError('required')">
              Name is required
            </mat-error>
            <mat-error *ngIf="form.get('name')?.hasError('minlength')">
              Name must be at least 2 characters
            </mat-error>
          </mat-form-field>

          <!-- Phone Field -->
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Phone Number</mat-label>
            <input matInput formControlName="phone" placeholder="Enter your phone number" type="tel">
            <mat-icon matPrefix>phone</mat-icon>
            <mat-error *ngIf="form.get('phone')?.hasError('required')">
              Phone number is required
            </mat-error>
            <mat-error *ngIf="form.get('phone')?.hasError('pattern')">
              Please enter a valid 10-digit phone number
            </mat-error>
            <mat-hint>Format: (123) 456-7890</mat-hint>
          </mat-form-field>

          <button 
            mat-raised-button 
            color="primary" 
            class="submit-btn" 
            type="submit"
            [disabled]="form.invalid || isLoading">
            <span *ngIf="!isLoading">Continue</span>
            <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
          </button>
        </form>
      </mat-card>
    </div>
  `,
  styles: [`
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

    .registration-card {
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
      background: linear-gradient(135deg, #3f51b5, #2196f3);
      border-radius: 50%;
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      box-shadow: 0 4px 6px rgba(63, 81, 181, 0.2);
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
      background: linear-gradient(135deg, #3f51b5, #2196f3);
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

    .mat-form-field {
      --mat-form-field-container-height: 60px;
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

    .privacy-note a {
      color: #3f51b5;
      text-decoration: none;
      font-weight: 500;
    }

    .privacy-note a:hover {
      text-decoration: underline;
    }

    /* Mobile responsiveness 
    @media (max-width: 600px) {
      .container {
        padding: 12px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }

      .registration-card {
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
    input:focus-visible {
      outline: 2px solid #3f51b5;
      outline-offset: 2px;
    }

    /* Custom styles for the spinner 
    .mat-progress-spinner circle {
      stroke: white;
    }
  `]
})
export class PhoneEntry implements OnInit {
  form!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: User,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;
      const { name, phone } = this.form.value;

      // Step 1: Check if phone already exists
      this.userService.checkPhoneExists(phone).subscribe({
        next: (exists) => {
          this.isLoading = false;
          if (exists) {
            // Navigate to mini-game if phone exists
            this.router.navigate(['/mini-game']);
          } else {
            // Otherwise, save user then navigate to review-form
            this.userService.createUser(name, phone).subscribe({
              next: () => {
                this.router.navigate(['/review-form']);
              },
              error: err => {
                console.error('Error saving user:', err);
                this.snackBar.open('Error saving user information. Please try again.', 'Dismiss', {
                  duration: 5000,
                  panelClass: ['error-snackbar']
                });
              }
            });
          }
        },
        error: err => {
          this.isLoading = false;
          console.error('Error checking phone:', err);
          this.snackBar.open('Error verifying phone number. Please check your connection and try again.', 'Dismiss', {
            duration: 5000,
            panelClass: ['error-snackbar']
          });
        }
      });
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
    }
  }
}

*/


/*
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-phone-entry',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: ` 
    <div class="container">
      <mat-card class="registration-card">
        <div class="header">
          <div class="icon-container">
            <mat-icon color="primary" fontIcon="person" class="icon"></mat-icon>
          </div>
          <h2 class="title">User Registration</h2>
          <p class="subtitle">Please enter your details to continue</p>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form">
          <!-- Name Field -->
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Full Name</mat-label>
            <input matInput formControlName="name" placeholder="Enter your full name">
            <mat-icon matPrefix>person</mat-icon>
            <mat-error *ngIf="form.get('name')?.hasError('required')">
              Name is required
            </mat-error>
            <mat-error *ngIf="form.get('name')?.hasError('minlength')">
              Name must be at least 2 characters
            </mat-error>
          </mat-form-field>

          <!-- Phone Field -->
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Phone Number</mat-label>
            <input matInput formControlName="phone" placeholder="Enter your phone number" type="tel">
            <mat-icon matPrefix>phone</mat-icon>
            <mat-error *ngIf="form.get('phone')?.hasError('required')">
              Phone number is required
            </mat-error>
            <mat-error *ngIf="form.get('phone')?.hasError('pattern')">
              Please enter a valid 10-digit phone number
            </mat-error>
          </mat-form-field>

          <button 
            mat-raised-button 
            color="primary" 
            class="submit-btn" 
            type="submit"
            [disabled]="form.invalid || isLoading">
            <span *ngIf="!isLoading">Continue</span>
            <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
          </button>
        </form>
      </mat-card>
    </div>
  `,
  styles: [`.container {
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

  .registration-card {
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
    background: linear-gradient(135deg, #3f51b5, #2196f3);
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    box-shadow: 0 4px 6px rgba(63, 81, 181, 0.2);
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
    background: linear-gradient(135deg, #3f51b5, #2196f3);
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

  .mat-form-field {
    --mat-form-field-container-height: 60px;
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

  .privacy-note a {
    color: #3f51b5;
    text-decoration: none;
    font-weight: 500;
  }

  .privacy-note a:hover {
    text-decoration: underline;
  }

  /* Mobile responsiveness 
  @media (max-width: 600px) {
    .container {
      padding: 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .registration-card {
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
  input:focus-visible {
    outline: 2px solid #3f51b5;
    outline-offset: 2px;
  }

  /* Custom styles for the spinner 
  .mat-progress-spinner circle {
    stroke: white;
  }
  `]
})
export class PhoneEntry implements OnInit {
  form!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;
      const { name, phone } = this.form.value;

      // Mock submission
      console.log('Form submitted:', { name, phone });

      setTimeout(() => {
        this.isLoading = false;

        // Show snack bar
        this.snackBar.open('Form submitted successfully!', 'Dismiss', { duration: 3000 });

        // Navigate to another page
        this.router.navigate(['/review-form']); // Change this route as needed
      }, 1000);
    } else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
    }
  }
}
*/
/*
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-phone-entry',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="container">
      <mat-card class="registration-card">
        <div class="header">
          <div class="icon-container">
            <mat-icon color="primary" fontIcon="business" class="icon"></mat-icon>
          </div>
          <h2 class="title">User Registration</h2>
          <p class="subtitle">Please enter your details to continue</p>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form">
          <!-- Name Field -->
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Full Name</mat-label>
            <input matInput formControlName="name" placeholder="Enter your full name">
            <mat-icon matPrefix>person</mat-icon>
            <mat-error *ngIf="form.get('name')?.hasError('required')">
              Name is required
            </mat-error>
            <mat-error *ngIf="form.get('name')?.hasError('minlength')">
              Name must be at least 2 characters
            </mat-error>
          </mat-form-field>

          <!-- Phone Field -->
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Phone Number</mat-label>
            <input matInput formControlName="phone" placeholder="Enter your phone number" type="tel">
            <mat-icon matPrefix>phone</mat-icon>
            <mat-error *ngIf="form.get('phone')?.hasError('required')">
              Phone number is required
            </mat-error>
            <mat-error *ngIf="form.get('phone')?.hasError('pattern')">
              Please enter a valid 10-digit phone number
            </mat-error>
          </mat-form-field>

          <button 
            mat-raised-button 
            color="primary" 
            class="submit-btn" 
            type="submit"
            [disabled]="form.invalid || isLoading">
            <span *ngIf="!isLoading">Continue</span>
            <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
          </button>
        </form>
      </mat-card>
    </div>
  `,
  styles: [`
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

  .registration-card {
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
    background: linear-gradient(135deg, #3f51b5, #2196f3);
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    box-shadow: 0 4px 6px rgba(63, 81, 181, 0.2);
  }

  .icon {
    font-size: 40px;
    width: 40px;
    height: 40px;
    color: white;
  }

  .title {
    margin: 0 0 8px;
    color: #3f51b5;
    font-weight: 600;
    font-size: 26px;
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

  .mat-form-field {
    --mat-form-field-container-height: 60px;
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

  .privacy-note a {
    color: #3f51b5;
    text-decoration: none;
    font-weight: 500;
  }

  .privacy-note a:hover {
    text-decoration: underline;
  }

  /* Mobile responsiveness 
  @media (max-width: 600px) {
    .container {
      padding: 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .registration-card {
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
  input:focus-visible {
    outline: 2px solid #3f51b5;
    outline-offset: 2px;
  }

  /* Custom styles for the spinner 
  .mat-progress-spinner circle {
    stroke: white;
  }

    
  `]
})
export class PhoneEntry implements OnInit {
  form!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;

      // Directly navigate to review-form after a small delay to show spinner
      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['/app-review-form']);
      }, 500);

    } else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
    }
  }
}*/



// 12-09-2025
// It is a final Our Sir Prooved Project with Services Calling ( Final with Services)


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-phone-entry',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="container">
      <div class="background-decoration">
        <div class="decoration-circle circle-1"></div>
        <div class="decoration-circle circle-2"></div>
        <div class="decoration-circle circle-3"></div>
      </div>
      
      <mat-card class="registration-card">
      <div class="header">
      <div class="icon-container">
        <img src="Images/MiramataLogo.jpg" alt="Miramata Logo" class="logo-img" />
      </div>
      <h2 class="title">User Registration</h2>
      <p class="subtitle">Please enter your details to continue</p>
    </div>
    
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form">
          <!-- Name Field -->
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Full Name</mat-label>
            <input matInput formControlName="name" placeholder="Enter your full name">
            <mat-icon matPrefix>person</mat-icon>
            <mat-error *ngIf="form.get('name')?.hasError('required')">
              Name is required
            </mat-error>
            <mat-error *ngIf="form.get('name')?.hasError('minlength')">
              Name must be at least 2 characters
            </mat-error>
          </mat-form-field>

          <!-- Phone Field -->
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Phone Number</mat-label>
            <input matInput formControlName="phone" placeholder="Enter your phone number" type="tel">
            <mat-icon matPrefix>phone</mat-icon>
            <mat-error *ngIf="form.get('phone')?.hasError('required')">
              Phone number is required
            </mat-error>
            <mat-error *ngIf="form.get('phone')?.hasError('pattern')">
              Please enter a valid 10-digit phone number
            </mat-error>
            <mat-hint>Format: 1234567890</mat-hint>
          </mat-form-field>

          <button 
            mat-raised-button 
            color="primary" 
            class="submit-btn" 
            type="submit"
            [disabled]="form.invalid || isLoading">
            <span *ngIf="!isLoading">Continue</span>
            <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
          </button>
        </form>

        <div class="privacy-note">
          <p>By continuing, you agree to our <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a></p>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
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

    .registration-card {
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

   /* .icon-container {
      background: linear-gradient(135deg, #3f51b5, #2196f3);
      border-radius: 50%;
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      box-shadow: 0 4px 6px rgba(63, 81, 181, 0.2);
    }*/
    .icon-container {
      background: white; /* remove gradient so logo looks clean */
      border-radius: 0%;
      width: 100px;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      box-shadow: 0 4px 6px rgba(63, 81, 181, 0.2);
      overflow: hidden; /* keeps logo inside circle */
    }
    .logo-img {
      width: 80%;
      height: 80%;
      object-fit: contain; /* keeps aspect ratio */
    }

    /*.icon {
      font-size: 40px;
      width: 40px;
      height: 40px;
      color: white;
    }*/

    .title {
      margin: 0 0 8px;
      color: #3f51b5;
      font-weight: 600;
      font-size: 26px;
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

    .mat-form-field {
      --mat-form-field-container-height: 60px;
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

    .privacy-note a {
      color: #3f51b5;
      text-decoration: none;
      font-weight: 500;
    }

    .privacy-note a:hover {
      text-decoration: underline;
    }

    /* Mobile responsiveness */
    @media (max-width: 600px) {
      .container {
        padding: 12px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }

      .registration-card {
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
    }

    /* Animation for form elements*/
    .mat-form-field {
      transition: all 0.3s ease;
    }

    .mat-form-field:hover {
      transform: translateY(-2px);
    }

    /* Focus styles for better accessibility */
    button:focus-visible, 
    input:focus-visible {
      outline: 2px solid #3f51b5;
      outline-offset: 2px;
    }

    /* Custom styles for the spinner */
    .mat-progress-spinner circle {
      stroke: white;
    }
  `]
})
export class PhoneEntry implements OnInit {
  form!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+\d{1,3}[- ]?)?\d{10}$/)]]
    });
  }
 
  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;
      const { name, phone } = this.form.value;
  
      this.userService.checkPhoneExists(phone).subscribe({
        next: (res) => {
          this.isLoading = false;
          if (res.returning_user) {
            // ✅ Existing user → go to mini-game
            this.router.navigate(
              ['app-mini-game'],   // 🔥 removed leading slash
              { queryParams: { phone, user_id: res.user_id } }
            );
          } else {
            this.userService.createUser(name, phone).subscribe({
              next: (newUser) => {
                // ✅ New user → go to review form
                this.router.navigate(
                  ['app-review-form'],   // 🔥 removed leading slash
                  { queryParams: { phone, user_id: newUser.id } }  // ✅ fixed user_id → id
                );
              },
              error: err => {
                console.error('Error saving user:', err);
                this.snackBar.open(
                  'Error saving user information. Please try again.',
                  'Dismiss',
                  { duration: 5000, panelClass: ['error-snackbar'] }
                );
              }
            });
          }
        },
        error: err => {
          this.isLoading = false;
          console.error('Error checking phone:', err);
          this.snackBar.open(
            'Error verifying phone number. Please check your connection and try again.',
            'Dismiss',
            { duration: 5000, panelClass: ['error-snackbar'] }
          );
        }
      });
    } else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
    }
  }
}  