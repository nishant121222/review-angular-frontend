/*import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  //private baseUrl = 'https://miramata.tech/reviewsystem/api/game/';
  private apiUrl = environment.apiUrl + 'game/'; 
  constructor(private http: HttpClient) {}

  // Send prize info to backend & trigger WhatsApp message
  sendPrize(phone: string, prize: string): Observable<any> {
    return this.http.post(this.apiUrl, { phone, prize });
  }

  // Optional: Get all game results for admin
  getGameResults(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/results`);
  }
}
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = environment.apiUrl + 'games/'; 

  constructor(private http: HttpClient) {}

  // Call backend to spin wheel for logged-in user
  spinWheel(): Observable<any> {
    return this.http.post(`${this.apiUrl}spin/`, {}); // POST /game/spin/
  }

  // Optional: redeem a prize by result ID
  redeemPrize(resultId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}redeem/${resultId}/`, {});
  }

  // Optional: get all game results for admin
  getGameResults(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/results`);
  }
}
