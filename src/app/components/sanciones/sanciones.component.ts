import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppGlobals} from '../../models/appGlobals';
import swal from 'sweetalert2';
import {ClienteService} from '../../services/cliente.service';
import {SancionService} from '../../services/sancion.service';
import {AppComponent} from '../../app.component';

@Component({
    selector: 'app-sanciones',
    templateUrl: './sanciones.component.html',
    styleUrls: ['./sanciones.component.css']
})
export class SancionesComponent implements OnInit {

    cliente: any;
    sancion: any;
    sanciones: any;
    sancionesAll: any;
    search = '';

    constructor(private route: Router,
                private sancionService: SancionService,
                private clienteService: ClienteService,
                private appGlobals: AppGlobals,
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
        this.sancion = {
            id_sancion: '',
            id_cliente: '',
            descripcion: '',
            fecha_inicio: '',
            fecha_fin: '',
            codigo: '',
            nombre: '',
            estado: ''
        };
    }

    updateFilter() {
        this.clearForm();
        this.search = this.search.toUpperCase();
        this.sanciones = this.sancionesAll.filter(
            x => x.codigo.indexOf(this.search) >= 0
                || x.nombre.indexOf(this.search) >= 0
                || x.estado.indexOf(this.search) >= 0
                || x.fecha_inicio.indexOf(this.search) >= 0
                || x.fecha_fin.indexOf(this.search) >= 0);
    }

    updateTable() {
        this.clearForm();
        this.app.showLoading();
        this.sancionService.getSanciones().subscribe(res => {
            this.sancionesAll = res['result'];
            this.sanciones = this.sancionesAll;
            this.app.hidenLoading();
        });
    }

    ngOnInit() {
        if (sessionStorage.getItem('login') === null) {
            this.route.navigate(['/login']);
        }
    }

    verSancion(sancion) {
        swal({
            title: 'Código: ' + sancion.codigo,
            html: 'Nombre: ' + sancion.nombre
                + '<br>Descripción: ' + sancion.descripcion
                + '<br>Estado: ' + sancion.estado
                + '<br>Fecha inicio: ' + sancion.fecha_inicio
                + '<br>Fecha fin: ' + sancion.fecha_fin,
            type: 'info',
            confirmButtonColor: '#999999'
        });
        this.updateTable();
    }

    editarSancion(sancion) {
        sancion.fecha_inicio = this.appGlobals.formatDate(sancion.fecha_inicio);
        sancion.fecha_fin = this.appGlobals.formatDate(sancion.fecha_fin);
        this.sancion = sancion;
    }

    eliminarSancion(sancion) {
        this.app.showLoading();
        this.clienteService.getClienteCodigo(sancion.codigo).subscribe(res => {
            this.cliente = res['result'];
            this.app.hidenLoading();
            swal(
                {
                    title: '¿Desea eliminar la sanción?',
                    text: '',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Aceptar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.value) {
                        this.app.showLoading();
                        this.sancionService.deleteSancion(sancion).subscribe(res2 => {
                            if (res2['response']) {
                                this.cliente.estado_cliente = 'ACTIVO';
                                this.clienteService.putCliente(this.cliente).subscribe(res3 => {
                                    if (res3['response']) {
                                        swal(
                                            'Eliminado!',
                                            '',
                                            'success'
                                        );
                                        this.updateTable();
                                    } else {
                                        this.app.hidenLoading();
                                        this.appGlobals.errorUPS(res);
                                    }
                                });
                            } else {
                                this.app.hidenLoading();
                                this.appGlobals.errorUPS(res);
                            }
                        });
                    }
                }
            );
        });
    }

    guardar() {
        if (this.appGlobals.isValidDate(this.sancion.fecha_fin)
            && this.appGlobals.isValidDate(this.sancion.fecha_inicio)) {
            this.app.showLoading();
            this.sancionService.putSancion(this.sancion).subscribe(res => {
                if (res['response']) {
                    swal(
                        'OK',
                        'Información del sancion modificada',
                        'success'
                    );
                    this.updateTable();
                } else {
                    this.app.hidenLoading();
                    this.appGlobals.errorUPS(res);
                }
            });
        } else {
            swal(
                '',
                'Formato de fecha no valido',
                'error'
            );
        }
    }

}
