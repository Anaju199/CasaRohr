import { Component, OnInit } from '@angular/core';
import { FotosService } from 'src/app/core/services/fotos.service';
import { Categoria, Foto } from 'src/app/core/tipos';
import { ActivatedRoute } from '@angular/router';
import { CategoriasService } from 'src/app/core/services/categorias.service';

@Component({
  selector: 'app-moveis',
  templateUrl: './moveis.component.html',
  styleUrls: ['./moveis.component.css']
})
export class MoveisComponent implements OnInit {

  listaMoveis: Foto[] = [];
  listaCabecalho: Foto[] = [];
  searchTerm: string = '';
  categoria!: Categoria

  constructor(
    private service: FotosService,
    private categoriaService: CategoriasService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Subscribe to query params to get search term
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      if (this.searchTerm) {
        this.filterContent(this.searchTerm);
      }
    });

    this.categoriaService.buscarPorId(3).subscribe((categoria) => {
      this.categoria = categoria
    })

    this.service.listar('3').subscribe((listaMoveis) => {
      this.listaMoveis = listaMoveis
    })

    this.service.listar('5').subscribe((listaCabecalho) => {
      this.listaCabecalho = listaCabecalho
    })
  }

  private filterContent(searchTerm: string): void {
    // Implement your filtering logic here
    // This could filter products, highlight matching content, etc.
    console.log('Filtering móveis content with term:', searchTerm);
  }

}
