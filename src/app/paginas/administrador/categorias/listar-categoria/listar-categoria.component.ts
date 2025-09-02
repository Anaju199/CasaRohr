import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { Categoria } from 'src/app/core/tipos';

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.component.html',
  styleUrls: ['./listar-categoria.component.css']
})
export class ListarCategoriaComponent implements OnInit {

  listaCategoria: Categoria[] = [];
  paginaAtual: number = 1;
  totalPaginas: number = 1;
  itensPorPagina: number = 10;
  filtroCategoria: string = '';

  constructor(
    private service: CategoriasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarCategorias()
  }

  carregarCategorias(){
    this.service.listarTodos(this.paginaAtual, this.itensPorPagina).subscribe((response) => {
      this.listaCategoria = response.results
      this.totalPaginas = Math.ceil(response.count/this.itensPorPagina)
    })
  }


  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.carregarCategorias();
    }
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.carregarCategorias();
    }
  }

  habilitarBotao(direcao: string): string {
    if (direcao === 'anterior' && this.paginaAtual === 1) {
      return 'botao_pag_desabilitado';
    }
    if (direcao === 'proxima' && this.paginaAtual === this.totalPaginas) {
      return 'botao_pag_desabilitado';
    }
    return 'botao_pag';
  }


  voltar() {
    this.router.navigate(['/administrador'])
  }

  excluir(id: number) {
    if (confirm('Tem certeza que deseja excluir?')){
      this.service.excluir(id).subscribe(() => {
        alert('Categoria excluida com sucesso.')
        this.recarregarComponente()
      })
    }
  }

  recarregarComponente(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }

  pesquisarCategoria(){
    this.service.listar(this.filtroCategoria)
    .subscribe(listaTodosCategorias => {
      this.listaCategoria = listaTodosCategorias
    })
  }
}
