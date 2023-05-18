import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseRecordingsComponent } from './browse-recordings.component';

describe('BrowseRecordingsComponent', () => {
  let component: BrowseRecordingsComponent;
  let fixture: ComponentFixture<BrowseRecordingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseRecordingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseRecordingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
