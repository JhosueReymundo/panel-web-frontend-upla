import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaBuilder } from './encuesta-builder';

describe('EncuestaBuilder', () => {
  let component: EncuestaBuilder;
  let fixture: ComponentFixture<EncuestaBuilder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncuestaBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncuestaBuilder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
