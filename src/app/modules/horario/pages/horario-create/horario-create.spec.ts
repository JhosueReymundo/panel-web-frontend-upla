import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioCreate } from './horario-create';

describe('HorarioCreate', () => {
  let component: HorarioCreate;
  let fixture: ComponentFixture<HorarioCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorarioCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
