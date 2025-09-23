/*import { Routes } from '@angular/router';
import { PhoneEntry } from './components/phone-entry/phone-entry';
import { ReviewForm } from './components/review-form/review-form';
import { MiniGame } from './components/mini-game/mini-game';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { AdminLogin } from './components/admin-login/admin-login';

export const routes: Routes = [
  { path: '', redirectTo: 'app-phone-entry', pathMatch: 'full' },

  // Public
  { path: 'app-phone-entry', component: PhoneEntry },
  { path: 'app-review-form', component: ReviewForm },
  { path: 'mini-game', component: MiniGame },

  // Admin
  { path: 'app-admin-dashboard', component: AdminDashboard },
  { path: 'app-admin-login', component: AdminLogin },

  { path: '**', redirectTo: 'app-phone-entry' }
];
*/import { Routes } from '@angular/router';
import { PhoneEntry } from './components/phone-entry/phone-entry';
import { ReviewForm } from './components/review-form/review-form';
import { MiniGame } from './components/mini-game/mini-game';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { AdminLogin } from './components/admin-login/admin-login';

export const routes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },

  // Public
  { path: 'user', component: PhoneEntry },
  { path: 'review', component: ReviewForm },
  { path: 'spin', component: MiniGame },

  // Admin
  { path: 'admindashboard', component: AdminDashboard },
  { path: 'adminlogin', component: AdminLogin },

  { path: '**', redirectTo: 'user' }
];
