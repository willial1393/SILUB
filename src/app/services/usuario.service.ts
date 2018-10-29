import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppGlobals} from '../models/appGlobals';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    urlGetUsers = this.appGlobals.base_url + 'usuarios/';
    headers = this.appGlobals.headers;

    constructor(private http: HttpClient,
                private appGlobals: AppGlobals) {
    }

    getUsuarios() {
        return this.http.get(this.urlGetUsers, {headers: this.headers});
    }

    getUsuarioByNombre(nombre) {
        return this.http.get(this.urlGetUsers + nombre, {headers: this.headers});
    }

    postUsuario(usuario) {
        return this.http.post(this.urlGetUsers, usuario, {headers: this.headers});
    }

    deleteUsuario(usuario) {
        return this.http.post(this.urlGetUsers + 'delete/', usuario, {headers: this.headers});
    }

    putUsuario(usuario) {
        return this.http.put(this.urlGetUsers, usuario, {headers: this.headers});
    }
}
