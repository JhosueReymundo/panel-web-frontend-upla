import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaList } from './encuesta-list';

describe('EncuestaList', () => {
  let component: EncuestaList;
  let fixture: ComponentFixture<EncuestaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EncuestaList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncuestaList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
