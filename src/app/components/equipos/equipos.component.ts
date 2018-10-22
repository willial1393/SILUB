import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {EquipoService} from '../../services/equipo.service';
import {AppGlobals} from '../../models/appGlobals';
import {BodegaService} from '../../services/bodega.service';
import {KardexService} from '../../services/kardex.service';

@Component({
    selector: 'app-equipos',
    templateUrl: './equipos.component.html',
    styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

    equipos: any;
    equipo: any;
    kardex: any;
    tipo_equipos: any;
    tipo_equipo: any;
    isEdit: any = false;

    constructor(private route: Router,
                private equipoService: EquipoService,
                private  bodegaService: BodegaService,
                private  kardexService: KardexService,
                private appGlobals: AppGlobals) {
        this.updateTable();
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
                        this.updateTable();
                        swal(
                            'OK',
                            '',
                            'success'
                        );
                    } else {
                        this.appGlobals.errorUPS(res);
                    }
                });
            }
        });
    }

    updateTable() {
        this.equipoService.getEquipos().subscribe(res => {
            this.equipos = res['result'];
        });
        this.equipoService.getTipoEquipos().subscribe(res => {
            this.tipo_equipos = res['result'];
        });
        this.equipo = {
            id_equipo: '',
            id_tipo_equipo: '',
            id_estante: '',
            serial: '',
            descripcion: '',
            fecha_registro: this.appGlobals.getCurrentDate(),
            estado_equipo: 'INACTIVO',
            cantidad: '1',
            tipo: '0'
        };
        this.kardex = {
            id_tipo_equipo: '',
            tipo: '',
            cantidad: '',
        };
        this.isEdit = false;
    }

    ngOnInit() {
        if (sessionStorage.getItem('login') === null) {
            this.route.navigate(['/login']);
        }
    }

    verEquipo(equipo) {
        swal({
            title: equipo.serial === null ? '' : 'Serial: ' + equipo.serial,
            html: 'Nombre: ' + equipo.tipo
                + '<br>Fecha de registro: ' + equipo.fecha_registro
                + '<br>Estado: ' + equipo.estado_equipo
                + '<br>Descripción: ' + equipo.descripcion,
            type: 'info',
            confirmButtonColor: '#999999'
        });
        this.updateTable();
    }

    editarEquipo(equipo) {
        this.isEdit = true;
        this.equipo = equipo;
        this.equipo.cantidad = 1;
    }

    estanteEquipo(equipo) {
        swal.mixin({
            input: 'text',
            confirmButtonText: 'Next &rarr;',
            showCancelButton: true,
            progressSteps: ['1', '2', '3']
        }).queue([
            {
                title: 'Bodega',
                input: 'select',
                inputOptions: {
                    'LABORATORIOS DE FÍSICA': 'LABORATORIOS DE FÍSICA'
                },
                inputPlaceholder: '- Seleccionar -',
                showCancelButton: true,
                preConfirm: (res) => {
                    console.log(res);
                }
            },
            {
                title: 'Armario',
                input: 'select',
                inputOptions: {
                    '1': '1',
                    '2': '2',
                    '3': '3',
                    '4': '4'
                },
                inputPlaceholder: '- Seleccionar -',
                showCancelButton: true,
                preConfirm: (res) => {
                    console.log(res);
                }
            },
            {
                title: 'Estante',
                input: 'select',
                inputOptions: {
                    '1': '1',
                    '2': '2',
                    '3': '3',
                    '4': '4'
                },
                inputPlaceholder: '- Seleccionar -',
                showCancelButton: true,
                preConfirm: (res) => {
                    console.log(res);
                }
            }
        ]).then((result) => {
            if (result.value) {
                swal({
                    title: 'OK',
                    text: '',
                    type: 'success'
                });
            }
        });
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

    guardar() {
        if (this.isEdit) {
            this.equipoService.putEquipo(this.equipo).subscribe(res => {
                if (res['response']) {
                    swal(
                        'OK',
                        'Información del Equipo modificada',
                        'success'
                    );
                    this.updateTable();
                } else {
                    this.showValidation(res);
                }
            });
        } else {
            this.equipoService.postEquipo(this.equipo).subscribe(res => {
                if (res['response']) {
                    swal(
                        'OK',
                        'Equipo registrado correctamente',
                        'success'
                    );
                    this.updateTable();
                } else {
                    this.appGlobals.errorUPS(res);
                }
            });
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
                        equipo.estado_equipo = 'INACTIVO';
                        equipo.serial = null;
                        this.showValidation(res);
                    }
                });
            }
        });
    }

    showValidation(res) {
        if (res['message'].toString().indexOf('tipo_UNIQUE') >= 0) {
            swal(
                '',
                'Nombre de equipo ya se encuentra registrado',
                'error'
            );
            return;
        }
        if (res['message'].toString().indexOf('serial_UNIQUE') >= 0) {
            swal(
                '',
                'Serial ya se encuentra registrado',
                'error'
            );
            return;
        }
        this.appGlobals.errorUPS(res);
    }
}
