import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolEdit } from './rol-edit';

describe('RolEdit', () => {
  let component: RolEdit;
  let fixture: ComponentFixture<RolEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
