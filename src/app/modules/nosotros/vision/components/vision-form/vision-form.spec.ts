import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionForm } from './vision-form';

describe('VisionForm', () => {
  let component: VisionForm;
  let fixture: ComponentFixture<VisionForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisionForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
