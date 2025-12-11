import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenciaEdit } from './dependencia-edit';

describe('DependenciaEdit', () => {
  let component: DependenciaEdit;
  let fixture: ComponentFixture<DependenciaEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DependenciaEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DependenciaEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
