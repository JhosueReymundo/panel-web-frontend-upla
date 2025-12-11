import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolCreate } from './rol-create';

describe('RolCreate', () => {
  let component: RolCreate;
  let fixture: ComponentFixture<RolCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
