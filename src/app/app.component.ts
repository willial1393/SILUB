import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SILUB';
  login = '';

  constructor(private route: Router) {
    this.login = sessionStorage.getItem('login');
  }

  cerrarSesion() {
    sessionStorage.clear();
    location.reload();
  }
}
