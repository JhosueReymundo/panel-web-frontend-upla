import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisionCreate } from './mision-create';

describe('MisionCreate', () => {
  let component: MisionCreate;
  let fixture: ComponentFixture<MisionCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisionCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisionCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
