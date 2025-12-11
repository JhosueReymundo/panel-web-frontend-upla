import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisionList } from './mision-list';

describe('MisionList', () => {
  let component: MisionList;
  let fixture: ComponentFixture<MisionList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisionList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisionList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
