import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,CommonModule,RouterModule],
  template: `
<main class="app-main">
  <router-outlet></router-outlet>
</main>

` ,
  styles:[`
    html, body {
      margin: 0;
      padding: 0;
      font-family: 'Roboto', sans-serif;
      width: 100%;
      height: 100%;
      background: #f6f6f6;
    }
    
    .app-header {
      background: linear-gradient(135deg, #f6d365, #fda085);
      text-align: center;
      padding: 15px 0;
      color: #333;
      font-size: 1.5rem;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
    }
  
    .app-main {
      padding: 20px;
      min-height: calc(100vh - 120px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }
    
    .app-footer {
      background: #e0f7fa;
      text-align: center;
      padding: 15px 0;
      font-size: 0.9rem;
      color: #333;
      box-shadow: 0 -2px 6px rgba(0,0,0,0.05);
      position: relative;
    }
    
  `]
 
})

export class App {
  title = 'Frontend_QR_Project';
}
