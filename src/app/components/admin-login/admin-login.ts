import { Component } from '@angular/core';
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
  selector: 'app-admin-login',
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
      <mat-card class="login-card">
        <div class="header">
          <div class="icon-container">
            <mat-icon color="primary" fontIcon="admin_panel_settings" class="icon"></mat-icon>
          </div>
          <h2 class="title">Admin Login</h2>
          <p class="subtitle">Enter your credentials to continue</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="form">
          <!-- Username -->
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Username</mat-label>
            <input matInput formControlName="username" placeholder="Enter username">
            <mat-icon matPrefix>person</mat-icon>
            <mat-error *ngIf="loginForm.get('username')?.hasError('required')">
              Username is required
            </mat-error>
          </mat-form-field>

          <!-- Password -->
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Password</mat-label>
            <input matInput type="password" formControlName="password" placeholder="Enter password">
            <mat-icon matPrefix>lock</mat-icon>
            <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
              Password is required
            </mat-error>
          </mat-form-field>

          <!-- Submit Button -->
          <button 
            mat-raised-button 
            color="primary" 
            class="submit-btn" 
            type="submit"
            [disabled]="loginForm.invalid || isLoading">
            <span *ngIf="!isLoading">Login</span>
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

  .login-card {
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

  @media (max-width: 600px) {
    .container {
      padding: 12px;
    }
    .login-card {
      padding: 24px 20px;
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
    }
  }
  `]
})
export class AdminLogin {
  loginForm: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;

      setTimeout(() => {
        this.isLoading = false;
        this.snackBar.open('Login successful', 'Close', { duration: 2000 });
        this.router.navigate(['admindashboard']);
      }, 800);
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }
}


/*
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AdminService } from '../../services/admin';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div class="login-container">
      <mat-card>
        <h2>Admin Login</h2>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Username</mat-label>
            <input matInput formControlName="username">
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Password</mat-label>
            <input matInput type="password" formControlName="password">
          </mat-form-field>

          <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid">
            Login
          </button>
        </form>
      </mat-card>
    </div>
  `
})
export class AdminLogin {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.adminService.login(username, password).subscribe(success => {
        if (success) {
          this.router.navigate(['app-phone-verify']);
        } else {
          alert('Invalid credentials');
        }
      });
    }
  }
}
*/