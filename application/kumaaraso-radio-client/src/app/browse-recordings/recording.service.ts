import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Recording {
  caller: string;
  timestamp: string;
  pathUrl: string;
  language: string;
}

@Injectable({
  providedIn: 'root',
})
export class RecordingService {
  private baseUrl = 'http://34.70.4.81:8000/api';

  constructor(private http: HttpClient) {}

  getRecordings() {
    const url = `${this.baseUrl}/call-recordings`;
    return this.http.get<Recording[]>(url);
  }

}
