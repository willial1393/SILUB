import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppGlobals} from '../models/appGlobals';

@Injectable({
    providedIn: 'root'
})
export class ArmarioService {

    urlGetArmario = this.appGlobals.base_url + 'armarios/';
    headers = this.appGlobals.headers;

    constructor(private http: HttpClient,
                private appGlobals: AppGlobals) {
    }

    getArmarios() {
        return this.http.get(this.urlGetArmario, {headers: this.headers});
    }

    getEstantesArmario(id_armario) {
        return this.http.get(this.urlGetArmario + 'estantes/' + id_armario, {headers: this.headers});
    }


    getArmarioId(id) {
        return this.http.get(this.urlGetArmario + id, {headers: this.headers});
    }

    postArmario(armario) {
        return this.http.post(this.urlGetArmario, armario, {headers: this.headers});
    }

    deleteArmario(armario) {
        return this.http.post(this.urlGetArmario + 'delete/', armario, {headers: this.headers});
    }

    putArmario(armario) {
        return this.http.put(this.urlGetArmario, armario, {headers: this.headers});
    }
}
