import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoEdit } from './equipo-edit';

describe('EquipoEdit', () => {
  let component: EquipoEdit;
  let fixture: ComponentFixture<EquipoEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipoEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipoEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
