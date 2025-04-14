import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CatalogoService } from 'src/app/core/services/catalogo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {

  lista: any[] = [];
  link: string = environment.urlImagem

  constructor(
    private service: CatalogoService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.service.listar().subscribe((lista) => {
      this.lista = lista
    })
  }

  baixarArquivo(nomeArquivo: string) {
    const arquivoUrl = nomeArquivo;

    // Faz a requisição da arquivo como um blob
    fetch(arquivoUrl)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = nomeArquivo;
        link.click();

        // Libera o URL criado
        URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Erro ao baixar o arquivo:', error);
      });
  }
  
}
