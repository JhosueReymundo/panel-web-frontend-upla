import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisionEdit } from './mision-edit';

describe('MisionEdit', () => {
  let component: MisionEdit;
  let fixture: ComponentFixture<MisionEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisionEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisionEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
