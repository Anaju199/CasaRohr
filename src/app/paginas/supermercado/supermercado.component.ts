import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { FotosService } from 'src/app/core/services/fotos.service';
import { Categoria, Foto } from 'src/app/core/tipos';

@Component({
  selector: 'app-supermercado',
  templateUrl: './supermercado.component.html',
  styleUrls: ['./supermercado.component.css']
})
export class SupermercadoComponent implements OnInit {

  listaSupermercado: Foto[] = [];
  categoria!: Categoria

  constructor(
    private service: FotosService,
    private categoriaService: CategoriasService,
  ) { }

  ngOnInit(): void {
    this.categoriaService.buscarPorId(1).subscribe((categoria) => {
      this.categoria = categoria
    })

    this.service.listar('1').subscribe((listaSupermercado) => {
      this.listaSupermercado = listaSupermercado
    })
  }

}
