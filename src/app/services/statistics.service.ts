import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private apiUrl = `${environment.endpoint}/statistics`;

  constructor(private http: HttpClient) { }

  getStatistics(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}