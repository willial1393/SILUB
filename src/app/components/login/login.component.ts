import {Component, OnInit} from '@angular/core';
import {Route, Router} from '@angular/router';
import swal from 'sweetalert2';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: any = {};

  constructor(private route: Router,
              private loginService: LoginService) {

  }

  login() {
    this.loginService.login(this.usuario).subscribe(res => {
      if (res['result']) {
        sessionStorage.setItem('login', this.usuario.usuario);
        this.usuario.login = sessionStorage.getItem('login');
        swal({
          type: 'success',
          title: 'OK',
          showConfirmButton: false,
          width: 200,
          timer: 1500,
          animation: true,
          customClass: 'animated tada'
        }).then((result) => {
          location.reload();
          this.route.navigate(['/home']);
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
