import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
private apiUrl = 'http://localhost:9095';

  constructor(private httpClient: HttpClient) {}

  public createBanner(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/api/create-banner`, data);
  }

  public getAllBanners(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/banners`);
  }


  public updateBanner(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/api/update-banner`, data);
  }

  // public deleteNews(id: number): Observable<any> {
  //   return this.httpClient.delete<any>(`${this.apiUrl}/api/delete-news/${id}`);
  // }
}
