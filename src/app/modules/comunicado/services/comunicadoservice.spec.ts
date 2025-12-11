import { TestBed } from '@angular/core/testing';

import { Comunicadoservice } from './comunicadoservice';

describe('Comunicadoservice', () => {
  let service: Comunicadoservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Comunicadoservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
