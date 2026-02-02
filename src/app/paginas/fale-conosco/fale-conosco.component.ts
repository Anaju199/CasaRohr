import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmailService } from 'src/app/core/services/email.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fale-conosco',
  templateUrl: './fale-conosco.component.html',
  styleUrls: ['./fale-conosco.component.css']
})
export class FaleConoscoComponent implements OnInit {

 contatoEmail = 'contato@casarohr.com.br'; // altere para o e-mail real
 whatsappNumber = '5528999631196'; // número com DDI+DDD+telefone


  form: FormGroup;
  enviado = false;
  loading = false;


  constructor(
    private fb: FormBuilder,
    private service: EmailService,
    private router: Router) 
  {
    this.form = this.fb.group({
    nome: ["", [Validators.required, Validators.minLength(2)]],
    email: ["", [Validators.required, Validators.email]],
    destinatario: this.contatoEmail,
    assunto: "Novo contato",
    mensagem: ["", [Validators.required, Validators.maxLength(1000)]]
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
    
    // this.service.testaCSRF()
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
    // this.service.enviarEmail(this.form.value).subscribe({
    //   next: r => console.log("✅ POST OK:", r),
    //   error: e => console.error("❌ Erro no envio:", e)
    // });
  }
  
  recarregarComponente(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }

  // atalho para abrir o WhatsApp
  abrirWhatsApp() {
    const mensagem = encodeURIComponent("Olá, gostaria de falar com a empresa.");
    window.open(`https://wa.me/${this.whatsappNumber}?text=${mensagem}`, "_blank");
  }


  get nome() { return this.form.get('nome'); }
  get email() { return this.form.get('email'); }
  get mensagem() { return this.form.get('mensagem'); }

}
