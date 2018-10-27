import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppGlobals} from '../../models/appGlobals';
import {PrestamoService} from '../../services/prestamo.service';
import {ClienteService} from '../../services/cliente.service';
import {EquipoService} from '../../services/equipo.service';
import swal from 'sweetalert2';
import {SolicitudService} from '../../services/solicitud.service';
import {LaboratorioService} from '../../services/laboratorio.service';

@Component({
    selector: 'app-solicitudes',
    templateUrl: './solicitudes.component.html',
    styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

    equipo: any;
    cliente: any;
    prestamo: any;
    prestamos: any;
    solicitudes: any;
    solicitud: any;
    laboratorios: any;
    solicitudEquipo: any;
    solicitudEquipos: any;
    solicitudDescripcion: any;

    constructor(private route: Router,
                private appGlobals: AppGlobals,
                private prestamoService: PrestamoService,
                private clienteService: ClienteService,
                private equipoService: EquipoService,
                private solicitudService: SolicitudService,
                private laboratorioService: LaboratorioService) {
        this.updateTable();
    }

    updateTable() {
        this.cliente = {
            id_cliente: '',
            tipo: '',
            codigo: '',
            estado_cliente: '',
            correo_electronico: '',
            nombre: ''
        };
        this.solicitud = {
            id_solicitud_adecuacion: '0',
            id_laboratorio: '',
            id_cliente: '',
            fecha_solicitud: this.appGlobals.getCurrentDate(),
            fecha_adecuacion: '',
            hora_ingreso_sala: '',
            hora_salida_sala: '',
            puestos_trabajo: '',
            estado_solicitud_adecuacion: '',
            tipo: '',
            codigo: '',
            estado_cliente: '',
            correo_electronico: '',
            nombre: '',
            laboratorio: ''
        };
        this.solicitudDescripcion = {
            id_solicitud_adecuacion: '0',
            id_laboratorio: '',
            id_cliente: '',
            fecha_solicitud: '',
            fecha_adecuacion: '',
            hora_ingreso_sala: '',
            hora_salida_sala: '',
            puestos_trabajo: '',
            estado_solicitud_adecuacion: '',
            tipo: '',
            codigo: '',
            estado_cliente: '',
            correo_electronico: '',
            nombre: '',
            laboratorio: ''
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
        this.solicitudEquipo = {
            id_solicitud_adecuacion: '',
            id_tipo_equipo: '',
            cantidad: '',
            tipo: '',
            total: ''
        };
        this.solicitudService.getSolicitudes().subscribe(res => {
            this.solicitudes = res['result'];
        });
        this.laboratorioService.getLaboratorios().subscribe(res => {
            this.laboratorios = res['result'];
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
            this.prestamo.descripcion = this.equipo.descripcion;
            this.prestamo.estado_equipo = this.equipo.estado;
            this.prestamo.tipo_equipo = this.equipo.tipo;
            this.prestamo.armario = this.equipo.armario;
            this.prestamo.estante = this.equipo.estante;
            this.prestamo.descripcion_bodega = this.equipo.descripcion_bodega;
        });
    }

    verSolicitud(solicitud) {
        this.solicitudService.getSolicitudEquipos(solicitud.id_solicitud_adecuacion).subscribe(res => {
            this.solicitudEquipos = res['result'];
        });
        this.solicitudDescripcion = solicitud;
    }

    openDialog() {
        swal(
            'dialog',
            '',
            'success'
        );
    }

    eliminarSolicitud(solicitud) {
        swal(
            'OK',
            '',
            'success'
        );
    }

    editarSolicitudEquipo(solicitudEquipo) {
        swal(
            'OK',
            '',
            'success'
        );
    }

    eliminarSolicitudEquipo(solicitudEquipo) {
        swal(
            'OK',
            '',
            'success'
        );
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

    terminarSolicitud(prestamo) {
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
