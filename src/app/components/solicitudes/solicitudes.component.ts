import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppGlobals} from '../../models/appGlobals';
import {ClienteService} from '../../services/cliente.service';
import {EquipoService} from '../../services/equipo.service';
import swal from 'sweetalert2';
import {SolicitudService} from '../../services/solicitud.service';
import {LaboratorioService} from '../../services/laboratorio.service';
import {isNullOrUndefined} from 'util';
import {AppComponent} from '../../app.component';

@Component({
    selector: 'app-solicitudes',
    templateUrl: './solicitudes.component.html',
    styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

    cliente: any;
    solicitudes: any;
    solicitudesAll: any;
    solicitud: any;
    laboratorios: any;
    detalleSolicitud: any;
    equiposSolicitud: any;
    tiposEquipos: any;
    tipoEquipo: any;
    equipoSolicitud: any;
    search = '';

    constructor(private route: Router,
                private appGlobals: AppGlobals,
                private clienteService: ClienteService,
                private solicitudService: SolicitudService,
                private laboratorioService: LaboratorioService,
                private equipoService: EquipoService,
                private app: AppComponent) {
        this.updateTable();
    }

    imprimir() {
        window.print();
    }

    clearForm() {
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
        this.detalleSolicitud = {
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
        this.equipoSolicitud = {
            id_solicitud_adecuacion: '',
            id_tipo_equipo: '',
            cantidad: '',
            tipo: '',
            total: ''
        };
    }

    updateFilter() {
        this.clearForm();
        this.search = this.search.toUpperCase();
        this.solicitudes = this.solicitudesAll.filter(
            x => x.codigo.indexOf(this.search) >= 0
                || x.nombre.indexOf(this.search) >= 0
                || x.laboratorio.indexOf(this.search) >= 0
                || x.fecha_adecuacion.indexOf(this.search) >= 0
                || x.estado_solicitud_adecuacion.indexOf(this.search) >= 0);
    }

    updateTable() {
        this.clearForm();
        this.app.showLoading();
        this.solicitudService.getSolicitudes().subscribe(res => {
            this.solicitudesAll = res['result'];
            this.solicitudes = this.solicitudesAll;
            this.app.hidenLoading();
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
        this.app.showLoading();
        this.clienteService.getClienteCodigo(this.solicitud.codigo).subscribe(res => {
            this.cliente = res['result'];
            this.solicitud.id_cliente = this.cliente.id_cliente;
            this.solicitud.tipo = this.cliente.tipo;
            this.solicitud.estado_cliente = this.cliente.estado_cliente;
            this.solicitud.correo_electronico = this.cliente.correo_electronico;
            this.solicitud.nombre = this.cliente.nombre;
            this.app.hidenLoading();
        });
    }

    verDetalleSolicitud(solicitud) {
        this.detalleSolicitud = solicitud;
        this.solicitudService.getDetalleSolicitud(solicitud.id_solicitud_adecuacion).subscribe(res => {
            this.equiposSolicitud = res['result'];
        });
        this.app.showLoading();
        this.equipoService.getTipoEquipos().subscribe(res => {
            this.tiposEquipos = res['result'];
            this.app.hidenLoading();
        });
        this.tiposEquipos = {
            id_tipo_equipo: '',
            tipo: '',
            total: ''
        };
    }

    updateDetalle() {
        for (const detalle of this.equiposSolicitud) {
            this.app.showLoading();
            this.solicitudService.postDetalleSolicitud(detalle).subscribe(res => {
                if (!res['response']) {
                    this.showValidation(res);
                    return;
                }
            });
        }
    }

    addEquipoSolicitud() {
        this.equipoSolicitud.cantidad = '1';
        this.equipoSolicitud.id_solicitud_adecuacion = this.detalleSolicitud.id_solicitud_adecuacion;
        this.app.showLoading();
        this.solicitudService.postDetalleSolicitud(this.equipoSolicitud).subscribe(res => {
            if (res['response']) {
                this.solicitudService.getDetalleSolicitud(this.detalleSolicitud.id_solicitud_adecuacion).subscribe(res2 => {
                    if (res2['response']) {
                        this.equiposSolicitud = res2['result'];
                        this.app.hidenLoading();
                    } else {
                        this.showValidation(res2);
                    }
                });
            } else {
                this.showValidation(res);
            }
        });
    }

    eliminarSolicitud(solicitud) {
        swal({
            title: '¿Eliminar solicitud?',
            text: '',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.value) {
                this.app.showLoading();
                this.solicitudService.deleteSolicitud(solicitud).subscribe(res => {
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

    guardar() {
        if (this.solicitud.fecha_solicitud > this.solicitud.fecha_adecuacion) {
            swal(
                '',
                'Fecha de solicitud es mayor a la de adecuación',
                'error'
            );
            return;
        }

        if (this.solicitud.hora_ingreso_sala > this.solicitud.hora_salida_sala) {
            swal(
                '',
                'Hora de ingreso es mayor a la hora de salida',
                'error'
            );
            return;
        }

        if (isNullOrUndefined(this.solicitud.nombre)) {
            swal(
                '',
                'Verifique el código del cliente',
                'error'
            );
            return;
        }
        if (!this.appGlobals.isValidDate(this.solicitud.fecha_adecuacion)) {
            swal(
                '',
                'Error de formato en fecha de adecuación',
                'success'
            );
            return;
        }
        this.app.showLoading();
        this.solicitudService.postSolicitud(this.solicitud).subscribe(res => {
            if (res['response']) {
                swal(
                    'Solicitud registrada',
                    '',
                    'success'
                );
                this.updateTable();
            } else {
                this.showValidation(res);
            }
        });
    }

    showValidation(res) {
        this.app.hidenLoading();
        if (res['message'].toString().indexOf('SANCIONADO') >= 0) {
            swal(
                '',
                'El cliente se encuentra sancionado',
                'error'
            );
            return;
        }
        if (res['message'].toString().indexOf('CLIENTE NO ES DOCENTE') >= 0) {
            swal(
                '',
                'El cliente no es un docente',
                'error'
            );
            return;
        }
        if (res['message'].toString().indexOf('LABORATORIO NO DISPONIBLE PARA LA FECHA') >= 0) {
            swal(
                '',
                'El laboratorio no se encuentra disponible para la fecha indicada',
                'error'
            );
            return;
        }
        this.appGlobals.errorUPS(res);
    }

}
