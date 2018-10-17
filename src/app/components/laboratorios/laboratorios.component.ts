import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {LaboratorioService} from '../../services/laboratorio.service';

@Component({
    selector: 'app-laboratorios',
    templateUrl: './laboratorios.component.html',
    styleUrls: ['./laboratorios.component.css']
})
export class LaboratoriosComponent implements OnInit {

    laboratorios: any;
    laboratorio: any = {descripcion: '', nombre: '', estado: 'ACTIVO'};
    isEdit: any = false;

    constructor(private route: Router,
                private laboratorioService: LaboratorioService) {
        this.updateTable();
    }

    updateTable() {
        this.laboratorioService.getLaboratorios().subscribe(res => {
            this.laboratorios = res['result'];
        });
    }

    ngOnInit() {
        if (sessionStorage.getItem('login') === null) {
            this.route.navigate(['/login']);
        }
    }

    verLaboratorio(codigo) {
        this.laboratorioService.getLaboratorioCodigo(codigo).subscribe(res => {
            this.laboratorio = res['result'];
            swal({
                title: 'laboratorio: ' + this.laboratorio.nombre,
                html: 'Nombre: ' + this.laboratorio.descripcion,
                type: 'info',
                confirmButtonColor: '#999999'
            });
            this.laboratorio = {descripcion: '', nombre: '', estado: 'ACTIVO'};
        });
    }

    editarLaboratorio(Laboratorio) {
        this.isEdit = true;
        this.laboratorio = Laboratorio;
        this.updateTable();
    }

    eliminarLaboratorio(Laboratorio) {
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
                    this.laboratorio = Laboratorio;
                    this.laboratorio.estado = 'ELIMINADO';
                    this.laboratorioService.putLaboratorio(this.laboratorio).subscribe(res => {
                        this.laboratorio = res['result'];
                        swal(
                            'Eliminado!',
                            '',
                            'success'
                        );
                        this.laboratorio = {descripcion: '', nombre: '', estado: 'ACTIVO'};
                        this.updateTable();
                    });
                }
            }
        );
    }

    guardar() {
        if (this.isEdit) {
            this.laboratorioService.putLaboratorio(this.laboratorio).subscribe(res => {
                this.laboratorio = res['result'];
                swal(
                    'OK',
                    'Información del laboratorio modificada',
                    'success'
                );
                this.laboratorio = {descripcion: '', nombre: '', estado: 'ACTIVO'};
                this.isEdit = false;
                this.updateTable();
            });
        } else {
            this.laboratorioService.postLaboratorio(this.laboratorio).subscribe(res => {
                if (res['response'] === true) {
                    swal(
                        'OK',
                        'laboratorio registrado correctamente',
                        'success'
                    );
                    this.laboratorio = {descripcion: '', nombre: '', estado: 'ACTIVO'};
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
