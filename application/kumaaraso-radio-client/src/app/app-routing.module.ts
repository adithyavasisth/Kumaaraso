import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseRecordingsComponent } from './browse-recordings/browse-recordings.component';
import { UploadRecordingsComponent } from './upload-recordings/upload-recordings.component';
import { ResourcesListComponent } from './resources-list/resources-list.component';

const routes: Routes = [
  { path: 'browse-recordings', component: BrowseRecordingsComponent },
  { path: 'upload-recordings', component: UploadRecordingsComponent },
  { path: 'resources-list', component: ResourcesListComponent },
  { path: '', redirectTo: '/browse-recordings', pathMatch: 'full' },
  { path: '**', redirectTo: '/browse-recordings' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
