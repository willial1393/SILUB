import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppGlobals} from '../models/appGlobals';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    urlGetClientes = this.appGlobals.base_url + 'clientes/';
    headers = this.appGlobals.headers;

    constructor(private http: HttpClient,
                private appGlobals: AppGlobals) {
    }

    getClientes() {
        return this.http.get(this.urlGetClientes, {headers: this.headers});
    }

    getClienteCodigo(codigo) {
        return this.http.get(this.urlGetClientes + codigo, {headers: this.headers});
    }

    postCliente(cliente) {
        return this.http.post(this.urlGetClientes, cliente, {headers: this.headers});
    }

    deleteCliente(cliente) {
        return this.http.post(this.urlGetClientes + 'delete/', cliente, {headers: this.headers});
    }

    putCliente(cliente) {
        return this.http.put(this.urlGetClientes, cliente, {headers: this.headers});
    }
}
