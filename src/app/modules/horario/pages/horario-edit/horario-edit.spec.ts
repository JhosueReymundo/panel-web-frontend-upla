import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioEdit } from './horario-edit';

describe('HorarioEdit', () => {
  let component: HorarioEdit;
  let fixture: ComponentFixture<HorarioEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorarioEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
