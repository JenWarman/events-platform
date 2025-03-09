import { Component } from '@angular/core';
import { SupabaseService, UserProfile } from '../../services/supabase.service';
import { UserEventsComponent } from '../../user-events/user-events.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [UserEventsComponent, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: UserProfile | null = null;

  constructor(private supabaseService: SupabaseService){
    this.supabaseService.userLoaded.subscribe((user) => {
      this.user = user ?? null;})
  }
  
}
