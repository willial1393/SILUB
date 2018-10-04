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
        confirmButtonColor: '#3085d6',
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
}
