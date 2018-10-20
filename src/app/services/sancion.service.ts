import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppGlobals} from '../models/appGlobals';

@Injectable({
    providedIn: 'root'
})
export class SancionService {

    urlGetSanciones = this.appGlobals.base_url + 'sanciones/';
    headers = this.appGlobals.headers;

    constructor(private http: HttpClient,
                private appGlobals: AppGlobals) {
    }

    getSanciones() {
        return this.http.get(this.urlGetSanciones, {headers: this.headers});
    }

    getSancionCodigo(codigo) {
        return this.http.get(this.urlGetSanciones + codigo, {headers: this.headers});
    }

    postSancion(sancion) {
        return this.http.post(this.urlGetSanciones, sancion, {headers: this.headers});
    }

    putSancion(sancion) {
        return this.http.put(this.urlGetSanciones, sancion, {headers: this.headers});
    }
}
