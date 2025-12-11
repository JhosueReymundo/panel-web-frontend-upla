import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorForm } from './valor-form';

describe('ValorForm', () => {
  let component: ValorForm;
  let fixture: ComponentFixture<ValorForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValorForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
