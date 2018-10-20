import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppGlobals} from '../models/appGlobals';

@Injectable({
    providedIn: 'root'
})
export class PrestamoService {

    urlGetClientes = this.appGlobals.base_url + 'clientes/';
    urlGetEquipos = this.appGlobals.base_url + 'equipos/';
    urlGetPrestamos = this.appGlobals.base_url + 'prestamos/';
    headers = this.appGlobals.headers;

    constructor(private http: HttpClient,
                private appGlobals: AppGlobals) {
    }

    getClienteCodigo(codigo) {
        return this.http.get(this.urlGetClientes + codigo, {headers: this.headers});
    }

    getClienteSancionado(codigo) {
        return this.http.get(this.urlGetClientes + 'sancionado/' + codigo, {headers: this.headers});
    }

    getEquipoCodigo(codigo) {
        return this.http.get(this.urlGetEquipos + 'serial/' + codigo, {headers: this.headers});
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

    postPrestamo(prestamo, equipo) {
        return this.http.post(this.urlGetPrestamos, prestamo, {headers: this.headers});
    }

    putPrestamo(prestamo) {
        return this.http.put(this.urlGetPrestamos, prestamo, {headers: this.headers});
    }
}
