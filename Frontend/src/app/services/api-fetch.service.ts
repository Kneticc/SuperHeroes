import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiFetchService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


  searchHeroByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/${name}`).pipe(
      catchError((err) => {
        console.error('Error occurred:', err);
        return of({ results: [] });
      })
    );
  }

  searchHeroById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

}
