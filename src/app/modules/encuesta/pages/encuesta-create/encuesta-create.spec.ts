import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaCreate } from './encuesta-create';

describe('EncuestaCreate', () => {
  let component: EncuestaCreate;
  let fixture: ComponentFixture<EncuestaCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncuestaCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncuestaCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
