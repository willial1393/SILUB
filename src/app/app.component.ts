import {Component} from '@angular/core';
import swal from 'sweetalert2';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'SILUB';
    login = '';

    constructor() {
        this.login = sessionStorage.getItem('login');
    }

    cerrarSesion() {
        swal(
            {
                title: '¿Desea cerrar sesión?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#999999',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.value) {
                    sessionStorage.clear();
                    location.reload();
                }
            }
        );
    }

    ayuda() {
        swal({
            title: 'SILUB',
            html: 'Plataforma creada para la gestion y operación de los equipos de laboratorio de la Universidad de Boyacá' +
                ' <br><br> <i>Desarrollado por William Vega y Leydinzoon Arenas</i>',
            type: 'info',
            confirmButtonColor: '#999999',
            confirmButtonText: 'Aceptar',
        });
    }
}
