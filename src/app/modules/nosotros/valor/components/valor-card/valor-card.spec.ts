import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorCard } from './valor-card';

describe('ValorCard', () => {
  let component: ValorCard;
  let fixture: ComponentFixture<ValorCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValorCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
