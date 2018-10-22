import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {ClienteService} from '../../services/cliente.service';
import {AppGlobals} from '../../models/appGlobals';
import {SancionService} from '../../services/sancion.service';

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

    clientes: any;
    cliente: any;
    sancion: any;
    isEdit: any = false;

    constructor(private route: Router,
                private clienteService: ClienteService,
                private sancionService: SancionService,
                private appGlobals: AppGlobals) {
        this.updateTable();
    }

    updateTable() {
        this.clienteService.getClientes().subscribe(res => {
            this.clientes = res['result'];
        });
        this.cliente = {
            id_cliente: '',
            tipo: '',
            codigo: '',
            estado_cliente: '',
            correo_electronico: '',
            nombre: ''
        };
        this.isEdit = false;
    }

    ngOnInit() {
        if (sessionStorage.getItem('login') === null) {
            this.route.navigate(['/login']);
        }
    }

    verCliente(cliente) {
        swal({
            title: 'Código: ' + cliente.codigo,
            html: 'Nombre: ' + cliente.nombre
                + '<br>Correo electrónico: ' + cliente.correo_electronico
                + '<br>Estado: ' + cliente.estado_cliente
                + '<br>Rol: ' + cliente.tipo,
            type: 'info',
            confirmButtonColor: '#999999'
        });
        this.updateTable();
    }

    editarCliente(cliente) {
        this.isEdit = true;
        this.cliente = cliente;
    }

    eliminarCliente(cliente) {
        swal(
            {
                title: '¿Desea eliminar el usaurio?',
                text: 'No se podrá recuperar la información de este cliente',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    this.clienteService.deleteCliente(cliente).subscribe(res => {
                        if (res['response']) {
                            swal(
                                'Eliminado!',
                                '',
                                'success'
                            );
                            this.updateTable();
                        } else {
                            this.appGlobals.errorUPS(res);
                        }
                    });
                }
            }
        );
    }

    sancionarCliente(cliente) {
        let dateInput = '';
        swal({
            title: 'Fecha sanción',
            input: 'text',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#999',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            inputPlaceholder: 'Año/Mes/Día',
            preConfirm: (inputValue) => {
                dateInput = inputValue;
            }
        }).then((result) => {
            if (result.value) {
                const date = Date.parse(dateInput);
                if (!isNaN(date)) {
                    this.sancion = {
                        id_sancion: '',
                        id_cliente: cliente.id_cliente,
                        descripcion: 'USUARIO',
                        fecha_inicio: this.appGlobals.getCurrentDate(),
                        fecha_fin: this.appGlobals.formatDate(date)
                    };
                    this.sancionService.postSancion(this.sancion).subscribe(res => {
                        if (res['response']) {
                            cliente.estado_cliente = 'SANCIONADO';
                            this.clienteService.putCliente(cliente).subscribe(res2 => {
                                if (res2['response']) {
                                    swal(
                                        'OK',
                                        'Cliente sancionado',
                                        'success'
                                    );
                                } else {
                                    this.appGlobals.errorUPS(res2);
                                }
                            });
                        } else {
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
        });
    }

    guardar() {
        this.cliente.nombre = this.cliente.nombre.toUpperCase();
        this.cliente.correo_electronico = this.cliente.correo_electronico.toLowerCase();
        if (this.isEdit) {
            this.clienteService.putCliente(this.cliente).subscribe(res => {
                if (res['response']) {
                    swal(
                        'OK',
                        'Información del cliente modificada',
                        'success'
                    );
                    this.updateTable();
                } else {
                    this.showValidation(res);
                }
            });
        } else {
            this.clienteService.postCliente(this.cliente).subscribe(res => {
                if (res['response']) {
                    swal(
                        'OK',
                        'cliente registrado correctamente',
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
        if (res['message'].toString().indexOf('codigo_UNIQUE') >= 0) {
            swal(
                '',
                'Codigo ya se encuentra registrado',
                'error'
            );
            return;
        }
        if (res['message'].toString().indexOf('correo_electronico_UNIQUE') >= 0) {
            swal(
                '',
                'Correo electronico ya se encuentra registrado',
                'error'
            );
            return;
        }
        this.appGlobals.errorUPS(res);
    }
}
