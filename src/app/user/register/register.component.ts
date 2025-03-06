import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
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
    
    onSubmit() {
      if (!this.form.value.email || !this.form.value.password ) {
        return;
      }
      this.supabaseService.registerUser({email: this.form.value.email, password: this.form.value.password})
        .then((response) => {
          console.log('success')
          this.routerService.navigateByUrl('/')
        })
  
        .catch((error) => {
          console.log(error)
        });
    }
  }