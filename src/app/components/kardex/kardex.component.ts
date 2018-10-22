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
    filtro: any = {
        nombre: '',
        fecha_inicio: '',
        fecha_fin: ''
    };

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

    updateTable() {
        this.kardexService.getKardex().subscribe(res => {
            if (res['response']) {
                this.kardex = res['result'];
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
