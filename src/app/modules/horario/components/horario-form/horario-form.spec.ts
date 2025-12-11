import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioForm } from './horario-form';

describe('HorarioForm', () => {
  let component: HorarioForm;
  let fixture: ComponentFixture<HorarioForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorarioForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
