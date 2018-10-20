import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppGlobals} from '../models/appGlobals';

@Injectable({
    providedIn: 'root'
})
export class OperacionService {

    urlGetOperaciones = this.appGlobals.base_url + 'operacione/';
    headers = this.appGlobals.headers;

    constructor(private http: HttpClient,
                private appGlobals: AppGlobals) {
    }

    getOperaciones() {
        return this.http.get(this.urlGetOperaciones, {headers: this.headers});
    }

    getOperacionCodigo(codigo) {
        return this.http.get(this.urlGetOperaciones + codigo, {headers: this.headers});
    }

    postOperacion(operacion) {
        return this.http.post(this.urlGetOperaciones, operacion, {headers: this.headers});
    }

    putOperacion(operacion) {
        return this.http.put(this.urlGetOperaciones, operacion, {headers: this.headers});
    }
}
