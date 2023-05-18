import { TestBed } from '@angular/core/testing';

import { UploadRecordingService } from './upload-recording.service';

describe('UploadRecordingService', () => {
  let service: UploadRecordingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadRecordingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
