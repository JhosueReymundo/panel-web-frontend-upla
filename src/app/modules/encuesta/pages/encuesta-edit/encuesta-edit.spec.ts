import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaEdit } from './encuesta-edit';

describe('EncuestaEdit', () => {
  let component: EncuestaEdit;
  let fixture: ComponentFixture<EncuestaEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncuestaEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncuestaEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
