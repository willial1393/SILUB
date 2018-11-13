import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {EquipoService} from '../../services/equipo.service';
import {AppGlobals} from '../../models/appGlobals';
import {BodegaService} from '../../services/bodega.service';
import {KardexService} from '../../services/kardex.service';
import {ArmarioService} from '../../services/armario.service';
import {EstanteService} from '../../services/estante.service';
import {AppComponent} from '../../app.component';

@Component({
    selector: 'app-equipos',
    templateUrl: './equipos.component.html',
    styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

    equipos: any;
    equiposAll: any;
    equipo: any;
    kardex: any;
    tipo_equipos: any;
    tipo_equipo: any;
    isEdit: any = false;
    bodegas: any;
    armarios: any;
    estantes: any;
    equipoSelected: any;
    search = '';

    constructor(private route: Router,
                private equipoService: EquipoService,
                private bodegaService: BodegaService,
                private armarioService: ArmarioService,
                private estanteService: EstanteService,
                private kardexService: KardexService,
                private appGlobals: AppGlobals,
                private app: AppComponent) {
        this.updateEquipos();
    }

    imprimir() {
        window.print();
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
                this.app.showLoading();
                this.equipoService.postTipoEquipo(this.tipo_equipo).subscribe(res => {
                    if (res['response']) {
                        this.updateEquipos();
                        swal(
                            'OK',
                            '',
                            'success'
                        );
                        this.app.hidenLoading();
                    } else {
                        this.showValidation(res);
                    }
                });
            }
        });
    }

    clearForm() {
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

    updateFilter() {
        this.clearForm();
        this.search = this.search.toUpperCase();
        this.equipos = this.equiposAll.filter(
            x => (x.serial === null ? '' : x.serial).indexOf(this.search) >= 0
                || x.tipo.indexOf(this.search) >= 0
                || x.estado_equipo.indexOf(this.search) >= 0);
    }

    updateEquipos() {
        this.clearForm();
        this.app.showLoading();
        this.equipoService.getEquipos().subscribe(res => {
            if (res['response']) {
                this.equiposAll = res['result'];
                this.equipos = this.equiposAll;
                this.app.hidenLoading();
            } else {
                this.showValidation(res);
            }
        });
        this.equipoService.getTipoEquipos().subscribe(res => {
            this.tipo_equipos = res['result'];
        });
    }

    updateBodegas(equipo) {
        this.clearForm();
        if (equipo !== null) {
            this.app.showLoading();
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
        this.app.showLoading();
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
        this.app.showLoading();
        this.armarioService.getEstantesArmario(this.equipoSelected.id_armario).subscribe(res => {
            if (res['response']) {
                this.estantes = res['result'];
                this.app.hidenLoading();
            } else {
                this.showValidation(res);
            }
        });
    }

    eliminarUbicacion() {
        this.app.showLoading();
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
        this.app.showLoading();
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
        if (equipo.estado_equipo !== 'DADO DE BAJA') {
            this.isEdit = true;
            this.equipo = equipo;
            this.equipo.cantidad = 1;
        } else {
            swal(
                '',
                'No se puede editar un equipo que esta dado de baja',
                'error'
            );
        }
    }

    eliminarEquipo(equipo) {
        swal(
            {
                title: '¿Desea eliminar el equipo?',
                text: 'No se podrá recuperar la información de este Equipo' +
                    ' ni los prestamos y operaciones relacionadas a este',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    this.app.showLoading();
                    this.equipoService.deleteEquipo(equipo).subscribe(res => {
                        if (res['response']) {
                            swal(
                                'Eliminado!',
                                '',
                                'success'
                            );
                            this.updateEquipos();
                        } else {
                            this.showValidation(res);
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
                    this.app.showLoading();
                    this.equipoService.darDeBajaEquipo(equipo).subscribe(res => {
                        if (res['response']) {
                            swal(
                                'OK',
                                '',
                                'success'
                            );
                            this.updateEquipos();
                        } else {
                            this.showValidation(res);
                        }
                    });
                }
            }
        );
    }

    guardar() {
        if (this.isEdit) {
            this.app.showLoading();
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
            this.app.showLoading();
            this.equipoService.postEquipo(this.equipo).subscribe(res => {
                if (res['response']) {
                    swal(
                        'OK',
                        'Equipo registrado correctamente',
                        'success'
                    );
                    this.updateEquipos();
                } else {
                    this.showValidation(res);
                }
            });
        }
    }

    setSerialEquipo(equipo) {
        if (equipo.estado_equipo !== 'DADO DE BAJA') {
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
                    this.app.showLoading();
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
        } else {
            swal(
                '',
                'No se puede editar un equipo que esta dado de baja',
                'error'
            );
        }
    }

    showValidation(res) {
        this.app.hidenLoading();
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
