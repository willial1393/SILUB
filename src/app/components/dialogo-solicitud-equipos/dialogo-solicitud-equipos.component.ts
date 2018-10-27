import {Component, OnInit} from '@angular/core';
import {EquipoService} from '../../services/equipo.service';

@Component({
    selector: 'app-dialogo-solicitud-equipos',
    templateUrl: './dialogo-solicitud-equipos.component.html',
    styleUrls: ['./dialogo-solicitud-equipos.component.css']
})
export class DialogoSolicitudEquiposComponent implements OnInit {

    equipo: any;
    equipos: any;

    constructor(private equipoService: EquipoService) {
        this.updateTable();
    }

    ngOnInit() {
    }

    updateTable() {
        this.equipoService.getEquipos().subscribe(res => {
            this.equipos = res['result'];
        });
    }

    verEquipo(equipo) {

    }
}
