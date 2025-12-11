import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionCard } from './vision-card';

describe('VisionCard', () => {
  let component: VisionCard;
  let fixture: ComponentFixture<VisionCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisionCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisionCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
