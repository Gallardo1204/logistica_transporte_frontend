import { TestBed } from '@angular/core/testing';

import { LogiTerrestreService } from './logi-terrestre.service';

describe('LogiTerrestreService', () => {
  let service: LogiTerrestreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogiTerrestreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
