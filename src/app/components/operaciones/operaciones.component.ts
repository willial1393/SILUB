import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppGlobals} from '../../models/appGlobals';
import swal from 'sweetalert2';
import {OperacionService} from '../../services/operacion.service';
import {EquipoService} from '../../services/equipo.service';
import {AppComponent} from '../../app.component';

@Component({
    selector: 'app-operaciones',
    templateUrl: './operaciones.component.html',
    styleUrls: ['./operaciones.component.css']
})
export class OperacionesComponent implements OnInit {

    result: any;
    operaciones: any;
    operacionesAll: any;
    operacion: any;
    equipo: any;
    isEdit: any = false;
    search = '';

    constructor(private route: Router,
                private operacionService: OperacionService,
                private equipoService: EquipoService,
                private appGlobals: AppGlobals,
                private app: AppComponent) {
        this.updateTable();
    }

    imprimir() {
        window.print();
    }

    clearForm() {
        this.equipo = {
            id_equipo: '',
            id_tipo_equipo: '',
            id_estante: '',
            serial: '',
            descripcion: '',
            fecha_registro: this.appGlobals.getCurrentDate(),
            estado_equipo: 'INACTIVO',
            tipo: '',
            total: '',
            id_armario: '',
            nombre: '',
            nombre_estante: '',
            id_bodega: '',
            nombre_armario: '',
            nombre_bodega: ''
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

    updateFilter() {
        this.clearForm();
        this.search = this.search.toUpperCase();
        this.operaciones = this.operacionesAll.filter(
            x => x.serial.indexOf(this.search) >= 0
                || x.equipo.indexOf(this.search) >= 0
                || x.fecha_inicio.indexOf(this.search) >= 0
                || x.fecha_fin.indexOf(this.search) >= 0
                || x.tipo.indexOf(this.search) >= 0);
    }

    updateTable() {
        this.clearForm();
        this.app.showLoading();
        this.operacionService.getOperaciones().subscribe(res => {
            this.operacionesAll = res['result'];
            this.operaciones = this.operacionesAll;
            this.app.hidenLoading();
        });

    }

    ngOnInit() {
        if (sessionStorage.getItem('login') === null) {
            this.route.navigate(['/login']);
        }
    }

    getEquipo() {
        this.app.showLoading();
        this.equipoService.getEquipoSerial(this.operacion.serial).subscribe(res => {
            if (res['response']) {
                this.equipo = res['result'];
                this.operacion.id_equipo = this.equipo.id_equipo;
                this.app.hidenLoading();
            } else {
                this.showValidation(res);
            }
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
        this.app.showLoading();
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
        if (this.operacion.fecha_inicio > this.operacion.fecha_fin) {
            swal(
                '',
                'Fecha de inicio es mayor a la de fin',
                'error'
            );
            return;
        }
        if (!this.appGlobals.isValidDate(this.operacion.fecha_fin)) {
            swal(
                '',
                'Formato de fecha no valido',
                'error'
            );
            return;
        }
        if (this.isEdit) {
            this.app.showLoading();
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
            this.app.showLoading();
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
        this.app.hidenLoading();
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
