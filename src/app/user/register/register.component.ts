import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formData = {
      email: '',
      password: '',
    };
  
    constructor(private supabaseService: SupabaseService, private routerService: Router) {}
  
    onSubmit() {
      this.supabaseService.registerUser(this.formData)
        .then((response) => {
          console.log('success')
          this.routerService.navigateByUrl('/')
        })
  
        .catch((error) => {
          console.log(error)
        });
    }
  }