import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginErrorsComponent } from './login-errors.component';

describe('LoginErrorsComponent', () => {
  let component: LoginErrorsComponent;
  let fixture: ComponentFixture<LoginErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginErrorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
