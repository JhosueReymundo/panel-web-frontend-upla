import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioCard } from './horario-card';

describe('HorarioCard', () => {
  let component: HorarioCard;
  let fixture: ComponentFixture<HorarioCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorarioCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
