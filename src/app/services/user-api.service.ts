import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResults } from '../shared/models/user-results.model';

const searchUrl : string = "https://api.github.com/search/users?q=";

@Injectable({
  providedIn: 'root'
})


export class UserApiService {

  constructor(private readonly http :HttpClient) { }

  getUsers(username:string) : Observable<UserResults>{
    return this.http.get<UserResults>(searchUrl+username+"+in:user");
  }
}
