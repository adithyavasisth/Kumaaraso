import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Resource {
  id: string;
  resource_provider: string;
  contact_name: string;
  contact_number: string;
}

@Injectable({
  providedIn: 'root',
})
export class ResourcesListService {
  private baseUrl = 'http://34.70.4.81:8000/api';

  constructor(private http: HttpClient) {}

  // get resources from api
  getResources() {
    const url = `${this.baseUrl}/resourceslist`;
    return this.http.get<Resource[]>(url);
  }

  uploadResource(
    resource_provider: string,
    contact_name: string,
    contact_number: string
  ) {
    const formData = new FormData();
    formData.append('resource_provider', resource_provider);
    formData.append('contact_name', contact_name);
    formData.append('contact_number', contact_number);

    const url = `${this.baseUrl}/resourceslist`;
    return this.http.post(url, formData);
  }

  deleteResource(id: string) {
    const url = `${this.baseUrl}/resourceslist/${id}`;
    return this.http.delete(url);
  }
}
