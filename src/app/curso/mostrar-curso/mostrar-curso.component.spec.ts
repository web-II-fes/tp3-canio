import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarCursoComponent } from './mostrar-curso.component';

describe('MostrarCursoComponent', () => {
  let component: MostrarCursoComponent;
  let fixture: ComponentFixture<MostrarCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
