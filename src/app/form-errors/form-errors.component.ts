import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  imports: [],
  templateUrl: './form-errors.component.html',
  styleUrl: './form-errors.component.css'
})
export class FormErrorsComponent {
  @Input('field') field: ValidationErrors | undefined | null;

  constructor(){}
}
