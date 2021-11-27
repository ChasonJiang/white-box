import { TestBed } from '@angular/core/testing';

import { PostCardDetailService } from './post-card-detail.service';

describe('PostCardDetailService', () => {
  let service: PostCardDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostCardDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
