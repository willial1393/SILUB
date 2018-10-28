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

    getDetalleSolicitud(id_solicitud) {
        return this.http.get(this.urlGetSolicitudes + 'detalle/' + id_solicitud, {headers: this.headers});
    }

    postSolicitud(solicitud) {
        return this.http.post(this.urlGetSolicitudes, solicitud, {headers: this.headers});
    }

    postDetalleSolicitud(detalle) {
        return this.http.post(this.urlGetSolicitudes + 'detalle/', detalle, {headers: this.headers});
    }

    deleteSolicitud(solicitud) {
        return this.http.post(this.urlGetSolicitudes + 'delete/', solicitud, {headers: this.headers});
    }
}
