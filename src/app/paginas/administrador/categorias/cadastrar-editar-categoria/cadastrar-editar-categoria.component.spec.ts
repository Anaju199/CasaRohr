import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEditarCategoriaComponent } from './cadastrar-editar-categoria.component';

describe('CadastrarEditarCategoriaComponent', () => {
  let component: CadastrarEditarCategoriaComponent;
  let fixture: ComponentFixture<CadastrarEditarCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarEditarCategoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarEditarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
