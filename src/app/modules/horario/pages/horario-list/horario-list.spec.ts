import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioList } from './horario-list';

describe('HorarioList', () => {
  let component: HorarioList;
  let fixture: ComponentFixture<HorarioList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorarioList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
