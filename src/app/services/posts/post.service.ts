import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
private apiUrl = 'http://localhost:9095';

  constructor(private httpClient: HttpClient) {}

  public createPost(data: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}/api/posts/create`,
      data
    );
  }

  public getAllPosts(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/posts/all`);
  }

   public getPosts(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/posts/type/Post`);
  }

   public getProjectPosts(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/posts/type/Project`);
  }

  public getEventPosts(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/posts/type/Event`);
  }

  public getTenderPosts(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/posts/type/Tender`);
  }

  public getPublicationPosts(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/posts/type/Publication`);
  }

  public getPostByType(typeId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/post/type/${typeId}`);
  }

 

  public findPostById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/api/posts/${id}`);
  }

  public updatePost(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/api/posts/update`, data);
  }

  public deletePost(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/api/posts/delete/${id}`);
  }
}
