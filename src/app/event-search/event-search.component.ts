import { Component } from '@angular/core';
import { SupabaseService, UserProfile } from '../services/supabase.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-search',
  imports: [RouterLink],
  templateUrl: './event-search.component.html',
  styleUrl: './event-search.component.css',
})
export class EventSearchComponent {
  searchTerm: string | null | undefined;
  user: UserProfile | null = null;

  constructor(
    private routerService: Router,
    private supabaseService: SupabaseService
  ) {
    this.supabaseService.userLoaded.subscribe((user) => {
      this.user = user ?? null;
    });
  }

  onSearchEventType(searchTerm: string) {
    if (!searchTerm) {
      console.log('no query - in component');
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
