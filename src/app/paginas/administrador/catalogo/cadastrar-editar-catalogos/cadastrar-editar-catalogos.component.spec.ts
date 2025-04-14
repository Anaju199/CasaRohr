import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEditarCatalogosComponent } from './cadastrar-editar-catalogos.component';

describe('CadastrarEditarCatalogosComponent', () => {
  let component: CadastrarEditarCatalogosComponent;
  let fixture: ComponentFixture<CadastrarEditarCatalogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarEditarCatalogosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarEditarCatalogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
