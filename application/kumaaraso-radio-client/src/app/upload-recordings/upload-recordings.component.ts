import { UploadRecordingService } from './upload-recording.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-recordings',
  templateUrl: './upload-recordings.component.html',
  styleUrls: ['./upload-recordings.component.scss'],
})
export class UploadRecordingsComponent {
  selectedFile: File | null = null;
  language: string = 'en';

  constructor(private uploadRecordingService: UploadRecordingService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadRecording() {
    if (!this.selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    this.uploadRecordingService
      .uploadRecording(this.selectedFile, this.language)
      .subscribe({
        next: () => {
          console.log('Upload successful');
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }
}
