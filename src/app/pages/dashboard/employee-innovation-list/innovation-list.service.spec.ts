import { TestBed } from '@angular/core/testing';

import { InnovationListService } from './innovation-list.service';

describe('InnovationListService', () => {
  let service: InnovationListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InnovationListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
