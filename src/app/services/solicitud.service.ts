import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppGlobals} from '../models/appGlobals';

@Injectable({
    providedIn: 'root'
})
export class SolicitudService {

    urlGetSolicitudes = this.appGlobals.base_url + 'solicitudes_adecuacion/';
    headers = this.appGlobals.headers;

    constructor(private http: HttpClient,
                private appGlobals: AppGlobals) {
    }

    getSolicitudes() {
        return this.http.get(this.urlGetSolicitudes, {headers: this.headers});
    }

    getSolicitudCodigo(codigo) {
        return this.http.get(this.urlGetSolicitudes + codigo, {headers: this.headers});
    }

    postSolicitud(cliente) {
        return this.http.post(this.urlGetSolicitudes, cliente, {headers: this.headers});
    }

    putSolicitud(cliente) {
        return this.http.put(this.urlGetSolicitudes, cliente, {headers: this.headers});
    }
}
