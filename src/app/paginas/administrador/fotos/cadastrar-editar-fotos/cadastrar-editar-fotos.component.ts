import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { Categoria } from 'src/app/core/tipos';
import { FotosService } from 'src/app/core/services/fotos.service';

@Component({
  selector: 'app-cadastrar-editar-fotos',
  templateUrl: './cadastrar-editar-fotos.component.html',
  styleUrls: ['./cadastrar-editar-fotos.component.css']
})
export class CadastrarEditarFotosComponent implements OnInit {

  id?: number
  formulario!: FormGroup;
  categorias: Categoria[] = [];
  ano: number = new Date().getFullYear()
  titulo: string = 'Adicione um novo Foto:'

  constructor(
    private service: FotosService,
    private categoriaService: CategoriasService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.categoriaService.listar('').subscribe(
      categorias => {
        this.categorias = categorias;
      },
      error => {
        console.error('Erro ao recuperar categorias:', error);
      }
    );

    this.formulario = this.formBuilder.group({
      categoria: ['',Validators.compose([
        Validators.required
      ])],
      descricao: [''],
      foto: [null]
    })

    const id = this.route.snapshot.paramMap.get('id')

    if(id){
      this.titulo = 'Editar Fotos:'

      this.service.buscarPorId(parseInt(id!)).subscribe((foto) => {
        this.id = foto.id

        this.formulario = this.formBuilder.group({
          id: [foto.id],
          categoria: [foto.categoria,Validators.compose([
            Validators.required
          ])],
          descricao: [foto.descricao],
          foto: ['']
        })
      })
    }
  }

  editar() {
    if(this.formulario.valid){
      const formData = new FormData();
      formData.append('categoria', this.formulario.get('categoria')!.value);
      formData.append('descricao', this.formulario.get('descricao')!.value);

      console.log(this.formulario.get('foto')!.value)
      const foto = this.formulario.get('foto')!.value;
      if (foto instanceof File) {
        formData.append('foto', foto);
      }

      const id = this.formulario.get('id')!.value;
      this.service.editar(id, formData).subscribe(() => {
        alert('Foto editada com sucesso.')
        this.router.navigate(['/listarFotos'])
      })
    }
  }

  criar() {
    if(this.formulario.valid){
      const formData = new FormData();
      formData.append('categoria', this.formulario.get('categoria')!.value);
      formData.append('descricao', this.formulario.get('descricao')!.value);

      console.log(this.formulario.get('foto')!.value)
      const foto = this.formulario.get('foto')!.value;
      if (foto instanceof File) {
        formData.append('foto', foto);
      }

      this.service.criar(formData).subscribe(() => {
        alert('Foto cadastrada com sucesso.')
        this.router.navigate(['/listarFotos'])
      }, error => {
        alert('Não foi possivel cadastrar. Verifique se já não existe um Foto cadastrado com essa categoria e descrição.')
      });
    } else {
      alert('Formulário Inválido')
    }
  }

  cancelar() {
    this.router.navigate(['/listarFotos'])
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
    this.formulario.patchValue({ foto: file });
    this.formulario.get('foto')!.updateValueAndValidity();
  }
}
