import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeForm } from './home-form';

describe('HomeForm', () => {
  let component: HomeForm;
  let fixture: ComponentFixture<HomeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
