import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppGlobals} from '../../models/appGlobals';
import {KardexService} from '../../services/kardex.service';

@Component({
    selector: 'app-kardex',
    templateUrl: './kardex.component.html',
    styleUrls: ['./kardex.component.css']
})
export class KardexComponent implements OnInit {

    kardex: any;
    kardexAll: any;
    filtro: any;
    search = '';

    constructor(private route: Router,
                private kardexService: KardexService,
                private appGlobals: AppGlobals) {
        this.cleanFilterDate();
    }

    imprimir() {
        window.print();
    }

    ngOnInit() {
        if (sessionStorage.getItem('login') === null) {
            this.route.navigate(['/login']);
        }
    }

    cleanFilterDate() {
        this.filtro = {
            nombre: '',
            fecha_inicio: '',
            fecha_fin: ''
        };
        this.updateTable();
    }

    updateFilter() {
        this.search = this.search.toUpperCase();
        this.kardex = this.kardexAll.filter(
            x => x.fecha.indexOf(this.search) >= 0
                || x.equipo.indexOf(this.search) >= 0
                || x.tipo.indexOf(this.search) >= 0
                || x.cantidad.indexOf(this.search) >= 0
                || x.total.indexOf(this.search) >= 0);
    }

    updateFilterDate() {
        this.search = this.search.toUpperCase();
        console.log(this.filtro.nombre);
        this.kardex = this.kardexAll.filter(
            x => x.equipo.indexOf(this.filtro.nombre) >= 0
                && x.fecha >= this.filtro.fecha_inicio
                && x.fecha <= this.filtro.fecha_fin);
    }

    updateTable() {
        this.kardexService.getKardex().subscribe(res => {
            if (res['response']) {
                this.kardexAll = res['result'];
                this.kardex = this.kardexAll;
            } else {
                this.appGlobals.errorUPS(res);
            }
        });
    }

}
