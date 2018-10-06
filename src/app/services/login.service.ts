import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {AppGlobals} from '../models/appGlobals';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  urlGetUsers = this.appGlobals.base_url + 'login/';
  headers = this.appGlobals.headers;

  constructor(private http: HttpClient,
              private appGlobals: AppGlobals) {
  }

  login(login) {
    return this.http.post(this.urlGetUsers, login, {headers: this.headers});
  }
}
