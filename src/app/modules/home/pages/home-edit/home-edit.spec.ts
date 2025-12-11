import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEdit } from './home-edit';

describe('HomeEdit', () => {
  let component: HomeEdit;
  let fixture: ComponentFixture<HomeEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
