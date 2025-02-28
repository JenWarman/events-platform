import { Component } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-search',
  imports: [ReactiveFormsModule],
  templateUrl: './event-search.component.html',
  styleUrl: './event-search.component.css',
})
export class EventSearchComponent {

  form = new FormGroup({
    searchQuery: new FormControl('')
  })

  searchTerm: string | undefined;

  constructor(private routerService: Router, private supabaseService: SupabaseService) {
    //update searchTerm with name/value from button? 
    this.searchTerm = this.form.value.searchQuery;
  }

  onSearchEvent(searchTerm: string) {
    if (!this.searchTerm) {
      return;
    }
    this.supabaseService.fetchEventByQuery(this.searchTerm).then((event) => {
      console.log(event);
    });
  }

  onSearchEventKeyword(){}

  onCreateEvent() {
    this.routerService.navigateByUrl('/add-event');
  }
  
}
