import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppGlobals} from '../models/appGlobals';

@Injectable({
  providedIn: 'root'
})
export class BodegaService {

  urlGetUsers = this.appGlobals.base_url + 'bodegas/';
  headers = this.appGlobals.headers;

  constructor(private http: HttpClient,
              private appGlobals: AppGlobals) {
  }

  getBodega() {
    return this.http.get(this.urlGetUsers, {headers: this.headers});
  }

  getBodegaCodigo(id) {
    return this.http.get(this.urlGetUsers + id, {headers: this.headers});
  }

  postBodega(bodega) {
    return this.http.post(this.urlGetUsers, bodega, {headers: this.headers});
  }

  putBodega(bodega) {
    return this.http.put(this.urlGetUsers, bodega, {headers: this.headers});
  }
}
