import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { FotosService } from 'src/app/core/services/fotos.service';
import { Categoria, Foto } from 'src/app/core/tipos';

@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.component.html',
  styleUrls: ['./magazine.component.css']
})
export class MagazineComponent implements OnInit {

  listaMagazine: Foto[] = [];
  categoria!: Categoria

  constructor(
    private service: FotosService,
    private categoriaService: CategoriasService,
  ) { }

  ngOnInit(): void {
    this.categoriaService.buscarPorId(2).subscribe((categoria) => {
      this.categoria = categoria
    })

    this.service.listar('2').subscribe((listaMagazine) => {
      this.listaMagazine = listaMagazine
    })
  }

}
