import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxScannerQrcodeComponent } from 'ngx-scanner-qrcode';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-qr-scan',
  standalone: true,
  imports: [CommonModule, NgxScannerQrcodeComponent,MatCardModule,
    MatButtonModule],
  template : ` 
  <div class="container">
    <h2>Scan Your QR Code</h2>
    <ngx-scanner-qrcode
      (scanSuccess)="onScan($event)"
      class="scanner"
    ></ngx-scanner-qrcode>

    <button mat-raised-button color="primary" class="simulate-btn" (click)="simulateScan()">
      Simulate Scan
    </button>
  </div>
`

})


export class QrScan {
  constructor(private router: Router) {}

 /* onScan(event: Event) {
    // Extract the QR code string from event
   /* const scanner = event.target as any;
    const result = scanner?.getResult?.() ?? scanner?.value ?? null;

    if (result) {
      this.router.navigate(['/phone-entry'], { queryParams: { code: result } });
    } else {
      console.warn('QR scan returned no value');
   
    }
  }
      simulateScan(){
        const fakeQrCode = 'TEST_QR_CODE_12345'; // You can change this for testing
        console.log('Simulated QR scan:', fakeQrCode);
      
        // Call the same function as a real scan
        this.onScan(fakeQrCode);
    }

    
    }
  }
*/
onScan(event: any) {
  // If the event is a string (from simulateScan)
  const result = typeof event === 'string' ? event : event?.target?.value ?? null;

  if (result) {
    this.router.navigate(['/phone-entry'], { queryParams: { code: result } });
  } else {
    console.warn('QR scan returned no value');
  }
}

// Simulate a QR scan for testing
simulateScan() {
  const fakeQrCode = 'TEST_QR_CODE_12345'; // You can change this for testing
  console.log('Simulated QR scan:', fakeQrCode);

  // Call the same function as a real scan
  this.onScan(fakeQrCode);
}

  }


