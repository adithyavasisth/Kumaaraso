import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Recording, RecordingService } from './recording.service';

@Component({
  selector: 'app-browse-recordings',
  templateUrl: './browse-recordings.component.html',
  styleUrls: ['./browse-recordings.component.scss'],
})
export class BrowseRecordingsComponent implements OnInit {
  displayedColumns: string[] = ['caller', 'timestamp', 'language', 'pathUrl'];
  recordings: Recording[] = [];
  filteredRecordings: MatTableDataSource<Recording>;
  filterText: string = '';

  @ViewChild(MatSort) sort: MatSort;

  constructor(private recordingService: RecordingService) {}

  ngOnInit(): void {
    this.loadRecordings();
  }

  loadRecordings() {
    this.recordingService.getRecordings().subscribe({
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

  applyFilter(column: string, event: Event) {
    let value = (event.target as HTMLInputElement).value;
    value = value.trim().toLowerCase();

    this.filteredRecordings.filterPredicate = (
      recording: Recording,
      filter: string
    ) => {
      switch (column) {
        case 'caller':
          return recording.caller.toLowerCase().includes(filter);
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
