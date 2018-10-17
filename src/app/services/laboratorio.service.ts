import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppGlobals} from '../models/appGlobals';

@Injectable({
    providedIn: 'root'
})
export class LaboratorioService {

    urlGetLaboratorios = this.appGlobals.base_url + 'laboratorios/';
    headers = this.appGlobals.headers;

    constructor(private http: HttpClient,
                private appGlobals: AppGlobals) {
    }

    getLaboratorios() {
        return this.http.get(this.urlGetLaboratorios, {headers: this.headers});
    }

    getLaboratorioCodigo(codigo) {
        return this.http.get(this.urlGetLaboratorios + codigo, {headers: this.headers});
    }

    postLaboratorio(laboratorio) {
        return this.http.post(this.urlGetLaboratorios, laboratorio, {headers: this.headers});
    }

    putLaboratorio(laboratorio) {
        return this.http.put(this.urlGetLaboratorios, laboratorio, {headers: this.headers});
    }
}
