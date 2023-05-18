import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseRecordingsComponent } from './browse-recordings/browse-recordings.component';

const routes: Routes = [
  { path: '', redirectTo: '/browse-recordings', pathMatch: 'full' },
  { path: 'browse-recordings', component: BrowseRecordingsComponent },
  { path: '**', redirectTo: '/browse-recordings' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
