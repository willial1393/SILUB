import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppGlobals} from '../models/appGlobals';

@Injectable({
    providedIn: 'root'
})
export class EquipoService {

    urlGetEquipos = this.appGlobals.base_url + 'equipos/';
    urlGetTipoEquipos = this.appGlobals.base_url + 'tipos_equipos/';
    headers = this.appGlobals.headers;

    constructor(private http: HttpClient,
                private appGlobals: AppGlobals) {
    }

    getEquipos() {
        return this.http.get(this.urlGetEquipos, {headers: this.headers});
    }

    getEquipoSerial(serial) {
        return this.http.get(this.urlGetEquipos + 'serial/' + serial, {headers: this.headers});
    }


    getTipoEquipos() {
        return this.http.get(this.urlGetTipoEquipos, {headers: this.headers});
    }

    postTipoEquipo(tipoEquipo) {
        return this.http.post(this.urlGetTipoEquipos, tipoEquipo, {headers: this.headers});
    }

    postEquipo(equipo) {
        return this.http.post(this.urlGetEquipos, equipo, {headers: this.headers});
    }

    deleteEquipo(equipo) {
        return this.http.post(this.urlGetEquipos + 'delete', equipo, {headers: this.headers});
    }

    putEquipo(equipo) {
        return this.http.put(this.urlGetEquipos, equipo, {headers: this.headers});
    }
}
