import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {LaboratorioService} from '../../services/laboratorio.service';
import {AppGlobals} from '../../models/appGlobals';

@Component({
    selector: 'app-laboratorios',
    templateUrl: './laboratorios.component.html',
    styleUrls: ['./laboratorios.component.css']
})
export class LaboratoriosComponent implements OnInit {

    laboratorios: any;
    laboratorio: any = {id_laboratorio: '', descripcion: '', nombre: '', estado_laboratorio: 'ACTIVO'};
    isEdit: any = false;

    constructor(private route: Router,
                private appGlobals: AppGlobals,
                private laboratorioService: LaboratorioService) {
        this.updateTable();
    }

    updateTable() {
        this.laboratorioService.getLaboratorios().subscribe(res => {
            this.laboratorios = res['result'];
        });
        this.laboratorio = {
            id_laboratorio: '',
            descripcion: '',
            nombre: '',
            estado_laboratorio: 'ACTIVO'
        };
        this.isEdit = false;
    }

    ngOnInit() {
        if (sessionStorage.getItem('login') === null) {
            this.route.navigate(['/login']);
        }
    }

    verLaboratorio(laboratorio) {
        swal({
            title: 'laboratorio: ' + laboratorio.nombre,
            html: 'Nombre: ' + laboratorio.descripcion,
            type: 'info',
            confirmButtonColor: '#999999'
        });
        this.updateTable();
    }

    editarLaboratorio(laboratorio) {
        this.isEdit = true;
        this.laboratorio = laboratorio;
    }

    eliminarLaboratorio(laboratorio) {
        swal(
            {
                title: '¿Desea eliminar el laboratorio?',
                text: 'No se podrá recuperar la información de este laboratorio',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    laboratorio.estado_laboratorio = 'ELIMINADO';
                    this.laboratorioService.putLaboratorio(laboratorio).subscribe(res => {
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
        this.laboratorio.nombre = this.laboratorio.nombre.toUpperCase();
        if (this.isEdit) {
            this.laboratorioService.putLaboratorio(this.laboratorio).subscribe(res => {
                if (res['response']) {
                    swal(
                        'OK',
                        'Información del laboratorio modificada',
                        'success'
                    );
                    this.updateTable();
                } else {
                    this.showValidation(res);
                }
            });
        } else {
            this.laboratorioService.postLaboratorio(this.laboratorio).subscribe(res => {
                if (res['response']) {
                    swal(
                        'OK',
                        'laboratorio registrado correctamente',
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
        if (res['message'].toString().indexOf('nombre_UNIQUE') >= 0) {
            swal(
                '',
                'Nombre ya se encuentra registrado',
                'error'
            );
            return;
        }
        this.appGlobals.errorUPS(res);
    }
}
