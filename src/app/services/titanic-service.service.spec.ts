import { TestBed } from '@angular/core/testing';

import { TitanicServiceService } from './titanic-service.service';

describe('TitanicServiceService', () => {
  let service: TitanicServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TitanicServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
