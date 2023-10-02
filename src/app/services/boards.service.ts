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
  
  getBootFolder(boardname: string ): Observable<any>{
    var httpUrl = environment.apiUrl + '/api/board/' + boardname;
    return this.http.get<Boards>(httpUrl);
  }
  getAll(jenkinpname: any): Observable<any>{
    var httpUrl = environment.apiUrl + '/api/?jenkins_project_name='+ jenkinpname;
    return this.http.get<Boards>(httpUrl);
  }
  gethw(jenkinpname: any, bootpartition: string): Observable<any>{
    var httpUrl = environment.apiUrl + '/api/?jenkins_project_name='+ jenkinpname + '/?source_adjacency_matrix='+bootpartition;
    return this.http.get<Boards>(httpUrl);
  }
  getBoards(): Observable<any>{
    var httpUrl = environment.apiUrl + '/api/boards';
    return this.http.get<Boards>(httpUrl);
  }

}
