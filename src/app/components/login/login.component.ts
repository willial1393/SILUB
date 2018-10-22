import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {LoginService} from '../../services/login.service';
import {AppGlobals} from '../../models/appGlobals';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    usuario: any = {};

    constructor(private route: Router,
                private loginService: LoginService,
                private appGlobals: AppGlobals) {

    }

    login() {
        this.loginService.login(this.usuario).subscribe(res => {
            if (!res['response']) {
                this.appGlobals.errorUPS(res);
                return;
            }
            if (res['result']) {
                sessionStorage.setItem('login', this.usuario.usuario);
                this.usuario.login = sessionStorage.getItem('login');
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
                this.route.navigate(['/home']);
                location.reload();
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
