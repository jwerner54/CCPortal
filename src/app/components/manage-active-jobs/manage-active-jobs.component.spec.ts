import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageActiveJobsComponent } from './manage-active-jobs.component';

describe('ManageActiveJobsComponent', () => {
  let component: ManageActiveJobsComponent;
  let fixture: ComponentFixture<ManageActiveJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageActiveJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageActiveJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
