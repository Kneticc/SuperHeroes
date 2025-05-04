import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiFetchServiceService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


  searchHeroByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/${name}`);
  }

}
