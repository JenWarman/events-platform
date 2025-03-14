import { Component, signal } from '@angular/core';
import { SupabaseService, UserProfile } from '../../services/supabase.service';
import { UserEventsComponent } from '../../user-events/user-events.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-profile',
  imports: [UserEventsComponent, LoginComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: UserProfile | null = null;
   isFetching = signal(false);

  constructor(private supabaseService: SupabaseService){
    this.supabaseService.userLoaded.subscribe((user) => {
      this.isFetching.set(true);
      this.user = user ?? null;})
  }
}
