import { TestBed } from '@angular/core/testing';

import { ResourcesListService } from './resources-list.service';

describe('ResourcesListService', () => {
  let service: ResourcesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourcesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
