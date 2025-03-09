import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SupabaseService, UserProfile } from '../services/supabase.service';
import { ScrambleHeaderComponent } from '../scramble-header/scramble-header.component';

@Component({
  selector: 'app-header',
  imports: [RouterModule, SearchBarComponent],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  user: UserProfile | null = null;
  userStatus: string = '';
  

  constructor(
    private routerService: Router,
    private supabaseService: SupabaseService
  ) {
    this.supabaseService.userLoaded.subscribe((user) => {
      this.user = user ?? null;
      if (this.user?.email) {
        this.userStatus = 'Log Out';
      } 
      
      if (!this.user?.email) {
        this.userStatus = 'Login';
      }
    });
  }

  onLogClick() {
    if (!this.user) {
      this.userStatus = 'Login'
      this.routerService.navigateByUrl('/login');
      return;
    } else {
      this.supabaseService.logoutUser();
      this.routerService.navigateByUrl('/events');
      this.userStatus = 'Login';
    }
  }
}
