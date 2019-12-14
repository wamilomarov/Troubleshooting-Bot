import { TestBed } from '@angular/core/testing';

import { CsrService } from './csr.service';

describe('CsrService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CsrService = TestBed.get(CsrService);
    expect(service).toBeTruthy();
  });
});
