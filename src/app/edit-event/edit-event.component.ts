import { Component, OnInit} from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from '../services/error.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-edit-event',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-event.component.html',
  styleUrl: './edit-event.component.css',
})
export class EditEventComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    summary: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
  });

  id: string | undefined;

  constructor(
    private supabaseService: SupabaseService,
    private routerService: Router,
    private route: ActivatedRoute,
    private errorService: ErrorService
  ) {
    this.id = route.snapshot.paramMap.get('id') || undefined;
  }

  onCancel() {
    this.form.reset();
    this.routerService.navigateByUrl('/');
  }

  async onEditEvent() {
    if (!this.id) {
      return;
    }
    const { data, error } = await this.supabaseService.supabase
      .from('event')
      .update({
        title: this.form.value.title,
        location: this.form.value.location,
        summary: this.form.value.summary,
        image: this.form.value.image,
        date: this.form.value.date,
        time: this.form.value.time,
        type: this.form.value.type,
      })
      .eq('id', this.id);
    if (error) {
      this.errorService.showError('Failed to edit this event.');
      throw throwError(() => new Error('Failed to edit this event.'));
    }
    this.routerService.navigateByUrl('/');
  }

  ngOnInit(): void {
    if (this.id == null) {
      return;
    }
    const event = this.supabaseService.fetchEventById(this.id).then((event) => {
      this.form.setValue({
        title: event?.title ?? '',
        location: event?.location ?? '',
        summary: event?.summary ?? '',
        image: event?.image ?? '',
        date: event?.date ?? '',
        time: event?.time ?? '',
        type: event?.type ?? '',
      });
    });
  }
}
