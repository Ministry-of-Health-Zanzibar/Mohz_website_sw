import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  // private apiUrl = environment.baseUrl;
  private apiUrl = 'http://localhost:9095';

  constructor(private httpClient: HttpClient) {}

  public createAnnouncement(data: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}/api/announcements/create`,
      data
    );
  }

  public getAllAnnouncements(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/announcements/all`);
  }

  public findAnnouncementById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/announcements/${id}`);
  }

  public updateAnnouncement(data: any, id: number): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/api/announcements/update/${id}`, data);
  }

  public deleteAnnouncement(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/api/announcements/delete/${id}`);
  }
}
