import { TestBed } from '@angular/core/testing';

import { LogService} from './logs.service';

describe('LogserviceService', () => {
  let service: LogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
