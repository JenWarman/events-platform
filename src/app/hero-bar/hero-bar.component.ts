import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-bar',
  imports: [],
  templateUrl: './hero-bar.component.html',
  styleUrl: './hero-bar.component.css'
})
export class HeroBarComponent {

  constructor(private routerService: Router){}
  
  onSignUp() {
    this.routerService.navigateByUrl('/register')
  }
}
