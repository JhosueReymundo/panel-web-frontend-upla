import { TestBed } from '@angular/core/testing';

import { Dialogservice } from './dialogservice';

describe('Dialogservice', () => {
  let service: Dialogservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Dialogservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
