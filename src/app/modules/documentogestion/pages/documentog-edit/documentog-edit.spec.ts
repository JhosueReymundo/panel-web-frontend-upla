import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentogEdit } from './documentog-edit';

describe('DocumentogEdit', () => {
  let component: DocumentogEdit;
  let fixture: ComponentFixture<DocumentogEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentogEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentogEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
