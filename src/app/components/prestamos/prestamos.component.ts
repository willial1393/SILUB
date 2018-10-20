import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {PrestamoService} from '../../services/prestamo.service';

@Component({
    selector: 'app-prestamos',
    templateUrl: './prestamos.component.html',
    styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {

    date: Date = new Date();
    date2: Date = new Date();
    equipo: any = {
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
    cliente: any = {
        id_cliente: '',
        id_persona: '',
        correo_electronico: '',
        nombre_persona: '',
        estado_persona: '',
        codigo: '',
        tipo: ''
    };
    prestamo: any;
    prestamos: any;
    sancion: any = {
        id_sancion: '',
        id_cliente: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: ''
    };

    constructor(private route: Router,
                private prestamoService: PrestamoService) {
        this.updateTable();
    }

    updateTable() {
        this.prestamoService.getPrestamos().subscribe(res => {
            this.prestamos = res['result'];
        });
        this.prestamo = {
            id_prestamo: '',
            id_equipo: '',
            id_solicitud_adecuacion: '',
            id_cliente: '',
            fecha_solicitud: this.date.getDay() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getFullYear(),
            fecha_devolucion: '',
            fecha_prevista: '',
            codigo_cliente: '',
            nombre_persona: '',
            dias: '',
            serial: '',
            estado: ''
        };
    }

    ngOnInit() {
        if (sessionStorage.getItem('login') === null) {
            this.route.navigate(['/login']);
        }
    }

    updatePrestamo() {
        if (this.prestamo.dias !== null) {
            this.date2 = new Date(
                this.date.getFullYear(),
                this.date.getMonth(),
                this.date.getDate() + parseInt(this.prestamo.dias, 0),
                this.date.getHours(),
                this.date.getMinutes(),
                this.date.getSeconds());
            this.prestamo.fecha_prevista = this.date2.getDay() + '-' + (this.date2.getMonth() + 1) + '-' + this.date2.getFullYear();
        } else {
            this.prestamo.fecha_prevista = null;
        }
    }

    getCliente() {
        this.prestamoService.getClienteCodigo(this.prestamo.codigo_cliente).subscribe(res => {
            this.cliente = res['result'];
        });
    }

    getEquipo() {
        this.prestamoService.getEquipoCodigo(this.prestamo.serial).subscribe(res => {
            this.equipo = res['result'];
        });
    }

    verPrestamo(prestamo) {
        swal({
            title: prestamo.serial + ' - ' + prestamo.tipo,
            html: 'Descripción: ' + prestamo.descripcion,
            type: 'info',
            confirmButtonColor: '#999999'
        });
    }

    guardar() {
        this.prestamoService.getClienteSancionado(this.cliente.id_cliente).subscribe(res => {
            this.sancion = res['result'];
            if (this.sancion !== null) {
                this.prestamoService.postPrestamo(this.prestamo, this.equipo).subscribe(res2 => {
                    if (res2['response']) {
                        this.equipo.estado_equipo = 'PRESTADO';
                        this.prestamoService.putEquipo(this.equipo).subscribe(res3 => {
                            if (res3['response']) {
                                swal(
                                    'OK',
                                    '',
                                    'success'
                                );
                                this.updateTable();
                            } else {
                                swal(
                                    'Ups... Algo salio mal',
                                    '',
                                    'error'
                                );
                            }
                        });
                    } else {
                        swal(
                            'Ups... Algo salio mal',
                            '',
                            'error'
                        );
                    }
                });
            } else {
                swal({
                    title: 'Cliente sancionado',
                    html: 'Descripción: ' + this.sancion.descripcion +
                        '<br>Fecha sanción: ' + this.sancion.fecha_inicio +
                        '<br>Fecha terminación: ' + this.sancion.fecha_fin,
                    type: 'error',
                    confirmButtonColor: '#999999'
                });
            }
        });
    }

    terminarPrestamo(prestamo) {
        swal({
            title: '¿Terminar prestamo del equipo con serial ' + prestamo.serial + '?',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                prestamo.fecha_devolucion = this.date.getDay() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getFullYear();
                this.prestamoService.putPrestamo(prestamo).subscribe(res => {
                    if (res['response']) {
                        swal(
                            'OK',
                            '',
                            'success'
                        ).then((x) => {
                            this.updateTable();
                        });
                    } else {
                        swal(
                            'Ups... Algo salio mal',
                            '',
                            'error'
                        );
                    }
                });
            }
        });
    }

}
