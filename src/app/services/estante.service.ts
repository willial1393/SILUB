import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppGlobals} from '../models/appGlobals';

@Injectable({
    providedIn: 'root'
})
export class EstanteService {

    urlGetEstante = this.appGlobals.base_url + 'estantes/';
    headers = this.appGlobals.headers;

    constructor(private http: HttpClient,
                private appGlobals: AppGlobals) {
    }

    getEstantes() {
        return this.http.get(this.urlGetEstante, {headers: this.headers});
    }

    getEstanteId(id) {
        return this.http.get(this.urlGetEstante + id, {headers: this.headers});
    }

    postEstante(estante) {
        return this.http.post(this.urlGetEstante, estante, {headers: this.headers});
    }

    deleteEstante(estante) {
        return this.http.post(this.urlGetEstante + 'delete/', estante, {headers: this.headers});
    }

    putEstante(estante) {
        return this.http.put(this.urlGetEstante, estante, {headers: this.headers});
    }
}
