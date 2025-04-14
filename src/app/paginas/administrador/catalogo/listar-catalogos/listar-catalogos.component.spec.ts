import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCatalogosComponent } from './listar-catalogos.component';

describe('ListarCatalogosComponent', () => {
  let component: ListarCatalogosComponent;
  let fixture: ComponentFixture<ListarCatalogosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCatalogosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCatalogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
