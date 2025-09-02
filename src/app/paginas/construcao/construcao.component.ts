import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { FotosService } from 'src/app/core/services/fotos.service';
import { Categoria, Foto } from 'src/app/core/tipos';

@Component({
  selector: 'app-construcao',
  templateUrl: './construcao.component.html',
  styleUrls: ['./construcao.component.css']
})
export class ConstrucaoComponent implements OnInit {

  listaConstrucao: Foto[] = [];
  categoria!: Categoria

  constructor(
    private service: FotosService,
    private categoriaService: CategoriasService,
  ) { }

  ngOnInit(): void {
    this.categoriaService.buscarPorId(4).subscribe((categoria) => {
      this.categoria = categoria
    })

    this.service.listar('4').subscribe((listaConstrucao) => {
      this.listaConstrucao = listaConstrucao
    })
  }

}
