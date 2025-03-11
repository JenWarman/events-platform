import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { EventSearchComponent } from './event-search/event-search.component';
import { SupabaseService, UserProfile } from './services/supabase.service';
import { ErrorService } from './services/error.service';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    EventSearchComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'events-platform';
  user: UserProfile | null = null;
  private _error = signal('');
  error = this._error.asReadonly();
  isLoading = false;

  constructor(
    private supabaseService: SupabaseService,
    private routerService: Router,
    private errorService: ErrorService
  ) {
    this.isLoading = true;
    this.supabaseService.userLoaded.subscribe((user) => {
      this.user = user ?? null;
    });
    this.error = this.errorService.error;
    this.isLoading = false;
  }

  onClearError() {
    this.errorService.clearError();
  }
}
