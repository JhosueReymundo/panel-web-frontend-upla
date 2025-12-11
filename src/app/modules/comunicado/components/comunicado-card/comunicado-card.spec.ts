import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicadoCard } from './comunicado-card';

describe('ComunicadoCard', () => {
  let component: ComunicadoCard;
  let fixture: ComponentFixture<ComunicadoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunicadoCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunicadoCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
