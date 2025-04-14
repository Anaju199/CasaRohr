import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFotosComponent } from './listar-fotos.component';

describe('ListarFotosComponent', () => {
  let component: ListarFotosComponent;
  let fixture: ComponentFixture<ListarFotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarFotosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
