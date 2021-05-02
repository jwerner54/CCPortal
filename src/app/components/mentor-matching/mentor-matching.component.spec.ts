import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorMatchingComponent } from './mentor-matching.component';

describe('MentorMatchingComponent', () => {
  let component: MentorMatchingComponent;
  let fixture: ComponentFixture<MentorMatchingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorMatchingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorMatchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
