import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaForm } from './encuesta-form';

describe('EncuestaForm', () => {
  let component: EncuestaForm;
  let fixture: ComponentFixture<EncuestaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncuestaForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncuestaForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
