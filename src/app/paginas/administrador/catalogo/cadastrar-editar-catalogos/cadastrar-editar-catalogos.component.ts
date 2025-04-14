import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogoService } from 'src/app/core/services/catalogo.service';

@Component({
  selector: 'app-cadastrar-editar-catalogos',
  templateUrl: './cadastrar-editar-catalogos.component.html',
  styleUrls: ['./cadastrar-editar-catalogos.component.css']
})
export class CadastrarEditarCatalogosComponent implements OnInit {

  id?: number
  formulario!: FormGroup;
  cargos: string[] = [];
  ano: number = new Date().getFullYear()
  titulo: string = 'Adicione informações do catalogo:'

  constructor(
    private service: CatalogoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      descricao: ['',Validators.compose([
        Validators.required
      ])],
      arquivo: [null,Validators.compose([
        Validators.required
      ])]
    })

    const id = this.route.snapshot.paramMap.get('id')

    if(id){
      this.titulo = 'Editar informações do catalogo:'

      this.service.buscarPorId(parseInt(id!)).subscribe((catalogo) => {
        this.id = catalogo.id

        this.formulario = this.formBuilder.group({
          id: [catalogo.id],
          descricao: [catalogo.descricao,Validators.compose([
            Validators.required
          ])],
          arquivo: ['',Validators.compose([
            Validators.required
          ])]
        })
      })
    }
  }

  editar() {
    if(this.formulario.valid){
      const formData = new FormData();
      formData.append('descricao', this.formulario.get('descricao')!.value);

      const arquivo = this.formulario.get('arquivo')!.value;
      if (arquivo instanceof File) {
        formData.append('arquivo', arquivo);
      }

      const id = this.formulario.get('id')!.value;
      this.service.editar(id, formData).subscribe(() => {
        alert('Catalogo editado com sucesso.')
        this.router.navigate(['/listarCatalogos'])
      })
    }
  }

  criar() {
    if(this.formulario.valid){
      const formData = new FormData();
      formData.append('descricao', this.formulario.get('descricao')!.value);

      const arquivo = this.formulario.get('arquivo')!.value;
      if (arquivo instanceof File) {
        formData.append('arquivo', arquivo);
      }

      this.service.criar(formData).subscribe(() => {
        alert('Catalogo cadastrado com sucesso.')
        this.router.navigate(['/listarCatalogos'])
      }, error => {
        alert('Não foi possivel cadastrar. Verifique se já não existe um catalogo cadastrado com esse descricao.')
      });
    } else {
      alert('Formulário Inválido')
    }
  }

  cancelar() {
    this.router.navigate(['/listarCatalogos'])
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao'
    } else {
      return 'botao__desabilitado'
    }
  }

  processarArquivo(event: any) {
    const file: File = event.files[0];
    this.formulario.patchValue({ arquivo: file });
    this.formulario.get('arquivo')!.updateValueAndValidity();
  }

}
