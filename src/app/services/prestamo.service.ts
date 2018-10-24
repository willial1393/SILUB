import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppGlobals} from '../models/appGlobals';

@Injectable({
    providedIn: 'root'
})
export class PrestamoService {

    urlGetPrestamos = this.appGlobals.base_url + 'prestamos/';
    headers = this.appGlobals.headers;

    constructor(private http: HttpClient,
                private appGlobals: AppGlobals) {
    }

    getPrestamos() {
        return this.http.get(this.urlGetPrestamos, {headers: this.headers});
    }

    postPrestamo(prestamo) {
        return this.http.post(this.urlGetPrestamos, prestamo, {headers: this.headers});
    }

    terminarPrestamo(prestamo) {
        return this.http.post(this.urlGetPrestamos + 'terminar/', prestamo, {headers: this.headers});
    }
}
