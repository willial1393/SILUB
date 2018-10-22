import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {UsuarioService} from '../../services/usuario.service';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

    result: any;
    usuarios: any;
    usuario: any;
    isEdit: any = false;

    constructor(private route: Router,
                private usuarioService: UsuarioService) {
        this.updateTable();
    }

    updateTable() {
        this.usuarioService.getUsuarios().subscribe(res => {
            this.usuarios = res['result'];
        });
        this.usuario = {
            id_usuario: '',
            nombre_usuario: '',
            clave: '',
            tipo: '',
            codigo: '',
            estado: '',
            correo_electronico: '',
            nombre_persona: ''
        };
        this.isEdit = false;
    }

    ngOnInit() {
        if (sessionStorage.getItem('login') === null) {
            this.route.navigate(['/login']);
        }
    }

    verUsuario(usuario) {
        swal({
            title: 'Código: ' + usuario.codigo,
            html: 'Nombre: ' + usuario.nombre_persona
                + '<br>Correo electrónico: ' + usuario.correo_electronico
                + '<br>Rol: ' + usuario.tipo
                + '<br>Estado: ' + usuario.estado
                + '<br>Usuario: ' + usuario.nombre_usuario,
            type: 'info',
            confirmButtonColor: '#999999'
        });
    }

    editarUsuario(usuario) {
        this.isEdit = true;
        this.usuario = usuario;
    }

    eliminarUsuario(usuario) {
        swal(
            {
                title: '¿Desea eliminar el usaurio?',
                text: 'No se podrá recuperar la información de este usuario',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    this.usuarioService.deleteUsuario(usuario).subscribe(res => {
                        this.usuario = res['result'];
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
        this.usuario.nombre_persona = this.usuario.nombre_persona.toUpperCase();
        this.usuario.correo_electronico = this.usuario.correo_electronico.toLowerCase();
        if (this.isEdit) {
            this.usuarioService.putUsuario(this.usuario).subscribe(res => {
                if (res['response']) {
                    swal(
                        'OK',
                        'Información del usuario modificada',
                        'success'
                    );
                    this.updateTable();
                } else {
                    this.showValidation(res);
                }
            });
        } else {
            this.usuarioService.postUsuario(this.usuario).subscribe(res => {
                if (res['response']) {
                    swal(
                        'OK',
                        'Usuario registrado correctamente',
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
        if (res['message'].toString().indexOf('codigo_UNIQUE') >= 0) {
            swal(
                '',
                'Codigo se encuentra registrado',
                'error'
            );
            return;
        }
        if (res['message'].toString().indexOf('correo_electronico_UNIQUE') >= 0) {
            swal(
                '',
                'Correo electronico se encuentra registrado',
                'error'
            );
            return;
        }
        if (res['message'].toString().indexOf('nombre_usuario_UNIQUE') >= 0) {
            swal(
                '',
                'Nombre de usuario se encuentra registrado',
                'error'
            );
            return;
        }
        swal(
            'Error de conexión',
            '',
            'error'
        );
    }
}
