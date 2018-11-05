import { TestBed } from '@angular/core/testing';

import { ImgStorageService } from './img-storage.service';

describe('ImgStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImgStorageService = TestBed.get(ImgStorageService);
    expect(service).toBeTruthy();
  });
});
