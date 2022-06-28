import { TestBed } from '@angular/core/testing';

import { EleEditService } from './eleEdit.service';

describe('ComponentsService', () => {
  let service: EleEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EleEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
