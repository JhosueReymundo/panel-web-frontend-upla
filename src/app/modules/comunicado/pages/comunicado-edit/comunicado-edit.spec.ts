import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicadoEdit } from './comunicado-edit';

describe('ComunicadoEdit', () => {
  let component: ComunicadoEdit;
  let fixture: ComponentFixture<ComunicadoEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunicadoEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunicadoEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
