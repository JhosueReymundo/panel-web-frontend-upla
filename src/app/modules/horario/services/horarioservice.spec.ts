import { TestBed } from '@angular/core/testing';

import { Horarioservice } from './horarioservice';

describe('Horarioservice', () => {
  let service: Horarioservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Horarioservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
