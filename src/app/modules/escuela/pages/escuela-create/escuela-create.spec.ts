import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscuelaCreate } from './escuela-create';

describe('EscuelaCreate', () => {
  let component: EscuelaCreate;
  let fixture: ComponentFixture<EscuelaCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscuelaCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscuelaCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
