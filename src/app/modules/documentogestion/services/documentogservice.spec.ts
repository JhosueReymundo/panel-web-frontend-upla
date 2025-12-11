import { TestBed } from '@angular/core/testing';

import { Documentogservice } from './documentogservice';

describe('Documentogservice', () => {
  let service: Documentogservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Documentogservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
