import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FotosService } from 'src/app/core/services/fotos.service';
import { Foto } from 'src/app/core/tipos';

@Component({
  selector: 'app-listar-fotos',
  templateUrl: './listar-fotos.component.html',
  styleUrls: ['./listar-fotos.component.css']
})
export class ListarFotosComponent implements OnInit {

  listaFoto: Foto[] = [];
  paginaAtual: number = 1;
  totalPaginas: number = 1;
  itensPorPagina: number = 10;
  filtroFoto: string = '';

  constructor(
    private service: FotosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carregarFotos()
  }

  carregarFotos(){
    this.service.listarTodos(this.paginaAtual, this.itensPorPagina).subscribe((response) => {
      this.listaFoto = response.results
      this.totalPaginas = Math.ceil(response.count/this.itensPorPagina)
    })
  }


  proximaPagina(): void {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.carregarFotos();
    }
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.carregarFotos();
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
        alert('Foto excluida com sucesso.')
        this.recarregarComponente()
      })
    }
  }

  recarregarComponente(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }

  pesquisarFoto(){
    this.service.listar(this.filtroFoto)
    .subscribe(listaTodosFotos => {
      this.listaFoto = listaTodosFotos
    })
  }
}
