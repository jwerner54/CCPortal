import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseProfessionalsComponent } from './browse-professionals.component';

describe('BrowseProfessionalsComponent', () => {
  let component: BrowseProfessionalsComponent;
  let fixture: ComponentFixture<BrowseProfessionalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseProfessionalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseProfessionalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
