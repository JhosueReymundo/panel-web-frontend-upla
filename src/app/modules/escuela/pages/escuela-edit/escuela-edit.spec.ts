import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscuelaEdit } from './escuela-edit';

describe('EscuelaEdit', () => {
  let component: EscuelaEdit;
  let fixture: ComponentFixture<EscuelaEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscuelaEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscuelaEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
