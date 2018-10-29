import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {EquipoService} from '../../services/equipo.service';
import {AppGlobals} from '../../models/appGlobals';
import {BodegaService} from '../../services/bodega.service';
import {KardexService} from '../../services/kardex.service';
import {ArmarioService} from '../../services/armario.service';
import {EstanteService} from '../../services/estante.service';

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
    bodegas: any;
    armarios: any;
    estantes: any;
    equipoSelected: any;

    constructor(private route: Router,
                private equipoService: EquipoService,
                private bodegaService: BodegaService,
                private armarioService: ArmarioService,
                private estanteService: EstanteService,
                private kardexService: KardexService,
                private appGlobals: AppGlobals) {
        this.updateEquipos();
    }

    nuevoTipoEquipo() {
        swal({
            title: 'Nuevo tipo de equipo',
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
                        this.updateEquipos();
                        swal(
                            'OK',
                            '',
                            'success'
                        );
                    } else {
                        this.showValidation(res);
                    }
                });
            }
        });
    }

    updateEquipos() {
        this.equipoService.getEquipos().subscribe(res => {
            if (res['response']) {
                this.equipos = res['result'];
            } else {
                this.showValidation(res);
            }
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
            tipo: '',
            total: '',
            id_armario: '',
            nombre: '',
            nombre_estante: '',
            id_bodega: '',
            nombre_armario: '',
            nombre_bodega: ''
        };

        this.equipoSelected = {
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

        this.kardex = {
            id_tipo_equipo: '',
            tipo: '',
            cantidad: '',
        };

        this.isEdit = false;
    }

    updateBodegas(equipo) {
        if (equipo !== null) {
            this.equipoService.getEquipoID(equipo.id_equipo).subscribe(res => {
                if (res['response']) {
                    this.equipoSelected = res['result'];
                    this.bodegaService.getBodegas().subscribe(res2 => {
                        if (res2['response']) {
                            this.bodegas = res2['result'];
                            this.updateArmarios();
                        } else {
                            this.showValidation(res2);
                        }
                    });
                } else {
                    this.showValidation(res);
                }
            });
        }
    }

    updateArmarios() {
        this.bodegaService.getArmariosBodega(this.equipoSelected.id_bodega).subscribe(res => {
            if (res['response']) {
                this.armarios = res['result'];
                this.updateEstantes();
            } else {
                this.showValidation(res);
            }
        });
    }

    updateEstantes() {
        this.armarioService.getEstantesArmario(this.equipoSelected.id_armario).subscribe(res => {
            if (res['response']) {
                this.estantes = res['result'];
            } else {
                this.showValidation(res);
            }
        });
    }

    eliminarUbicacion() {
        this.equipoService.deleteUbicacion(this.equipoSelected).subscribe(res => {
            if (res['response']) {
                swal(
                    'Ubicación Eliminada!',
                    '',
                    'success'
                );
                this.updateEquipos();
            } else {
                this.showValidation(res);
            }
        });
    }

    guardarUbicacion() {
        this.equipoService.putEquipo(this.equipoSelected).subscribe(res => {
            if (res['response']) {
                swal(
                    'Ubicación registrada',
                    '',
                    'success'
                );
                this.updateEquipos();
            } else {
                this.showValidation(res);
            }
        });
    }

    ngOnInit() {
        if (sessionStorage.getItem('login') === null) {
            this.route.navigate(['/login']);
        }
    }

    verEquipo(equipo) {
        swal({
            title: equipo.serial === null ? '' : 'Serial: ' + equipo.serial,
            html: 'Tipo: ' + equipo.tipo
                + '<br>Fecha de registro: ' + equipo.fecha_registro
                + '<br>Estado: ' + equipo.estado_equipo
                + '<br>Descripción: ' + equipo.descripcion,
            type: 'info',
            confirmButtonColor: '#999999'
        });
        this.updateEquipos();
    }

    editarEquipo(equipo) {
        this.isEdit = true;
        this.equipo = equipo;
        this.equipo.cantidad = 1;
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
                            this.updateEquipos();
                        } else {
                            this.appGlobals.errorUPS(res);
                        }
                    });
                }
            }
        );
    }

    darBajaEquipo(equipo) {
        swal(
            {
                title: '¿Desea dar de baja el equipo?',
                text: '',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    this.equipoService.darDeBajaEquipo(equipo).subscribe(res => {
                        if (res['response']) {
                            swal(
                                'OK',
                                '',
                                'success'
                            );
                            this.updateEquipos();
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
                    this.updateEquipos();
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
                    this.updateEquipos();
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
                            this.updateEquipos();
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
