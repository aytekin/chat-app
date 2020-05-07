import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "../shared/model/Message";
import {User} from "../shared/model/User";

@Injectable({
  providedIn: 'root'
})
export default class ChatService {

  private URL = 'https://localhost:44322/api/chat/';

  constructor(private httpClient: HttpClient) {
  }

  public getUserMessages(toName: string, fromName: string): Observable<Message[]>{
    return (<Observable<Message[]>>this.httpClient.get(this.URL + 'GetUserMessages',
      {params: new HttpParams().append('toUser', toName).append('fromUser', fromName)}));
  }

  public getGroupMessages(groupName: string): Observable<Message[]>{
    return (<Observable<Message[]>>this.httpClient.get(this.URL + 'GetGroupMessages',{params: new HttpParams().append('groupName',groupName)}));
  }



  public getAllUsers(): Observable<User[]>{
    return (<Observable<User[]>>this.httpClient.get(this.URL + 'GetAllUsers'));
  }

}
