import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {BodegaService} from '../../services/bodega.service';
import {AppGlobals} from '../../models/appGlobals';
import {ArmarioService} from '../../services/armario.service';
import {EstanteService} from '../../services/estante.service';

@Component({
    selector: 'app-bodegas',
    templateUrl: './bodegas.component.html',
    styleUrls: ['./bodegas.component.css']
})
export class BodegasComponent implements OnInit {

    bodega: any;
    bodegaSelected: any;
    bodegas: any;
    armario: any;
    armarioSelected: any;
    armarios: any;
    estante: any;
    estantes: any;
    isEditBodega: any = false;
    isEditArmario: any = false;

    constructor(private route: Router,
                private appGlobals: AppGlobals,
                private bodegaService: BodegaService,
                private armarioService: ArmarioService,
                private estanteService: EstanteService) {
        this.updateBodegas();
    }

    ngOnInit() {
        if (sessionStorage.getItem('login') === null) {
            this.route.navigate(['/login']);
        }
    }

    updateBodegas() {
        this.bodegaService.getBodegas().subscribe(res => {
            this.bodegas = res['result'];
        });
        this.bodega = {
            id_bodega: '',
            nombre: ''
        };
        this.bodegaSelected = {
            id_bodega: '',
            nombre: ''
        };
        this.armario = {
            id_armario: '',
            id_bodega: '',
            nombre: ''
        };
        this.armarioSelected = {
            id_armario: '',
            id_bodega: '',
            nombre: ''
        };
        this.estante = {
            id_estante: '',
            id_armario: '',
            nombre: ''
        };
        this.isEditBodega = false;
    }

    updateArmarios(bodega) {
        if (bodega != null) {
            this.bodegaSelected = bodega;
        }

        this.bodegaService.getArmariosBodega(this.bodegaSelected.id_bodega).subscribe(res => {
            if (res['response']) {
                this.armarios = res['result'];
            } else {
                this.showValidation(res);
            }
        });

        this.armario = {
            id_armario: '',
            id_bodega: '',
            nombre: ''
        };
        this.isEditArmario = false;
    }

    updateEstantes(armario) {
        if (armario !== null) {
            this.armarioSelected = armario;
        }
        this.armarioService.getEstantesArmario(this.armarioSelected.id_armario).subscribe(res => {
            this.estantes = res['result'];
        });
        this.estante = {
            id_estante: '',
            id_armario: '',
            nombre: ''
        };
    }

    editarBodega(bodega) {
        this.isEditBodega = true;
        this.bodega = bodega;
    }

    eliminarBodega(bodega) {
        swal(
            {
                title: '¿Desea eliminar el bodega?',
                text: 'No se podrá recuperar la información de este bodega',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    this.bodegaService.deleteBodega(bodega).subscribe(res => {
                        if (res['response']) {
                            swal(
                                'Eliminado!',
                                '',
                                'success'
                            );
                            this.updateBodegas();
                        } else {
                            this.showValidation(res);
                        }
                    });
                }
            }
        );
    }

    guardarBodega() {
        this.bodega.nombre = this.bodega.nombre.toUpperCase();
        if (this.isEditBodega) {
            this.bodegaService.putBodega(this.bodega).subscribe(res => {
                if (res['response']) {
                    swal(
                        'OK',
                        'Información de la bodega modificada',
                        'success'
                    );
                    this.isEditBodega = false;
                    this.updateBodegas();
                } else {
                    this.showValidation(res);
                }
            });
        } else {
            this.bodegaService.postBodega(this.bodega).subscribe(res => {
                if (res['response']) {
                    swal(
                        'OK',
                        'Bodega registrada correctamente',
                        'success'
                    );
                    this.updateBodegas();
                } else {
                    this.showValidation(res);
                }
            });
        }
    }

    editarArmario(armario) {
        this.armario = armario;
        this.isEditArmario = true;
    }

    eliminarArmario(armario) {
        swal(
            {
                title: '¿Desea eliminar el armario?',
                text: 'No se podrá recuperar la información de este armario',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    this.armarioService.deleteArmario(armario).subscribe(res => {
                        if (res['response']) {
                            swal(
                                'Eliminado!',
                                '',
                                'success'
                            );
                            this.updateArmarios(null);
                        } else {
                            this.showValidation(res);
                        }
                    });
                }
            }
        );
    }

    guardarArmario() {
        if (this.isEditArmario) {
            this.armarioService.putArmario(this.armario).subscribe(res => {
                if (res['response']) {
                    swal(
                        'OK',
                        'Armario actualizado correctamente',
                        'success'
                    );
                    this.updateArmarios(null);
                } else {
                    this.showValidation(res);
                }
            });
        } else {
            this.armarioService.postArmario(this.armario).subscribe(res => {
                if (res['response']) {
                    swal(
                        'OK',
                        'Armario registrado correctamente',
                        'success'
                    );
                    this.updateArmarios(null);
                } else {
                    this.showValidation(res);
                }
            });
        }

    }

    addEstante() {
        this.estante.id_armario = this.armarioSelected.id_armario;
        this.estanteService.postEstante(this.estante).subscribe(res => {
            if (res['response']) {
                swal(
                    'OK',
                    'Estante registrado correctamente',
                    'success'
                );
                this.updateEstantes(null);
            } else {
                this.showValidation(res);
            }
        });
    }

    eliminarEstante(estante) {
        swal(
            {
                title: '¿Desea eliminar el estante?',
                text: 'No se podrá recuperar la información de este estante',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    this.estanteService.deleteEstante(estante).subscribe(res => {
                        if (res['response']) {
                            swal(
                                'Eliminado!',
                                '',
                                'success'
                            );
                            this.updateEstantes(null);
                        } else {
                            this.showValidation(res);
                        }
                    });
                }
            }
        );
    }

    showValidation(res) {
        if (res['message'].toString().indexOf(
            '(`silub`.`armario`, CONSTRAINT `FK_armario_bodega` FOREIGN KEY (`id_bodega`) REFERENCES `bodega` (`id_bodega`))') >= 0) {
            swal(
                '',
                'Bodega contiene armarios',
                'error'
            );
            return;
        }
        if (res['message'].toString().indexOf(
            '(`silub`.`estante`, CONSTRAINT `FK_estante_armario` FOREIGN KEY (`id_armario`) REFERENCES `armario` (`id_armario`))') >= 0) {
            swal(
                '',
                'Armario contiene estantes',
                'error'
            );
            return;
        }
        if (res['message'].toString().indexOf(
            '(`silub`.`equipo`, CONSTRAINT `fk_equipo_estante1` FOREIGN KEY (`id_estante`) REFERENCES `estante` (`id_estante`)') >= 0) {
            swal(
                '',
                'Estante contiene equipos',
                'error'
            );
            return;
        }
        if (res['message'].toString().indexOf('descripcion_UNIQUE') >= 0) {
            swal(
                '',
                'Bodega ya se encuentra registrada',
                'error'
            );
            this.updateBodegas();
            return;
        }
        if (res['message'].toString().indexOf('armario_UNIQUE') >= 0) {
            swal(
                '',
                'Armario ya se encuentra registrado',
                'error'
            );
            this.updateArmarios(null);
            return;
        }
        if (res['message'].toString().indexOf('estante_UNIQUE') >= 0) {
            swal(
                '',
                'Estante ya se encuentra registrado',
                'error'
            );
            return;
        }
        this.appGlobals.errorUPS(res);
    }
}
