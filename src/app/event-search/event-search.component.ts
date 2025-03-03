import { Component } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-search',
  imports: [ RouterLink],
  templateUrl: './event-search.component.html',
  styleUrl: './event-search.component.css',
})
export class EventSearchComponent {
  searchTerm: string | null | undefined;

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
  
  onCreateEvent() {
    this.routerService.navigateByUrl('/add-event');
  }
}
