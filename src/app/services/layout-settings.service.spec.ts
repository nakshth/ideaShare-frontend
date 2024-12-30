import { TestBed } from '@angular/core/testing';

import { LayoutSettingsService } from './layout-settings.service';

describe('LayoutSettingsService', () => {
  let service: LayoutSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
