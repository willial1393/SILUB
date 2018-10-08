import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BodegaService} from '../../services/bodega.service';

@Component({
  selector: 'app-bodegas',
  templateUrl: './bodegas.component.html',
  styleUrls: ['./bodegas.component.css']
})
export class BodegasComponent implements OnInit {

  bodegas: any;
  bodega: any = {id_bodega: 'prueba', descripcion: 'descripcion prueba1'};
  estante: any = {id_estante: 'id_estante', id_bodega: 'id_bodega', etiqueta: 'etiqueta'};
  estantes: any;

  constructor(private route: Router,
              private bodegaService: BodegaService) {
    this.getBodegas();
  }

  ngOnInit() {
    if (sessionStorage.getItem('login') === null) {
      this.route.navigate(['/login']);
    }
  }

  getBodegas() {
    this.bodegaService.getBodega().subscribe(res => {
      this.bodegas = res['result'];
    });
  }

}
