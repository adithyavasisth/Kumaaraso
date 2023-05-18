import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRecordingsComponent } from './upload-recordings.component';

describe('UploadRecordingsComponent', () => {
  let component: UploadRecordingsComponent;
  let fixture: ComponentFixture<UploadRecordingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadRecordingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadRecordingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
