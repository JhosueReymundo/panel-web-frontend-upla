import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoCreate } from './equipo-create';

describe('EquipoCreate', () => {
  let component: EquipoCreate;
  let fixture: ComponentFixture<EquipoCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipoCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipoCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
