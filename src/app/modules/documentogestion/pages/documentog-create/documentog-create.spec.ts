import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentogCreate } from './documentog-create';

describe('DocumentogCreate', () => {
  let component: DocumentogCreate;
  let fixture: ComponentFixture<DocumentogCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentogCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentogCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
