import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { App } from './app/app';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { QrScan} from './app/components/qr-scan/qr-scan';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

/*
const appConfig = {
  providers: [
    provideRouter(routes),       // Angular routing
    provideHttpClient(),        // HTTP requests
    importProvidersFrom(BrowserAnimationsModule), // Angular Material animations
    importProvidersFrom(ReactiveFormsModule),     // Forms for review/phone
    importProvidersFrom(MatSnackBarModule),       // Optional: snack bar for messages
    importProvidersFrom(MatDialogModule)          // Optional: dialog for admin modals
  ]
};

bootstrapApplication(QrScan, appConfig)
  .catch((err) => console.error(err));
*/

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideCharts(withDefaultRegisterables()) // 👈 required for ng2-charts
 ,
    provideHttpClient()
  ]
}).catch(err => console.error(err));