import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formData = {
    email: '',
    password: '',
  };

  constructor(private supabaseService: SupabaseService, private routerService: Router) {}

  onLogin() {
      this.supabaseService.loginUser(this.formData)
        .then((response) => {
          console.log('logged in')
          this.routerService.navigateByUrl('/')
        })
  
        .catch((error) => {
          console.log(error)
        });
    }
  }
