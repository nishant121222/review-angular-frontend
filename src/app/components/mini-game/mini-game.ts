/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Game } from '../../services/game';

@Component({
  selector: 'app-mini-game',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatSnackBarModule],
  template:`
  <mat-card class="container">
    <h2>Spin the Wheel!</h2>
    <div class="wheel">
      <div class="pointer"></div>
      <div class="prizes">
        <div *ngFor="let prize of prizes; let i = index"
             class="prize"
             [style.transform]="'rotate(' + (i * segmentAngle) + 'deg)'">
          {{ prize }}
        </div>
      </div>
    </div>
    <button mat-raised-button color="primary" (click)="spinWheel()" [disabled]="spinning">Spin</button>
  </mat-card>
` ,
  styles:[ `
  .container {
    max-width: 400px;
    margin: 40px auto;
    text-align: center;
    padding: 20px;
  }
  .wheel {
    position: relative;
    width: 300px;
    height: 300px;
    margin: 20px auto;
    border-radius: 50%;
    border: 5px solid #3f51b5;
    overflow: hidden;
  }
  .prizes {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-origin: center center;
    transition: transform 3s ease-out;
  }
  .prize {
    position: absolute;
    width: 50%;
    height: 50%;
    top: 50%;
    left: 50%;
    transform-origin: 0% 0%;
    text-align: left;
    padding-left: 10px;
    font-weight: bold;
  }
  .pointer {
    position: absolute;
    top: -10px;
    left: 50%;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 20px solid red;
    transform: translateX(-50%);
    z-index: 10;
  }
  button { margin-top: 20px; }
`]
})
export class MiniGame {
  prizes = ['10% OFF', 'Free Coffee', 'Discount Voucher', 'Free Dessert', 'Thank You', 'Gift Card'];
  segmentAngle = 360 / this.prizes.length;
  spinning = false;
  phone!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameService: Game,
    private snackBar: MatSnackBar
  ) {
    this.route.queryParams.subscribe(params => {
      this.phone = params['phone'] || '';
    });
  }

  spinWheel() {
    if (this.spinning) return;
    this.spinning = true;

    // Randomly select prize index
    const selectedIndex = Math.floor(Math.random() * this.prizes.length);
    const degrees = 3600 + selectedIndex * this.segmentAngle; // multiple spins + final segment

    const prizesDiv = document.querySelector('.prizes') as HTMLElement;
    if (prizesDiv) {
      prizesDiv.style.transform = `rotate(${degrees}deg)`;
    }

    // Wait for animation to finish
    setTimeout(() => {
      const prizeWon = this.prizes[selectedIndex];
      this.snackBar.open(`You won: ${prizeWon}`, 'Close', { duration: 3000 });

      // Save prize for this phone via GameService
      this.gameService.sendPrize(this.phone, prizeWon).subscribe({
        next: () => {
          // Optional: send WhatsApp or any notification via backend
        },
        error: (err) => console.error('Failed to save prize', err)
      });

      this.spinning = false;
    }, 3500); // match transition duration
  }

}
*/

/*import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mini-game',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatSnackBarModule, MatIconModule],
  template: `
    <div class="container">
      <mat-card>
        <div class="header">
          <mat-icon color="primary" fontIcon="casino" class="icon"></mat-icon>
          <h2>Spin the Wheel!</h2>
          <p class="subtitle">Try your luck and win exciting rewards 🎁</p>
        </div>

        <div class="wheel-container">
          <div class="wheel">
            <div class="pointer"></div>
            <div class="prizes">
              <div *ngFor="let prize of prizes; let i = index"
                   class="prize"
                   [style.transform]="'rotate(' + (i * segmentAngle) + 'deg)'">
                {{ prize }}
              </div>
            </div>
          </div>
        </div>

        <button mat-raised-button color="primary" class="full-width action-btn"
                (click)="spinWheel()" [disabled]="spinning">
          Spin
        </button>
      </mat-card>
    </div>
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
      text-align: center;
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
    .wheel-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px 0;
    }
    .wheel {
      position: relative;
      width: 250px;
      height: 250px;
      border-radius: 50%;
      border: 5px solid #1976d2;
      overflow: hidden;
    }
    .prizes {
      position: absolute;
      width: 100%;
      height: 100%;
      transform-origin: center center;
      transition: transform 3s ease-out;
    }
    .prize {
      position: absolute;
      width: 50%;
      height: 50%;
      top: 50%;
      left: 50%;
      transform-origin: 0% 0%;
      text-align: left;
      padding-left: 10px;
      font-weight: bold;
      font-size: 13px;
      color: #333;
    }
    .pointer {
      position: absolute;
      top: -12px;
      left: 50%;
      width: 0;
      height: 0;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-bottom: 20px solid red;
      transform: translateX(-50%);
      z-index: 10;
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
export class MiniGame {
  prizes = ['10% OFF', 'Free Coffee', 'Discount Voucher', 'Free Dessert', 'Thank You', 'Gift Card'];
  segmentAngle = 360 / this.prizes.length;
  spinning = false;
  phone!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.route.queryParams.subscribe(params => {
      this.phone = params['phone'] || '';
    });
  }

  spinWheel() {
    if (this.spinning) return;
    this.spinning = true;

    const selectedIndex = Math.floor(Math.random() * this.prizes.length);
    const degrees = 3600 + selectedIndex * this.segmentAngle; // multiple spins + final segment

    const prizesDiv = document.querySelector('.prizes') as HTMLElement;
    if (prizesDiv) {
      prizesDiv.style.transform = `rotate(${degrees}deg)`;
    }

    setTimeout(() => {
      const prizeWon = this.prizes[selectedIndex];
      this.snackBar.open(`🎉 You won: ${prizeWon}`, 'Close', { duration: 3000 });

      this.spinning = false;
    }, 3500);
  }
}
*/

/*
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-mini-game',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatSnackBarModule, MatIconModule],
  template: `
    <div class="container">
      <mat-card>
        <div class="header">
          <mat-icon color="primary" fontIcon="casino" class="icon"></mat-icon>
          <h2>Spin the Wheel!</h2>
          <p class="subtitle">Try your luck and win exciting rewards 🎁</p>
        </div>

        <div class="wheel-container">
  <div class="wheel">
    <div class="lights">
      <div *ngFor="let light of lights" class="light"></div>
    </div>
    <div class="pointer"></div>
    <div class="prizes">
      <div *ngFor="let prize of prizes; let i = index"
           class="prize"
           [style.transform]="'rotate(' + (i * segmentAngle) + 'deg)'">
        {{ prize }}
      </div>
    </div>
    <div class="center-button" (click)="spinWheel()" [class.disabled]="spinning">
      SPIN
    </div>
  </div>
</div>

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
      text-align: center;
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
    .wheel-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px 0;
    }
    .prizes {
      position: absolute;
      width: 100%;
      height: 100%;
      transform-origin: center center;
      transition: transform 3s ease-out;
    }
    .prize {
      position: absolute;
      width: 50%;
      height: 50%;
      top: 50%;
      left: 50%;
      transform-origin: 0% 0%;
      text-align: left;
      padding-left: 10px;
      font-weight: bold;
      font-size: 13px;
      color: #333;
    }
    .pointer {
      position: absolute;
      top: -12px;
      left: 50%;
      width: 0;
      height: 0;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-bottom: 20px solid red;
      transform: translateX(-50%);
      z-index: 10;
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
    .wheel {
      position: relative;
      width: 280px;
      height: 280px;
      border-radius: 50%;
      border: 6px solid #1976d2;
      background: conic-gradient(
        #42a5f5 0deg 60deg,
        #ec407a 60deg 120deg,
        #ab47bc 120deg 180deg,
        #ffa726 180deg 240deg,
        #ef5350 240deg 300deg,
        #66bb6a 300deg 360deg
      );
      box-shadow: 0 0 20px rgba(0,0,0,0.2);
      overflow: hidden;
    }
    
    .lights {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      pointer-events: none;
    }
    
    .light {
      width: 10px;
      height: 10px;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 0 6px #fff;
      position: absolute;
      transform: rotate(var(--angle)) translate(130px);
    }
    
    .center-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #0d47a1;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      padding: 12px 20px;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(0,0,0,0.3);
      cursor: pointer;
      z-index: 5;
      transition: transform 0.2s ease;
    }
    
    .center-button:hover {
      transform: translate(-50%, -50%) scale(1.05);
    }
    
    .center-button.disabled {
      opacity: 0.6;
      pointer-events: none;
    }
    
  `]
})
export class MiniGame {
  prizes = ['10% OFF', 'Free Coffee', 'Discount Voucher', 'Free Dessert', 'Thank You', 'Gift Card'];
  segmentAngle = 360 / this.prizes.length;
  spinning = false;
  phone!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.route.queryParams.subscribe(params => {
      this.phone = params['phone'] || '';
    });
  }

  lights = Array.from({ length: 24 }, (_, i) => ({ angle: i * 15 }));

ngAfterViewInit() {
  const lightElements = document.querySelectorAll('.light');
  lightElements.forEach((el, i) => {
    (el as HTMLElement).style.setProperty('--angle', `${i * 15}deg`);
  });
}


  spinWheel() {
    if (this.spinning) return;
    this.spinning = true;

    const selectedIndex = Math.floor(Math.random() * this.prizes.length);
    const degrees = 3600 + selectedIndex * this.segmentAngle; // multiple spins + final segment

    const prizesDiv = document.querySelector('.prizes') as HTMLElement;
    if (prizesDiv) {
      prizesDiv.style.transform = `rotate(${degrees}deg)`;
    }

    setTimeout(() => {
      const prizeWon = this.prizes[selectedIndex];
      this.snackBar.open(`🎉 You won: ${prizeWon}`, 'Close', { duration: 3000 });

      this.spinning = false;
    }, 3500);
  }
}
*/

/*
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Game } from '../../services/game';

@Component({
  selector: 'app-mini-game',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatSnackBarModule, MatDialogModule],
  template: `
  <mat-card class="container">
    <h2>Spin the Wheel!</h2>
    <div class="wheel" #wheelContainer>
      <div class="pointer"></div>
      <div class="prizes" #prizesContainer>
        <div *ngFor="let prize of prizes; let i = index"
             class="prize"
             [style.transform]="'rotate(' + (i * segmentAngle) + 'deg)'"
             [style.backgroundColor]="getPrizeColor(i)">
          {{ prize }}
        </div>
      </div>
    </div>
    <button mat-raised-button color="primary" (click)="spinWheel()" [disabled]="spinning">Spin</button>
    
    <div class="result-container" *ngIf="prizeWon" #resultContainer>
      <div class="trophy">🏆</div>
      <h3>Congratulations!</h3>
      <p>You've won:</p>
      <div class="prize-text">{{ prizeWon }}</div>
      <button mat-raised-button color="accent" (click)="captureScreenshot()" class="share-btn">
        <i class="fab fa-whatsapp"></i> Share on WhatsApp
      </button>
    </div>
  </mat-card>
  `,
  styles: [`
    .container {
      max-width: 400px;
      margin: 40px auto;
      text-align: center;
      padding: 20px;
      position: relative;
    }
    .wheel {
      position: relative;
      width: 300px;
      height: 300px;
      margin: 20px auto;
      border-radius: 50%;
      border: 5px solid #3f51b5;
      overflow: hidden;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    }
    .prizes {
      position: absolute;
      width: 100%;
      height: 100%;
      transform-origin: center center;
      transition: transform 3s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .prize {
      position: absolute;
      width: 50%;
      height: 50%;
      top: 50%;
      left: 50%;
      transform-origin: 0% 0%;
      text-align: left;
      padding-left: 10px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }
    .pointer {
      position: absolute;
      top: -10px;
      left: 50%;
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 20px solid red;
      transform: translateX(-50%);
      z-index: 10;
      filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.3));
    }
    button { margin-top: 20px; }
    .result-container {
      margin-top: 30px;
      padding: 20px;
      border-radius: 10px;
      background: #f9f9f9;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    .trophy {
      font-size: 60px;
      margin-bottom: 15px;
      animation: bounce 1s infinite alternate;
    }
    @keyframes bounce {
      from { transform: translateY(0) scale(1); }
      to { transform: translateY(-10px) scale(1.05); }
    }
    .prize-text {
      font-size: 24px;
      font-weight: bold;
      color: #3f51b5;
      margin: 10px 0;
    }
    .share-btn {
      background: #25D366;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin: 20px auto 0;
    }
    .share-btn:hover { background: #128C7E; }
    .hidden { display: none; }
  `]
})
export class MiniGame {
  @ViewChild('resultContainer') resultContainer!: ElementRef;
  @ViewChild('prizesContainer') prizesContainer!: ElementRef;

  prizes = ['10% OFF', 'Free Coffee', 'Discount Voucher', 'Free Dessert', 'Thank You', 'Gift Card'];
  segmentAngle = 360 / this.prizes.length;
  spinning = false;
  phone!: string;
  prizeWon: string | null = null;
  prizeColors = ['#FF9F43', '#FF6B6B', '#54A0FF', '#1DD1A1', '#F368E0', '#FF9FF3'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameService: Game,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.route.queryParams.subscribe(params => {
      this.phone = params['phone'] || '';
    });
  }

  getPrizeColor(index: number): string {
    return this.prizeColors[index % this.prizeColors.length];
  }

  spinWheel() {
    if (this.spinning) return;
    this.spinning = true;
    this.prizeWon = null;

    const selectedIndex = Math.floor(Math.random() * this.prizes.length);
    const degrees = 3600 + selectedIndex * this.segmentAngle;

    if (this.prizesContainer && this.prizesContainer.nativeElement) {
      this.prizesContainer.nativeElement.style.transform = `rotate(${degrees}deg)`;
    }

    setTimeout(() => {
      this.prizeWon = this.prizes[selectedIndex];
      this.snackBar.open(`You won: ${this.prizeWon}`, 'Close', { duration: 3000 });

      this.gameService.sendPrize(this.phone, this.prizeWon).subscribe({
        next: () => {},
        error: (err) => console.error('Failed to save prize', err)
      });

      this.spinning = false;
    }, 3500);
  }

  captureScreenshot() {
    if (!this.prizeWon) return;
    const loadingSnackbar = this.snackBar.open('Preparing your screenshot...', '', { duration: 3000 });

    import('html2canvas').then((html2canvasModule) => {
      const html2canvas = html2canvasModule.default;

      setTimeout(() => {
        html2canvas(this.resultContainer.nativeElement, {
          scale: 2,
          logging: false,
          useCORS: true
        }).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          this.shareViaWhatsApp(imgData);
          loadingSnackbar.dismiss();
        }).catch(err => {
          console.error('Error capturing screenshot:', err);
          loadingSnackbar.dismiss();
          this.snackBar.open('Failed to capture screenshot. Please try again.', 'Close', { duration: 3000 });
        });
      }, 500);
    });
  }

  shareViaWhatsApp(imgData: string) {
    const message = `I just won ${this.prizeWon} at this amazing business! Check it out!`;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      const whatsappUrl = `https://wa.me/${this.phone || '918669186421'}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      setTimeout(() => {
        this.snackBar.open('Please attach the screenshot manually in WhatsApp', 'Close', { duration: 5000 });
      }, 1000);
    } else {
      const downloadLink = document.createElement('a');
      downloadLink.href = imgData;
      downloadLink.download = 'my_prize.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      const whatsappUrl = `https://web.whatsapp.com/send?phone=${this.phone || '918669186421'}&text=${encodeURIComponent(message + ' I have attached a screenshot of my prize!')}`;
      window.open(whatsappUrl, '_blank');
    }
  }
}
*/
/*
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Game } from '../../services/game';

@Component({
  selector: 'app-mini-game',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  template: `
  <mat-card class="container">
    <h2>Spin the Wheel!</h2>
    <div class="wheel">
      <div class="pointer"></div>
      <div class="prizes" #prizesContainer>
        <div *ngFor="let prize of prizes; let i = index"
             class="prize"
             [style.transform]="'rotate(' + (i * segmentAngle) + 'deg)'"
             [style.backgroundColor]="getPrizeColor(i)">
          {{ prize }}
        </div>
      </div>
    </div>
    <button mat-raised-button color="primary" (click)="spinWheel()" [disabled]="spinning">
      Spin
    </button>
    
    <div class="result-container" *ngIf="prizeWon" #resultContainer>
      <div class="trophy">🏆</div>
      <h3>Congratulations!</h3>
      <p>You've won:</p>
      <div class="prize-text">{{ prizeWon }}</div>
      <button mat-raised-button color="accent" (click)="captureScreenshot()" class="share-btn">
        <i class="fab fa-whatsapp"></i> Share on WhatsApp
      </button>
    </div>
  </mat-card>
  `,
  styles: [`
    .container {
      max-width: 400px;
      margin: 40px auto;
      text-align: center;
      padding: 20px;
      position: relative;
    }
    .wheel {
      position: relative;
      width: 300px;
      height: 300px;
      margin: 20px auto;
      border-radius: 50%;
      border: 5px solid #3f51b5;
      overflow: hidden;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    }
    .prizes {
      position: absolute;
      width: 100%;
      height: 100%;
      transform-origin: center center;
      transition: transform 3s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .prize {
      position: absolute;
      width: 50%;
      height: 50%;
      top: 50%;
      left: 50%;
      transform-origin: 0% 0%;
      text-align: left;
      padding-left: 10px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }
    .pointer {
      position: absolute;
      top: -10px;
      left: 50%;
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 20px solid red;
      transform: translateX(-50%);
      z-index: 10;
      filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.3));
    }
    button { margin-top: 20px; }
    .result-container {
      margin-top: 30px;
      padding: 20px;
      border-radius: 10px;
      background: #f9f9f9;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
    .trophy {
      font-size: 60px;
      margin-bottom: 15px;
      animation: bounce 1s infinite alternate;
    }
    @keyframes bounce {
      from { transform: translateY(0) scale(1); }
      to { transform: translateY(-10px) scale(1.05); }
    }
    .prize-text {
      font-size: 24px;
      font-weight: bold;
      color: #3f51b5;
      margin: 10px 0;
    }
    .share-btn {
      background: #25D366;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin: 20px auto 0;
    }
    .share-btn:hover { background: #128C7E; }
  `]
})
export class MiniGame {
  @ViewChild('resultContainer') resultContainer!: ElementRef;
  @ViewChild('prizesContainer') prizesContainer!: ElementRef;

  prizes = ['Cappuccino', 'Cafe Latte', 'Velvet Coffee', 'Flat White', 'Vanilla Latte', 'Cinnamon Coffee'];
  segmentAngle = 360 / this.prizes.length;
  spinning = false;
  phone!: string;
  prizeWon: string | null = null;
  prizeColors = ['#FF9F43', '#FF6B6B', '#54A0FF', '#1DD1A1', '#F368E0', '#FF9FF3'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameService: Game,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.route.queryParams.subscribe(params => {
      this.phone = params['phone'] || '';
    });
  }

  getPrizeColor(index: number): string {
    return this.prizeColors[index % this.prizeColors.length];
  }

  spinWheel() {
    if (this.spinning) return;
    this.spinning = true;
    this.prizeWon = null;

    const selectedIndex = Math.floor(Math.random() * this.prizes.length);
    const degrees = 3600 + selectedIndex * this.segmentAngle;

    if (this.prizesContainer && this.prizesContainer.nativeElement) {
      this.prizesContainer.nativeElement.style.transform = `rotate(${degrees}deg)`;
    }

    setTimeout(() => {
      this.prizeWon = this.prizes[selectedIndex];
      this.snackBar.open(`You won: ${this.prizeWon}`, 'Close', { duration: 3000 });

      // Save prize for this phone via GameService
      this.gameService.sendPrize(this.phone, this.prizeWon).subscribe({
        next: () => {},
        error: (err) => console.error('Failed to save prize', err)
      });

      this.spinning = false;
    }, 3500);
  }

  captureScreenshot() {
    if (!this.prizeWon) return;
    const loadingSnackbar = this.snackBar.open('Preparing your screenshot...', '', { duration: 3000 });

    import('html2canvas').then((html2canvasModule) => {
      const html2canvas = html2canvasModule.default;

      setTimeout(() => {
        html2canvas(this.resultContainer.nativeElement, {
          scale: 2,
          logging: false,
          useCORS: true
        }).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          this.shareViaWhatsApp(imgData);
          loadingSnackbar.dismiss();
        }).catch(err => {
          console.error('Error capturing screenshot:', err);
          loadingSnackbar.dismiss();
          this.snackBar.open('Failed to capture screenshot. Please try again.', 'Close', { duration: 3000 });
        });
      }, 500);
    });
  }

  shareViaWhatsApp(imgData: string) {
    const message = `I just won ${this.prizeWon} at this amazing business! Check it out!`;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      const whatsappUrl = `https://wa.me/${this.phone || '917083004187'}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      setTimeout(() => {
        this.snackBar.open('Please attach the screenshot manually in WhatsApp', 'Close', { duration: 5000 });
      }, 1000);
    } else {
      const downloadLink = document.createElement('a');
      downloadLink.href = imgData;
      downloadLink.download = 'my_prize.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      const whatsappUrl = `https://web.whatsapp.com/send?phone=${this.phone || '917083004187'}&text=${encodeURIComponent(message + ' I have attached a screenshot of my prize!')}`;
      window.open(whatsappUrl, '_blank');
    }
  }
}
*/
/*
import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Game } from '../../services/game';

@Component({
  selector: 'app-mini-game',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
  <div class="container">
    <mat-card class="game-card">
      <div class="header">
        <div class="icon-container">
          <mat-icon color="primary" fontIcon="casino" class="icon"></mat-icon>
        </div>
        <h2 class="title">Spin to Win!</h2>
        <p class="subtitle">Try your luck to win exciting prizes</p>
      </div>

      <div class="wheel-container">
        <div class="wheel" #prizesContainer>
          <div 
            *ngFor="let prize of prizes; let i = index" 
            class="label" 
            [style.transform]="'rotate(' + (i * segmentAngle + segmentAngle / 2) + 'deg) translateY(-120px)'"
            [style.color]="'#fff'">
            {{ prize }}
          </div>

          <button class="spin-btn" (click)="spinWheel()" [disabled]="spinning">
            <span *ngIf="!spinning">SPIN</span>
            <mat-spinner diameter="30" *ngIf="spinning"></mat-spinner>
          </button>
        </div>
      </div>

      <div class="result-container" *ngIf="prizeWon" #resultContainer>
        <div class="trophy">🏆</div>
        <h3>Congratulations!</h3>
        <p>You've won:</p>
        <div class="prize-text">{{ prizeWon }}</div>
        <button mat-raised-button color="accent" (click)="captureScreenshot()" class="share-btn">
          <mat-icon fontIcon="whatsapp"></mat-icon> Share on WhatsApp
        </button>
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
    }

    .game-card {
      width: 100%;
      max-width: 450px;
      padding: 32px 28px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      text-align: center;
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
    }

    .icon {
      font-size: 40px;
      color: white;
    }

    .title {
      margin: 0 0 8px;
      font-weight: 600;
      font-size: 26px;
      background: linear-gradient(135deg, #3f51b5, #2196f3);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .subtitle {
      margin: 0;
      color: #666;
      font-size: 15px;
    }

    .wheel-container {
      margin: 20px 0;
      display: flex;
      justify-content: center;
    }

    .wheel {
      position: relative;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      border: 3px solid #222;
      box-shadow: 0 0 25px rgba(0,0,0,0.3), inset 0 0 30px rgba(0,0,0,0.4);
      background: conic-gradient(
        #FF9F43 0deg 60deg,
        #FF6B6B 60deg 120deg,
        #54A0FF 120deg 180deg,
        #1DD1A1 180deg 240deg,
        #F368E0 240deg 300deg,
        #FF9FF3 300deg 360deg
      );
      transition: transform 4s cubic-bezier(0.1, 0.7, 0.1, 1);
      overflow: hidden;
    }

    .label {
      position: absolute;
      top: 50%;
      left: 50%;
      transform-origin: center center;
      font-weight: bold;
      font-size: 14px;
      text-shadow: 0 2px 4px rgba(0,0,0,0.5);
      text-align: center;
      width: 100px;
      margin-left: -50px;
    }

    .spin-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90px;
      height: 90px;
      border-radius: 50%;
      border: none;
      background: radial-gradient(circle, #ff4081, #c2185b);
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      cursor: pointer;
      box-shadow: 0 0 12px rgba(0,0,0,0.5), inset 0 0 8px rgba(255,255,255,0.2);
      z-index: 10;
    }

    .result-container {
      margin-top: 30px;
      padding: 20px;
      border-radius: 10px;
      background: #f9f9f9;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      animation: fadeIn 0.6s ease forwards;
    }

    .trophy {
      font-size: 60px;
      margin-bottom: 15px;
    }

    .prize-text {
      font-size: 22px;
      font-weight: bold;
      color: #ff4081;
      margin-top: 8px;
    }

    .share-btn {
      background: #25D366;
      color: white;
      margin: 20px auto 0;
      width: 100%;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class MiniGame {
  @ViewChild('resultContainer') resultContainer!: ElementRef;
  @ViewChild('prizesContainer') prizesContainer!: ElementRef;

  prizes = ['Cappuccino', 'Cafe Latte', 'Velvet Coffee', 'Flat White', 'Vanilla Latte', 'Cinnamon Coffee'];
  segmentAngle = 360 / this.prizes.length;
  spinning = false;
  phone!: string;
  prizeWon: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameService: Game,
    private snackBar: MatSnackBar
  ) {
    this.route.queryParams.subscribe(params => {
      this.phone = params['phone'] || '';
    });
  }

  spinWheel() {
    if (this.spinning) return;
    this.spinning = true;
    this.prizeWon = null;

    const selectedIndex = Math.floor(Math.random() * this.prizes.length);
    const extraSpins = 5 + Math.floor(Math.random() * 4);
    const degrees = (extraSpins * 360) + (selectedIndex * this.segmentAngle) + (this.segmentAngle / 2);

    if (this.prizesContainer?.nativeElement) {
      this.prizesContainer.nativeElement.style.transform = `rotate(${degrees}deg)`;
    }

    setTimeout(() => {
      this.prizeWon = this.prizes[selectedIndex];

      this.snackBar.open(`🎉 You won: ${this.prizeWon}!`, 'Dismiss', { duration: 3000 });

      // Send prize info to backend
      this.gameService.sendPrize(this.phone, this.prizeWon).subscribe({
        next: () => console.log('Prize saved to backend'),
        error: (err) => console.error('Failed to save prize', err)
      });

      this.spinning = false;
    }, 4500);
  }

  captureScreenshot() {
    if (!this.prizeWon) return;
    const loadingSnackbar = this.snackBar.open('Preparing your screenshot...', '', { duration: 3000 });

    import('html2canvas').then((html2canvasModule) => {
      const html2canvas = html2canvasModule.default;

      setTimeout(() => {
        html2canvas(this.resultContainer.nativeElement, {
          scale: 2,
          logging: false,
          useCORS: true
        }).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          loadingSnackbar.dismiss();
          this.shareViaWhatsApp(imgData);
        }).catch(err => {
          console.error('Error capturing screenshot:', err);
          loadingSnackbar.dismiss();
          this.snackBar.open('Failed to capture screenshot. Please try again.', 'Close', { duration: 3000 });
        });
      }, 500);
    });
  }

  shareViaWhatsApp(imgData: string) {
    const message = `I just won ${this.prizeWon} at this amazing business! Check it out!`;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      const whatsappUrl = `https://wa.me/${this.phone || '919511954042'}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');

      setTimeout(() => {
        this.snackBar.open('Please attach the screenshot manually in WhatsApp', 'Dismiss', { duration: 5000 });
      }, 1000);
    } else {
      // Download screenshot for desktop
      const downloadLink = document.createElement('a');
      downloadLink.href = imgData;
      downloadLink.download = 'my_prize.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      const whatsappUrl = `https://web.whatsapp.com/send?phone=${this.phone || '919511954042'}&text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  }
}

*/


// This is final Project with service and proper congratulation page

import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GameService} from '../../services/game';

@Component({
  selector: 'app-mini-game',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
  <div class="container">
  <mat-card class="game-card">
    <div class="header">
      <div class="icon-container">
        <img src="Images/Spin.jpg" alt="Spin Logo" class="logo-img" />
      </div>
      <p class="subtitle">Try your luck to win exciting prizes</p>
    </div>

    <div class="wheel-container">
      <div class="wheel" #prizesContainer>
        <div class="wheel-inner">
          <div 
            *ngFor="let prize of prizes; let i = index" 
            class="prize-segment" 
            [style.transform]="'rotate(' + (i * segmentAngle) + 'deg)'"
            [style.--segment-angle]="segmentAngle + 'deg'">
            <div class="prize-text-wrapper">
              <span class="prize-label">{{ prize }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Spin button moved below the wheel -->
    <div class="spin-btn-below-container">
      <button class="spin-btn" (click)="spinWheel()" [disabled]="spinning">
        <span *ngIf="!spinning">SPIN</span>
        <mat-spinner diameter="30" *ngIf="spinning"></mat-spinner>
      </button>
    </div>

      <div class="result-container" *ngIf="prizeWon" #resultContainer>
        <div class="confetti">
          <div class="confetti-piece"></div>
          <div class="confetti-piece"></div>
          <div class="confetti-piece"></div>
          <div class="confetti-piece"></div>
          <div class="confetti-piece"></div>
          <div class="confetti-piece"></div>
          <div class="confetti-piece"></div>
          <div class="confetti-piece"></div>
          <div class="confetti-piece"></div>
          <div class="confetti-piece"></div>
          <div class="confetti-piece"></div>
          <div class="confetti-piece"></div>
        </div>
        
        <div class="trophy-container">
          <div class="trophy">🏆</div>
          <div class="sparkle"></div>
          <div class="sparkle"></div>
          <div class="sparkle"></div>
        </div>
        
        <h3 class="congrats-title">Congratulations!</h3>
        <p class="won-text">You've won:</p>
        <div class="prize-text">{{ prizeWon }}</div>
        
        <div class="celebration-graphic">
          <div class="celebration-dot"></div>
          <div class="celebration-dot"></div>
          <div class="celebration-dot"></div>
        </div>
        
        <button mat-raised-button color="accent" (click)="captureScreenshot()" class="share-btn">
          <mat-icon fontIcon="whatsapp"></mat-icon> Share on WhatsApp
        </button>
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
    overflow: auto;
  }

  .game-card {
    width: 100%;
    max-width: 450px;
    padding: 24px 20px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    text-align: center;
    margin: 20px 0;
    position: relative;
    overflow: hidden;
  }

  .header {
    text-align: center;
    margin-bottom: 24px;
  }

  .icon-container {
    border-radius: 0;
    width: 180px;
    height: auto;
    margin: 0 auto 12px;
    display: flex;
    justify-content: center;
  }
  
  .logo-img {
    width: 100%;
    height: auto;
    object-fit: contain;
    max-height: 80px;
  }
  
  .subtitle {
    margin: 0;
    color: #666;
    font-size: 14px;
  }

  .wheel-container {
    margin: 20px 0;
    display: flex;
    justify-content: center;
    position: relative;
  }

  .wheel {
    position: relative;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    border: 3px solid #222;
    box-shadow: 0 0 25px rgba(0,0,0,0.3), inset 0 0 30px rgba(0,0,0,0.4);
    overflow: hidden;
  }

  .wheel-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 4s cubic-bezier(0.1, 0.7, 0.1, 1);
    background: conic-gradient(
      #FF9F43 0deg 51.43deg,
      #FF6B6B 51.43deg 102.86deg,
      #54A0FF 102.86deg 154.29deg,
      #1DD1A1 154.29deg 205.72deg,
      #F368E0 205.72deg 257.15deg,
      #FF9FF3 257.15deg 308.58deg,
      #48dbfb 308.58deg 360deg
    );
  }

  .prize-segment {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform-origin: center;
  }

  .prize-text-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: rotate(calc(var(--segment-angle) / 2));
    transform-origin: left center;
    width: 45%;
    margin-top: -2px;
  }

  .prize-label {
    display: block;
    font-weight: 600;
    font-size: 10px;
    line-height: 1.2;
    color: white;
    text-shadow: 0 1px 2px rgba(0,0,0,0.7);
    text-align: center;
    padding: 2px;
    transform: translateX(10px);
  }

  /* New container for the spin button below the wheel */
  .spin-btn-below-container {
    display: flex;
    justify-content: center;
    margin: 25px 0 15px;
  }

  .spin-btn {
    width: 120px;
    height: 50px;
    border-radius: 25px;
    border: none;
    background: linear-gradient(135deg, #ff4081, #c2185b);
    color: #fff;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .spin-btn:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0,0,0,0.4);
  }

  .spin-btn:active:not(:disabled) {
    transform: translateY(-1px);
  }

  .spin-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

    /* Enhanced Result Container */
    .result-container {
      margin-top: 25px;
      padding: 25px 15px;
      border-radius: 16px;
      background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      animation: fadeIn 0.8s ease forwards;
      position: relative;
      overflow: hidden;
      border: 2px solid rgba(255, 215, 0, 0.3);
    }

    /* Confetti Animation */
    .confetti {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    .confetti-piece {
      position: absolute;
      width: 8px;
      height: 16px;
      background: #ffd700;
      opacity: 0.7;
      animation: confettiFall 5s linear infinite;
    }

    .confetti-piece:nth-child(1) {
      left: 10%;
      animation-delay: 0s;
      background: #ffd700;
    }

    .confetti-piece:nth-child(2) {
      left: 20%;
      animation-delay: 0.5s;
      background: #ff6b6b;
    }

    .confetti-piece:nth-child(3) {
      left: 30%;
      animation-delay: 1.5s;
      background: #54a0ff;
    }

    .confetti-piece:nth-child(4) {
      left: 40%;
      animation-delay: 2.5s;
      background: #1dd1a1;
    }

    .confetti-piece:nth-child(5) {
      left: 50%;
      animation-delay: 0.8s;
      background: #ff9ff3;
    }

    .confetti-piece:nth-child(6) {
      left: 60%;
      animation-delay: 3s;
      background: #f368e0;
    }

    .confetti-piece:nth-child(7) {
      left: 70%;
      animation-delay: 1.8s;
      background: #ff9f43;
    }

    .confetti-piece:nth-child(8) {
      left: 80%;
      animation-delay: 2.2s;
      background: #48dbfb;
    }

    .confetti-piece:nth-child(9) {
      left: 90%;
      animation-delay: 0.3s;
      background: #ff7979;
    }

    .confetti-piece:nth-child(10) {
      left: 25%;
      animation-delay: 3.5s;
      background: #7efff5;
    }

    .confetti-piece:nth-child(11) {
      left: 65%;
      animation-delay: 1.2s;
      background: #f6e58d;
    }

    .confetti-piece:nth-child(12) {
      left: 45%;
      animation-delay: 2.8s;
      background: #fd79a8;
    }

    @keyframes confettiFall {
      0% {
        transform: translateY(-100%) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(500%) rotate(360deg);
        opacity: 0;
      }
    }

    /* Trophy Container with Sparkles */
    .trophy-container {
      position: relative;
      display: inline-block;
      margin-bottom: 15px;
    }

    .trophy {
      font-size: 60px;
      margin-bottom: 10px;
      position: relative;
      z-index: 2;
      filter: drop-shadow(0 3px 5px rgba(0,0,0,0.3));
      animation: bounce 1s ease infinite alternate;
    }

    .sparkle {
      position: absolute;
      width: 12px;
      height: 12px;
      background: #fff;
      border-radius: 50%;
      animation: sparkle 2s infinite;
      z-index: 1;
    }

    .sparkle:nth-child(1) {
      top: -8px;
      right: -8px;
      animation-delay: 0.2s;
    }

    .sparkle:nth-child(2) {
      bottom: 0;
      left: -12px;
      animation-delay: 0.7s;
    }

    .sparkle:nth-child(3) {
      bottom: -12px;
      right: 0;
      animation-delay: 1.2s;
    }

    @keyframes sparkle {
      0%, 100% {
        opacity: 0;
        transform: scale(0);
      }
      50% {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes bounce {
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(-10px);
      }
    }

    .congrats-title {
      font-size: 24px;
      font-weight: 700;
      color: #d35400;
      margin-bottom: 8px;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
    }

    .won-text {
      font-size: 16px;
      color: #7f8c8d;
      margin-bottom: 5px;
    }

    .prize-text {
      font-size: 22px;
      font-weight: bold;
      color: #c0392b;
      margin: 8px 0 15px;
      padding: 8px 16px;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 50px;
      display: inline-block;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      }
      50% {
        transform: scale(1.05);
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
      }
      100% {
        transform: scale(1);
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      }
    }

    /* Celebration Dots */
    .celebration-graphic {
      display: flex;
      justify-content: center;
      margin: 12px 0 20px;
    }

    .celebration-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin: 0 6px;
      animation: celebrationBounce 1.2s infinite;
    }

    .celebration-dot:nth-child(1) {
      background: #e74c3c;
      animation-delay: 0s;
    }

    .celebration-dot:nth-child(2) {
      background: #f39c12;
      animation-delay: 0.2s;
    }

    .celebration-dot:nth-child(3) {
      background: #27ae60;
      animation-delay: 0.4s;
    }

    @keyframes celebrationBounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-12px);
      }
    }

    .share-btn {
      background: #25D366;
      color: white;
      margin: 10px auto 0;
      padding: 10px 20px;
      border-radius: 50px;
      font-weight: 600;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
      transition: all 0.3s ease;
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .share-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 15px rgba(37, 211, 102, 0.5);
    }

    @keyframes fadeIn {
      from { 
        opacity: 0; 
        transform: translateY(-20px) scale(0.95);
      }
      to { 
        opacity: 1; 
        transform: translateY(0) scale(1);
      }
    }

    /* Responsive design for mobile devices */
    @media (max-width: 480px) {
      .container {
        padding: 12px;
      }
      
      .game-card {
        padding: 20px 16px;
        margin: 10px 0;
      }
      
      .wheel {
        width: 250px;
        height: 250px;
      }
      
      .spin-btn {
        width: 100px;
        height: 45px;
        font-size: 16px;
      }
      
      .prize-label {
        font-size: 9px;
        transform: translateX(8px);
      }
      
      .icon-container {
        width: 150px;
      }
      
      .logo-img {
        max-height: 70px;
      }
      
      .subtitle {
        font-size: 13px;
      }
      
      .result-container {
        padding: 20px 12px;
      }
      
      .trophy {
        font-size: 50px;
      }
      
      .congrats-title {
        font-size: 22px;
      }
      
      .prize-text {
        font-size: 18px;
        padding: 6px 12px;
      }
      
      .share-btn {
        font-size: 13px;
        padding: 8px 16px;
      }
    }

    @media (max-width: 360px) {
      .wheel {
        width: 220px;
        height: 220px;
      }
      
      .spin-btn {
        width: 90px;
        height: 40px;
        font-size: 14px;
      }
      
      .prize-label {
        font-size: 8px;
        transform: translateX(6px);
      }
    }
  `]
})/*
export class MiniGame {
    @ViewChild('resultContainer') resultContainer!: ElementRef;
    @ViewChild('prizesContainer') prizesContainer!: ElementRef;
  
    // Updated prizes array with the provided labels
    prizes = [
      'Free 30min Pedicure with Facial',
      'BOGO: Hair Spa | Mani | Pedi',
      'Haircut/Color/Style – ₹1999',
      'Global Hair – ₹3999',
      'Highlights – ₹3999',
      'Men\'s Cut – ₹399',
      'Waxing – 25% OFF'
    ];
    segmentAngle = 360 / this.prizes.length; // This will automatically calculate to ~51.43 degrees
    spinning = false;
    phone!: string;
    user_id!: number;
    prizeWon: string | null = null;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameService: GameService,
    private snackBar: MatSnackBar
  ) {
    this.route.queryParams.subscribe(params => {
      this.phone = params['phone'] || '';
      this.user_id = +params['user_id'];  //*
    });
  }

  spinWheel() {
    if (this.spinning) return;
    this.spinning = true;
    this.prizeWon = null;

    const selectedIndex = Math.floor(Math.random() * this.prizes.length);
    const extraSpins = 5 + Math.floor(Math.random() * 4);
    const degrees = (extraSpins * 360) + (selectedIndex * this.segmentAngle) + (this.segmentAngle / 2);

    if (this.prizesContainer?.nativeElement) {
      const wheelInner = this.prizesContainer.nativeElement.querySelector('.wheel-inner');
      if (wheelInner) {
        wheelInner.style.transform = `rotate(${degrees}deg)`;
      }
    }

    setTimeout(() => {
      this.prizeWon = this.prizes[selectedIndex];

      this.snackBar.open(`🎉 You won: ${this.prizeWon}!`, 'Dismiss', { duration: 3000 });

      // Send prize info to backend
      this.gameService.sendPrize(this.phone, this.prizeWon).subscribe({
        next: () => console.log('Prize saved to backend'),
        error: (err) => console.error('Failed to save prize', err)
      });

      this.spinning = false;
    }, 4500);
  }

  captureScreenshot() {
    if (!this.prizeWon) return;
    const loadingSnackbar = this.snackBar.open('Preparing your screenshot...', '', { duration: 3000 });

    import('html2canvas').then((html2canvasModule) => {
      const html2canvas = html2canvasModule.default;

      setTimeout(() => {
        html2canvas(this.resultContainer.nativeElement, {
          scale: 2,
          logging: false,
          useCORS: true
        }).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          loadingSnackbar.dismiss();
          this.shareViaWhatsApp(imgData);
        }).catch(err => {
          console.error('Error capturing screenshot:', err);
          loadingSnackbar.dismiss();
          this.snackBar.open('Failed to capture screenshot. Please try again.', 'Close', { duration: 3000 });
        });
      }, 500);
    });
  }

  shareViaWhatsApp(imgData: string) {
    if (!this.phone) {
      this.snackBar.open('No phone number provided. Cannot share on WhatsApp.', 'Dismiss', { duration: 4000 });
      return;
    }
  
    const message = `I just won ${this.prizeWon} at this amazing business! Check it out!`;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
    if (isMobile) {
      // Mobile devices
      const whatsappUrl = `https://wa.me/${this.phone}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
  
      setTimeout(() => {
        this.snackBar.open('Please attach the screenshot manually in WhatsApp', 'Dismiss', { duration: 5000 });
      }, 1000);
    } else {
      // Desktop
      const downloadLink = document.createElement('a');
      downloadLink.href = imgData;
      downloadLink.download = 'my_prize.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
  
      const whatsappUrl = `https://web.whatsapp.com/send?phone=${this.phone}&text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  }
  */
 export class MiniGame {
  @ViewChild('resultContainer') resultContainer!: ElementRef;
  @ViewChild('prizesContainer') prizesContainer!: ElementRef;

  prizes = [
    'Free 30min Pedicure with Facial',
    'BOGO: Hair Spa | Mani | Pedi',
    'Haircut/Color/Style – ₹1999',
    'Global Hair – ₹3999',
    'Highlights – ₹3999',
    'Men\'s Cut – ₹399',
    'Waxing – 25% OFF'
  ];
  segmentAngle = 360 / this.prizes.length;
  spinning = false;
  phone!: string;
  user_id!: number;
  prizeWon: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gameService: GameService,
    private snackBar: MatSnackBar
  ) {
    this.route.queryParams.subscribe(params => {
      this.phone = params['phone'] || '';
      this.user_id = +params['user_id'] || 0;
    });
  }

  spinWheel() {
    if (this.spinning) return;
    this.spinning = true;
    this.prizeWon = null;

    // Call backend /spin/ endpoint to store user's spin
    this.gameService.spinWheel().subscribe({
      next: res => {
        if (res.status && res.data) {
          // Pick a random prize for frontend animation
          const selectedIndex = Math.floor(Math.random() * this.prizes.length);
          const extraSpins = 5 + Math.floor(Math.random() * 4);
          const degrees = (extraSpins * 360) + (selectedIndex * this.segmentAngle) + (this.segmentAngle / 2);

          if (this.prizesContainer?.nativeElement) {
            const wheelInner = this.prizesContainer.nativeElement.querySelector('.wheel-inner');
            if (wheelInner) wheelInner.style.transform = `rotate(${degrees}deg)`;
          }

          setTimeout(() => {
            this.prizeWon = this.prizes[selectedIndex];
            this.snackBar.open(`🎉 You won: ${this.prizeWon}!`, 'Dismiss', { duration: 3000 });
            this.spinning = false;
          }, 4500);

        } else {
          this.snackBar.open(res.message || 'You cannot spin today', 'Dismiss', { duration: 3000 });
          this.spinning = false;
        }
      },
      error: err => {
        console.error('Spin error:', err);
        this.snackBar.open('Error spinning the wheel', 'Dismiss', { duration: 3000 });
        this.spinning = false;
      }
    });
  }

  captureScreenshot() {
    if (!this.prizeWon || !this.resultContainer) return;
    const loadingSnackbar = this.snackBar.open('Preparing your screenshot...', '', { duration: 3000 });

    import('html2canvas').then(html2canvasModule => {
      const html2canvas = html2canvasModule.default;

      setTimeout(() => {
        html2canvas(this.resultContainer.nativeElement, { scale: 2, useCORS: true }).then(canvas => {
          loadingSnackbar.dismiss();
          this.shareViaWhatsApp(canvas.toDataURL('image/png'));
        }).catch(err => {
          console.error('Screenshot error:', err);
          loadingSnackbar.dismiss();
          this.snackBar.open('Failed to capture screenshot.', 'Close', { duration: 3000 });
        });
      }, 500);
    });
  }

  shareViaWhatsApp(imgData: string) {
    if (!this.phone) {
      this.snackBar.open('No phone number provided. Cannot share on WhatsApp.', 'Dismiss', { duration: 4000 });
      return;
    }
  
    const message = `I just won ${this.prizeWon} at this amazing business! Check it out!`;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      const whatsappUrl = `https://wa.me/${this.phone}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      setTimeout(() => {
        this.snackBar.open('Please attach the screenshot manually in WhatsApp', 'Dismiss', { duration: 5000 });
      }, 1000);
    } else {
      const downloadLink = document.createElement('a');
      downloadLink.href = imgData;
      downloadLink.download = 'my_prize.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      const whatsappUrl = `https://web.whatsapp.com/send?phone=${this.phone}&text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  }
}

