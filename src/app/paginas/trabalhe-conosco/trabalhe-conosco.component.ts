import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { EmailService } from 'src/app/core/services/email.service';

@Component({
  selector: 'app-trabalhe-conosco',
  templateUrl: './trabalhe-conosco.component.html',
  styleUrls: ['./trabalhe-conosco.component.css']
})
export class TrabalheConoscoComponent implements OnInit {

  recrutamentoEmail = 'contato@casarohr.com.br'; // altere para o e‑mail real
  form: FormGroup;
  enviado = false;
  loading = false;
  uploadFileName: string | null = null;


constructor(
  private fb: FormBuilder,
  private service: EmailService,
  private router: Router

) {
    this.form = this.fb.group({
      nome: ["", [Validators.required, Validators.minLength(2)]],
      email: ["", [Validators.required, Validators.email]],
      cargoInteressado: [""],
      assunto: ["Interesse em vaga"],
      mensagem: ["", [Validators.maxLength(1000)]],
      destinatario: this.recrutamentoEmail,
      anexo: [null],
      consent: [true, Validators.requiredTrue]
    });

  }

  ngOnInit(): void {
  }

  enviar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.service.enviarEmail(this.form.value).subscribe({
      next: () => {
        this.loading = false;
        this.enviado = true;
        this.form.reset();
         setTimeout(() => {
          this.recarregarComponente()
        }, 3000);
      },
      error: () => {
        this.loading = false;
        alert("Erro ao enviar mensagem. Tente novamente.");
      }
    });
  }
  
  recarregarComponente(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }


  // onFileChange(event: Event) {
  //   const input = event.target as HTMLInputElement;
    
  //   if (input.files && input.files.length) {
  //     const file = input.files[0];
  //     this.form.patchValue({ anexo: file });
  //     this.uploadFileName = file.name;
  //   }
  // }


  // Funções utilitárias para template
  get nome() { return this.form.get('nome'); }
  get email() { return this.form.get('email'); }
  get consent() { return this.form.get('consent'); }

}
