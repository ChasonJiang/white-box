import { TestBed } from '@angular/core/testing';

import { PostCardService } from './PostCard.service';

describe('PostCardService', () => {
  let service: PostCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
