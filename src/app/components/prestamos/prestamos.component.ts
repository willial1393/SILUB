import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {PrestamoService} from '../../services/prestamo.service';
import {AppGlobals} from '../../models/appGlobals';
import {ClienteService} from '../../services/cliente.service';
import {EquipoService} from '../../services/equipo.service';
import {isNullOrUndefined} from 'util';

@Component({
    selector: 'app-prestamos',
    templateUrl: './prestamos.component.html',
    styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {

    equipo: any;
    cliente: any;
    prestamo: any;
    prestamos: any;
    prestamosAll: any;
    search = '';

    constructor(private route: Router,
                private appGlobals: AppGlobals,
                private prestamoService: PrestamoService,
                private clienteService: ClienteService,
                private equipoService: EquipoService) {
        this.updateTable();
    }

    clearForm() {
        this.prestamo = {
            id_equipo: '',
            id_tipo_equipo: '',
            id_estante: '',
            serial: '',
            descripcion: '',
            fecha_registro: '',
            estado_equipo: '',
            id_prestamo: '',
            id_solicitud_adecuacion: null,
            id_cliente: '',
            fecha_solicitud: this.appGlobals.getCurrentDate(),
            fecha_devolucion: '',
            fecha_prevista: '',
            estado_prestamo: '',
            tipo: '',
            tipo_cliente: '',
            codigo: '',
            estado_cliente: '',
            correo_electronico: '',
            nombre: '',
            nombre_cliente: '',
            tipo_equipo: '',
            total: '',
            id_armario: '',
            nombre_estante: '',
            id_bodega: '',
            nombre_armario: '',
            nombre_bodega: ''

        };
        this.cliente = {
            id_cliente: '',
            tipo: '',
            codigo: '',
            estado_cliente: '',
            correo_electronico: '',
            nombre: ''
        };
        this.equipo = {
            id_equipo: '',
            id_tipo_equipo: '',
            id_estante: '',
            serial: '',
            descripcion: '',
            fecha_registro: '',
            estado_equipo: '',
            tipo: '',
            total: '',
            id_armario: '',
            nombre: '',
            nombre_estante: '',
            id_bodega: '',
            nombre_armario: '',
            nombre_bodega: ''
        };
    }

    updateFilter() {
        this.clearForm();
        this.search = this.search.toUpperCase();
        this.prestamos = this.prestamosAll.filter(
            x => x.codigo.indexOf(this.search) >= 0
                || x.nombre.indexOf(this.search) >= 0
                || x.fecha_solicitud.indexOf(this.search) >= 0
                || x.fecha_prevista.indexOf(this.search) >= 0
                || x.estado_prestamo.indexOf(this.search) >= 0);
    }

    updateTable() {
        this.clearForm();
        this.prestamoService.getPrestamos().subscribe(res => {
            this.prestamosAll = res['result'];
            this.prestamos = this.prestamosAll;
        });
    }

    ngOnInit() {
        if (sessionStorage.getItem('login') === null) {
            this.route.navigate(['/login']);
        }
    }

    getCliente() {
        this.clienteService.getClienteCodigo(this.prestamo.codigo).subscribe(res => {
            this.cliente = res['result'];
            this.prestamo.id_cliente = this.cliente.id_cliente;
            this.prestamo.tipo = this.cliente.tipo;
            this.prestamo.estado_cliente = this.cliente.estado_cliente;
            this.prestamo.correo_electronico = this.cliente.correo_electronico;
            this.prestamo.nombre = this.cliente.nombre;
        });
    }

    getEquipo() {
        this.equipoService.getEquipoSerial(this.prestamo.serial).subscribe(res => {
            this.equipo = res['result'];
            this.prestamo.id_equipo = this.equipo.id_equipo;
            this.prestamo.tipo_equipo = this.equipo.tipo;
            this.prestamo.nombre_estante = this.equipo.nombre_estante;
            this.prestamo.nombre_armario = this.equipo.nombre_armario;
            this.prestamo.nombre_bodega = this.equipo.nombre_bodega;
        });
    }

    verPrestamo(prestamo) {
        if (!isNullOrUndefined(prestamo.id_estante)) {
            this.equipoService.getEquipoID(prestamo.id_equipo).subscribe(res => {
                if (res['response']) {
                    this.equipo = res['result'];
                    swal({
                        title: 'Cliente: ' + prestamo.nombre,
                        html: 'Rol:' + prestamo.tipo_cliente
                            + '<br>Código: ' + prestamo.codigo
                            + '<br>Correo: ' + prestamo.correo_electronico
                            + '<br>Estado cliente: ' + prestamo.estado_cliente
                            + '<br>fecha de solicitud: ' + prestamo.fecha_solicitud
                            + '<br>fecha de prevista: ' + prestamo.fecha_prevista
                            + '<br>fecha de devolución: ' + prestamo.fecha_devolucion
                            + '<br>Equipo: ' + prestamo.nombre
                            + '<br>Serial: ' + prestamo.serial
                            + '<br>Descripción equipo: ' + prestamo.descripcion
                            + '<br>Bodega: ' + this.equipo.nombre_bodega
                            + '<br>Armario: ' + this.equipo.nombre_armario
                            + '<br>Estante: ' + this.equipo.nombre_estante,
                        type: 'info',
                        confirmButtonColor: '#999999'
                    });
                } else {
                    this.showValidation(res);
                }
            });
        } else {
            swal({
                title: 'Cliente: ' + prestamo.nombre,
                html: 'Rol:' + prestamo.tipo_cliente
                    + '<br>Código: ' + prestamo.codigo
                    + '<br>Correo: ' + prestamo.correo_electronico
                    + '<br>Estado cliente: ' + prestamo.estado_cliente
                    + '<br>fecha de solicitud: ' + prestamo.fecha_solicitud.substr(0, prestamo.fecha_solicitud.length - 8)
                    + '<br>fecha de prevista: ' + prestamo.fecha_prevista
                    + '<br>fecha de devolución: ' + prestamo.fecha_devolucion
                    + '<br>Equipo: ' + prestamo.nombre
                    + '<br>Serial: ' + prestamo.serial
                    + '<br>Descripción equipo: ' + prestamo.descripcion
                    + '<br><b>El equipo no tiene un lugar asignado aún </b>',
                type: 'info',
                confirmButtonColor: '#999999'
            });
        }
    }

    guardar() {
        if (isNullOrUndefined(this.prestamo.nombre)) {
            swal(
                '',
                'Verifique el código del cliente',
                'error'
            );
            return;
        }
        if (isNullOrUndefined(this.prestamo.tipo_equipo)) {
            swal(
                '',
                'Verifique el serial del equipo',
                'error'
            );
            return;
        }
        this.prestamoService.postPrestamo(this.prestamo).subscribe(res => {
            if (res['response']) {
                swal(
                    'OK',
                    '',
                    'success'
                );
                this.updateTable();
            } else {
                this.showValidation(res);
            }
        });
    }

    terminarPrestamo(prestamo) {
        if (prestamo.estado_prestamo === 'ACTIVO') {
            swal({
                title: '¿Terminar prestamo del equipo con serial ' + prestamo.serial + '?',
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    prestamo.fecha_devolucion = this.appGlobals.getCurrentDate();
                    this.prestamoService.terminarPrestamo(prestamo).subscribe(res => {
                        if (res['response']) {
                            swal(
                                'OK',
                                '',
                                'success'
                            );
                            this.updateTable();
                        } else {
                            this.showValidation(res);
                        }
                    });
                }
            });
        }
    }

    showValidation(res) {
        if (res['message'].toString().indexOf('SANCIONADO') >= 0) {
            swal(
                '',
                'El cliente se encuentra sancionado',
                'error'
            );
            return;
        }
        if (res['message'].toString().indexOf('EQUIPO NO ACTIVO') >= 0) {
            swal(
                '',
                'El equipo no esta disponible en este momento',
                'error'
            );
            return;
        }
        this.appGlobals.errorUPS(res);
    }
}
