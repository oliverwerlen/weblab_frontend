import { TestBed } from '@angular/core/testing';

import { BlogentriesService } from './blogentries.service';

describe('BlogentriesService', () => {
  let service: BlogentriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogentriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
