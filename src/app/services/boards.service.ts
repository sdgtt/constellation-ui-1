import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Projectboards } from '../models/projectboards.model';


@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  private options = { withCredentials: true };
  constructor(private http: HttpClient) { }

   getJenkinBoardName(jenkins_pname: string): Observable<Projectboards>{
    var httpUrl = environment.apiUrl + '/api/board/' + jenkins_pname;
    return this.http.get<Projectboards>(httpUrl, this.options);
  }
  getBoards(boardname: string): Observable<Projectboards>{
    var httpUrl = environment.apiUrl + '/api/board/' + boardname;
    return this.http.get<Projectboards>(httpUrl, this.options);
  }

}
