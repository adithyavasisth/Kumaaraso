import {
  UploadRecordingService,
  RadioRecording,
} from './upload-recording.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-upload-recordings',
  templateUrl: './upload-recordings.component.html',
  styleUrls: ['./upload-recordings.component.scss'],
})
export class UploadRecordingsComponent implements OnInit {
  selectedFile: File | null = null;
  language: string = 'en';

  // table
  displayedColumns: string[] = [
    'fileId',
    'timestamp',
    'language',
    'pathUrl',
    'delete',
  ];
  recordings: RadioRecording[] = [];
  filteredRecordings: MatTableDataSource<RadioRecording>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  constructor(private uploadRecordingService: UploadRecordingService) {}

  ngOnInit(): void {
    this.loadRecordings();
  }

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
          this.resetInputFields();
          this.loadRecordings();
          console.log('Upload successful');
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  private resetInputFields() {
    this.selectedFile = null;
    this.language = 'en';

    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  loadRecordings() {
    this.uploadRecordingService.getRecordings().subscribe({
      next: (recordings) => {
        this.recordings = recordings;
        this.filteredRecordings = new MatTableDataSource(this.recordings);
        this.filteredRecordings.sort = this.sort;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  deleteRecording(fileId: string, timestamp: string, language: string) {
    if (confirm('Are you sure you want to delete this recording?')) {
      this.uploadRecordingService
        .deleteRecording(fileId, timestamp, language)
        .subscribe({
          next: () => {
            console.log('Delete successful');
            this.loadRecordings();
          },
          error: (error) => {
            console.error('There was an error!', error);
          },
        });
    }
  }

  applyFilter(column: string, event: Event) {
    let value = (event.target as HTMLInputElement).value;
    value = value.trim().toLowerCase();

    this.filteredRecordings.filterPredicate = (
      recording: RadioRecording,
      filter: string
    ) => {
      switch (column) {
        case 'fileId':
          return recording.fileId.toLowerCase().includes(filter);
        case 'timestamp':
          return recording.timestamp.toLowerCase().includes(filter);
        case 'language':
          return recording.language.toLowerCase().includes(filter);
        default:
          return false;
      }
    };

    this.filteredRecordings.filter = value;
  }

  formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
}
