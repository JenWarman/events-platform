import { Component, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { Router, RouterLink } from '@angular/router';
import { LoginErrorsComponent } from '../../error-handling/login-errors/login-errors.component';
import { LoadingSpinnerComponent } from '../../loading/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    LoginErrorsComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
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
    confirmPassword: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        this.validateSamePassword,
      ],
    }),
  });

  private validateSamePassword(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.parent?.get('password');
    const confirmPassword = control.parent?.get('confirmPassword');
    return password?.value == confirmPassword?.value ? null : { notSame: true };
  }

  constructor(
    private supabaseService: SupabaseService,
    private routerService: Router
  ) {}

  passwordVisibilty() {
    this.show = !this.show;
  }
  onSubmit() {
    if (!this.form.value.email || !this.form.value.password) {
      return;
    }
    this.isLoading = true;
    this.supabaseService
      .registerUser({
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
