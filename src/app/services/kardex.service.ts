import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppGlobals} from '../models/appGlobals';

@Injectable({
    providedIn: 'root'
})
export class KardexService {

    urlGetKardex = this.appGlobals.base_url + 'kardex/';
    headers = this.appGlobals.headers;

    constructor(private http: HttpClient,
                private appGlobals: AppGlobals) {
    }

    geKardex() {
        return this.http.get(this.urlGetKardex, {headers: this.headers});
    }
}
