import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscuelaList } from './escuela-list';

describe('EscuelaList', () => {
  let component: EscuelaList;
  let fixture: ComponentFixture<EscuelaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscuelaList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscuelaList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
