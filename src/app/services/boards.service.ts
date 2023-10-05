import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Boards } from '../models/boards.model';


@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  // private options = { withCredentials: true };
  constructor(private http: HttpClient) { }

  getDataAggregates(): Observable<any[]> {
    var httpUrl = environment.apiUrl + '/api/boards' ; 
    // Replace with your actual API URL
  
    return this.http.get<Boards[]>(httpUrl).pipe(
      map((response: any) => response.aggregates_top)
    );
  }
  
  getBoardDetails(boardname: string ): Observable<any>{
    var httpUrl = `${environment.apiUrl + '/api/board/' + boardname}`;
    return this.http.get<Boards[]>(httpUrl);
  }
  // Add a new method to fetch filtered board details
  getFilteredBoardDetails(boardname: string, element: string, value: string): Observable<Boards> {
    const httpUrl = `${environment.apiUrl}/api/board/${boardname}?element=${element}&value=${value}`;
    return this.http.get<Boards>(httpUrl);
  }

}
