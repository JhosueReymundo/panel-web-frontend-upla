import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorList } from './valor-list';

describe('ValorList', () => {
  let component: ValorList;
  let fixture: ComponentFixture<ValorList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValorList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
