import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioEdit } from './usuario-edit';

describe('UsuarioEdit', () => {
  let component: UsuarioEdit;
  let fixture: ComponentFixture<UsuarioEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
