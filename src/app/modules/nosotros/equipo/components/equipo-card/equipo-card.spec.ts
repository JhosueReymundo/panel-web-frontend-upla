import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoCard } from './equipo-card';

describe('EquipoCard', () => {
  let component: EquipoCard;
  let fixture: ComponentFixture<EquipoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
