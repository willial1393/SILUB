import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {BodegaService} from '../../services/bodega.service';

@Component({
    selector: 'app-bodegas',
    templateUrl: './bodegas.component.html',
    styleUrls: ['./bodegas.component.css']
})
export class BodegasComponent implements OnInit {

    bodegas: any;
    bodega: any = {descripcion: '', estado: 'ACTIVO'};
    estante: any = {armario: '', nombre: '', estado: 'ACTIVO'};
    estantes: any;
    isEditBodega: any = false;
    isEditEstante: any = false;

    constructor(private route: Router,
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
        this.bodegaService.getEstante().subscribe(res => {
            this.estantes = res['result'];
        });
    }

    verEstante(codigo) {
        this.bodegaService.getEstanteCodigo(codigo).subscribe(res => {
            this.estante = res['result'];
            swal({
                title: '',
                html: 'Armario: ' + this.bodega.armario +
                    '<br>Estante: ' + this.bodega.estante +
                    '<br>Descripcion: ' + this.bodega.descripcion,
                type: 'info',
                confirmButtonColor: '#999999'
            });
            this.estante = {armario: '', nombre: '', estado: 'ACTIVO'};
        });
    }

    editarEstante(estante) {
        this.isEditEstante = true;
        this.estante = estante;
        this.updateTable();
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
                    this.estante = estante;
                    this.estante.estado = 'ELIMINADO';
                    this.bodegaService.putEstante(this.estante).subscribe(res => {
                        this.estante = res['result'];
                        swal(
                            'Eliminado!',
                            '',
                            'success'
                        );
                        this.estante = {armario: '', nombre: '', estado: 'ACTIVO'};
                        this.updateTable();
                    });
                }
            }
        );
    }

    guardarEstante() {
        if (this.isEditEstante) {
            this.bodegaService.putEstante(this.estante).subscribe(res => {
                this.estante = res['result'];
                swal(
                    'OK',
                    'Información del estante modificada',
                    'success'
                );
                this.estante = {armario: '', nombre: '', estado: 'ACTIVO'};
                this.isEditEstante = false;
                this.updateTable();
            });
        } else {
            this.bodegaService.postEstante(this.estante).subscribe(res => {
                if (res['response'] === true) {
                    swal(
                        'OK',
                        'estante registrado correctamente',
                        'success'
                    );
                    this.estante = {armario: '', nombre: '', estado: 'ACTIVO'};
                    this.updateTable();
                } else {
                    swal(
                        'OK',
                        'laboratorio registrado correctamente',
                        'error'
                    );
                }
            });
        }
    }

    verBodega(codigo) {
        this.bodegaService.getBodegaCodigo(codigo).subscribe(res => {
            this.bodega = res['result'];
            swal({
                title: 'ID: ' + this.bodega.id_bodega,
                html: 'Descripcion: ' + this.bodega.descripcion,
                type: 'info',
                confirmButtonColor: '#999999'
            });
            this.estante = {descripcion: '', estado: 'ACTIVO'};
        });
    }

    editarBodega(bodega) {
        this.isEditBodega = true;
        this.estante = bodega;
        this.updateTable();
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
                    this.bodega = bodega;
                    this.bodega.estado = 'ELIMINADO';
                    this.bodegaService.putBodega(this.bodega).subscribe(res => {
                        this.bodega = res['result'];
                        swal(
                            'Eliminado!',
                            '',
                            'success'
                        );
                        this.bodega = {descripcion: '', estado: 'ACTIVO'};
                        this.updateTable();
                    });
                }
            }
        );
    }

    guardarBodega() {
        if (this.isEditBodega) {
            this.bodegaService.putBodega(this.bodega).subscribe(res => {
                this.bodega = res['result'];
                swal(
                    'OK',
                    'Información del bodega modificada',
                    'success'
                );
                this.bodega = {descripcion: '', estado: 'ACTIVO'};
                this.isEditBodega = false;
                this.updateTable();
            });
        } else {
            this.bodegaService.postBodega(this.bodega).subscribe(res => {
                if (res['response'] === true) {
                    swal(
                        'OK',
                        'estante registrado correctamente',
                        'success'
                    );
                    this.bodega = {descripcion: '', estado: 'ACTIVO'};
                    this.updateTable();
                } else {
                    swal(
                        'OK',
                        'laboratorio registrado correctamente',
                        'error'
                    );
                }
            });
        }
    }
}
