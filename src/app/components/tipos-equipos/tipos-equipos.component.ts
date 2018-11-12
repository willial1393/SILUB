import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppGlobals} from '../../models/appGlobals';
import swal from 'sweetalert2';
import {EquipoService} from '../../services/equipo.service';

@Component({
    selector: 'app-tipos-equipos',
    templateUrl: './tipos-equipos.component.html',
    styleUrls: ['./tipos-equipos.component.css']
})
export class TiposEquiposComponent implements OnInit {

    tiposEquipos: any;
    tipoEquipo: any;
    isEdit: any = false;

    constructor(private route: Router,
                private appGlobals: AppGlobals,
                private equipoService: EquipoService) {
        this.updateTable();
    }

    imprimir() {
        window.print();
    }

    updateTable() {
        this.equipoService.getTipoEquipos().subscribe(res => {
            this.tiposEquipos = res['result'];
        });
        this.tipoEquipo = {
            id_tipo_equipo: '',
            tipo: '',
            total: ''
        };
        this.isEdit = false;
    }

    ngOnInit() {
        if (sessionStorage.getItem('login') === null) {
            this.route.navigate(['/login']);
        }
    }

    editarTipoEquipo(tipoEquipo) {
        this.isEdit = true;
        this.tipoEquipo = tipoEquipo;
    }

    eliminarTipoEquipo(tipoEquipo) {
        swal(
            {
                title: '¿Desea eliminar el tipo de equipo?',
                text: 'No se podrá recuperar la información',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    this.equipoService.deleteTipoEquipo(tipoEquipo).subscribe(res => {
                        if (res['response']) {
                            swal(
                                'Eliminado!',
                                '',
                                'success'
                            );
                            this.updateTable();
                        } else {
                            this.showValidation(res);
                        }
                    });
                }
            }
        );
    }

    guardar() {
        this.tipoEquipo.tipo = this.tipoEquipo.tipo.toUpperCase();
        if (this.isEdit) {
            this.equipoService.putTipoEquipo(this.tipoEquipo).subscribe(res => {
                if (res['response']) {
                    swal(
                        'OK',
                        'Información modificada',
                        'success'
                    );
                    this.updateTable();
                } else {
                    this.showValidation(res);
                }
            });
        } else {
            this.equipoService.postTipoEquipo(this.tipoEquipo).subscribe(res => {
                if (res['response']) {
                    swal(
                        'OK',
                        'Tipo de equipo registrado correctamente',
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
                'Tipo de equipo ya se encuentra registrado',
                'error'
            );
            return;
        }
        if (res['message'].toString().indexOf('foreign key constraint fails') >= 0) {
            swal(
                '',
                'Tipo de equipo se encuentra en uso',
                'error'
            );
            return;
        }
        this.appGlobals.errorUPS(res);
    }
}
