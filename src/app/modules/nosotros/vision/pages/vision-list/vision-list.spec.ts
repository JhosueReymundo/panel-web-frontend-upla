import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionList } from './vision-list';

describe('VisionList', () => {
  let component: VisionList;
  let fixture: ComponentFixture<VisionList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisionList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisionList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
