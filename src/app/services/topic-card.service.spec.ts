import { TestBed } from '@angular/core/testing';

import { TopicCardService } from './topic-card.service';

describe('TopicCardService', () => {
  let service: TopicCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopicCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
