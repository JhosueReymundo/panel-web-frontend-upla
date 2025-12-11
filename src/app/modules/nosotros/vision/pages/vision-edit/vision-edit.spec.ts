import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionEdit } from './vision-edit';

describe('VisionEdit', () => {
  let component: VisionEdit;
  let fixture: ComponentFixture<VisionEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisionEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisionEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
