import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Boards } from '../models/boards.model';


@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  private options = { withCredentials: true };
  constructor(private http: HttpClient) { }

 
  getBootFolder(boardname: string, ): Observable<any>{
    var httpUrl = environment.apiUrl + '/api/board/' + boardname;
    return this.http.get<Boards>(httpUrl);
  }
  getAll(jenkinpname: any): Observable<any>{
    var httpUrl = environment.apiUrl + '/api/?jenkins_project_name=' + jenkinpname + '&size=50';
    return this.http.get<Boards>(httpUrl);
  }
  getBoards(): Observable<any>{
    var httpUrl = environment.apiUrl + '/api/boards';
    return this.http.get<Boards>(httpUrl);
  }

}
