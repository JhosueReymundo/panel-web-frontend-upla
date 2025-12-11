import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioEdit } from './servicio-edit';

describe('ServicioEdit', () => {
  let component: ServicioEdit;
  let fixture: ComponentFixture<ServicioEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicioEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
