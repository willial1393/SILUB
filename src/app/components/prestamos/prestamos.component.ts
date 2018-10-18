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
    equipos: any;
    equipo: any;
    prestamos: any;
    prestamo: any;
    isEdit: any = false;

    constructor(private route: Router,
                private prestamoService: PrestamoService) {
        this.updateTable();
    }

    updateTable() {
        this.prestamoService.getEquipos().subscribe(res => {
            this.equipos = res['result'];
        });
        this.prestamoService.getPrestamos().subscribe(res => {
            this.prestamos = res['result'];
        });
        this.equipo = {
            id_equipo: '',
            id_tipo_equipo: '',
            id_estante: '',
            serial: '',
            descripcion: '',
            fecha_registro: '',
            estado: ''
        };
        this.prestamo = {
            id_prestamo: '',
            id_equipo: '',
            id_solicitud_adecuacion: '',
            id_cliente: '',
            fecha_solicitud: this.date.getDay() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getFullYear(),
            fecha_devolucion: this.date.getDay() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getFullYear(),
            estado: ''
        };
    }

    ngOnInit() {
        if (sessionStorage.getItem('login') === null) {
            this.route.navigate(['/login']);
        }
    }

    verEquipo(equipo) {
        this.prestamoService.getEsquipoCodigo(equipo.id_equipo).subscribe(res => {
            this.equipo = res['result'];
            swal({
                title: this.equipo.serial === null ? '' : 'Serial: ' + this.equipo.serial,
                html: 'Nombre: ' + this.equipo.tipo
                    + '<br>Fecha de registro: ' + this.equipo.fecha_registro
                    + '<br>Estado: ' + this.equipo.estado
                    + '<br>Descripción: ' + this.equipo.descripcion,
                type: 'info',
                confirmButtonColor: '#999999'
            });
            this.equipo = {estado: 'SELECCIONAR', tipo: 'SELECCIONAR'};
        });
    }

    editarEquipo(equipo) {
        this.isEdit = true;
        this.updateTable();
        this.equipo = equipo;
    }

    eliminarEquipo(equipo) {
        swal(
            {
                title: '¿Desea eliminar el equipo?',
                text: 'No se podrá recuperar la información de este Equipo',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
            }
        );
    }

    guardar() {
        if (this.isEdit) {
            this.prestamoService.putEquipo(this.equipo).subscribe(res => {
                this.equipo = res['result'];
                swal(
                    'OK',
                    'Información del Equipo modificada',
                    'success'
                );
                this.isEdit = false;
                this.updateTable();
            });
        } else {
            let aux = true;
            for (let i = 0; i < this.equipo.cantidad; i++) {
                this.prestamoService.postEquipo(this.equipo).subscribe(res => {
                    this.equipo = res['result'];
                    if (res['response'] !== true) {
                        swal(
                            'Ups... Algo salio mal',
                            '',
                            'error'
                        );
                        aux = false;
                        i = this.equipo.cantidad;
                    }
                });
            }
            this.updateTable();
            if (aux) {
                swal(
                    'OK',
                    'Equipo registrado correctamente',
                    'success'
                ).then((res) => {
                    window.location.reload();
                });
            }
        }
    }

    setSerialEquipo(equipo) {
        swal({
            title: 'Serial del equipo',
            input: 'text',
            inputValue: equipo.serial !== null ? equipo.serial : '',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            preConfirm: (res) => {
                equipo.serial = res.toString().toUpperCase();
            }
        }).then((result) => {
            if (result.value) {
                equipo.estado = 'ACTIVO';
                this.prestamoService.putEquipo(equipo).subscribe(res => {
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
