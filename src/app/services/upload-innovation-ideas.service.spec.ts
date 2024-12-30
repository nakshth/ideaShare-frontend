import { TestBed } from '@angular/core/testing';

import { UploadInnovationIdeasService } from './upload-innovation-ideas.service';

describe('UploadInnovationIdeasService', () => {
  let service: UploadInnovationIdeasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadInnovationIdeasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
