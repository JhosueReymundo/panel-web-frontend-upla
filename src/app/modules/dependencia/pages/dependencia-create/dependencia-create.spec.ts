import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependenciaCreate } from './dependencia-create';

describe('DependenciaCreate', () => {
  let component: DependenciaCreate;
  let fixture: ComponentFixture<DependenciaCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DependenciaCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DependenciaCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
