import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountProfessionalComponent } from './account-professional.component';

describe('AccountProfessionalComponent', () => {
  let component: AccountProfessionalComponent;
  let fixture: ComponentFixture<AccountProfessionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountProfessionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountProfessionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
