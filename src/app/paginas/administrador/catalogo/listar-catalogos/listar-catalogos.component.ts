import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogoService } from 'src/app/core/services/catalogo.service';

@Component({
  selector: 'app-listar-catalogos',
  templateUrl: './listar-catalogos.component.html',
  styleUrls: ['./listar-catalogos.component.css']
})
export class ListarCatalogosComponent implements OnInit {

  listaCatalogo: any[] = [];
  paginaAtual: number = 1;
  totalPaginas: number = 1;
  itensPorPagina: number = 10;
  filtroCatalogo: string = ''

  constructor(
    private service: CatalogoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarCatalogo()
  }

  carregarCatalogo(){
    this.service.listarTodos(this.paginaAtual, this.itensPorPagina).subscribe((response) => {
      this.listaCatalogo = response.results
      this.totalPaginas = Math.ceil(response.count/this.itensPorPagina)
    })
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.carregarCatalogo();
    }
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.carregarCatalogo();
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
        alert('Catalogo excluida com sucesso.')
        this.recarregarComponente()
      })
    }
  }

  recarregarComponente(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }

  pesquisarCatalogo(){
    this.service.listar()
    .subscribe(listaTodosCatalogos => {
      this.listaCatalogo = listaTodosCatalogos
    })
  }
}
