import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppGlobals} from '../models/appGlobals';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  urlGetEquipos = this.appGlobals.base_url + 'equipos/';
  headers = this.appGlobals.headers;

  constructor(private http: HttpClient,
              private appGlobals: AppGlobals) {
  }

  getEquipos() {
    return this.http.get(this.urlGetEquipos, {headers: this.headers});
  }

  getEsquipoCodigo(codigo) {
    return this.http.get(this.urlGetEquipos + codigo, {headers: this.headers});
  }

  postEquipo(equipo) {
    return this.http.post(this.urlGetEquipos, equipo, {headers: this.headers});
  }

  putEquipo(equipo) {
    return this.http.put(this.urlGetEquipos, equipo, {headers: this.headers});
  }
}
