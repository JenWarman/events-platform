import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { EventSearchComponent } from "./event-search/event-search.component";
import { SupabaseService, UserProfile } from './services/supabase.service';
import { ErrorService } from './services/error.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, EventSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'events-platform'
  user: UserProfile | null = null;
   private _error = signal('');
      error = this._error.asReadonly();
  

  constructor(private supabaseService: SupabaseService, private routerService: Router, private errorService: ErrorService) {
    this.supabaseService.userLoaded.subscribe((user) => {
      this.user = user ?? null;
    });
    this.error = this.errorService.error;
  }

  onClearError() {
    this.errorService.clearError();
  }
  
}
