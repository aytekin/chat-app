import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  private URL = 'https://localhost:44322/api/chat/';


  constructor(private httpClient: HttpClient) {
  }

  public saveUser(userName: string): Observable<any> {
    return this.httpClient
      .get(this.URL + 'saveUser',
        {params: new HttpParams().append('userName', userName)});
  }
}
