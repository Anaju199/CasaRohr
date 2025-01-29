import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../../core/services/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private authService: AutenticacaoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      login: ['',Validators.compose([ //15035113671
        Validators.required
      ])],
      senha: ['',Validators.compose([ //ana123
        Validators.required
      ])]
    })
  }


  login() {
    if(this.formulario.valid) {

      const login = this.formulario.value.login;
      const senha = this.formulario.value.senha;
      this.authService.autenticar(login, senha).subscribe({
        next: (value) => {
          alert('Login realizado com sucesso')
          this.router.navigateByUrl('/paginaInicial')
          this.formulario.reset();
        },
        error: (err) => {
          alert('Login ou senha incorretos')
        },
      })
    }
  }

  cancelar() {
    this.router.navigate(['/paginaInicial'])
  }

  habilitarBotao(): string {
    if(this.formulario.valid) {
      return 'botao_forms'
    } else {
      return 'botao__desabilitado'
    }
  }
}
