import { Routes } from '@angular/router';
// import { QrScan } from './components/qr-scan/qr-scan';
import { PhoneEntry } from './components/phone-entry/phone-entry';
import { ReviewForm } from './components/review-form/review-form';
import { MiniGame } from './components/mini-game/mini-game';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { AdminLogin } from './components/admin-login/admin-login';

export const routes: Routes = [
  // Default → redirect to phone entry
  { path: '', redirectTo: 'app-phone-entry', pathMatch: 'full' },

  // Public routes
  { path: 'app-phone-entry', component: PhoneEntry },
  { path: 'app-review-form', component: ReviewForm },
  { path: 'app-mini-game', component: MiniGame },

  // Admin routes
  { path: 'app-admin-dashboard', component: AdminDashboard },
  { path: 'app-admin-login', component: AdminLogin },

  // Wildcard → redirect to phone entry (optional, for safety)
  { path: '**', redirectTo: 'app-phone-entry' }
];
