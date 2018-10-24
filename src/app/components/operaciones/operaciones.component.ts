import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppGlobals} from '../../models/appGlobals';
import swal from 'sweetalert2';
import {OperacionService} from '../../services/operacion.service';
import {EquipoService} from '../../services/equipo.service';

@Component({
    selector: 'app-operaciones',
    templateUrl: './operaciones.component.html',
    styleUrls: ['./operaciones.component.css']
})
export class OperacionesComponent implements OnInit {

    result: any;
    operaciones: any;
    operacion: any;
    equipo: any;
    isEdit: any = false;

    constructor(private route: Router,
                private operacionService: OperacionService,
                private equipoService: EquipoService,
                private appGlobals: AppGlobals) {
        this.updateTable();
    }

    updateTable() {
        this.operacionService.getOperaciones().subscribe(res => {
            this.operaciones = res['result'];
        });
        this.equipo = {
            id_equipo: '',
            id_tipo_equipo: '',
            id_estante: '',
            serial: '',
            descripcion: '',
            fecha_registro: '',
            estado_equipo: '',
            tipo: ''
        };
        this.operacion = {
            id_operacion: '',
            id_equipo: '',
            descripcion: '',
            fecha_inicio: this.appGlobals.getCurrentDate(),
            fecha_fin: '',
            tipo: '',
            serial: '',
            equipo: ''
        };
        this.isEdit = false;
    }

    ngOnInit() {
        if (sessionStorage.getItem('login') === null) {
            this.route.navigate(['/login']);
        }
    }

    getEquipo() {
        this.equipoService.getEquipoSerial(this.operacion.serial).subscribe(res => {
            this.equipo = res['result'];
            this.operacion.id_equipo = this.equipo.id_equipo;
        });
    }

    verOperacion(operacion) {
        swal({
            title: 'Serial: ' + operacion.serial,
            html: 'Equipo: ' + operacion.equipo
                + '<br>Descripción: ' + operacion.descripcion
                + '<br>Fecha inicio: ' + operacion.fecha_inicio
                + '<br>Fecha fin: ' + operacion.fecha_fin
                + '<br>Tipo: ' + operacion.tipo,
            type: 'info',
            confirmButtonColor: '#999999'
        });
    }

    editarOperacion(operacion) {
        this.isEdit = true;
        this.operacion = operacion;
    }

    eliminarOperacion(operacion) {
        this.operacionService.deleteOperacion(operacion).subscribe(res => {
            if (res['response']) {
                swal(
                    'OK',
                    'Operación eliminada',
                    'success'
                );
                this.updateTable();
            } else {
                this.showValidation(res);
            }
        });
    }

    guardar() {
        if (!this.appGlobals.isValidDate(this.operacion.fecha_fin)) {
            swal(
                '',
                'Formato de fecha no valido',
                'error'
            );
            return;
        }
        if (this.isEdit) {
            this.operacionService.putOperacion(this.operacion).subscribe(res => {
                if (res['response']) {
                    swal(
                        'OK',
                        'Información de la operación ha sido modificada',
                        'success'
                    );
                    this.updateTable();
                } else {
                    this.showValidation(res);
                }
            });
        } else {
            this.operacionService.postOperacion(this.operacion).subscribe(res => {
                if (res['response']) {
                    swal(
                        'OK',
                        'Operación registrada correctamente',
                        'success'
                    );
                    this.updateTable();
                } else {
                    this.showValidation(res);
                }
            });
        }
    }

    showValidation(res) {
        if (res['message'].toString().indexOf('EQUIPO NO ACTIVO') >= 0) {
            swal(
                '',
                'El equipo se encuentra en operación',
                'error'
            );
            return;
        }
        if (res['message'].toString().indexOf('EQUIPO PRESTADO') >= 0) {
            swal(
                '',
                'El equipo esta prestado',
                'error'
            );
            return;
        }
        this.appGlobals.errorUPS(res);
    }

}
