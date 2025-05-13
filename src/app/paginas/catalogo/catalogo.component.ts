import { AfterViewInit, Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CatalogoService } from 'src/app/core/services/catalogo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit, AfterViewInit {
  @ViewChild('catalogText') catalogText!: ElementRef;
  @ViewChild('catalogImage') catalogImage!: ElementRef;

  lista: any[] = [];
  link: string = environment.urlImagem
  ano: number = new Date().getFullYear()

  constructor(
    private service: CatalogoService,
    private renderer: Renderer2,
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

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(this.catalogText.nativeElement, 'catalog-animate-text');
            this.renderer.addClass(this.catalogImage.nativeElement, 'catalog-animate-image');
            observer.disconnect(); // Remove o observer depois da primeira animação
          }
        });
      },
      { threshold: 0.3 } // aciona quando 30% estiver visível
    );

    observer.observe(this.catalogText.nativeElement);
  }

}
