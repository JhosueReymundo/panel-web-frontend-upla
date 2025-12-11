import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentogList } from './documentog-list';

describe('DocumentogList', () => {
  let component: DocumentogList;
  let fixture: ComponentFixture<DocumentogList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentogList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentogList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
