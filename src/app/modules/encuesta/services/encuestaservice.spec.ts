import { TestBed } from '@angular/core/testing';

import { Encuestaservice } from './encuestaservice';

describe('Encuestaservice', () => {
  let service: Encuestaservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Encuestaservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
