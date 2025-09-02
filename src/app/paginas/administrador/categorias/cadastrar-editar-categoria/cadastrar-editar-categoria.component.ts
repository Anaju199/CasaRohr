import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { Categoria } from 'src/app/core/tipos';

@Component({
  selector: 'app-cadastrar-editar-categoria',
  templateUrl: './cadastrar-editar-categoria.component.html',
  styleUrls: ['./cadastrar-editar-categoria.component.css']
})
export class CadastrarEditarCategoriaComponent implements OnInit {

  id?: number
  formulario!: FormGroup;
  ano: number = new Date().getFullYear()
  titulo: string = 'Adicione um novo Categoria:'

  constructor(
    private service: CategoriasService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      categoria: ['',Validators.compose([
        Validators.required
      ])],
      texto: ['']
    })

    const id = this.route.snapshot.paramMap.get('id')

    if(id){
      this.titulo = 'Editar Categorias:'

      this.service.buscarPorId(parseInt(id!)).subscribe((categoria) => {
        this.id = categoria.id

        this.formulario = this.formBuilder.group({
          id: [categoria.id],
          categoria: [categoria.categoria,Validators.compose([
            Validators.required
          ])],
          texto: [categoria.texto]
        })
      })
    }
  }

  editar() {
    if(this.formulario.valid){
      const formData = new FormData();
      formData.append('categoria', this.formulario.get('categoria')!.value);
      formData.append('texto', this.formulario.get('texto')!.value);

      console.log(this.formulario.get('categoria')!.value)
      const categoria = this.formulario.get('categoria')!.value;
      if (categoria instanceof File) {
        formData.append('categoria', categoria);
      }

      const id = this.formulario.get('id')!.value;
      this.service.editar(id, formData).subscribe(() => {
        alert('Categoria editada com sucesso.')
        this.router.navigate(['/listarCategorias'])
      })
    }
  }

  criar() {
    if(this.formulario.valid){
      const formData = new FormData();
      formData.append('categoria', this.formulario.get('categoria')!.value);
      formData.append('texto', this.formulario.get('texto')!.value);

      console.log(this.formulario.get('categoria')!.value)
      const categoria = this.formulario.get('categoria')!.value;
      if (categoria instanceof File) {
        formData.append('categoria', categoria);
      }

      this.service.criar(formData).subscribe(() => {
        alert('Categoria cadastrada com sucesso.')
        this.router.navigate(['/listarCategorias'])
      }, error => {
        alert('Não foi possivel cadastrar. Verifique se já não existe um Categoria cadastrado com essa categoria e descrição.')
      });
    } else {
      alert('Formulário Inválido')
    }
  }

  cancelar() {
    this.router.navigate(['/listarCategorias'])
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao'
    } else {
      return 'botao__desabilitado'
    }
  }

}
