import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicadoCreate } from './comunicado-create';

describe('ComunicadoCreate', () => {
  let component: ComunicadoCreate;
  let fixture: ComponentFixture<ComunicadoCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunicadoCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunicadoCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
