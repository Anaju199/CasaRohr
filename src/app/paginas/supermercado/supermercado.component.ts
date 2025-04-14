import { Component, OnInit } from '@angular/core';
import { FotosService } from 'src/app/core/services/fotos.service';
import { Foto } from 'src/app/core/tipos';

@Component({
  selector: 'app-supermercado',
  templateUrl: './supermercado.component.html',
  styleUrls: ['./supermercado.component.css']
})
export class SupermercadoComponent implements OnInit {

  listaSupermercado: Foto[] = [];

  constructor(
    private service: FotosService
  ) { }

  ngOnInit(): void {
    this.service.listar('supermercado').subscribe((listaSupermercado) => {
      this.listaSupermercado = listaSupermercado
    })
  }

}
