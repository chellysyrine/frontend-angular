import { TestBed } from '@angular/core/testing';

import { IndexsService } from './indexs.service';

describe('IndexsService', () => {
  let service: IndexsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
