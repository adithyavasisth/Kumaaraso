import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UploadRecordingService {
  private baseUrl = 'http://app:3000/api';

  constructor(private http: HttpClient) {}

  uploadRecording(audio: File, language: string) {
    const formData = new FormData();
    formData.append('recording', audio);
    formData.append('language', language);

    const url = `${this.baseUrl}/radio-recordings`;
    return this.http.post(url, formData);
  }
}
