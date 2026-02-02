import { AfterViewInit, Component, OnInit, ElementRef, ViewChild, Renderer2, Inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CatalogoService } from 'src/app/core/services/catalogo.service';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit, AfterViewInit {
  @ViewChild('catalogSection') catalogSection!: ElementRef;
  @ViewChild('catalogText') catalogText!: ElementRef;
  @ViewChild('catalogImage') catalogImage!: ElementRef;

  lista: any[] = [];
  link: string = environment.urlImagem
  ano: number = new Date().getFullYear()

  constructor(
    private service: CatalogoService,
    private renderer: Renderer2,
    public sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.service.listar().subscribe((lista) => {
      this.lista = lista
    })
  }

  baixarPrimeiroArquivo() {
    if (this.lista?.length) {
      this.baixarArquivo(this.lista[0].arquivo);
    } 
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
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // adiciona as classes de animação
          this.renderer.addClass(this.catalogText.nativeElement, 'catalog-animate-text');
          this.renderer.addClass(this.catalogImage.nativeElement, 'catalog-animate-image');
          io.disconnect(); // roda só uma vez
        }
      },
      {
        threshold: 0.15,           // 15% visível já dispara
        root: null,                // viewport
        rootMargin: '0px 0px -20% 0px', // dispara um pouco antes do fim
      }
    );

    io.observe(this.catalogSection.nativeElement);
  }

}
