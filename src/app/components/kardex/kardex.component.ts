import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppGlobals} from '../../models/appGlobals';
import {KardexService} from '../../services/kardex.service';
import swal from 'sweetalert2';
import {AppComponent} from '../../app.component';

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
                private appGlobals: AppGlobals,
                private app: AppComponent) {
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
        if (this.filtro.fecha_inicio > this.filtro.fecha_fin) {
            swal(
                '',
                'Fecha de inicio es mayor que la fecha fin',
                'error'
            );
            return;
        }
        this.search = this.search.toUpperCase();
        this.kardex = this.kardexAll.filter(
            x => x.equipo.indexOf(this.filtro.nombre) >= 0
                && x.fecha >= this.filtro.fecha_inicio
                && x.fecha <= this.filtro.fecha_fin);
    }

    updateTable() {
        this.app.showLoading();
        this.kardexService.getKardex().subscribe(res => {
            if (res['response']) {
                this.kardexAll = res['result'];
                this.kardex = this.kardexAll;
                this.app.hidenLoading();
            } else {
                this.app.hidenLoading();
                this.appGlobals.errorUPS(res);
            }
        });
    }

}
