import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { EventSearchComponent } from "./event-search/event-search.component";
import { SupabaseService, UserProfile } from './services/supabase.service';
import { HeroBarComponent } from './hero-bar/hero-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, EventSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  user: UserProfile | null = null;

  constructor(private supabaseService: SupabaseService, private routerService: Router) {
    this.supabaseService.userLoaded.subscribe((user) => {
      this.user = user ?? null;
    });
  }
}
