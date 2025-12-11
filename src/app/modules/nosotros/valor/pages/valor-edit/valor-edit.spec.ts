import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorEdit } from './valor-edit';

describe('ValorEdit', () => {
  let component: ValorEdit;
  let fixture: ComponentFixture<ValorEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValorEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
