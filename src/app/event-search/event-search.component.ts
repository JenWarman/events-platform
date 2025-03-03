import { Component } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-search',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './event-search.component.html',
  styleUrl: './event-search.component.css',
})
export class EventSearchComponent {
  form = new FormGroup({
    keyword: new FormControl(''),
  });

  searchTerm: string | null | undefined;
  keyword: string | null | undefined;

  constructor(
    private routerService: Router,
    private supabaseService: SupabaseService
  ) {
  }

  onSearchEventType(searchTerm: string) {
    if (!searchTerm) {
      console.log('no query - in component')
      return;
    }
    this.supabaseService.fetchEventByType(searchTerm).then((event) => {
      console.log(event, 'fetched event by type');
    });
  }
  
  onFormSubmit() {
    this.routerService.navigate(['/events'], {queryParams: {keyword: this.form.value.keyword}, queryParamsHandling: 'merge'})
    }
  
  onCreateEvent() {
    this.routerService.navigateByUrl('/add-event');
  }
}
