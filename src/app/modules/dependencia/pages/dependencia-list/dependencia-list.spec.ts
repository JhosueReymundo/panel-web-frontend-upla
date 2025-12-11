import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenciaList } from './dependencia-list';

describe('DependenciaList', () => {
  let component: DependenciaList;
  let fixture: ComponentFixture<DependenciaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DependenciaList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DependenciaList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
