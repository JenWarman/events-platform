import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { User } from '@supabase/supabase-js';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-event',
  imports: [ReactiveFormsModule],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css',
})
export class AddEventComponent {
  user: User | undefined;

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    summary: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
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
  get titleIsInvalid() {
    return (
      this.form.controls.title.touched &&
      this.form.controls.title.dirty &&
      this.form.controls.title.invalid
    );
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
