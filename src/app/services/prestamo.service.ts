import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppGlobals} from '../models/appGlobals';

@Injectable({
    providedIn: 'root'
})
export class PrestamoService {

    urlGetEquipos = this.appGlobals.base_url + 'equipos/';
    urlGetPrestamos = this.appGlobals.base_url + 'prestamos/';
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

    getPrestamos() {
        return this.http.get(this.urlGetPrestamos, {headers: this.headers});
    }

    getPrestamoCodigo(codigo) {
        return this.http.get(this.urlGetPrestamos + codigo, {headers: this.headers});
    }

    postPrestamo(prestamos) {
        return this.http.post(this.urlGetPrestamos, prestamos, {headers: this.headers});
    }

    putPrestamo(prestamo) {
        return this.http.put(this.urlGetPrestamos, prestamo, {headers: this.headers});
    }
}
