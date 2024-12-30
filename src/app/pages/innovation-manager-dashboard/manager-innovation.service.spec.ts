import { TestBed } from '@angular/core/testing';

import { ManagerInnovationService } from './manager-innovation.service';

describe('ManagerInnovationService', () => {
  let service: ManagerInnovationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagerInnovationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
