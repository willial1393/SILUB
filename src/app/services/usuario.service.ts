import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {AppGlobals} from '../models/appGlobals';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  urlGetUsers = this.appGlobals.base_url + 'persona_usuario/';
  headers = this.appGlobals.headers;

  constructor(private http: HttpClient,
              private appGlobals: AppGlobals) {
  }

  getUsuarios() {
    return this.http.get(this.urlGetUsers, {headers: this.headers});
  }

  getUsuarioCodigo(codigo) {
    return this.http.get(this.urlGetUsers + codigo, {headers: this.headers});
  }

  postUsuario(usuario) {
    return this.http.post(this.urlGetUsers, usuario, {headers: this.headers});
  }

  putUsuario(usuario) {
    return this.http.put(this.urlGetUsers, usuario, {headers: this.headers});
  }
}
