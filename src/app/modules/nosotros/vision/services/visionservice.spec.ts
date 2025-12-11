import { TestBed } from '@angular/core/testing';

import { Visionservice } from './visionservice';

describe('Visionservice', () => {
  let service: Visionservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Visionservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
