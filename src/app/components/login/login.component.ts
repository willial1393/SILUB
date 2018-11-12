import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {LoginService} from '../../services/login.service';
import {AppGlobals} from '../../models/appGlobals';
import {UsuarioService} from '../../services/usuario.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    usuario: any = {
        usuario: '',
        clave: ''
    };

    constructor(private route: Router,
                private loginService: LoginService,
                private appGlobals: AppGlobals,
                private usuarioService: UsuarioService) {

    }

    login() {
        this.loginService.login(this.usuario).subscribe(res => {
            if (!res['response']) {
                this.appGlobals.errorUPS(res);
                return;
            }
            if (res['result']) {
                this.usuarioService.getUsuarioByNombre(this.usuario.usuario).subscribe(res2 => {
                    if (res2['response']) {
                        sessionStorage.setItem('login', this.usuario.usuario);
                        sessionStorage.setItem('tipo', res2['result'].tipo);
                        const toast = swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                        });
                        toast({
                            type: 'success',
                            title: 'Bienvenido ' + this.usuario.usuario
                        });
                        this.route.navigate(['/']);
                        location.reload();
                    } else {
                        this.appGlobals.errorUPS(res2);
                    }
                });
            } else {
                swal(
                    '',
                    'usuario o contraseña incorrecta',
                    'error'
                );
            }
        });
    }

    ngOnInit() {
        if (sessionStorage.getItem('login') !== null) {
            this.route.navigate(['/home']);
        }
    }

}
