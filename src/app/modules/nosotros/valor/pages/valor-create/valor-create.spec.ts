import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorCreate } from './valor-create';

describe('ValorCreate', () => {
  let component: ValorCreate;
  let fixture: ComponentFixture<ValorCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValorCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
