import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppGlobals} from '../models/appGlobals';

@Injectable({
    providedIn: 'root'
})
export class BodegaService {

    urlGetBodega = this.appGlobals.base_url + 'bodegas/';
    urlGetEstante = this.appGlobals.base_url + 'estantes/';
    headers = this.appGlobals.headers;

    constructor(private http: HttpClient,
                private appGlobals: AppGlobals) {
    }

    getBodega() {
        return this.http.get(this.urlGetBodega, {headers: this.headers});
    }

    getBodegaCodigo(id) {
        return this.http.get(this.urlGetBodega + id, {headers: this.headers});
    }

    postBodega(bodega) {
        return this.http.post(this.urlGetBodega, bodega, {headers: this.headers});
    }

    putBodega(bodega) {
        return this.http.put(this.urlGetBodega, bodega, {headers: this.headers});
    }

    getEstante() {
        return this.http.get(this.urlGetEstante, {headers: this.headers});
    }

    getEstanteCodigo(id) {
        return this.http.get(this.urlGetEstante + id, {headers: this.headers});
    }

    postEstante(estante) {
        return this.http.post(this.urlGetEstante, estante, {headers: this.headers});
    }

    putEstante(estante) {
        return this.http.put(this.urlGetEstante, estante, {headers: this.headers});
    }

    getNombresBodegas() {
        return this.http.get(this.urlGetBodega + 'nombres/', {headers: this.headers});
    }

    getNombresArmarios(nombre_bodega) {
        return this.http.get(this.urlGetEstante + 'nombres_armarios/' + nombre_bodega, {headers: this.headers});
    }

    getNombresEstantes(nombre_armario) {
        return this.http.get(this.urlGetEstante + 'nombres_estantes/' + nombre_armario, {headers: this.headers});
    }
}
