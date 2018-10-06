import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import swal from 'sweetalert2';
import {ClienteService} from '../../services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: any;
  cliente: any = {estado: 'SELECCIONAR', tipo: 'SELECCIONAR'};
  isEdit: any = false;

  constructor(private route: Router,
              private clienteService: ClienteService) {
    this.updateTable();
  }

  updateTable() {
    this.clienteService.getClientes().subscribe(res => {
      this.clientes = res['result'];
    });
  }

  ngOnInit() {
    if (sessionStorage.getItem('login') === null) {
      this.route.navigate(['/login']);
    }
  }

  verCliente(codigo) {
    this.clienteService.getClienteCodigo(codigo).subscribe(res => {
      this.cliente = res['result'];
      swal({
        title: 'Código: ' + codigo,
        html: 'Nombre: ' + this.cliente.nombre
          + '<br>Correo electrónico: ' + this.cliente.correo_electronico
          + '<br>Estado: ' + this.cliente.estado
          + '<br>Rol: ' + this.cliente.tipo,
        type: 'info',
        confirmButtonColor: '#999999'
      });
      this.cliente = {estado: 'SELECCIONAR', tipo: 'SELECCIONAR'};
    });
  }

  editarCliente(cliente) {
    this.isEdit = true;
    this.cliente = cliente;
    this.updateTable();
  }

  eliminarCliente(cliente) {
    swal(
      {
        title: '¿Desea eliminar el usaurio?',
        text: 'No se podrá recuperar la información de este cliente',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.cliente = cliente;
          this.cliente.estado = 'ELIMINADO';
          this.clienteService.putCliente(this.cliente).subscribe(res => {
            this.cliente = res['result'];
            swal(
              'Eliminado!',
              '',
              'success'
            );
            this.cliente = {estado: 'SELECCIONAR', tipo: 'SELECCIONAR'};
            this.updateTable();
          });
        }
      }
    );
  }

  sancionarCliente(cliente) {
    this.cliente = {estado: 'SELECCIONAR', tipo: 'SELECCIONAR'};
    swal(
      'Sancionar',
      'Sancionar cliente',
      'error'
    );
  }

  guardar() {
    if (this.isEdit) {
      this.clienteService.putCliente(this.cliente).subscribe(res => {
        this.cliente = res['result'];
        swal(
          'OK',
          'Información del cliente modificada',
          'success'
        );
        this.cliente = {estado: 'SELECCIONAR', tipo: 'SELECCIONAR'};
        this.isEdit = false;
        this.updateTable();
      });
    } else {
      this.clienteService.postCliente(this.cliente).subscribe(res => {
        this.cliente = res['result'];
        swal(
          'OK',
          'cliente registrado correctamente',
          'success'
        );
        this.cliente = {estado: 'SELECCIONAR', tipo: 'SELECCIONAR'};
        this.updateTable();
      });
    }
  }
}
