import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicadoList } from './comunicado-list';

describe('ComunicadoList', () => {
  let component: ComunicadoList;
  let fixture: ComponentFixture<ComunicadoList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComunicadoList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunicadoList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
