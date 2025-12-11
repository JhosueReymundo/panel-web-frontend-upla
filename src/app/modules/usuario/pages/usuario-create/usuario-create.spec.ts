import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCreate } from './usuario-create';

describe('UsuarioCreate', () => {
  let component: UsuarioCreate;
  let fixture: ComponentFixture<UsuarioCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
