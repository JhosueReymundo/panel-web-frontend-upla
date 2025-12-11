import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaRespuestas } from './encuesta-respuestas';

describe('EncuestaRespuestas', () => {
  let component: EncuestaRespuestas;
  let fixture: ComponentFixture<EncuestaRespuestas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncuestaRespuestas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncuestaRespuestas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
