import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {EquipoService} from '../../services/equipo.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent implements OnInit {

  date: Date = new Date();
  equipos: any;
  equipo: any = {
    fecha_registro: this.date.getDay() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getFullYear(),
    estado: 'INACTIVO'
  };
  isEdit: any = false;

  constructor(private route: Router,
              private equipoService: EquipoService) {
    this.updateTable();
  }

  updateTable() {
    this.equipoService.getEquipos().subscribe(res => {
      this.equipos = res['result'];
    });
  }

  ngOnInit() {
    if (sessionStorage.getItem('login') === null) {
      this.route.navigate(['/login']);
    }
  }

  verEquipo(codigo) {
    this.equipoService.getEsquipoCodigo(codigo).subscribe(res => {
      this.equipo = res['result'];
      swal({
        title: 'Código: ' + codigo,
        html: 'Nombre: ' + this.equipo.nombre
          + '<br>Correo electrónico: ' + this.equipo.correo_electronico
          + '<br>Rol: ' + this.equipo.tipo
          + '<br>Estado: ' + this.equipo.estado
          + '<br>Equipo: ' + this.equipo.nombre_Equipo,
        type: 'info',
        confirmButtonColor: '#999999'
      });
      this.equipo = {estado: 'SELECCIONAR', tipo: 'SELECCIONAR'};
    });
  }

  editarEquipo(equipo) {
    this.isEdit = true;
    this.equipo = equipo;
    this.updateTable();
  }

  eliminarEquipo(equipo) {
    swal(
      {
        title: '¿Desea eliminar el equipo?',
        text: 'No se podrá recuperar la información de este Equipo',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.equipo = equipo;
          this.equipo.estado = 'ELIMINADO';
          this.equipoService.putEquipo(this.equipo).subscribe(res => {
            this.equipo = res['result'];
            swal(
              'Eliminado!',
              '',
              'success'
            );
            this.equipo = {estado: 'SELECCIONAR', tipo: 'SELECCIONAR'};
            this.updateTable();
          });
        }
      }
    );
  }

  sancionarEquipo(equipo) {
    this.equipo = {estado: 'SELECCIONAR', tipo: 'SELECCIONAR'};
    swal(
      'Sancionar',
      'Sancionar Equipo',
      'error'
    );
  }

  guardar() {
    if (this.isEdit) {
      this.equipoService.putEquipo(this.equipo).subscribe(res => {
        this.equipo = res['result'];
        swal(
          'OK',
          'Información del Equipo modificada',
          'success'
        );
        this.equipo = {estado: 'SELECCIONAR', tipo: 'SELECCIONAR'};
        this.isEdit = false;
        this.updateTable();
      });
    } else {
      this.equipoService.postEquipo(this.equipo).subscribe(res => {
        this.equipo = res['result'];
        swal(
          'OK',
          'Equipo registrado correctamente',
          'success'
        );
        this.equipo = {estado: 'SELECCIONAR', tipo: 'SELECCIONAR'};
        this.updateTable();
      });
    }
  }

}
