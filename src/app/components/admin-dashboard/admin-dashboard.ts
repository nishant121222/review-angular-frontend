// It is current component file , 20-09-2025
/*
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { Pipe, PipeTransform } from '@angular/core';

// chart.js + ng2-charts
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

export interface Review {
  phone: string;
  rating: number;
  comment: string;
  status: string;
}

export interface GameOutcome {
  phone: string;
  prize: string;
  date: string;
}

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 50, completeWords: boolean = false, ellipsis: string = '...'): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    if (completeWords) limit = value.substr(0, limit).lastIndexOf(' ');
    return `${value.substr(0, limit)}${ellipsis}`;
  }
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    MatMenuModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    TruncatePipe,
    BaseChartDirective
  ],
  template: `
  <div class="dashboard-container">
    <!-- Header -->
    <mat-toolbar class="toolbar">
      <div class="toolbar-left">
        <mat-icon class="brand-icon">dashboard</mat-icon>
        <span class="brand-title">Admin Dashboard</span>
      </div>
      <div class="toolbar-right">
        <button mat-icon-button [matMenuTriggerFor]="menu" matTooltip="Account Menu">
          <mat-icon>account_circle</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item>
            <mat-icon>settings</mat-icon>
            <span>Settings</span>
          </button>
          <button mat-menu-item>
            <mat-icon>exit_to_app</mat-icon>
            <span>Logout</span>
          </button>
        </mat-menu>
      </div>
    </mat-toolbar>

    <!-- Content Area -->
    <div class="dashboard-content">

      <!-- Quick Stats -->
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon pending">
                <mat-icon>rate_review</mat-icon>
              </div>
              <div class="stat-info">
                <h3>{{pendingReviewsData.data.length}}</h3>
                <p>Pending Reviews</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon outcomes">
                <mat-icon>casino</mat-icon>
              </div>
              <div class="stat-info">
                <h3>{{gameOutcomesData.data.length}}</h3>
                <p>Total Games</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon prizes">
                <mat-icon>card_giftcard</mat-icon>
              </div>
              <div class="stat-info">
                <h3>{{getPrizeCount()}}</h3>
                <p>Prizes Awarded</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon rating">
                <mat-icon>star</mat-icon>
              </div>
              <div class="stat-info">
                <h3>{{getAverageRating()}}</h3>
                <p>Avg. Rating</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Top Analytics Section -->
      <div class="analytics-grid">
        <mat-card class="analytics-card">
          <mat-card-header>
            <mat-card-title>Ratings Distribution</mat-card-title>
            <button mat-icon-button matTooltip="Distribution of customer ratings">
              <mat-icon>info</mat-icon>
            </button>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-container">
              <canvas baseChart
                [data]="ratingsChartData"
                [options]="barChartOptions"
                [type]="'bar'">
              </canvas>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="analytics-card">
          <mat-card-header>
            <mat-card-title>Prize Distribution</mat-card-title>
            <button mat-icon-button matTooltip="Breakdown of prizes awarded">
              <mat-icon>info</mat-icon>
            </button>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-container">
              <canvas baseChart
                [data]="prizeChartData"
                [options]="pieChartOptions"
                [type]="'pie'">
              </canvas>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Tables Section -->
      <div class="tables-grid">
        <mat-card class="table-card">
          <mat-card-header>
            <mat-card-title>Pending Reviews</mat-card-title>
            <span class="spacer"></span>
            <button mat-icon-button (click)="refreshReviews()" matTooltip="Refresh reviews">
              <mat-icon>refresh</mat-icon>
            </button>
          </mat-card-header>
          <mat-card-content>
            <div class="table-container">
              <table mat-table [dataSource]="pendingReviewsData" class="mat-elevation-z1 full-table" matSort>

                <ng-container matColumnDef="phone">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Phone </th>
                  <td mat-cell *matCellDef="let review"> {{review.phone}} </td>
                </ng-container>

                <ng-container matColumnDef="rating">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Rating </th>
                  <td mat-cell *matCellDef="let review"> 
                    <div class="rating-stars">
                      <mat-icon *ngFor="let star of getStars(review.rating)">{{star}}</mat-icon>
                    </div>
                  </td>
                </ng-container>

                <ng-container matColumnDef="comment">
                  <th mat-header-cell *matHeaderCellDef> Comment </th>
                  <td mat-cell *matCellDef="let review"> 
                    <span [matTooltip]="review.comment">{{review.comment | truncate:30}}</span>
                  </td>
                </ng-container>

                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef> Actions </th>
                  <td mat-cell *matCellDef="let review">
                    <button mat-icon-button color="primary" (click)="approveReview(review)" matTooltip="Approve review">
                      <mat-icon>check_circle</mat-icon>
                    </button>
                    <button mat-icon-button color="warn" (click)="rejectReview(review)" matTooltip="Reject review">
                      <mat-icon>cancel</mat-icon>
                    </button>
                    <button mat-icon-button color="accent" (click)="viewDetails(review)" matTooltip="View details">
                      <mat-icon>visibility</mat-icon>
                    </button>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="reviewColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: reviewColumns;"></tr>
              </table>
            </div>
            <mat-paginator #reviewsPaginator [pageSize]="5" [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
            

          </mat-card-content>
        </mat-card>

        <mat-card class="table-card">
          <mat-card-header>
            <mat-card-title>Game Outcomes</mat-card-title>
            <span class="spacer"></span>
            <button mat-icon-button (click)="refreshOutcomes()" matTooltip="Refresh outcomes">
              <mat-icon>refresh</mat-icon>
            </button>
          </mat-card-header>
          <mat-card-content>
            <div class="table-container">
              <table mat-table [dataSource]="gameOutcomesData" class="mat-elevation-z1 full-table" matSort>

                <ng-container matColumnDef="phone">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Phone </th>
                  <td mat-cell *matCellDef="let outcome"> {{outcome.phone}} </td>
                </ng-container>

                <ng-container matColumnDef="prize">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Prize </th>
                  <td mat-cell *matCellDef="let outcome">
                    <mat-chip [style.backgroundColor]="getPrizeColor(outcome.prize)" selected class="prize-chip">
                      <mat-icon class="chip-icon">{{getPrizeIcon(outcome.prize)}}</mat-icon>
                      {{outcome.prize}}
                    </mat-chip>
                  </td>
                </ng-container>

                <ng-container matColumnDef="date">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Date </th>
                  <td mat-cell *matCellDef="let outcome"> {{outcome.date | date:'mediumDate'}} </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="gameColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: gameColumns;"></tr>
              </table>
            </div>
            <!-- Game Outcomes Table -->
<mat-paginator #outcomesPaginator [pageSize]="5" [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons>
</mat-paginator>
  </mat-card-content>
        </mat-card>
      </div>

      <!-- Export Button -->
      <div class="export-section">
        <button mat-raised-button color="accent" (click)="exportData()" class="export-btn">
          <mat-icon>file_download</mat-icon>
          Export Data
        </button>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .dashboard-container { 
      display: flex; 
      flex-direction: column; 
      height: 100vh; 
      background: #f5f7fa; 
      font-family: 'Roboto', sans-serif;
    }
    
    .toolbar { 
      display: flex; 
      justify-content: space-between; 
      background: linear-gradient(135deg, #3f51b5 0%, #303f9f 100%); 
      color: #fff; 
      padding: 0 24px; 
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .toolbar-left { 
      display: flex; 
      align-items: center; 
    }
    
    .brand-icon { 
      margin-right: 12px; 
      font-size: 28px;
      width: 28px;
      height: 28px;
    }
    
    .brand-title { 
      font-size: 20px; 
      font-weight: 500; 
      letter-spacing: 0.5px;
    }
    
    .toolbar-right { 
      display: flex; 
      align-items: center; 
    }
    
    .dashboard-content { 
      flex: 1; 
      overflow-y: auto; 
      padding: 24px; 
      max-width: 1800px; 
      margin: 0 auto;
      width: 100%;
      box-sizing: border-box;
    }
    
    .stats-grid { 
      display: grid; 
      grid-template-columns: repeat(4, 1fr); 
      gap: 24px; 
      margin-bottom: 30px; 
    }
    
    .stat-card { 
      border-radius: 12px; 
      text-align: center; 
      padding: 16px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    
    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 16px rgba(0,0,0,0.12);
    }
    
    .stat-content { 
      display: flex; 
      align-items: center; 
      justify-content: flex-start; 
      gap: 16px; 
    }
    
    .stat-icon { 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      border-radius: 12px; 
      width: 60px; 
      height: 60px; 
      color: #fff;
      font-size: 28px;
    }
    
    .stat-icon.pending { background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%); }
    .stat-icon.outcomes { background: linear-gradient(135deg, #3f51b5 0%, #303f9f 100%); }
    .stat-icon.prizes { background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%); }
    .stat-icon.rating { background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%); }
    
    .stat-info h3 { 
      margin: 0; 
      font-size: 28px; 
      font-weight: 700; 
      text-align: left;
    }
    
    .stat-info p { 
      margin: 4px 0 0; 
      font-size: 14px; 
      color: #666; 
      text-align: left;
    }
    
    .analytics-grid { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 24px; 
      margin-bottom: 30px; 
    }
    
    .analytics-card {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    
    .analytics-card mat-card-header {
      padding: 16px 16px 0;
      display: flex;
      align-items: center;
    }
    
    .analytics-card mat-card-title {
      font-size: 18px;
      font-weight: 500;
    }
    
    .chart-container {
      height: 300px;
      padding: 16px;
      position: relative;
    }
    
    .tables-grid { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 24px; 
      margin-bottom: 30px; 
    }
    
    .table-card {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    
    .table-card mat-card-header {
      padding: 16px 16px 0;
      display: flex;
      align-items: center;
    }
    
    .table-card mat-card-title {
      font-size: 18px;
      font-weight: 500;
    }
    
    .spacer {
      flex: 1 1 auto;
    }
    
    .table-container {
      overflow-x: auto;
      max-height: 400px;
    }
    
    .full-table {
      width: 100%;
    }
    
    .rating-stars {
      display: flex;
      color: #ffc107;
    }
    
    .prize-chip {
      display: flex;
      align-items: center;
      color: white;
      font-weight: 500;
      padding: 4px 12px;
    }
    
    .chip-icon {
      margin-right: 6px;
      font-size: 16px;
      width: 16px;
      height: 16px;
    }
    
    .export-section { 
      text-align: right; 
      padding: 16px 0;
    }
    
    .export-btn { 
      border-radius: 8px; 
      font-weight: 500;
      padding: 8px 24px;
      font-size: 16px;
    }
    
    
    @media (max-width: 1400px) {
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .analytics-grid,
      .tables-grid {
        grid-template-columns: 1fr;
      }
    }
    
    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .dashboard-content {
        padding: 16px;
      }
    }
  `]
})
export class AdminDashboard implements OnInit, AfterViewInit {
  // ✅ Use MatTableDataSource
  pendingReviewsData = new MatTableDataSource<Review>();
  gameOutcomesData = new MatTableDataSource<GameOutcome>();

  reviewColumns: string[] = ['phone', 'rating', 'comment', 'actions'];
  gameColumns: string[] = ['phone', 'prize', 'date'];

  // ✅ Capture paginators
  @ViewChild('reviewsPaginator') reviewsPaginator!: MatPaginator;
  @ViewChild('outcomesPaginator') outcomesPaginator!: MatPaginator;

  ratingsChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['1★', '2★', '3★', '4★', '5★'],
    datasets: [{
      label: 'Number of Ratings',
      data: [0, 0, 0, 0, 0],
      backgroundColor: ['#f44336', '#ff9800', '#ffeb3b', '#8bc34a', '#4caf50'],
      borderColor: ['#d32f2f', '#f57c00', '#fbc02d', '#689f38', '#388e3c'],
      borderWidth: 1
    }]
  };

  prizeChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Free Coffee', 'Discount Coupon', 'Gift Card', 'Free Dessert', 'No Prize'],
    datasets: [{
      data: [0, 0, 0, 0, 0],
      backgroundColor: ['#6d4c41', '#ff5722', '#9c27b0', '#e91e63', '#9e9e9e'],
      borderColor: '#fff',
      borderWidth: 2,
      hoverOffset: 8
    }]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false, position: 'bottom' } },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
  };

  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } }
  };

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    // ✅ Dummy reviews
    const reviews: Review[] = [
      { phone: '9876543210', rating: 3, comment: 'Excellent service!', status: 'pending' },
      { phone: '9123456780', rating: 4, comment: 'Good but can improve.', status: 'pending' },
      { phone: '9988776655', rating: 3, comment: 'Average experience.', status: 'pending' },
      { phone: '9765432109', rating: 2, comment: 'Loved the seasonal drinks!', status: 'pending' },
      { phone: '9555555555', rating: 2, comment: 'Order was incorrect.', status: 'pending' },
      { phone: '9876543210', rating: 3, comment: 'Excellent service!', status: 'pending' },
      { phone: '9123456780', rating: 4, comment: 'Good but can improve.', status: 'pending' },
      { phone: '9988776655', rating: 3, comment: 'Average experience.', status: 'pending' },
      { phone: '9765432109', rating: 2, comment: 'Loved the seasonal drinks!', status: 'pending' },
      { phone: '9555555555', rating: 2, comment: 'Order was incorrect.', status: 'pending' },
   
    ];
    this.pendingReviewsData.data = reviews;

    // ✅ Dummy outcomes
    const outcomes: GameOutcome[] = [
      { phone: '9876543210', prize: 'Free Coffee', date: '2025-09-01' },
      { phone: '9123456780', prize: 'Discount Coupon', date: '2025-09-03' },
      { phone: '9988776655', prize: 'No Prize', date: '2025-09-05' },
      { phone: '8899776655', prize: 'Gift Card', date: '2025-09-06' },
      { phone: '9765432109', prize: 'Free Dessert', date: '2025-09-07' },
      { phone: '9876543210', prize: 'Free Coffee', date: '2025-09-01' },
      { phone: '9123456780', prize: 'Discount Coupon', date: '2025-09-03' },
      { phone: '9988776655', prize: 'No Prize', date: '2025-09-05' },
      { phone: '8899776655', prize: 'Gift Card', date: '2025-09-06' },
      { phone: '9765432109', prize: 'Free Dessert', date: '2025-09-07' },
 
  ];
    this.gameOutcomesData.data = outcomes;

    this.updateCharts();
  }

  ngAfterViewInit() {
    this.pendingReviewsData.paginator = this.reviewsPaginator;
    this.gameOutcomesData.paginator = this.outcomesPaginator;
  }

  updateCharts() {
    const ratingCounts = [0, 0, 0, 0, 0];
    this.pendingReviewsData.data.forEach(r => ratingCounts[r.rating - 1]++);
    this.ratingsChartData.datasets[0].data = ratingCounts;

    const prizeCounts: { [key: string]: number } = {
      'Free Coffee': 0, 'Discount Coupon': 0, 'Gift Card': 0, 'Free Dessert': 0, 'No Prize': 0
    };
    this.gameOutcomesData.data.forEach(o => prizeCounts[o.prize]++);
    this.prizeChartData.datasets[0].data = Object.values(prizeCounts);
  }

  getPrizeCount(): number {
    return this.gameOutcomesData.data.filter(outcome => outcome.prize !== 'No Prize').length;
  }

  getAverageRating(): string {
    if (this.pendingReviewsData.data.length === 0) return '0.0';
    const total = this.pendingReviewsData.data.reduce((sum, review) => sum + review.rating, 0);
    return (total / this.pendingReviewsData.data.length).toFixed(1);
  }

  getStars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) => (i < rating ? 'star' : 'star_border'));
  }

  getPrizeColor(prize: string): string {
    const colorMap: { [key: string]: string } = {
      'Free Coffee': '#6d4c41', 'Discount Coupon': '#ff5722',
      'Gift Card': '#9c27b0', 'Free Dessert': '#e91e63', 'No Prize': '#9e9e9e'
    };
    return colorMap[prize] || '#3f51b5';
  }

  getPrizeIcon(prize: string): string {
    const iconMap: { [key: string]: string } = {
      'Free Coffee': 'local_cafe',
      'Discount Coupon': 'confirmation_number',
      'Gift Card': 'card_giftcard',
      'Free Dessert': 'cake',
      'No Prize': 'block'
    };
    return iconMap[prize] || 'card_giftcard';
  }

  approveReview(review: Review) {
    review.status = 'approved';
    this.pendingReviewsData.data = this.pendingReviewsData.data.filter(r => r !== review);
    this.updateCharts();
    this.snackBar.open('Review approved successfully', 'Close', { duration: 3000 });
  }

  rejectReview(review: Review) {
    review.status = 'rejected';
    this.pendingReviewsData.data = this.pendingReviewsData.data.filter(r => r !== review);
    this.updateCharts();
    this.snackBar.open('Review rejected', 'Close', { duration: 3000 });
  }

  viewDetails(review: Review) {
    alert(`Review Details:\nPhone: ${review.phone}\nRating: ${review.rating}\nComment: ${review.comment}`);
  }

  refreshReviews() {
    this.snackBar.open('Reviews refreshed', 'Close', { duration: 2000 });
  }

  refreshOutcomes() {
    this.snackBar.open('Game outcomes refreshed', 'Close', { duration: 2000 });
  }

  exportData() {
    this.snackBar.open('Exporting data...', 'Close', { duration: 3000 });
    setTimeout(() => {
      this.snackBar.open('Data exported successfully', 'Close', { duration: 3000 });
    }, 1500);
  }
}
*/


// This is Perfect Code with Dummy Data Layout

/*
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
export interface Review {
  phone: string;
  rating: number;
  comment: string;
  status: string;
}

export interface GameOutcome {
  phone: string;
  prize: string;
  date: string;
}

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 50, completeWords: boolean = false, ellipsis: string = '...'): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    if (completeWords) limit = value.substr(0, limit).lastIndexOf(' ');
    return `${value.substr(0, limit)}${ellipsis}`;
  }
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    MatMenuModule,
    TruncatePipe
  ],template: `
  <div class="dashboard-container">
    <!-- Header -->
    <mat-toolbar class="toolbar">
      <div class="toolbar-content">
        <div class="header-info">
          <h1>Admin Dashboard</h1>
          <p>Manage reviews and game outcomes</p>
        </div>
        <button mat-icon-button [matMenuTriggerFor]="menu" class="user-menu">
          <mat-icon>account_circle</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item>
            <mat-icon>settings</mat-icon>
            <span>Settings</span>
          </button>
          <button mat-menu-item (click)="logout()">
  <mat-icon>exit_to_app</mat-icon>
  <span>Logout</span>
</button>
</mat-menu>
      </div>
    </mat-toolbar>

    <div class="dashboard-content">
      <!-- Stats Overview Cards -->
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon pending">
                <mat-icon>rate_review</mat-icon>
              </div>
              <div class="stat-info">
                <h3>{{pendingReviews.length}}</h3>
                <p>Pending Reviews</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon outcomes">
                <mat-icon>casino</mat-icon>
              </div>
              <div class="stat-info">
                <h3>{{gameOutcomes.length}}</h3>
                <p>Game Outcomes</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon prizes">
                <mat-icon>card_giftcard</mat-icon>
              </div>
              <div class="stat-info">
                <h3>{{getPrizeCount()}}</h3>
                <p>Prizes Awarded</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Main Content Grid -->
      <div class="content-grid">
        <!-- Pending Reviews Section -->
        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon class="card-icon">rate_review</mat-icon>
              Pending Reviews ({{pendingReviews.length}})
            </mat-card-title>
            <button mat-icon-button (click)="loadPendingReviews()" matTooltip="Refresh reviews">
              <mat-icon>refresh</mat-icon>
            </button>
          </mat-card-header>
          <mat-card-content>
            <div class="table-container" [class.empty]="pendingReviews.length === 0">
              <table mat-table [dataSource]="pendingReviews" class="mat-elevation-z1">
                <!-- Phone Column -->
                <ng-container matColumnDef="phone">
                  <th mat-header-cell *matHeaderCellDef> Phone </th>
                  <td mat-cell *matCellDef="let review"> 
                    <div class="phone-cell">
                      <mat-icon class="cell-icon">phone</mat-icon>
                      {{review.phone}} 
                    </div>
                  </td>
                </ng-container>

                <!-- Rating Column -->
                <ng-container matColumnDef="rating">
                  <th mat-header-cell *matHeaderCellDef> Rating </th>
                  <td mat-cell *matCellDef="let review"> 
                    <div class="rating-cell">
                      <span class="star-rating">
                        {{review.rating}} <mat-icon>star</mat-icon>
                      </span>
                    </div>
                  </td>
                </ng-container>

                <!-- Comment Column -->
                <ng-container matColumnDef="comment">
                  <th mat-header-cell *matHeaderCellDef> Comment </th>
                  <td mat-cell *matCellDef="let review"> 
                    <div class="comment-cell">
                      {{review.comment | truncate:60:true}}
                    </div>
                  </td>
                </ng-container>

                <!-- Actions Column -->
                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef class="actions-header"> Actions </th>
                  <td mat-cell *matCellDef="let review" class="actions-cell">
                    <div class="action-buttons">
                      <button mat-raised-button color="primary" (click)="approveReview(review)" class="action-btn">
                        <mat-icon>check_circle</mat-icon>
                        Approve
                      </button>
                      <button mat-raised-button color="warn" (click)="rejectReview(review)" class="action-btn">
                        <mat-icon>cancel</mat-icon>
                        Reject
                      </button>
                    </div>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="reviewColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: reviewColumns;"></tr>
              </table>
              <div class="empty-state" *ngIf="pendingReviews.length === 0">
                <mat-icon>inbox</mat-icon>
                <p>No pending reviews</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Game Outcomes Section -->
        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-card-title>
              <mat-icon class="card-icon">casino</mat-icon>
              Spin Game Outcomes ({{gameOutcomes.length}})
            </mat-card-title>
            <button mat-icon-button (click)="loadGameOutcomes()" matTooltip="Refresh outcomes">
              <mat-icon>refresh</mat-icon>
            </button>
          </mat-card-header>
          <mat-card-content>
            <div class="table-container" [class.empty]="gameOutcomes.length === 0">
              <table mat-table [dataSource]="gameOutcomes" class="mat-elevation-z1">
                <!-- Phone Column -->
                <ng-container matColumnDef="phone">
                  <th mat-header-cell *matHeaderCellDef> Phone </th>
                  <td mat-cell *matCellDef="let outcome"> 
                    <div class="phone-cell">
                      <mat-icon class="cell-icon">phone</mat-icon>
                      {{outcome.phone}} 
                    </div>
                  </td>
                </ng-container>

                <!-- Prize Column -->
                <ng-container matColumnDef="prize">
                  <th mat-header-cell *matHeaderCellDef> Prize </th>
                  <td mat-cell *matCellDef="let outcome">
                    <mat-chip-listbox>
                      <mat-chip 
                        [style.background]="getPrizeColor(outcome.prize)" 
                        [style.color]="'white'"
                        class="prize-chip">
                        {{outcome.prize}}
                      </mat-chip>
                    </mat-chip-listbox>
                  </td>
                </ng-container>

                <!-- Date Column -->
                <ng-container matColumnDef="date">
                  <th mat-header-cell *matHeaderCellDef> Date </th>
                  <td mat-cell *matCellDef="let outcome"> 
                    <div class="date-cell">
                      <mat-icon class="cell-icon">calendar_today</mat-icon>
                      {{outcome.date | date: 'mediumDate'}}
                    </div>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="gameColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: gameColumns;"></tr>
              </table>
              <div class="empty-state" *ngIf="gameOutcomes.length === 0">
                <mat-icon>casino</mat-icon>
                <p>No game outcomes yet</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Export Data Button -->
      <div class="export-section">
        <button mat-raised-button color="accent" (click)="exportData()" class="export-btn">
          <mat-icon>file_download</mat-icon>
          Export Data
        </button>
      </div>
    </div>
  </div>
  

  `,
  
  styles: [`
  .dashboard-container {
    min-height: 100vh;
    background-color: #f5f5f5;
  }
  
  .toolbar {
    background: linear-gradient(135deg, #3f51b5 0%, #303f9f 100%);
    color: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    margin-bottom: 24px;
  }
  
  .toolbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 24px;
  }
  
  .header-info h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 500;
  }
  
  .header-info p {
    margin: 0;
    opacity: 0.9;
    font-size: 14px;
  }
  
  .user-menu {
    color: white;
  }
  
  .dashboard-content {
    padding: 0 24px 24px;
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .stat-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
  
  .stat-content {
    display: flex;
    align-items: center;
    padding: 16px;
  }
  
  .stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
  }
  
  .stat-icon.pending {
    background-color: #ff9800;
    color: white;
  }
  
  .stat-icon.outcomes {
    background-color: #9c27b0;
    color: white;
  }
  
  .stat-icon.prizes {
    background-color: #4caf50;
    color: white;
  }
  
  .stat-info h3 {
    margin: 0;
    font-size: 28px;
    font-weight: 600;
  }
  
  .stat-info p {
    margin: 4px 0 0;
    color: #757575;
    font-size: 14px;
  }
  
  .content-grid {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 24px;
  }
  
  .dashboard-card {
    border-radius: 12px;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
    margin-bottom: 24px;
  }
  
  .dashboard-card:hover {
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
  
  mat-card-header {
    padding: 16px 16px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  mat-card-title {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    margin: 0;
  }
  
  .card-icon {
    margin-right: 8px;
    color: #3f51b5;
  }
  
  mat-card-content {
    padding: 16px;
  }
  
  .table-container {
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    min-height: 500px;
  }
  
  .table-container.empty {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fafafa;
    border: 1px dashed #ddd;
  }
  
  .empty-state {
    text-align: center;
    padding: 40px 20px;
    color: #9e9e9e;
  }
  
  .empty-state mat-icon {
    font-size: 48px;
    width: 48px;
    height: 48px;
    margin-bottom: 16px;
  }
  
  table {
    width: 100%;
    background: white;
  }
  
  th.mat-header-cell {
    font-weight: 600;
    background-color: #f5f5f5;
    font-size: 14px;
    color: #424242;
    padding: 16px;
  }
  
  td.mat-cell {
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .actions-header {
    text-align: center;
  }
  
  .actions-cell {
    text-align: center;
  }
  
  .action-buttons {
    display: flex;
    gap: 8px;
    justify-content: center;
  }
  
  .action-btn {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  .phone-cell, .date-cell {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .cell-icon {
    font-size: 18px;
    width: 18px;
    height: 18px;
    color: #757575;
  }
  
  .rating-cell {
    display: flex;
    align-items: center;
  }
  
  .star-rating {
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 500;
  }
  
  .star-rating mat-icon {
    color: #ffc107;
    font-size: 18px;
    width: 18px;
    height: 18px;
  }
  
  .comment-cell {
    line-height: 1.4;
    max-width: 250px;
  }
  
  .prize-chip {
    font-weight: 500;
  }
  
  .export-section {
    display: flex;
    justify-content: flex-end;
  }
  
  .export-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 20px;
    height: 44px;
    font-weight: 500;
  }
  `]
})
export class AdminDashboard implements OnInit {
  pendingReviews: Review[] = [];
  gameOutcomes: GameOutcome[] = [];
  reviewColumns: string[] = ['phone', 'rating', 'comment', 'actions'];
  gameColumns: string[] = ['phone', 'prize', 'date'];

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPendingReviews();
    this.loadGameOutcomes();
  }
  logout() {
    // Simply navigate to the login page
    this.router.navigate(['/app-admin-login']);
  }
  // Dummy data instead of service
  loadPendingReviews() {
    this.pendingReviews = [
      { phone: '9876543210', rating: 5, comment: 'Great service and food!', status: 'pending' },
      { phone: '9123456780', rating: 4, comment: 'Good experience, will come again!', status: 'pending' },
      { phone: '9988776655', rating: 3, comment: 'Average service but tasty food.', status: 'pending' }
    ];
  }

  loadGameOutcomes() {
    this.gameOutcomes = [
      { phone: '9876543210', prize: 'Free Coffee', date: new Date().toISOString() },
      { phone: '9123456780', prize: 'Discount Coupon', date: new Date().toISOString() },
      { phone: '9988776655', prize: 'No Prize', date: new Date().toISOString() },
      { phone: '9001122334', prize: 'Gift Card', date: new Date().toISOString() },
      { phone: '9001162334', prize: 'Gift Card', date: new Date().toISOString() }
   
    ];
  }

  getPrizeCount(): number {
    return this.gameOutcomes.filter(outcome => outcome.prize !== 'No Prize').length;
  }

  getPrizeColor(prize: string): string {
    const colorMap: {[key: string]: string} = {
      'Free Coffee': '#6d4c41',
      'Discount Coupon': '#ff5722',
      'Gift Card': '#9c27b0',
      'Free Dessert': '#e91e63',
      'No Prize': '#9e9e9e'
    };
    return colorMap[prize] || '#3f51b5';
  }

  approveReview(review: Review) {
    this.pendingReviews = this.pendingReviews.filter(r => r.phone !== review.phone);
    this.snackBar.open('Review approved successfully', 'Dismiss', { duration: 3000 });
  }

  rejectReview(review: Review) {
    this.pendingReviews = this.pendingReviews.filter(r => r.phone !== review.phone);
    this.snackBar.open('Review rejected', 'Dismiss', { duration: 3000 });
  }

  exportData() {
    // Just simulate export with dummy CSV
    const csvContent = "data:text/csv;charset=utf-8,"
      + ["Phone,Prize,Date"]
      .concat(this.gameOutcomes.map(o => `${o.phone},${o.prize},${o.date}`))
      .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'exported-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.snackBar.open('Data exported successfully', 'Dismiss', { duration: 3000 });
  }
}
*/
/*

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Chart, ChartModule } from 'angular-highcharts';
import { Pipe, PipeTransform } from '@angular/core';
import { AdminService } from '../../services/admin';

export interface Review {
  phone: string;
  rating: number;
  comment: string;
  status: string;
  timestamp: string;
}

export interface GameOutcome {
  phone: string;
  prize: string;
  date: string;
}

export interface Analytics {
  totalReviews: number;
  approvedReviews: number;
  rejectedReviews: number;
  averageRating: number;
  prizeDistribution: { prize: string; count: number }[];
  reviewsOverTime: { date: string; count: number }[];
  ratingsDistribution: { rating: number; count: number }[];
}

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 50, completeWords: boolean = false, ellipsis: string = '...'): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    if (completeWords) limit = value.substr(0, limit).lastIndexOf(' ');
    return `${value.substr(0, limit)}${ellipsis}`;
  }
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    MatMenuModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    ChartModule,
    TruncatePipe
  ],
  template: `
  <div class="dashboard-container">
    <!-- Header -->
    <mat-toolbar class="toolbar">
      <div class="toolbar-content">
        <div class="header-info">
          <h1>Admin Dashboard</h1>
          <p>Manage reviews, game outcomes, and analytics</p>
        </div>
        <div class="header-actions">
          <button mat-stroked-button (click)="refreshAllData()" class="refresh-btn">
            <mat-icon>refresh</mat-icon>
            Refresh Data
          </button>
          <button mat-icon-button [matMenuTriggerFor]="menu" class="user-menu">
            <mat-icon>account_circle</mat-icon>
          </button>
        </div>
        <mat-menu #menu="matMenu">
          <button mat-menu-item>
            <mat-icon>settings</mat-icon>
            <span>Settings</span>
          </button>
          <button mat-menu-item>
            <mat-icon>exit_to_app</mat-icon>
            <span>Logout</span>
          </button>
        </mat-menu>
      </div>
    </mat-toolbar>

    <div class="dashboard-content">
      <!-- Stats Overview Cards -->
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon pending">
                <mat-icon>rate_review</mat-icon>
              </div>
              <div class="stat-info">
                <h3>{{pendingReviews.length}}</h3>
                <p>Pending Reviews</p>
                <span class="stat-trend" [class.positive]="reviewsTrend > 0" [class.negative]="reviewsTrend < 0">
                  <mat-icon>{{reviewsTrend >= 0 ? 'arrow_upward' : 'arrow_downward'}}</mat-icon>
                  {{ Math.abs(reviewsTrend) }}% from last week
                </span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon outcomes">
                <mat-icon>casino</mat-icon>
              </div>
              <div class="stat-info">
                <h3>{{gameOutcomes.length}}</h3>
                <p>Game Outcomes</p>
                <span class="stat-trend" [class.positive]="gamesTrend > 0" [class.negative]="gamesTrend < 0">
                  <mat-icon>{{gamesTrend >= 0 ? 'arrow_upward' : 'arrow_downward'}}</mat-icon>
                  {{ Math.abs(gamesTrend) }}% from last week
                </span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon prizes">
                <mat-icon>card_giftcard</mat-icon>
              </div>
              <div class="stat-info">
                <h3>{{getPrizeCount()}}</h3>
                <p>Prizes Awarded</p>
                <span class="stat-trend" [class.positive]="prizesTrend > 0" [class.negative]="prizesTrend < 0">
                  <mat-icon>{{prizesTrend >= 0 ? 'arrow_upward' : 'arrow_downward'}}</mat-icon>
                  {{ Math.abs(prizesTrend) }}% from last week
                </span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon rating">
                <mat-icon>star</mat-icon>
              </div>
              <div class="stat-info">
                <h3>{{analytics?.averageRating?.toFixed(1) || '0.0'}}</h3>
                <p>Average Rating</p>
                <span class="stat-trend" *ngIf="ratingTrend !== 0" 
                  [class.positive]="ratingTrend > 0" [class.negative]="ratingTrend < 0">
                  <mat-icon>{{ratingTrend > 0 ? 'arrow_upward' : 'arrow_downward'}}</mat-icon>
                  {{ Math.abs(ratingTrend) }} from last week
                </span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Analytics Section -->
      <mat-card class="analytics-card">
        <mat-card-header>
          <mat-card-title>
            <mat-icon class="card-icon">analytics</mat-icon>
            Analytics Overview
          </mat-card-title>
          <div class="date-filter">
            <mat-form-field appearance="outline" class="date-field">
              <mat-label>Date Range</mat-label>
              <mat-select [(value)]="selectedRange" (selectionChange)="updateAnalytics()">
                <mat-option value="7">Last 7 days</mat-option>
                <mat-option value="30">Last 30 days</mat-option>
                <mat-option value="90">Last 90 days</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </mat-card-header>
        <mat-card-content>
          <div class="analytics-content" *ngIf="analytics; else loading">
            <div class="chart-row">
              <div class="chart-container">
                <h3>Reviews Over Time</h3>
                <div [chart]="reviewsChart" class="chart"></div>
              </div>
              <div class="chart-container">
                <h3>Rating Distribution</h3>
                <div [chart]="ratingsChart" class="chart"></div>
              </div>
            </div>
            <div class="chart-row">
              <div class="chart-container">
                <h3>Prize Distribution</h3>
                <div [chart]="prizesChart" class="chart"></div>
              </div>
              <div class="stats-container">
                <h3>Quick Stats</h3>
                <div class="stats-grid-mini">
                  <div class="stat-mini">
                    <div class="stat-value">{{analytics.totalReviews}}</div>
                    <div class="stat-label">Total Reviews</div>
                  </div>
                  <div class="stat-mini">
                    <div class="stat-value">{{analytics.approvedReviews}}</div>
                    <div class="stat-label">Approved</div>
                  </div>
                  <div class="stat-mini">
                    <div class="stat-value">{{analytics.rejectedReviews}}</div>
                    <div class="stat-label">Rejected</div>
                  </div>
                  <div class="stat-mini">
                    <div class="stat-value">{{analytics.averageRating?.toFixed(1) || '0.0'}}</div>
                    <div class="stat-label">Avg Rating</div>
                  </div>
                </div>
                <div class="approval-rate">
                  <h4>Approval Rate</h4>
                  <mat-progress-bar 
                    mode="determinate" 
                    [value]="(analytics.approvedReviews / analytics.totalReviews) * 100"
                    class="approval-bar">
                  </mat-progress-bar>
                  <span class="approval-percent">
                    {{ (analytics.approvedReviews / analytics.totalReviews) * 100 | number:'1.0-0' }}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          <ng-template #loading>
            <div class="analytics-loading">
              <mat-spinner diameter="40"></mat-spinner>
              <p>Loading analytics data...</p>
            </div>
          </ng-template>
        </mat-card-content>
      </mat-card>

      <!-- Main Content Tabs -->
      <mat-tab-group animationDuration="0ms" class="content-tabs">
        <mat-tab label="Pending Reviews">
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon class="card-icon">rate_review</mat-icon>
                Pending Reviews ({{pendingReviews.length}})
              </mat-card-title>
              <button mat-icon-button (click)="loadPendingReviews()" matTooltip="Refresh reviews">
                <mat-icon>refresh</mat-icon>
              </button>
            </mat-card-header>
            <mat-card-content>
              <div class="table-container" [class.empty]="pendingReviews.length === 0">
                <table mat-table [dataSource]="pendingReviews" class="mat-elevation-z1">
                  <!-- Phone Column -->
                  <ng-container matColumnDef="phone">
                    <th mat-header-cell *matHeaderCellDef> Phone </th>
                    <td mat-cell *matCellDef="let review"> 
                      <div class="phone-cell">
                        <mat-icon class="cell-icon">phone</mat-icon>
                        {{review.phone}} 
                      </div>
                    </td>
                  </ng-container>

                  <!-- Rating Column -->
                  <ng-container matColumnDef="rating">
                    <th mat-header-cell *matHeaderCellDef> Rating </th>
                    <td mat-cell *matCellDef="let review"> 
                      <div class="rating-cell">
                        <span class="star-rating">
                          {{review.rating}} <mat-icon>star</mat-icon>
                        </span>
                      </div>
                    </td>
                  </ng-container>

                  <!-- Comment Column -->
                  <ng-container matColumnDef="comment">
                    <th mat-header-cell *matHeaderCellDef> Comment </th>
                    <td mat-cell *matCellDef="let review"> 
                      <div class="comment-cell">
                        {{review.comment | truncate:60:true}}
                        <button mat-icon-button (click)="showFullComment(review.comment)" class="expand-comment">
                          <mat-icon>open_in_full</mat-icon>
                        </button>
                      </div>
                    </td>
                  </ng-container>

                  <!-- Date Column -->
                  <ng-container matColumnDef="date">
                    <th mat-header-cell *matHeaderCellDef> Date </th>
                    <td mat-cell *matCellDef="let review"> 
                      <div class="date-cell">
                        <mat-icon class="cell-icon">calendar_today</mat-icon>
                        {{review.timestamp | date: 'shortDate'}}
                      </div>
                    </td>
                  </ng-container>

                  <!-- Actions Column -->
                  <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef class="actions-header"> Actions </th>
                    <td mat-cell *matCellDef="let review" class="actions-cell">
                      <div class="action-buttons">
                        <button mat-raised-button color="primary" (click)="approveReview(review)" class="action-btn">
                          <mat-icon>check_circle</mat-icon>
                          Approve
                        </button>
                        <button mat-raised-button color="warn" (click)="rejectReview(review)" class="action-btn">
                          <mat-icon>cancel</mat-icon>
                          Reject
                        </button>
                      </div>
                    </td>
                  </ng-container>

                  <tr mat-header-row *matHeaderRowDef="reviewColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: reviewColumns;"></tr>
                </table>
                <div class="empty-state" *ngIf="pendingReviews.length === 0">
                  <mat-icon>inbox</mat-icon>
                  <p>No pending reviews</p>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </mat-tab>

        <mat-tab label="Game Outcomes">
          <mat-card class="dashboard-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon class="card-icon">casino</mat-icon>
                Spin Game Outcomes ({{gameOutcomes.length}})
              </mat-card-title>
              <button mat-icon-button (click)="loadGameOutcomes()" matTooltip="Refresh outcomes">
                <mat-icon>refresh</mat-icon>
              </button>
            </mat-card-header>
            <mat-card-content>
              <div class="table-container" [class.empty]="gameOutcomes.length === 0">
                <table mat-table [dataSource]="gameOutcomes" class="mat-elevation-z1">
                  <!-- Phone Column -->
                  <ng-container matColumnDef="phone">
                    <th mat-header-cell *matHeaderCellDef> Phone </th>
                    <td mat-cell *matCellDef="let outcome"> 
                      <div class="phone-cell">
                        <mat-icon class="cell-icon">phone</mat-icon>
                        {{outcome.phone}} 
                      </div>
                    </td>
                  </ng-container>

                  <!-- Prize Column -->
                  <ng-container matColumnDef="prize">
                    <th mat-header-cell *matHeaderCellDef> Prize </th>
                    <td mat-cell *matCellDef="let outcome">
                      <mat-chip-listbox>
                        <mat-chip 
                          [style.background]="getPrizeColor(outcome.prize)" 
                          [style.color]="'white'"
                          class="prize-chip">
                          {{outcome.prize}}
                        </mat-chip>
                      </mat-chip-listbox>
                    </td>
                  </ng-container>

                  <!-- Date Column -->
                  <ng-container matColumnDef="date">
                    <th mat-header-cell *matHeaderCellDef> Date </th>
                    <td mat-cell *matCellDef="let outcome"> 
                      <div class="date-cell">
                        <mat-icon class="cell-icon">calendar_today</mat-icon>
                        {{outcome.date | date: 'mediumDate'}}
                      </div>
                    </td>
                  </ng-container>

                  <tr mat-header-row *matHeaderRowDef="gameColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: gameColumns;"></tr>
                </table>
                <div class="empty-state" *ngIf="gameOutcomes.length === 0">
                  <mat-icon>casino</mat-icon>
                  <p>No game outcomes yet</p>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </mat-tab>
      </mat-tab-group>

      <!-- Export Data Button -->
      <div class="export-section">
        <button mat-raised-button color="accent" (click)="exportData()" class="export-btn">
          <mat-icon>file_download</mat-icon>
          Export Data
        </button>
      </div>
    </div>
  </div>
  `,
  
  styles: [`
  .dashboard-container {
    min-height: 100vh;
    background-color: #f5f5f5;
  }
  
  .toolbar {
    background: linear-gradient(135deg, #3f51b5 0%, #303f9f 100%);
    color: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    margin-bottom: 24px;
  }
  
  .toolbar-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 24px;
  }
  
  .header-info h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 500;
  }
  
  .header-info p {
    margin: 0;
    opacity: 0.9;
    font-size: 14px;
  }
  
  .header-actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .refresh-btn {
    color: white;
    border-color: rgba(255, 255, 255, 0.5);
  }
  
  .user-menu {
    color: white;
  }
  
  .dashboard-content {
    padding: 0 24px 24px;
    max-width: 1600px;
    margin: 0 auto;
    width: 100%;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }
  
  .stat-card {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    border-radius: 12px;
  }
  
  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
  
  .stat-content {
    display: flex;
    align-items: center;
    padding: 16px;
  }
  
  .stat-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;
  }
  
  .stat-icon.pending {
    background-color: #ff9800;
    color: white;
  }
  
  .stat-icon.outcomes {
    background-color: #9c27b0;
    color: white;
  }
  
  .stat-icon.prizes {
    background-color: #4caf50;
    color: white;
  }
  
  .stat-icon.rating {
    background-color: #ffc107;
    color: white;
  }
  
  .stat-info h3 {
    margin: 0;
    font-size: 28px;
    font-weight: 600;
  }
  
  .stat-info p {
    margin: 4px 0 0;
    color: #757575;
    font-size: 14px;
  }
  
  .stat-trend {
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-top: 4px;
    gap: 4px;
  }
  
  .stat-trend.positive {
    color: #4caf50;
  }
  
  .stat-trend.negative {
    color: #f44336;
  }
  
  .analytics-card {
    margin-bottom: 24px;
    border-radius: 12px;
  }
  
  .analytics-card mat-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .date-filter {
    display: flex;
    gap: 12px;
  }
  
  .date-field {
    width: 150px;
  }
  
  .analytics-content {
    padding: 8px 0;
  }
  
  .chart-row {
    display: flex;
    gap: 24px;
    margin-bottom: 24px;
  }
  
  .chart-container, .stats-container {
    flex: 1;
    background: #fafafa;
    border-radius: 8px;
    padding: 16px;
  }
  
  .chart-container h3, .stats-container h3 {
    margin: 0 0 16px 0;
    color: #424242;
    font-size: 16px;
    font-weight: 500;
  }
  
  .chart {
    height: 250px;
  }
  
  .stats-grid-mini {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 24px;
  }
  
  .stat-mini {
    text-align: center;
    padding: 12px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  
  .stat-value {
    font-size: 20px;
    font-weight: 600;
    color: #3f51b5;
  }
  
  .stat-label {
    font-size: 12px;
    color: #757575;
    margin-top: 4px;
  }
  
  .approval-rate {
    background: white;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  
  .approval-rate h4 {
    margin: 0 0 8px 0;
    font-size: 14px;
    color: #424242;
  }
  
  .approval-bar {
    height: 8px;
    border-radius: 4px;
    margin-bottom: 8px;
  }
  
  .approval-percent {
    font-size: 14px;
    font-weight: 500;
    color: #4caf50;
  }
  
  .analytics-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    color: #9e9e9e;
  }
  
  .analytics-loading p {
    margin-top: 16px;
  }
  
  .content-tabs {
    margin-bottom: 24px;
  }
  
  .dashboard-card {
    border-radius: 12px;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
    margin-top: 16px;
  }
  
  .dashboard-card:hover {
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }
  
  mat-card-header {
    padding: 16px 16px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  mat-card-title {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 500;
    margin: 0;
  }
  
  .card-icon {
    margin-right: 8px;
    color: #3f51b5;
  }
  
  mat-card-content {
    padding: 16px;
  }
  
  .table-container {
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    min-height: 200px;
  }
  
  .table-container.empty {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fafafa;
    border: 1px dashed #ddd;
  }
  
  .empty-state {
    text-align: center;
    padding: 40px 20px;
    color: #9e9e9e;
  }
  
  .empty-state mat-icon {
    font-size: 48px;
    width: 48px;
    height: 48px;
    margin-bottom: 16px;
  }
  
  table {
    width: 100%;
    background: white;
  }
  
  th.mat-header-cell {
    font-weight: 600;
    background-color: #f5f5f5;
    font-size: 14px;
    color: #424242;
    padding: 16px;
  }
  
  td.mat-cell {
    padding: 16px;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .actions-header {
    text-align: center;
  }
  
  .actions-cell {
    text-align: center;
  }
  
  .action-buttons {
    display: flex;
    gap: 8px;
    justify-content: center;
  }
  
  .action-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
  }
  
  .phone-cell, .date-cell {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .cell-icon {
    font-size: 18px;
    width: 18px;
    height: 18px;
    color: #757575;
  }
  
  .rating-cell {
    display: flex;
    align-items: center;
  }
  
  .star-rating {
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 500;
  }
  
  .star-rating mat-icon {
    color: #ffc107;
    font-size: 18px;
    width: 18px;
    height: 18px;
  }
  
  .comment-cell {
    line-height: 1.4;
    max-width: 250px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .expand-comment {
    width: 24px;
    height: 24px;
    line-height: 24px;
  }
  
  .expand-comment mat-icon {
    font-size: 16px;
    width: 16px;
    height: 16px;
  }
  
  .prize-chip {
    font-weight: 500;
  }
  
  .export-section {
    display: flex;
    justify-content: flex-end;
  }
  
  .export-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 20px;
    height: 44px;
    font-weight: 500;
  }

  @media (max-width: 1024px) {
    .chart-row {
      flex-direction: column;
    }
    
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 768px) {
    .dashboard-content {
      padding: 0 16px 16px;
    }
    
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .header-actions {
      flex-direction: column;
      gap: 8px;
    }
    
    .action-buttons {
      flex-direction: column;
    }
  }
  `]
})
export class AdminDashboard implements OnInit {
  pendingReviews: Review[] = [];
  gameOutcomes: GameOutcome[] = [];
  analytics: Analytics | null = null;
  reviewsChart: Chart | null = null;
  ratingsChart: Chart | null = null;
  prizesChart: Chart | null = null;
  
  reviewsTrend = 0;
  gamesTrend = 0;
  prizesTrend = 0;
  ratingTrend = 0;
  
  selectedRange = '7';
  
  reviewColumns: string[] = ['phone', 'rating', 'comment', 'date', 'actions'];
  gameColumns: string[] = ['phone', 'prize', 'date'];

  constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadPendingReviews();
    this.loadGameOutcomes();
    this.loadAnalytics();
  }

  loadPendingReviews() {
    this.adminService.getPendingReviews().subscribe({
      next: (reviews) => this.pendingReviews = reviews,
      error: (err) => console.error(err)
    });
  }

  loadGameOutcomes() {
    this.adminService.getGameResults().subscribe({
      next: (outcomes) => {
        this.gameOutcomes = outcomes.map(outcome => ({
          ...outcome,
          date: outcome.date || new Date().toISOString().split('T')[0]
        }));
      },
      error: (err) => console.error(err)
    });
  }

  loadAnalytics() {
    this.adminService.getAnalytics(parseInt(this.selectedRange)).subscribe({
      next: (analytics) => {
        this.analytics = analytics;
        this.createCharts();
        this.calculateTrends();
      },
      error: (err) => console.error(err)
    });
  }

  createCharts() {
    if (!this.analytics) return;
    
    // Reviews over time chart
    this.reviewsChart = new Chart({
      chart: { type: 'line', height: '250px' },
      title: { text: '' },
      xAxis: { 
        categories: this.analytics.reviewsOverTime.map(item => 
          new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        ) 
      },
      yAxis: { title: { text: 'Number of Reviews' } },
      series: [{
        name: 'Reviews',
        type: 'line',
        data: this.analytics.reviewsOverTime.map(item => item.count),
        color: '#3f51b5'
      }],
      credits: { enabled: false },
      legend: { enabled: false }
    } as any);

    // Ratings distribution chart
    this.ratingsChart = new Chart({
      chart: { type: 'column', height: '250px' },
      title: { text: '' },
      xAxis: { 
        categories: this.analytics.ratingsDistribution.map(item => `${item.rating} Stars`),
        title: { text: 'Rating' }
      },
      yAxis: { title: { text: 'Count' } },
      series: [{
        name: 'Reviews',
        type: 'column',
        data: this.analytics.ratingsDistribution.map(item => item.count),
        color: '#ffc107'
      }],
      credits: { enabled: false },
      legend: { enabled: false }
    } as any);

    // Prize distribution chart
    this.prizesChart = new Chart({
      chart: { type: 'pie', height: '250px' },
      title: { text: '' },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Prizes',
        type: 'pie',
        data: this.analytics.prizeDistribution.map(item => ({
          name: item.prize,
          y: item.count,
          color: this.getPrizeColor(item.prize)
        }))
      }],
      credits: { enabled: false }
    } as any);
  }

  calculateTrends() {
    // These would normally come from the backend API with historical data
    // For demo purposes, we're generating random trends
    this.reviewsTrend = Math.floor(Math.random() * 41) - 20; // -20% to +20%
    this.gamesTrend = Math.floor(Math.random() * 41) - 20;
    this.prizesTrend = Math.floor(Math.random() * 41) - 20;
    this.ratingTrend = parseFloat((Math.random() * 2 - 1).toFixed(1)); // -1.0 to +1.0
  }

  updateAnalytics() {
    this.loadAnalytics();
  }

  refreshAllData() {
    this.loadPendingReviews();
    this.loadGameOutcomes();
    this.loadAnalytics();
    this.snackBar.open('Data refreshed successfully', 'Dismiss', { duration: 2000 });
  }

  getPrizeCount(): number {
    return this.gameOutcomes.filter(outcome => outcome.prize !== 'No Prize').length;
  }

  getPrizeColor(prize: string): string {
    const colorMap: {[key: string]: string} = {
      'Free Coffee': '#6d4c41',
      'Discount Coupon': '#ff5722',
      'Gift Card': '#9c27b0',
      'Free Dessert': '#e91e63',
      'No Prize': '#9e9e9e'
    };
    return colorMap[prize] || '#3f51b5';
  }

  approveReview(review: Review) {
    this.adminService.approveReview(review.phone).subscribe({
      next: () => {
        this.snackBar.open('Review approved successfully', 'Dismiss', { duration: 3000 });
        this.loadPendingReviews();
        this.loadAnalytics(); // Refresh analytics after action
      },
      error: (err) => console.error(err)
    });
  }

  rejectReview(review: Review) {
    this.adminService.rejectReview(review.phone).subscribe({
      next: () => {
        this.snackBar.open('Review rejected', 'Dismiss', { duration: 3000 });
        this.loadPendingReviews();
        this.loadAnalytics(); // Refresh analytics after action
      },
      error: (err) => console.error(err)
    });
  }

  showFullComment(comment: string) {
    this.dialog.open(CommentDialog, {
      data: { comment },
      width: '500px'
    });
  }

  exportData() {
    this.adminService.exportData().subscribe({
      next: (blob: Blob) => {
        const fileUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'exported-data.xlsx';
        link.click();
        URL.revokeObjectURL(fileUrl);
        this.snackBar.open('Data exported successfully', 'Dismiss', { duration: 3000 });
      },
      error: (err) => console.error('Export failed:', err)
    });
  }
}

// Dialog component for showing full comment
@Component({
  selector: 'comment-dialog',
  template: `
    <h2 mat-dialog-title>Full Comment</h2>
    <mat-dialog-content>
      <p>{{ data.comment }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class CommentDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { comment: string }) {}
}*/

// 12-09-2025
// This is a final source file of Admin Dashbord with servies
/*
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { Pipe, PipeTransform } from '@angular/core';

// chart.js + ng2-charts
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
//import { AdminService } from '../../services/admin.service';
import { AdminService } from '../../services/admin';

export interface Review {
  phone: string;
  rating: number;
  comment: string;
  status: string;
}

export interface GameOutcome {
  phone: string;
  prize: string;
  date: string;
}

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 50, completeWords: boolean = false, ellipsis: string = '...'): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    if (completeWords) limit = value.substr(0, limit).lastIndexOf(' ');
    return `${value.substr(0, limit)}${ellipsis}`;
  }
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    MatMenuModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    TruncatePipe,
    BaseChartDirective
  ],
  template: `
  <div class="dashboard-container">
    <!-- Header -->
    <mat-toolbar class="toolbar">
      <div class="toolbar-left">
        <mat-icon class="brand-icon">dashboard</mat-icon>
        <span class="brand-title">Admin Dashboard</span>
      </div>
      <div class="toolbar-right">
        <button mat-icon-button [matMenuTriggerFor]="menu" matTooltip="Account Menu">
          <mat-icon>account_circle</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item>
            <mat-icon>settings</mat-icon>
            <span>Settings</span>
          </button>
          <button mat-menu-item>
            <mat-icon>exit_to_app</mat-icon>
            <span>Logout</span>
          </button>
        </mat-menu>
      </div>
    </mat-toolbar>

    <!-- Content Area -->
    <div class="dashboard-content">

      <!-- Quick Stats -->
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon pending">
                <mat-icon>rate_review</mat-icon>
              </div>
              <div class="stat-info">
                <h3>{{pendingReviewsData.data.length}}</h3>
                <p>Pending Reviews</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon outcomes">
                <mat-icon>casino</mat-icon>
              </div>
              <div class="stat-info">
                <h3>{{gameOutcomesData.data.length}}</h3>
                <p>Total Games</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon prizes">
                <mat-icon>card_giftcard</mat-icon>
              </div>
              <div class="stat-info">
                <h3>{{getPrizeCount()}}</h3>
                <p>Prizes Awarded</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon rating">
                <mat-icon>star</mat-icon>
              </div>
              <div class="stat-info">
                <h3>{{getAverageRating()}}</h3>
                <p>Avg. Rating</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Top Analytics Section -->
      <div class="analytics-grid">
        <mat-card class="analytics-card">
          <mat-card-header>
            <mat-card-title>Ratings Distribution</mat-card-title>
            <button mat-icon-button matTooltip="Distribution of customer ratings">
              <mat-icon>info</mat-icon>
            </button>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-container">
              <canvas baseChart
                [data]="ratingsChartData"
                [options]="barChartOptions"
                [type]="'bar'">
              </canvas>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="analytics-card">
          <mat-card-header>
            <mat-card-title>Prize Distribution</mat-card-title>
            <button mat-icon-button matTooltip="Breakdown of prizes awarded">
              <mat-icon>info</mat-icon>
            </button>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-container">
              <canvas baseChart
                [data]="prizeChartData"
                [options]="pieChartOptions"
                [type]="'pie'">
              </canvas>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Tables Section -->
      <div class="tables-grid">
        <mat-card class="table-card">
          <mat-card-header>
            <mat-card-title>Pending Reviews</mat-card-title>
            <span class="spacer"></span>
            <button mat-icon-button (click)="refreshReviews()" matTooltip="Refresh reviews">
              <mat-icon>refresh</mat-icon>
            </button>
          </mat-card-header>
          <mat-card-content>
            <div class="table-container">
              <table mat-table [dataSource]="pendingReviewsData" class="mat-elevation-z1 full-table" matSort>

                <ng-container matColumnDef="phone">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Phone </th>
                  <td mat-cell *matCellDef="let review"> {{review.phone}} </td>
                </ng-container>

                <ng-container matColumnDef="rating">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Rating </th>
                  <td mat-cell *matCellDef="let review"> 
                    <div class="rating-stars">
                      <mat-icon *ngFor="let star of getStars(review.rating)">{{star}}</mat-icon>
                    </div>
                  </td>
                </ng-container>

                <ng-container matColumnDef="comment">
                  <th mat-header-cell *matHeaderCellDef> Comment </th>
                  <td mat-cell *matCellDef="let review"> 
                    <span [matTooltip]="review.comment">{{review.comment | truncate:30}}</span>
                  </td>
                </ng-container>

                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef> Actions </th>
                  <td mat-cell *matCellDef="let review">
                    <button mat-icon-button color="primary" (click)="approveReview(review)" matTooltip="Approve review">
                      <mat-icon>check_circle</mat-icon>
                    </button>
                    <button mat-icon-button color="warn" (click)="rejectReview(review)" matTooltip="Reject review">
                      <mat-icon>cancel</mat-icon>
                    </button>
                    <button mat-icon-button color="accent" (click)="viewDetails(review)" matTooltip="View details">
                      <mat-icon>visibility</mat-icon>
                    </button>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="reviewColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: reviewColumns;"></tr>
              </table>
            </div>
            <mat-paginator #reviewsPaginator [pageSize]="5" [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
            

          </mat-card-content>
        </mat-card>

        <mat-card class="table-card">
          <mat-card-header>
            <mat-card-title>Game Outcomes</mat-card-title>
            <span class="spacer"></span>
            <button mat-icon-button (click)="refreshOutcomes()" matTooltip="Refresh outcomes">
              <mat-icon>refresh</mat-icon>
            </button>
          </mat-card-header>
          <mat-card-content>
            <div class="table-container">
              <table mat-table [dataSource]="gameOutcomesData" class="mat-elevation-z1 full-table" matSort>

                <ng-container matColumnDef="phone">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Phone </th>
                  <td mat-cell *matCellDef="let outcome"> {{outcome.phone}} </td>
                </ng-container>

                <ng-container matColumnDef="prize">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Prize </th>
                  <td mat-cell *matCellDef="let outcome">
                    <mat-chip [style.backgroundColor]="getPrizeColor(outcome.prize)" selected class="prize-chip">
                      <mat-icon class="chip-icon">{{getPrizeIcon(outcome.prize)}}</mat-icon>
                      {{outcome.prize}}
                    </mat-chip>
                  </td>
                </ng-container>

                <ng-container matColumnDef="date">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Date </th>
                  <td mat-cell *matCellDef="let outcome"> {{outcome.date | date:'mediumDate'}} </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="gameColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: gameColumns;"></tr>
              </table>
            </div>
            <!-- Game Outcomes Table -->
<mat-paginator #outcomesPaginator [pageSize]="5" [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons>
</mat-paginator>
  </mat-card-content>
        </mat-card>
      </div>

      <!-- Export Button -->
      <div class="export-section">
        <button mat-raised-button color="accent" (click)="exportData()" class="export-btn">
          <mat-icon>file_download</mat-icon>
          Export Data
        </button>
      </div>
    </div>
  </div>
  `,
  styles: [`
  .dashboard-container { 
    display: flex; 
    flex-direction: column; 
    height: 100vh; 
    background: #f5f7fa; 
    font-family: 'Roboto', sans-serif;
  }
  
  .toolbar { 
    display: flex; 
    justify-content: space-between; 
    background: linear-gradient(135deg, #3f51b5 0%, #303f9f 100%); 
    color: #fff; 
    padding: 0 24px; 
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .toolbar-left { 
    display: flex; 
    align-items: center; 
  }
  
  .brand-icon { 
    margin-right: 12px; 
    font-size: 28px;
    width: 28px;
    height: 28px;
  }
  
  .brand-title { 
    font-size: 20px; 
    font-weight: 500; 
    letter-spacing: 0.5px;
  }
  
  .toolbar-right { 
    display: flex; 
    align-items: center; 
  }
  
  .dashboard-content { 
    flex: 1; 
    overflow-y: auto; 
    padding: 24px; 
    max-width: 1800px; 
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
  }
  
  .stats-grid { 
    display: grid; 
    grid-template-columns: repeat(4, 1fr); 
    gap: 24px; 
    margin-bottom: 30px; 
  }
  
  .stat-card { 
    border-radius: 12px; 
    text-align: center; 
    padding: 16px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
  
  .stat-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.12);
  }
  
  .stat-content { 
    display: flex; 
    align-items: center; 
    justify-content: flex-start; 
    gap: 16px; 
  }
  
  .stat-icon { 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    border-radius: 12px; 
    width: 60px; 
    height: 60px; 
    color: #fff;
    font-size: 28px;
  }
  
  .stat-icon.pending { background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%); }
  .stat-icon.outcomes { background: linear-gradient(135deg, #3f51b5 0%, #303f9f 100%); }
  .stat-icon.prizes { background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%); }
  .stat-icon.rating { background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%); }
  
  .stat-info h3 { 
    margin: 0; 
    font-size: 28px; 
    font-weight: 700; 
    text-align: left;
  }
  
  .stat-info p { 
    margin: 4px 0 0; 
    font-size: 14px; 
    color: #666; 
    text-align: left;
  }
  
  .analytics-grid { 
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    gap: 24px; 
    margin-bottom: 30px; 
  }
  
  .analytics-card {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
  
  .analytics-card mat-card-header {
    padding: 16px 16px 0;
    display: flex;
    align-items: center;
  }
  
  .analytics-card mat-card-title {
    font-size: 18px;
    font-weight: 500;
  }
  
  .chart-container {
    height: 300px;
    padding: 16px;
    position: relative;
  }
  
  .tables-grid { 
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    gap: 24px; 
    margin-bottom: 30px; 
  }
  
  .table-card {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
  
  .table-card mat-card-header {
    padding: 16px 16px 0;
    display: flex;
    align-items: center;
  }
  
  .table-card mat-card-title {
    font-size: 18px;
    font-weight: 500;
  }
  
  .spacer {
    flex: 1 1 auto;
  }
  
  .table-container {
    overflow-x: auto;
    max-height: 400px;
  }
  
  .full-table {
    width: 100%;
  }
  
  .rating-stars {
    display: flex;
    color: #ffc107;
  }
  
  .prize-chip {
    display: flex;
    align-items: center;
    color: white;
    font-weight: 500;
    padding: 4px 12px;
  }
  
  .chip-icon {
    margin-right: 6px;
    font-size: 16px;
    width: 16px;
    height: 16px;
  }
  
  .export-section { 
    text-align: right; 
    padding: 16px 0;
  }
  
  .export-btn { 
    border-radius: 8px; 
    font-weight: 500;
    padding: 8px 24px;
    font-size: 16px;
  }
  
  /* Responsive adjustments 
  @media (max-width: 1400px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .analytics-grid,
    .tables-grid {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
    
    .dashboard-content {
      padding: 16px;
    }
  }
`]
})
export class AdminDashboard implements OnInit, AfterViewInit {
  pendingReviewsData = new MatTableDataSource<Review>();
  gameOutcomesData = new MatTableDataSource<GameOutcome>();

  reviewColumns: string[] = ['phone', 'rating', 'comment', 'actions'];
  gameColumns: string[] = ['phone', 'prize', 'date'];

  @ViewChild('reviewsPaginator') reviewsPaginator!: MatPaginator;
  @ViewChild('outcomesPaginator') outcomesPaginator!: MatPaginator;

  ratingsChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['1★', '2★', '3★', '4★', '5★'],
    datasets: [{
      label: 'Number of Ratings',
      data: [0, 0, 0, 0, 0],
      backgroundColor: ['#f44336', '#ff9800', '#ffeb3b', '#8bc34a', '#4caf50'],
      borderColor: ['#d32f2f', '#f57c00', '#fbc02d', '#689f38', '#388e3c'],
      borderWidth: 1
    }]
  };

  prizeChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Free Coffee', 'Discount Coupon', 'Gift Card', 'Free Dessert', 'No Prize'],
    datasets: [{
      data: [0, 0, 0, 0, 0],
      backgroundColor: ['#6d4c41', '#ff5722', '#9c27b0', '#e91e63', '#9e9e9e'],
      borderColor: '#fff',
      borderWidth: 2,
      hoverOffset: 8
    }]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false, position: 'bottom' } },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
  };

  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } }
  };

  constructor(private snackBar: MatSnackBar, private adminService: AdminService) {}

  ngOnInit() {
    this.loadReviews();
    this.loadOutcomes();
  }

  ngAfterViewInit() {
    this.pendingReviewsData.paginator = this.reviewsPaginator;
    this.gameOutcomesData.paginator = this.outcomesPaginator;
  }

  loadReviews() {
    this.adminService.getPendingReviews().subscribe({
      next: (reviews) => {
        this.pendingReviewsData.data = reviews;
        this.updateCharts();
      },
      error: () => this.snackBar.open('Failed to load reviews', 'Close', { duration: 3000 })
    });
  }

  loadOutcomes() {
    this.adminService.getGameResults().subscribe({
      next: (outcomes) => {
        this.gameOutcomesData.data = outcomes;
        this.updateCharts();
      },
      error: () => this.snackBar.open('Failed to load outcomes', 'Close', { duration: 3000 })
    });
  }

  updateCharts() {
    const ratingCounts = [0, 0, 0, 0, 0];
    this.pendingReviewsData.data.forEach(r => ratingCounts[r.rating - 1]++);
    this.ratingsChartData.datasets[0].data = ratingCounts;

    const prizeCounts: { [key: string]: number } = {
      'Free Coffee': 0, 'Discount Coupon': 0, 'Gift Card': 0, 'Free Dessert': 0, 'No Prize': 0
    };
    this.gameOutcomesData.data.forEach(o => prizeCounts[o.prize]++);
    this.prizeChartData.datasets[0].data = Object.values(prizeCounts);
  }

  getPrizeCount(): number {
    return this.gameOutcomesData.data.filter(outcome => outcome.prize !== 'No Prize').length;
  }

  getAverageRating(): string {
    if (this.pendingReviewsData.data.length === 0) return '0.0';
    const total = this.pendingReviewsData.data.reduce((sum, review) => sum + review.rating, 0);
    return (total / this.pendingReviewsData.data.length).toFixed(1);
  }

  getStars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) => (i < rating ? 'star' : 'star_border'));
  }

  getPrizeColor(prize: string): string {
    const colorMap: { [key: string]: string } = {
      'Free Coffee': '#6d4c41', 'Discount Coupon': '#ff5722',
      'Gift Card': '#9c27b0', 'Free Dessert': '#e91e63', 'No Prize': '#9e9e9e'
    };
    return colorMap[prize] || '#3f51b5';
  }

  getPrizeIcon(prize: string): string {
    const iconMap: { [key: string]: string } = {
      'Free Coffee': 'local_cafe',
      'Discount Coupon': 'confirmation_number',
      'Gift Card': 'card_giftcard',
      'Free Dessert': 'cake',
      'No Prize': 'block'
    };
    return iconMap[prize] || 'card_giftcard';
  }

  approveReview(review: Review) {
    this.adminService.approveReview(review.phone).subscribe({
      next: () => {
        this.pendingReviewsData.data = this.pendingReviewsData.data.filter(r => r !== review);
        this.updateCharts();
        this.snackBar.open('Review approved successfully', 'Close', { duration: 3000 });
      },
      error: () => this.snackBar.open('Failed to approve review', 'Close', { duration: 3000 })
    });
  }

  rejectReview(review: Review) {
    this.adminService.rejectReview(review.phone).subscribe({
      next: () => {
        this.pendingReviewsData.data = this.pendingReviewsData.data.filter(r => r !== review);
        this.updateCharts();
        this.snackBar.open('Review rejected', 'Close', { duration: 3000 });
      },
      error: () => this.snackBar.open('Failed to reject review', 'Close', { duration: 3000 })
    });
  }

  viewDetails(review: Review) {
    alert(`Review Details:\nPhone: ${review.phone}\nRating: ${review.rating}\nComment: ${review.comment}`);
  }

  refreshReviews() {
    this.loadReviews();
    this.snackBar.open('Reviews refreshed', 'Close', { duration: 2000 });
  }

  refreshOutcomes() {
    this.loadOutcomes();
    this.snackBar.open('Game outcomes refreshed', 'Close', { duration: 2000 });
  }

  exportData() {
    this.adminService.exportData().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'exported-data.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
        this.snackBar.open('Data exported successfully', 'Close', { duration: 3000 });
      },
      error: () => this.snackBar.open('Failed to export data', 'Close', { duration: 3000 })
    });
  }
}
*/
/*
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { Pipe, PipeTransform } from '@angular/core';

// chart.js + ng2-charts
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

// ✅ Import AdminService
import { AdminService } from '../../services/admin';

export interface Review {
  id: number;   // ✅ added for backend approve/reject
  phone: string;
  rating: number;
  comment: string;
  status: string;
}

export interface GameOutcome {
  phone: string;
  prize: string;
  date: string;
}

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 50, completeWords: boolean = false, ellipsis: string = '...'): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    if (completeWords) limit = value.substr(0, limit).lastIndexOf(' ');
    return `${value.substr(0, limit)}${ellipsis}`;
  }
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    MatMenuModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    TruncatePipe,
    BaseChartDirective
  ],
  template: `
  <div class="dashboard-container">
    <!-- Header -->
    <mat-toolbar class="toolbar">
      <div class="toolbar-left">
        <mat-icon class="brand-icon">dashboard</mat-icon>
        <span class="brand-title">Admin Dashboard</span>
      </div>
      <div class="toolbar-right">
        <button mat-icon-button [matMenuTriggerFor]="menu" matTooltip="Account Menu">
          <mat-icon>account_circle</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item>
            <mat-icon>settings</mat-icon>
            <span>Settings</span>
          </button>
          <button mat-menu-item>
            <mat-icon>exit_to_app</mat-icon>
            <span>Logout</span>
          </button>
        </mat-menu>
      </div>
    </mat-toolbar>

    <!-- Content Area -->
    <div class="dashboard-content">

      <!-- Quick Stats -->
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon pending">
                <mat-icon>rate_review</mat-icon>
              </div>
              <div class="stat-info">
                <h3>{{pendingReviewsData.data.length}}</h3>
                <p>Pending Reviews</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon outcomes">
                <mat-icon>casino</mat-icon>
              </div>
              <div class="stat-info">
                <h3>{{gameOutcomesData.data.length}}</h3>
                <p>Total Games</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon prizes">
                <mat-icon>card_giftcard</mat-icon>
              </div>
              <div class="stat-info">
                <h3>{{getPrizeCount()}}</h3>
                <p>Prizes Awarded</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon rating">
                <mat-icon>star</mat-icon>
              </div>
              <div class="stat-info">
                <h3>{{getAverageRating()}}</h3>
                <p>Avg. Rating</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Top Analytics Section -->
      <div class="analytics-grid">
        <mat-card class="analytics-card">
          <mat-card-header>
            <mat-card-title>Ratings Distribution</mat-card-title>
            <button mat-icon-button matTooltip="Distribution of customer ratings">
              <mat-icon>info</mat-icon>
            </button>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-container">
              <canvas baseChart
                [data]="ratingsChartData"
                [options]="barChartOptions"
                [type]="'bar'">
              </canvas>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="analytics-card">
          <mat-card-header>
            <mat-card-title>Prize Distribution</mat-card-title>
            <button mat-icon-button matTooltip="Breakdown of prizes awarded">
              <mat-icon>info</mat-icon>
            </button>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-container">
              <canvas baseChart
                [data]="prizeChartData"
                [options]="pieChartOptions"
                [type]="'pie'">
              </canvas>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Tables Section -->
      <div class="tables-grid">
        <mat-card class="table-card">
          <mat-card-header>
            <mat-card-title>Pending Reviews</mat-card-title>
            <span class="spacer"></span>
            <button mat-icon-button (click)="refreshReviews()" matTooltip="Refresh reviews">
              <mat-icon>refresh</mat-icon>
            </button>
          </mat-card-header>
          <mat-card-content>
            <div class="table-container">
              <table mat-table [dataSource]="pendingReviewsData" class="mat-elevation-z1 full-table" matSort>

                <ng-container matColumnDef="phone">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Phone </th>
                  <td mat-cell *matCellDef="let review"> {{review.phone}} </td>
                </ng-container>

                <ng-container matColumnDef="rating">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Rating </th>
                  <td mat-cell *matCellDef="let review"> 
                    <div class="rating-stars">
                      <mat-icon *ngFor="let star of getStars(review.rating)">{{star}}</mat-icon>
                    </div>
                  </td>
                </ng-container>

                <ng-container matColumnDef="comment">
                  <th mat-header-cell *matHeaderCellDef> Comment </th>
                  <td mat-cell *matCellDef="let review"> 
                    <span [matTooltip]="review.comment">{{review.comment | truncate:30}}</span>
                  </td>
                </ng-container>

                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef> Actions </th>
                  <td mat-cell *matCellDef="let review">
                    <button mat-icon-button color="primary" (click)="approveReview(review)" matTooltip="Approve review">
                      <mat-icon>check_circle</mat-icon>
                    </button>
                    <button mat-icon-button color="warn" (click)="rejectReview(review)" matTooltip="Reject review">
                      <mat-icon>cancel</mat-icon>
                    </button>
                    <button mat-icon-button color="accent" (click)="viewDetails(review)" matTooltip="View details">
                      <mat-icon>visibility</mat-icon>
                    </button>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="reviewColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: reviewColumns;"></tr>
              </table>
            </div>
            <mat-paginator #reviewsPaginator [pageSize]="5" [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
            

          </mat-card-content>
        </mat-card>

        <mat-card class="table-card">
          <mat-card-header>
            <mat-card-title>Game Outcomes</mat-card-title>
            <span class="spacer"></span>
            <button mat-icon-button (click)="refreshOutcomes()" matTooltip="Refresh outcomes">
              <mat-icon>refresh</mat-icon>
            </button>
          </mat-card-header>
          <mat-card-content>
            <div class="table-container">
              <table mat-table [dataSource]="gameOutcomesData" class="mat-elevation-z1 full-table" matSort>

                <ng-container matColumnDef="phone">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Phone </th>
                  <td mat-cell *matCellDef="let outcome"> {{outcome.phone}} </td>
                </ng-container>

                <ng-container matColumnDef="prize">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Prize </th>
                  <td mat-cell *matCellDef="let outcome">
                    <mat-chip [style.backgroundColor]="getPrizeColor(outcome.prize)" selected class="prize-chip">
                      <mat-icon class="chip-icon">{{getPrizeIcon(outcome.prize)}}</mat-icon>
                      {{outcome.prize}}
                    </mat-chip>
                  </td>
                </ng-container>

                <ng-container matColumnDef="date">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Date </th>
                  <td mat-cell *matCellDef="let outcome"> {{outcome.date | date:'mediumDate'}} </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="gameColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: gameColumns;"></tr>
              </table>
            </div>
            <!-- Game Outcomes Table -->
<mat-paginator #outcomesPaginator [pageSize]="5" [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons>
</mat-paginator>
  </mat-card-content>
        </mat-card>
      </div>

      <!-- Export Button -->
      <div class="export-section">
        <button mat-raised-button color="accent" (click)="exportData()" class="export-btn">
          <mat-icon>file_download</mat-icon>
          Export Data
        </button>
      </div>
    </div>
  </div>
  `,
  styles: [`
    .dashboard-container { 
      display: flex; 
      flex-direction: column; 
      height: 100vh; 
      background: #f5f7fa; 
      font-family: 'Roboto', sans-serif;
    }
    
    .toolbar { 
      display: flex; 
      justify-content: space-between; 
      background: linear-gradient(135deg, #3f51b5 0%, #303f9f 100%); 
      color: #fff; 
      padding: 0 24px; 
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .toolbar-left { 
      display: flex; 
      align-items: center; 
    }
    
    .brand-icon { 
      margin-right: 12px; 
      font-size: 28px;
      width: 28px;
      height: 28px;
    }
    
    .brand-title { 
      font-size: 20px; 
      font-weight: 500; 
      letter-spacing: 0.5px;
    }
    
    .toolbar-right { 
      display: flex; 
      align-items: center; 
    }
    
    .dashboard-content { 
      flex: 1; 
      overflow-y: auto; 
      padding: 24px; 
      max-width: 1800px; 
      margin: 0 auto;
      width: 100%;
      box-sizing: border-box;
    }
    
    .stats-grid { 
      display: grid; 
      grid-template-columns: repeat(4, 1fr); 
      gap: 24px; 
      margin-bottom: 30px; 
    }
    
    .stat-card { 
      border-radius: 12px; 
      text-align: center; 
      padding: 16px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    
    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 16px rgba(0,0,0,0.12);
    }
    
    .stat-content { 
      display: flex; 
      align-items: center; 
      justify-content: flex-start; 
      gap: 16px; 
    }
    
    .stat-icon { 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      border-radius: 12px; 
      width: 60px; 
      height: 60px; 
      color: #fff;
      font-size: 28px;
    }
    
    .stat-icon.pending { background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%); }
    .stat-icon.outcomes { background: linear-gradient(135deg, #3f51b5 0%, #303f9f 100%); }
    .stat-icon.prizes { background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%); }
    .stat-icon.rating { background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%); }
    
    .stat-info h3 { 
      margin: 0; 
      font-size: 28px; 
      font-weight: 700; 
      text-align: left;
    }
    
    .stat-info p { 
      margin: 4px 0 0; 
      font-size: 14px; 
      color: #666; 
      text-align: left;
    }
    
    .analytics-grid { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 24px; 
      margin-bottom: 30px; 
    }
    
    .analytics-card {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    
    .analytics-card mat-card-header {
      padding: 16px 16px 0;
      display: flex;
      align-items: center;
    }
    
    .analytics-card mat-card-title {
      font-size: 18px;
      font-weight: 500;
    }
    
    .chart-container {
      height: 300px;
      padding: 16px;
      position: relative;
    }
    
    .tables-grid { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 24px; 
      margin-bottom: 30px; 
    }
    
    .table-card {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    
    .table-card mat-card-header {
      padding: 16px 16px 0;
      display: flex;
      align-items: center;
    }
    
    .table-card mat-card-title {
      font-size: 18px;
      font-weight: 500;
    }
    
    .spacer {
      flex: 1 1 auto;
    }
    
    .table-container {
      overflow-x: auto;
      max-height: 400px;
    }
    
    .full-table {
      width: 100%;
    }
    
    .rating-stars {
      display: flex;
      color: #ffc107;
    }
    
    .prize-chip {
      display: flex;
      align-items: center;
      color: white;
      font-weight: 500;
      padding: 4px 12px;
    }
    
    .chip-icon {
      margin-right: 6px;
      font-size: 16px;
      width: 16px;
      height: 16px;
    }
    
    .export-section { 
      text-align: right; 
      padding: 16px 0;
    }
    
    .export-btn { 
      border-radius: 8px; 
      font-weight: 500;
      padding: 8px 24px;
      font-size: 16px;
    }
    
    
    @media (max-width: 1400px) {
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .analytics-grid,
      .tables-grid {
        grid-template-columns: 1fr;
      }
    }
    
    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .dashboard-content {
        padding: 16px;
      }
    }
  `]})
export class AdminDashboard implements OnInit, AfterViewInit {
  // ✅ Use MatTableDataSource
  pendingReviewsData = new MatTableDataSource<Review>();
  gameOutcomesData = new MatTableDataSource<GameOutcome>();

  reviewColumns: string[] = ['phone', 'rating', 'comment', 'actions'];
  gameColumns: string[] = ['phone', 'prize', 'date'];

  @ViewChild('reviewsPaginator') reviewsPaginator!: MatPaginator;
  @ViewChild('outcomesPaginator') outcomesPaginator!: MatPaginator;

  ratingsChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['1★', '2★', '3★', '4★', '5★'],
    datasets: [{
      label: 'Number of Ratings',
      data: [0, 0, 0, 0, 0],
      backgroundColor: ['#f44336', '#ff9800', '#ffeb3b', '#8bc34a', '#4caf50'],
      borderColor: ['#d32f2f', '#f57c00', '#fbc02d', '#689f38', '#388e3c'],
      borderWidth: 1
    }]
  };

  prizeChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Free Coffee', 'Discount Coupon', 'Gift Card', 'Free Dessert', 'No Prize'],
    datasets: [{
      data: [0, 0, 0, 0, 0],
      backgroundColor: ['#6d4c41', '#ff5722', '#9c27b0', '#e91e63', '#9e9e9e'],
      borderColor: '#fff',
      borderWidth: 2,
      hoverOffset: 8
    }]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
  };

  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } }
  };

  constructor(
    private snackBar: MatSnackBar,
    private adminService: AdminService   // ✅ inject service
  ) {}

  ngOnInit() {
    this.refreshReviews();
    this.refreshOutcomes();
  }

  ngAfterViewInit() {
    this.pendingReviewsData.paginator = this.reviewsPaginator;
    this.gameOutcomesData.paginator = this.outcomesPaginator;
  }

  // ✅ Load pending reviews from backend
  refreshReviews() {
    this.adminService.getPendingReviews().subscribe({
      next: (res) => {
        this.pendingReviewsData.data = res.reviews;
        this.updateCharts();
      },
      error: () => this.snackBar.open('Failed to load reviews', 'Close', { duration: 3000 })
    });
  }

  // ✅ Load game outcomes from backend
  refreshOutcomes() {
    this.adminService.getGameResults().subscribe({
      next: (data) => {
        this.gameOutcomesData.data = data;
        this.updateCharts();
      },
      error: () => this.snackBar.open('Failed to load outcomes', 'Close', { duration: 3000 })
    });
  }

  approveReview(review: Review) {
    this.adminService.approveReview(review.id).subscribe({
      next: () => {
        this.pendingReviewsData.data = this.pendingReviewsData.data.filter(r => r.id !== review.id);
        this.updateCharts();
        this.snackBar.open('Review approved successfully', 'Close', { duration: 3000 });
      },
      error: () => this.snackBar.open('Failed to approve review', 'Close', { duration: 3000 })
    });
  }

  rejectReview(review: Review) {
    this.adminService.rejectReview(review.id).subscribe({
      next: () => {
        this.pendingReviewsData.data = this.pendingReviewsData.data.filter(r => r.id !== review.id);
        this.updateCharts();
        this.snackBar.open('Review rejected', 'Close', { duration: 3000 });
      },
      error: () => this.snackBar.open('Failed to reject review', 'Close', { duration: 3000 })
    });
  }

  exportData() {
    this.adminService.exportData().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'export.csv';
        a.click();
        this.snackBar.open('Data exported successfully', 'Close', { duration: 3000 });
      },
      error: () => this.snackBar.open('Failed to export data', 'Close', { duration: 3000 })
    });
  }

  // ✅ Helpers (same as before)
  updateCharts() {
    const ratingCounts = [0, 0, 0, 0, 0];
    this.pendingReviewsData.data.forEach(r => ratingCounts[r.rating - 1]++);
    this.ratingsChartData.datasets[0].data = ratingCounts;

    const prizeCounts: { [key: string]: number } = {
      'Free Coffee': 0, 'Discount Coupon': 0, 'Gift Card': 0, 'Free Dessert': 0, 'No Prize': 0
    };
    this.gameOutcomesData.data.forEach(o => prizeCounts[o.prize]++);
    this.prizeChartData.datasets[0].data = Object.values(prizeCounts);
  }

  getPrizeCount(): number {
    return this.gameOutcomesData.data.filter(o => o.prize !== 'No Prize').length;
  }

  getAverageRating(): string {
    if (this.pendingReviewsData.data.length === 0) return '0.0';
    const total = this.pendingReviewsData.data.reduce((sum, r) => sum + r.rating, 0);
    return (total / this.pendingReviewsData.data.length).toFixed(1);
  }

  getStars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) => (i < rating ? 'star' : 'star_border'));
  }

  getPrizeColor(prize: string): string {
    const colors: any = {
      'Free Coffee': '#6d4c41',
      'Discount Coupon': '#ff5722',
      'Gift Card': '#9c27b0',
      'Free Dessert': '#e91e63',
      'No Prize': '#9e9e9e'
    };
    return colors[prize] || '#3f51b5';
  }

  getPrizeIcon(prize: string): string {
    const icons: any = {
      'Free Coffee': 'local_cafe',
      'Discount Coupon': 'confirmation_number',
      'Gift Card': 'card_giftcard',
      'Free Dessert': 'cake',
      'No Prize': 'block'
    };
    return icons[prize] || 'card_giftcard';
  }

  viewDetails(review: Review) {
    alert(`Review Details:\nPhone: ${review.phone}\nRating: ${review.rating}\nComment: ${review.comment}`);
  }
}

*/

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { Pipe, PipeTransform } from '@angular/core';

// chart.js + ng2-charts
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

// ✅ Import AdminService
import { AdminService } from '../../services/admin';

export interface Review {
  id: number;   // ✅ added for backend approve/reject
  phone: string;
  rating: number;
  comment: string;
  status: string;
}

export interface GameOutcome {
  phone: string;
  prize: string;
  date: string;
}

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 50, completeWords: boolean = false, ellipsis: string = '...'): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    if (completeWords) limit = value.substr(0, limit).lastIndexOf(' ');
    return `${value.substr(0, limit)}${ellipsis}`;
  }
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    MatMenuModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    TruncatePipe,
    BaseChartDirective
  ],
  template: `
  <div class="dashboard-container">
    <!-- Header -->
    <mat-toolbar class="toolbar">
      <div class="toolbar-left">
        <mat-icon class="brand-icon">dashboard</mat-icon>
        <span class="brand-title">Admin Dashboard</span>
      </div>
      <div class="toolbar-right">
        <button mat-icon-button [matMenuTriggerFor]="menu" matTooltip="Account Menu">
          <mat-icon>account_circle</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item>
            <mat-icon>settings</mat-icon>
            <span>Settings</span>
          </button>
          <button mat-menu-item>
            <mat-icon>exit_to_app</mat-icon>
            <span>Logout</span>
          </button>
        </mat-menu>
      </div>
    </mat-toolbar>

    <!-- Content Area -->
    <div class="dashboard-content">

      <!-- Quick Stats -->
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon pending">
                <mat-icon>rate_review</mat-icon>
              </div>
              <div class="stat-info">
                <h3>{{pendingReviewsData.data.length}}</h3>
                <p>Pending Reviews</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon outcomes">
                <mat-icon>casino</mat-icon>
              </div>
              <div class="stat-info">
                <h3>{{gameOutcomesData.data.length}}</h3>
                <p>Total Games</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon prizes">
                <mat-icon>card_giftcard</mat-icon>
              </div>
              <div class="stat-info">
                <h3>{{getPrizeCount()}}</h3>
                <p>Prizes Awarded</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <div class="stat-icon rating">
                <mat-icon>star</mat-icon>
              </div>
              <div class="stat-info">
                <h3>{{getAverageRating()}}</h3>
                <p>Avg. Rating</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Top Analytics Section -->
      <div class="analytics-grid">
        <mat-card class="analytics-card">
          <mat-card-header>
            <mat-card-title>Ratings Distribution</mat-card-title>
            <button mat-icon-button matTooltip="Distribution of customer ratings">
              <mat-icon>info</mat-icon>
            </button>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-container">
              <canvas baseChart
                [data]="ratingsChartData"
                [options]="barChartOptions"
                [type]="'bar'">
              </canvas>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="analytics-card">
          <mat-card-header>
            <mat-card-title>Prize Distribution</mat-card-title>
            <button mat-icon-button matTooltip="Breakdown of prizes awarded">
              <mat-icon>info</mat-icon>
            </button>
          </mat-card-header>
          <mat-card-content>
            <div class="chart-container">
              <canvas baseChart
                [data]="prizeChartData"
                [options]="pieChartOptions"
                [type]="'pie'">
              </canvas>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Tables Section -->
      <div class="tables-grid">
        <mat-card class="table-card">
          <mat-card-header>
            <mat-card-title>Pending Reviews</mat-card-title>
            <span class="spacer"></span>
            <button mat-icon-button (click)="refreshReviews()" matTooltip="Refresh reviews">
              <mat-icon>refresh</mat-icon>
            </button>
          </mat-card-header>
          <mat-card-content>
            <div class="table-container">
              <table mat-table [dataSource]="pendingReviewsData" class="mat-elevation-z1 full-table" matSort>

                <ng-container matColumnDef="phone">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Phone </th>
                  <td mat-cell *matCellDef="let review"> {{review.phone}} </td>
                </ng-container>

                <ng-container matColumnDef="rating">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Rating </th>
                  <td mat-cell *matCellDef="let review"> 
                    <div class="rating-stars">
                      <mat-icon *ngFor="let star of getStars(review.rating)">{{star}}</mat-icon>
                    </div>
                  </td>
                </ng-container>

                <ng-container matColumnDef="comment">
                  <th mat-header-cell *matHeaderCellDef> Comment </th>
                  <td mat-cell *matCellDef="let review"> 
                    <span [matTooltip]="review.comment">{{review.comment | truncate:30}}</span>
                  </td>
                </ng-container>

                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef> Actions </th>
                  <td mat-cell *matCellDef="let review">
                    <button mat-icon-button color="primary" (click)="approveReview(review)" matTooltip="Approve review">
                      <mat-icon>check_circle</mat-icon>
                    </button>
                    <button mat-icon-button color="warn" (click)="rejectReview(review)" matTooltip="Reject review">
                      <mat-icon>cancel</mat-icon>
                    </button>
                    <button mat-icon-button color="accent" (click)="viewDetails(review)" matTooltip="View details">
                      <mat-icon>visibility</mat-icon>
                    </button>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="reviewColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: reviewColumns;"></tr>
              </table>
            </div>
            <mat-paginator #reviewsPaginator [pageSize]="5" [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons></mat-paginator>
            

          </mat-card-content>
        </mat-card>

        <mat-card class="table-card">
          <mat-card-header>
            <mat-card-title>Game Outcomes</mat-card-title>
            <span class="spacer"></span>
            <button mat-icon-button (click)="refreshOutcomes()" matTooltip="Refresh outcomes">
              <mat-icon>refresh</mat-icon>
            </button>
          </mat-card-header>
          <mat-card-content>
            <div class="table-container">
              <table mat-table [dataSource]="gameOutcomesData" class="mat-elevation-z1 full-table" matSort>

                <ng-container matColumnDef="phone">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Phone </th>
                  <td mat-cell *matCellDef="let outcome"> {{outcome.phone}} </td>
                </ng-container>

                <ng-container matColumnDef="prize">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Prize </th>
                  <td mat-cell *matCellDef="let outcome">
                    <mat-chip [style.backgroundColor]="getPrizeColor(outcome.prize)" selected class="prize-chip">
                      <mat-icon class="chip-icon">{{getPrizeIcon(outcome.prize)}}</mat-icon>
                      {{outcome.prize}}
                    </mat-chip>
                  </td>
                </ng-container>

                <ng-container matColumnDef="date">
                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Date </th>
                  <td mat-cell *matCellDef="let outcome"> {{outcome.date | date:'mediumDate'}} </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="gameColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: gameColumns;"></tr>
              </table>
            </div>
            <!-- Game Outcomes Table -->
<mat-paginator #outcomesPaginator [pageSize]="5" [pageSizeOptions]="[5, 10, 20]" showFirstLastButtons>
</mat-paginator>
  </mat-card-content>
        </mat-card>
      </div>

      <!-- Export Button -->
      <div class="export-section">
        <button mat-raised-button color="accent" (click)="exportData()" class="export-btn">
          <mat-icon>file_download</mat-icon>
          Export Data
        </button>
      </div>
    </div>
  </div>
  `,
  styles: [`
    html, body {
      height: 100%;
      margin: 0;
      padding: 0;
    }

    .dashboard-container { 
      display: flex; 
      flex-direction: column; 
      min-height: 100vh;   /* ✅ updated */
      background: #f5f7fa; 
      font-family: 'Roboto', sans-serif;
      
    }
    
    .toolbar { 
      display: flex; 
      justify-content: space-between; 
      background: linear-gradient(135deg, #3f51b5 0%, #303f9f 100%); 
      color: #fff; 
      padding: 0 24px; 
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .dashboard-content { 
          /* ✅ grow to fill remaining space */
           /* ✅ scroll if content is long */
      padding: 24px;
      width: 100%;
      
    }
    
    .toolbar-left { 
      display: flex; 
      align-items: center; 
    }
    
    .brand-icon { 
      margin-right: 12px; 
      font-size: 28px;
      width: 28px;
      height: 28px;
    }
    
    .brand-title { 
      font-size: 20px; 
      font-weight: 500; 
      letter-spacing: 0.5px;
    }
    
    .toolbar-right { 
      display: flex; 
      align-items: center; 
    }
    
    
    .stats-grid { 
      display: grid; /*grid-template-columns: repeat(4, 1fr); */
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
 
      gap: 24px; 
      margin-bottom: 30px; 
    }
    
    .stat-card { 
      border-radius: 12px; 
      text-align: center; 
      padding: 16px;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    
    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 16px rgba(0,0,0,0.12);
    }
    
    .stat-content { 
      display: flex; 
      align-items: center; 
      justify-content: flex-start; 
      gap: 16px; 
    }
    
    .stat-icon { 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      border-radius: 12px; 
      width: 60px; 
      height: 60px; 
      color: #fff;
      font-size: 28px;
    }
    
    .stat-icon.pending { background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%); }
    .stat-icon.outcomes { background: linear-gradient(135deg, #3f51b5 0%, #303f9f 100%); }
    .stat-icon.prizes { background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%); }
    .stat-icon.rating { background: linear-gradient(135deg, #f44336 0%, #d32f2f 100%); }
    
    .stat-info h3 { 
      margin: 0; 
      font-size: 28px; 
      font-weight: 700; 
      text-align: left;
    }
    
    .stat-info p { 
      margin: 4px 0 0; 
      font-size: 14px; 
      color: #666; 
      text-align: left;
    }
    
    .analytics-grid { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 24px; 
      margin-bottom: 30px; 
    }
    
    .analytics-card {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    
    .analytics-card mat-card-header {
      padding: 16px 16px 0;
      display: flex;
      align-items: center;
    }
    
    .analytics-card mat-card-title {
      font-size: 18px;
      font-weight: 500;
    }
    
    .chart-container {
      height: 300px;
      padding: 16px;
      position: relative;
    }
    
    .tables-grid { 
      display: grid; 
      grid-template-columns: 1fr 1fr; 
      gap: 24px; 
      margin-bottom: 30px; 
    }
    
    .table-card {
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    
    .table-card mat-card-header {
      padding: 16px 16px 0;
      display: flex;
      align-items: center;
    }
    
    .table-card mat-card-title {
      font-size: 18px;
      font-weight: 500;
    }
    
    .spacer {
      flex: 1 1 auto;
    }
    
    .table-container {
      overflow-x: auto;
      max-height: 400px;
    }
    
    .full-table {
      width: 100%;
    }
    
    .rating-stars {
      display: flex;
      color: #ffc107;
    }
    
    .prize-chip {
      display: flex;
      align-items: center;
      color: white;
      font-weight: 500;
      padding: 4px 12px;
    }
    
    .chip-icon {
      margin-right: 6px;
      font-size: 16px;
      width: 16px;
      height: 16px;
    }
    
    .export-section { 
      text-align: right; 
      padding: 16px 0;
    }
    
    .export-btn { 
      border-radius: 8px; 
      font-weight: 500;
      padding: 8px 24px;
      font-size: 16px;
    }
    
    
    @media (max-width: 1400px) {
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .analytics-grid,
      .tables-grid {
        grid-template-columns: 1fr;
      }
    }
    
    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .dashboard-content {
        /*padding: 16px;*/
        max-width: 1800px;
    margin: 0 auto;
      }
    }
  `]})export class AdminDashboard implements OnInit, AfterViewInit {
  // ✅ Use MatTableDataSource
  pendingReviewsData = new MatTableDataSource<Review>();
  gameOutcomesData = new MatTableDataSource<GameOutcome>();

  reviewColumns: string[] = ['phone', 'rating', 'comment', 'actions'];
  gameColumns: string[] = ['phone', 'prize', 'date'];

  @ViewChild('reviewsPaginator') reviewsPaginator!: MatPaginator;
  @ViewChild('outcomesPaginator') outcomesPaginator!: MatPaginator;

  ratingsChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['1★', '2★', '3★', '4★', '5★'],
    datasets: [{
      label: 'Number of Ratings',
      data: [0, 0, 0, 0, 0],
      backgroundColor: ['#f44336', '#ff9800', '#ffeb3b', '#8bc34a', '#4caf50'],
      borderColor: ['#d32f2f', '#f57c00', '#fbc02d', '#689f38', '#388e3c'],
      borderWidth: 1
    }]
  };

  // ✅ Updated Prize Distribution Labels
  prizeChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [
      'Free 30min Pedicure with Facial',
      'BOGO: Hair Spa | Mani | Pedi',
      'Haircut/Color/Style – ₹1999',
      'Global Hair – ₹3999',
      'Highlights – ₹3999',
      'Men\'s Cut – ₹399',
      'Waxing – 25% OFF'
    ],
    datasets: [{
      data: [0, 0, 0, 0, 0, 0, 0],
      backgroundColor: [
        '#ff9800', // Pedicure
        '#9c27b0', // BOGO
        '#4caf50', // Haircut
        '#2196f3', // Global Hair
        '#e91e63', // Highlights
        '#795548', // Men’s Cut
        '#607d8b'  // Waxing
      ],
      borderColor: '#fff',
      borderWidth: 2,
      hoverOffset: 8
    }]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
  };

  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' } }
  };

  constructor(
    private snackBar: MatSnackBar,
    private adminService: AdminService
  ) {}

  ngOnInit() {
    this.refreshReviews();
    this.refreshOutcomes();
  }

  ngAfterViewInit() {
    this.pendingReviewsData.paginator = this.reviewsPaginator;
    this.gameOutcomesData.paginator = this.outcomesPaginator;
  }

  // ✅ Load pending reviews from backend
  refreshReviews() {
    this.adminService.getPendingReviews().subscribe({
      next: (res) => {
        this.pendingReviewsData.data = res.reviews;
        this.updateCharts();
      },
      error: () => this.snackBar.open('Failed to load reviews', 'Close', { duration: 3000 })
    });
  }

  // ✅ Load game outcomes from backend
  refreshOutcomes() {
    this.adminService.getGameResults().subscribe({
      next: (data) => {
        this.gameOutcomesData.data = data;
        this.updateCharts();
      },
      error: () => this.snackBar.open('Failed to load outcomes', 'Close', { duration: 3000 })
    });
  }

  approveReview(review: Review) {
    this.adminService.approveReview(review.id).subscribe({
      next: () => {
        this.pendingReviewsData.data = this.pendingReviewsData.data.filter(r => r.id !== review.id);
        this.updateCharts();
        this.snackBar.open('Review approved successfully', 'Close', { duration: 3000 });
      },
      error: () => this.snackBar.open('Failed to approve review', 'Close', { duration: 3000 })
    });
  }

  rejectReview(review: Review) {
    this.adminService.rejectReview(review.id).subscribe({
      next: () => {
        this.pendingReviewsData.data = this.pendingReviewsData.data.filter(r => r.id !== review.id);
        this.updateCharts();
        this.snackBar.open('Review rejected', 'Close', { duration: 3000 });
      },
      error: () => this.snackBar.open('Failed to reject review', 'Close', { duration: 3000 })
    });
  }

  exportData() {
    this.adminService.exportData().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'export.csv';
        a.click();
        this.snackBar.open('Data exported successfully', 'Close', { duration: 3000 });
      },
      error: () => this.snackBar.open('Failed to export data', 'Close', { duration: 3000 })
    });
  }

  // ✅ Helpers
  updateCharts() {
    // Ratings distribution
    const ratingCounts = [0, 0, 0, 0, 0];
    this.pendingReviewsData.data.forEach(r => ratingCounts[r.rating - 1]++);
    this.ratingsChartData.datasets[0].data = ratingCounts;

    // Prize distribution
    const prizeCounts: { [key: string]: number } = {
      'Free 30min Pedicure with Facial': 0,
      'BOGO: Hair Spa | Mani | Pedi': 0,
      'Haircut/Color/Style – ₹1999': 0,
      'Global Hair – ₹3999': 0,
      'Highlights – ₹3999': 0,
      'Men\'s Cut – ₹399': 0,
      'Waxing – 25% OFF': 0
    };
    this.gameOutcomesData.data.forEach(o => {
      if (prizeCounts[o.prize] !== undefined) prizeCounts[o.prize]++;
    });
    this.prizeChartData.datasets[0].data = Object.values(prizeCounts);
  }

  getPrizeCount(): number {
    return this.gameOutcomesData.data.length;
  }

  getAverageRating(): string {
    if (this.pendingReviewsData.data.length === 0) return '0.0';
    const total = this.pendingReviewsData.data.reduce((sum, r) => sum + r.rating, 0);
    return (total / this.pendingReviewsData.data.length).toFixed(1);
  }

  getStars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) => (i < rating ? 'star' : 'star_border'));
  }

  getPrizeColor(prize: string): string {
    const colors: any = {
      'Free 30min Pedicure with Facial': '#ff9800',
      'BOGO: Hair Spa | Mani | Pedi': '#9c27b0',
      'Haircut/Color/Style – ₹1999': '#4caf50',
      'Global Hair – ₹2196f3':'#2196f3',
      'Highlights – ₹e91e63':'#e91e63',
      'Men\'s Cut – ₹795548': '#795548',
      'Waxing – 25% OFF': '#607d8b'
    };
    return colors[prize] || '#3f51b5';
  }

  getPrizeIcon(prize: string): string {
    const icons: any = {
      'Free 30min Pedicure with Facial': 'spa',
      'BOGO: Hair Spa | Mani | Pedi': 'content_cut',
      'Haircut/Color/Style – ₹1999': 'face',
      'Global Hair – ₹3999': 'brush',
      'Highlights – ₹3999': 'color_lens',
      'Men\'s Cut – ₹399': 'man',
      'Waxing – 25% OFF': 'bolt'
    };
    return icons[prize] || 'card_giftcard';
  }

  viewDetails(review: Review) {
    alert(`Review Details:\nPhone: ${review.phone}\nRating: ${review.rating}\nComment: ${review.comment}`);
  }
}
