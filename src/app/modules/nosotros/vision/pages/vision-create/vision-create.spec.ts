import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionCreate } from './vision-create';

describe('VisionCreate', () => {
  let component: VisionCreate;
  let fixture: ComponentFixture<VisionCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisionCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisionCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
