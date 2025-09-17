import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl = 'https://miramata.tech/reviewsystem/api/game/';

  constructor(private http: HttpClient) {}

  // Send prize info to backend & trigger WhatsApp message
  sendPrize(phone: string, prize: string): Observable<any> {
    return this.http.post(this.baseUrl, { phone, prize });
  }

  // Optional: Get all game results for admin
  getGameResults(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/results`);
  }
}
