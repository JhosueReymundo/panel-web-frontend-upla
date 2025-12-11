import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentogCard } from './documentog-card';

describe('DocumentogCard', () => {
  let component: DocumentogCard;
  let fixture: ComponentFixture<DocumentogCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentogCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentogCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
