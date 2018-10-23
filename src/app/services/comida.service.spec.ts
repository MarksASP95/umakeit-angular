import { TestBed } from '@angular/core/testing';

import { ComidaService } from './comida.service';

describe('ComidaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComidaService = TestBed.get(ComidaService);
    expect(service).toBeTruthy();
  });
});
