import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-login-errors',
  imports: [],
  templateUrl: './login-errors.component.html',
  styleUrl: './login-errors.component.css'
})
export class LoginErrorsComponent {
@Input('field') field: ValidationErrors | undefined | null;
}
