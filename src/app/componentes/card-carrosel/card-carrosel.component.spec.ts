import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCarroselComponent } from './card-carrosel.component';

describe('CardCarroselComponent', () => {
  let component: CardCarroselComponent;
  let fixture: ComponentFixture<CardCarroselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCarroselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCarroselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
