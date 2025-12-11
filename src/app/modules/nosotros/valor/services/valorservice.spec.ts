import { TestBed } from '@angular/core/testing';

import { Valorservice } from './valorservice';

describe('Valorservice', () => {
  let service: Valorservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Valorservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
