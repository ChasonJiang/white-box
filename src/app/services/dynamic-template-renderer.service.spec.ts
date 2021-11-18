import { TestBed } from '@angular/core/testing';

import { DynamicTemplateRendererService } from './dynamic-template-renderer.service';

describe('DynamicTemplateRendererService', () => {
  let service: DynamicTemplateRendererService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicTemplateRendererService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
