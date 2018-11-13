import {Component} from '@angular/core';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'SILUB';
    login = '';
    tipo = '';
    stringTemplate = '<div class="loader"></div>';
    loading = false;

    constructor(private route: Router) {
        this.login = sessionStorage.getItem('login');
        this.tipo = sessionStorage.getItem('tipo');
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
                    this.route.navigate(['/']);
                    location.reload();
                }
            }
        );
    }

    ayuda() {
        swal({
            title: 'SILUB',
            html: 'Plataforma creada para la gestion y operación de los equipos de laboratorio de la Universidad de Boyacá' +
                ' <br><br> <b><i>Desarrollado por William Vega y Leydinzoon Arenas</i></b>' +
                ' <br><br> <i>wavega@uniboyaca.edu.co, larenas@uniboyaca.edu.co</i>',
            type: 'info',
            confirmButtonColor: '#999999',
            confirmButtonText: 'Aceptar',
        });
    }

    showLoading() {
        this.loading = true;
    }

    hideLoading() {
        this.loading = false;
    }
}
