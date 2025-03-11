import { Component, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { User } from '@supabase/supabase-js';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormErrorsComponent } from '../error-handling/form-errors/form-errors.component';

@Component({
  selector: 'app-add-event',
  imports: [ReactiveFormsModule, FormErrorsComponent],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css',
})
export class AddEventComponent {
  user: User | undefined;
  @Output('errors') errors: any;

  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(128), Validators.minLength(5)]),
    location: new FormControl('', [Validators.required, Validators.maxLength(128), Validators.minLength(5)]),
    summary: new FormControl('', [Validators.required, Validators.maxLength(128), Validators.minLength(5)]),
    image: new FormControl('', [Validators.required, Validators.maxLength(128), Validators.minLength(5)]),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
  });

  constructor(
    private routerService: Router,
    private supabaseService: SupabaseService
  ) {
    supabaseService.userLoaded.subscribe((user) => {
      this.user = user;
    });
  }

  async onAddEvent() {
    if (
      !this.form.value.title ) {
      return;
    }
      const { data, error } = await this.supabaseService.supabase
        .from('event')
        .insert([
          {
            title: this.form.value.title,
            location: this.form.value.location,
            summary: this.form.value.summary,
            image: this.form.value.image,
            date: this.form.value.date,
            time: this.form.value.time,
            type: this.form.value.type,
          },
        ]);
    this.routerService.navigateByUrl('/');
  }

  onCancel() {
    this.form.reset();
    this.routerService.navigateByUrl('/');
  }
}
