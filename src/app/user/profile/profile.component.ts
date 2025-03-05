import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { UserEventsComponent } from '../../user-events/user-events.component';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-profile',
  imports: [UserEventsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user : User | null = null;

  constructor(private supabaseService: SupabaseService){
    this.supabaseService.userLoaded.subscribe((user) => {
      this.user = user ?? null;})
  }
  
}
