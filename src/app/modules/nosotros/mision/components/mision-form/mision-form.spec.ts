import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisionForm } from './mision-form';

describe('MisionForm', () => {
  let component: MisionForm;
  let fixture: ComponentFixture<MisionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisionForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
