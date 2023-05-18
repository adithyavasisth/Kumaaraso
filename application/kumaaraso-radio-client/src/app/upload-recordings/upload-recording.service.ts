import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface RadioRecording {
  fileId: string;
  timestamp: string;
  pathUrl: string;
  language: string;
}

@Injectable({
  providedIn: 'root',
})
export class UploadRecordingService {
  private baseUrl = 'http://34.70.4.81:8000/api';

  constructor(private http: HttpClient) {}

  uploadRecording(audio: File, language: string) {
    const formData = new FormData();
    formData.append('recording', audio);
    formData.append('language', language);

    const url = `${this.baseUrl}/radio-recordings`;
    return this.http.post(url, formData);
  }

  getRecordings() {
    const url = `${this.baseUrl}/radio-recordings`;
    return this.http.get<RadioRecording[]>(url);
  }
}
