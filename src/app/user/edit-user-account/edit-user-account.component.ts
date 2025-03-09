import { Component } from '@angular/core';
import { SupabaseService, UserProfile } from '../../services/supabase.service';
import { ActivatedRoute, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-edit-user-account',
  imports: [CommonModule, ModalComponent],
  templateUrl: './edit-user-account.component.html',
  styleUrl: './edit-user-account.component.css',
})
export class EditUserAccountComponent {
  event: any;
  id: string | undefined;
  user: UserProfile | undefined;
  rsvpStatus: string = '';
  isPopupVisible = false;

  constructor(
    private supabaseService: SupabaseService,
    private routerService: Router,
    private route: ActivatedRoute
  ) {
    this.id = route.snapshot.paramMap.get('id') || undefined;

    supabaseService.userLoaded.subscribe((user) => {
      this.user = user;
    });
  }

  showModal() {
    this.isPopupVisible = true;
  }

  hideModal() {
    this.isPopupVisible = false;
  }

  onDeleteUser(userId: string) {
    if (!this.user?.id) {
      return;
    }
  }
}
