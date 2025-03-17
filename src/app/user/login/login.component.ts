import { Component, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { Router, RouterLink } from '@angular/router';
import { LoginErrorsComponent } from '../../error-handling/login-errors/login-errors.component';
import { LoadingSpinnerComponent } from '../../loading/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, ReactiveFormsModule, LoginErrorsComponent, LoadingSpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  show: boolean = false;
  isLoading = false;
  @Output('errors') errors: any;

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  constructor(
    private supabaseService: SupabaseService,
    private routerService: Router
  ) {}

  passwordVisibilty() {
    this.show = !this.show;
}
  onLogin() {
    if (!this.form.value.email || !this.form.value.password) {
      return;
    }
    this.isLoading = true;
    this.supabaseService
      .loginUser({
        email: this.form.value.email,
        password: this.form.value.password,
      })
      .then((response) => {
        this.routerService.navigateByUrl('/');
        this.isLoading = false;
      })
      .catch((error) => {
        this.isLoading = false;
      });
      
  }
}
