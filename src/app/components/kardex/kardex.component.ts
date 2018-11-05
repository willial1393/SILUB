import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppGlobals} from '../../models/appGlobals';
import {KardexService} from '../../services/kardex.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-kardex',
    templateUrl: './kardex.component.html',
    styleUrls: ['./kardex.component.css']
})
export class KardexComponent implements OnInit {

    kardex: any;
    kardexAll: any;
    filtro: any = {
        nombre: '',
        fecha_inicio: '',
        fecha_fin: ''
    };
    search = '';

    constructor(private route: Router,
                private kardexService: KardexService,
                private appGlobals: AppGlobals) {
        this.updateTable();
    }

    ngOnInit() {
        if (sessionStorage.getItem('login') === null) {
            this.route.navigate(['/login']);
        }
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

    updateTable() {
        this.kardexService.getKardex().subscribe(res => {
            if (res['response']) {
                this.kardexAll = res['result'];
                this.kardex = this.kardexAll;
            } else {
                swal(
                    'Error',
                    'Verifique el formato de las fechas',
                    'error'
                );
            }
        });
    }

}
