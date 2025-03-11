import { Component, Output} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { Router, RouterLink } from '@angular/router';
import { LoginErrorsComponent } from '../../login-errors/login-errors.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink, ReactiveFormsModule, LoginErrorsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
@Output('errors') errors: any;

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)]
    })
  })

  constructor(private supabaseService: SupabaseService, private routerService: Router) {}
  

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  onLogin() {
    if (!this.form.value.email || !this.form.value.password ) {
      return;
    }
      this.supabaseService.loginUser({email: this.form.value.email, password: this.form.value.password})
        .then((response) => {
          console.log('logged in')
          this.routerService.navigateByUrl('/')
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }
