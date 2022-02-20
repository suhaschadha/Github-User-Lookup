import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResults } from '../shared/models/user-results.model';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private userApiService : UserApiService) { }

  getUsers(username : string): Observable<UserResults>{
    return this.userApiService.getUsers(username);
  }
}
