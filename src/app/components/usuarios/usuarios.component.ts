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

    usuarios: any;
    usuario: any = {
        correo_electronico: '',
        nombre: '',
        estado: 'SELECCIONAR',
        nombre_usuario: '',
        clave: '',
        tipo: 'SELECCIONAR',
        codigo: ''
    };
    isEdit: any = false;

    constructor(private route: Router,
                private usuarioService: UsuarioService) {
        this.updateTable();
    }

    updateTable() {
        this.usuarioService.getUsuarios().subscribe(res => {
            this.usuarios = res['result'];
        });
    }

    ngOnInit() {
        if (sessionStorage.getItem('login') === null) {
            this.route.navigate(['/login']);
        }
    }

    verUsuario(codigo) {
        this.usuarioService.getUsuarioCodigo(codigo).subscribe(res => {
            this.usuario = res['result'];
            swal({
                title: 'Código: ' + codigo,
                html: 'Nombre: ' + this.usuario.nombre
                    + '<br>Correo electrónico: ' + this.usuario.correo_electronico
                    + '<br>Rol: ' + this.usuario.tipo
                    + '<br>Estado: ' + this.usuario.estado
                    + '<br>Usuario: ' + this.usuario.nombre_usuario,
                type: 'info',
                confirmButtonColor: '#999999'
            });
            this.usuario = {estado: 'SELECCIONAR', tipo: 'SELECCIONAR'};
        });
    }

    editarUsuario(usuario) {
        this.isEdit = true;
        this.usuario = usuario;
        this.updateTable();
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
                    this.usuario = usuario;
                    this.usuario.estado = 'ELIMINADO';
                    this.usuarioService.putUsuario(this.usuario).subscribe(res => {
                        this.usuario = res['result'];
                        swal(
                            'Eliminado!',
                            '',
                            'success'
                        );
                        this.usuario = {estado: 'SELECCIONAR', tipo: 'SELECCIONAR'};
                        this.updateTable();
                    });
                }
            }
        );
    }

    sancionarUsuario(usuario) {
        this.usuario = {estado: 'SELECCIONAR', tipo: 'SELECCIONAR'};
        swal(
            'Sancionar',
            'Sancionar usuario',
            'error'
        );
    }

    guardar() {
        if (this.isEdit) {
            this.usuarioService.putUsuario(this.usuario).subscribe(res => {
                this.usuario = res['result'];
                swal(
                    'OK',
                    'Información del usuario modificada',
                    'success'
                );
                this.usuario = {estado: 'SELECCIONAR', tipo: 'SELECCIONAR'};
                this.isEdit = false;
                this.updateTable();
            });
        } else {
            this.usuarioService.postUsuario(this.usuario).subscribe(res => {
                this.usuario = res['result'];
                swal(
                    'OK',
                    'Usuario registrado correctamente',
                    'success'
                );
                this.usuario = {estado: 'SELECCIONAR', tipo: 'SELECCIONAR'};
                this.updateTable();
            });
        }
    }
}
