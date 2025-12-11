import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaCard } from './encuesta-card';

describe('EncuestaCard', () => {
  let component: EncuestaCard;
  let fixture: ComponentFixture<EncuestaCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncuestaCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncuestaCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
