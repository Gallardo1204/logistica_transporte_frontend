import { TestBed } from '@angular/core/testing';

import { LogiMaritimaService } from './logi-maritima.service';

describe('LogiMaritimaService', () => {
  let service: LogiMaritimaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogiMaritimaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
