import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicadoForm } from './comunicado-form';

describe('ComunicadoForm', () => {
  let component: ComunicadoForm;
  let fixture: ComponentFixture<ComunicadoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunicadoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunicadoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
