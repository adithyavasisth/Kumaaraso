import { Component, OnInit, ViewChild } from '@angular/core';
import { ResourcesListService, Resource } from './resources-list.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss'],
})
export class ResourcesListComponent implements OnInit {
  resources: Resource[] = [];
  filteredResources: MatTableDataSource<Resource>;

  displayedColumns: string[] = [
    'id',
    'resource_provider',
    'contact_name',
    'contact_number',
    'delete',
  ];
  resource_provider: string = '';
  contact_name: string = '';
  contact_number: string = '';

  @ViewChild(MatSort) sort: MatSort;

  constructor(private resourcesListService: ResourcesListService) {}

  ngOnInit() {
    this.getResources();
  }

  getResources() {
    this.resourcesListService.getResources().subscribe({
      next: (resources: Resource[]) => {
        this.resources = resources;
        this.filteredResources = new MatTableDataSource(this.resources);
        this.filteredResources.sort = this.sort;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  uploadResource() {
    this.resourcesListService
      .uploadResource(
        this.resource_provider,
        this.contact_name,
        this.contact_number
      )
      .subscribe({
        next: () => {
          this.getResources();
          this.resource_provider = '';
          this.contact_name = '';
          this.contact_number = '';
          console.log('Upload successful');
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  deleteResource(id: string) {
    if (!confirm('Are you sure you want to delete this resource?')) {
      return;
    }
    this.resourcesListService.deleteResource(id).subscribe({
      next: () => {
        this.getResources();
        console.log('Delete successful');
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  applyFilter(column: string, event: Event) {
    let value = (event.target as HTMLInputElement).value;
    value = value.trim().toLowerCase();

    this.filteredResources.filterPredicate = (
      resource: Resource,
      filter: string
    ) => {
      switch (column) {
        case 'resource_provider':
          return resource.resource_provider.toLowerCase().includes(filter);
        case 'contact_name':
          return resource.contact_name.toLowerCase().includes(filter);
        case 'contact_number':
          return resource.contact_number.toLowerCase().includes(filter);
        default:
          return false;
      }
    };

    this.filteredResources.filter = value;
  }
}
