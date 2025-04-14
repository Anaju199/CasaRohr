import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEditarFotosComponent } from './cadastrar-editar-fotos.component';

describe('CadastrarEditarFotosComponent', () => {
  let component: CadastrarEditarFotosComponent;
  let fixture: ComponentFixture<CadastrarEditarFotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarEditarFotosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarEditarFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
