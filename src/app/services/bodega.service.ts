import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppGlobals} from '../models/appGlobals';

@Injectable({
    providedIn: 'root'
})
export class BodegaService {

    urlGetBodega = this.appGlobals.base_url + 'bodegas/';
    headers = this.appGlobals.headers;

    constructor(private http: HttpClient,
                private appGlobals: AppGlobals) {
    }

    getBodegas() {
        return this.http.get(this.urlGetBodega, {headers: this.headers});
    }

    getArmariosBodega(id_bodega) {
        return this.http.get(this.urlGetBodega + 'armarios/' + id_bodega, {headers: this.headers});
    }

    getBodegaId(id) {
        return this.http.get(this.urlGetBodega + id, {headers: this.headers});
    }

    postBodega(bodega) {
        return this.http.post(this.urlGetBodega, bodega, {headers: this.headers});
    }

    deleteBodega(bodega) {
        return this.http.post(this.urlGetBodega + 'delete/', bodega, {headers: this.headers});
    }

    putBodega(bodega) {
        return this.http.put(this.urlGetBodega, bodega, {headers: this.headers});
    }
}
