import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentogForm } from './documentog-form';

describe('DocumentogForm', () => {
  let component: DocumentogForm;
  let fixture: ComponentFixture<DocumentogForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentogForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentogForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
