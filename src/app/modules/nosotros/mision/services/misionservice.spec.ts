import { TestBed } from '@angular/core/testing';

import { Misionservice } from './misionservice';

describe('Misionservice', () => {
  let service: Misionservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Misionservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
