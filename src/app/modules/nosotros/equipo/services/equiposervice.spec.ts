import { TestBed } from '@angular/core/testing';

import { Equiposervice } from './equiposervice';

describe('Equiposervice', () => {
  let service: Equiposervice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Equiposervice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
