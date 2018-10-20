import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {EquipoService} from '../../services/equipo.service';

@Component({
    selector: 'app-equipos',
    templateUrl: './equipos.component.html',
    styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

    date: Date = new Date();
    equipos: any;
    equipo: any;
    tipo_equipos: any;
    tipo_equipo: any;
    isEdit: any = false;

    constructor(private route: Router,
                private equipoService: EquipoService) {
        this.updateTable();
    }

    getTipoEquipos() {
        this.equipoService.getTipoEquipos().subscribe(res => {
            this.tipo_equipos = res['result'];
        });
    }

    nuevoTipoEquipo() {
        swal({
            title: 'Nuevo nombre de equipo',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            preConfirm: (res) => {
                this.tipo_equipo = {tipo: res.toString().toUpperCase(), total: '0'};
            }
        }).then((result) => {
            if (result.value) {
                this.equipoService.postTipoEquipo(this.tipo_equipo).subscribe(res => {
                    if (res['response']) {
                        this.getTipoEquipos();
                        swal(
                            'OK',
                            '',
                            'success'
                        );
                    } else {
                        this.getTipoEquipos();
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

    updateTable() {
        this.equipoService.getEquipos().subscribe(res => {
            this.equipos = res['result'];
        });
        this.equipo = {
            fecha_registro: this.date.getDay() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getFullYear(),
            estado_equipo: 'INACTIVO', cantidad: '1', tipo: '0'
        };
        this.getTipoEquipos();
    }

    ngOnInit() {
        if (sessionStorage.getItem('login') === null) {
            this.route.navigate(['/login']);
        }
    }

    verEquipo(equipo) {
        this.equipoService.getEsquipoCodigo(equipo.id_equipo).subscribe(res => {
            this.equipo = res['result'];
            swal({
                title: this.equipo.serial === null ? '' : 'Serial: ' + this.equipo.serial,
                html: 'Nombre: ' + this.equipo.tipo
                + '<br>Fecha de registro: ' + this.equipo.fecha_registro
                    + '<br>estado_equipo: ' + this.equipo.estado_equipo
                + '<br>Descripción: ' + this.equipo.descripcion,
                type: 'info',
                confirmButtonColor: '#999999'
            });
            this.equipo = {estado_equipo: 'SELECCIONAR', tipo: 'SELECCIONAR'};
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
                if (result.value) {
                    this.equipoService.deleteEquipo(equipo).subscribe(res => {
                        this.equipo = res['result'];
                        swal(
                            'Eliminado!',
                            '',
                            'success'
                        );
                        this.updateTable();
                    });
                }
            }
        );
    }

    guardar() {
        if (this.isEdit) {
            this.equipoService.putEquipo(this.equipo).subscribe(res => {
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
                this.equipoService.postEquipo(this.equipo).subscribe(res => {
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
                equipo.estado_equipo = 'ACTIVO';
                this.equipoService.putEquipo(equipo).subscribe(res => {
                    if (res['response']) {
                        swal(
                            'OK',
                            '',
                            'success'
                        ).then((x) => {
                            this.updateTable();
                        });
                    } else {
                        this.getTipoEquipos();
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
