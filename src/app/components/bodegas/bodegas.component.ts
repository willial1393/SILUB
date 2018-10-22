import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {BodegaService} from '../../services/bodega.service';
import {AppGlobals} from '../../models/appGlobals';

@Component({
    selector: 'app-bodegas',
    templateUrl: './bodegas.component.html',
    styleUrls: ['./bodegas.component.css']
})
export class BodegasComponent implements OnInit {

    bodegas: any;
    bodega: any = {id_bodega: '', descripcion: '', estado: 'ACTIVO'};
    estante: any = {id_estante: '', id_bodega: '', armario: '', estante: '', descripcion: ''};
    estantes: any;
    isEditBodega: any = false;
    isEditEstante: any = false;
    bodegaSelect: any = 0;

    constructor(private route: Router,
                private appGlobals: AppGlobals,
                private bodegaService: BodegaService) {
        this.updateTable();
    }

    ngOnInit() {
        if (sessionStorage.getItem('login') === null) {
            this.route.navigate(['/login']);
        }
    }

    updateTable() {
        this.bodegaService.getBodega().subscribe(res => {
            this.bodegas = res['result'];
        });
        if (this.bodegaSelect !== 0) {
            this.bodegaService.getEstanteCodigo(this.bodegaSelect).subscribe(res => {
                this.estantes = res['result'];
            });
        }
        this.bodega = {
            id_bodega: '',
            descripcion: '',
            estado: 'ACTIVO'
        };
        this.estante = {
            id_estante: '',
            id_bodega: '',
            armario: '',
            estante: '',
            descripcion: '',
            estado: 'ACTIVO'
        };
        this.isEditBodega = false;
        this.isEditEstante = false;
    }

    verEstante(estante) {
        swal({
            title: '',
            html: 'Armario: ' + estante.armario +
                '<br>Estante: ' + estante.estante +
                '<br>Descripcion: ' + estante.descripcion,
            type: 'info',
            confirmButtonColor: '#999999'
        });
        this.updateTable();
    }

    editarEstante(estante) {
        this.isEditEstante = true;
        this.estante = estante;
    }

    eliminarEstante(estante) {
        estante.estado = 'ELIMINADO';
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
                    this.estante = estante;
                    this.estante.estado = 'ELIMINADO';
                    this.bodegaService.putEstante(this.estante).subscribe(res => {
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

    guardarEstante() {
        if (this.isEditEstante) {
            this.bodegaService.putEstante(this.estante).subscribe(res => {
                if (res['response']) {
                    swal(
                        'OK',
                        'Información del estante modificada',
                        'success'
                    );
                    this.updateTable();
                } else {
                    this.showValidation(res);
                }
            });
        } else {
            this.bodegaService.postEstante(this.estante).subscribe(res => {
                if (res['response']) {
                    swal(
                        'OK',
                        'Estante registrado correctamente',
                        'success'
                    );
                    this.updateTable();
                } else {
                    this.showValidation(res);
                }
            });
        }
    }

    verBodega(bodega) {
        swal({
            title: 'ID: ' + bodega.id_bodega,
            html: 'Descripcion: ' + bodega.descripcion,
            type: 'info',
            confirmButtonColor: '#999999'
        });
        this.updateTable();
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
                    bodega.estado = 'ELIMINADO';
                    this.bodegaService.putBodega(bodega).subscribe(res => {
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

    guardarBodega() {
        this.bodega.descripcion = this.bodega.descripcion.toUpperCase();
        if (this.isEditBodega) {
            this.bodegaService.putBodega(this.bodega).subscribe(res => {
                if (res['response']) {
                    swal(
                        'OK',
                        'Información del bodega modificada',
                        'success'
                    );
                    this.isEditBodega = false;
                    this.updateTable();
                } else {
                    this.showValidation(res);
                }
            });
        } else {
            this.bodegaService.postBodega(this.bodega).subscribe(res => {
                if (res['response']) {
                    swal(
                        'OK',
                        'estante registrado correctamente',
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
        if (res['message'].toString().indexOf('descripcion_UNIQUE') >= 0) {
            swal(
                '',
                'Bodega ya se encuentra registrada',
                'error'
            );
            return;
        }
        this.appGlobals.errorUPS(res);
    }
}
