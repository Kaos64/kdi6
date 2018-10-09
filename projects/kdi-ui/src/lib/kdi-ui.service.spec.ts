import { TestBed, inject } from '@angular/core/testing';

import { KdiUiService } from './kdi-ui.service';

describe('KdiUiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KdiUiService]
    });
  });

  it('should be created', inject([KdiUiService], (service: KdiUiService) => {
    expect(service).toBeTruthy();
  }));
});
