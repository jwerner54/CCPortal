import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftsAndGigsComponent } from './shifts-and-gigs.component';

describe('ShiftsAndGigsComponent', () => {
  let component: ShiftsAndGigsComponent;
  let fixture: ComponentFixture<ShiftsAndGigsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftsAndGigsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftsAndGigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
