import { TestBed } from '@angular/core/testing';

import { ResolveUidService } from './resolve-uid.service';

describe('ResolveUidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResolveUidService = TestBed.get(ResolveUidService);
    expect(service).toBeTruthy();
  });
});
