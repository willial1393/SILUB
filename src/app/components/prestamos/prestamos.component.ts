import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {PrestamoService} from '../../services/prestamo.service';
import {AppGlobals} from '../../models/appGlobals';
import {ClienteService} from '../../services/cliente.service';
import {EquipoService} from '../../services/equipo.service';

@Component({
    selector: 'app-prestamos',
    templateUrl: './prestamos.component.html',
    styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {

    date: Date = new Date();
    date2: Date = new Date();
    equipo: any;
    cliente: any;
    prestamo: any;
    prestamos: any;

    constructor(private route: Router,
                private appGlobals: AppGlobals,
                private prestamoService: PrestamoService,
                private clienteService: ClienteService,
                private equipoService: EquipoService) {
        this.updateTable();
    }

    updateTable() {
        this.prestamoService.getPrestamos().subscribe(res => {
            this.prestamos = res['result'];
        });
        this.prestamo = {
            id_equipo: '',
            id_tipo_equipo: '',
            id_estante: '',
            serial: '',
            descripcion: '',
            fecha_registro: '',
            estado_equipo: '',
            id_prestamo: '',
            id_solicitud_adecuacion: '',
            id_cliente: '',
            fecha_solicitud: this.appGlobals.getCurrentDate(),
            fecha_devolucion: '',
            fecha_prevista: '',
            estado_prestamo: '',
            tipo: '',
            codigo: '',
            estado_cliente: '',
            correo_electronico: '',
            nombre: '',
            tipo_equipo: '',
            total: '',
            id_bodega: '',
            armario: '',
            estante: '',
            estado: '',
            descripcion_estante: '',
            estado_estante: '',
            descripcion_bodega: '',
            estado_bodega: ''
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
            id_bodega: '',
            armario: '',
            estante: '',
            estado: '',
            descripcion_bodega: ''
        };
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
            this.prestamo.descripcion = this.equipo.descripcion;
            this.prestamo.estado_equipo = this.equipo.estado;
            this.prestamo.tipo_equipo = this.equipo.tipo;
            this.prestamo.armario = this.equipo.armario;
            this.prestamo.estante = this.equipo.estante;
            this.prestamo.descripcion_bodega = this.equipo.descripcion_bodega;
        });
    }

    verPrestamo(prestamo) {
        swal({
            title: 'Cliente: ' + prestamo.nombre,
            html: 'Rol:' + prestamo.tipo
                + '<br>Código: ' + prestamo.codigo
                + '<br>Correo: ' + prestamo.correo_electronico
                + '<br>Estado cliente: ' + prestamo.estado_cliente
                + '<br>fecha de solicitud: ' + prestamo.fecha_solicitud
                + '<br>fecha de prevista: ' + prestamo.fecha_prevista
                + '<br>fecha de devolución: ' + prestamo.fecha_devolucion
                + '<br>Equipo: ' + prestamo.tipo_equipo
                + '<br>Serial: ' + prestamo.serial
                + '<br>Descripción equipo: ' + prestamo.descripcion
                + '<br>Bodega: ' + prestamo.descripcion_bodega
                + '<br>Armario: ' + prestamo.armario
                + '<br>Estante: ' + prestamo.estante,
            type: 'info',
            confirmButtonColor: '#999999'
        });
    }

    guardar() {
        if (!this.appGlobals.isValidDate(this.prestamo.fecha_prevista)) {
            swal(
                'Formato de fecha invalido',
                '',
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
