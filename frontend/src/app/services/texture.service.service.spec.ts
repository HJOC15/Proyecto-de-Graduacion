import { TestBed } from '@angular/core/testing';

import { TextureServiceService } from './texture.service.service';

describe('TextureServiceService', () => {
  let service: TextureServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextureServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
