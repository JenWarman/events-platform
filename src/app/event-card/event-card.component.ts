import { Component} from '@angular/core';
import { SupabaseService, UserProfile } from '../services/supabase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../Modals/modal/modal.component';

@Component({
  selector: 'app-event-card',
  imports: [CommonModule, ModalComponent],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
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
      console.log(user);
      this.user = user;
    });
  }

  onEdit(id: string) {
    this.routerService.navigateByUrl(`/edit-event/${id}`);
  }

  onDelete(id: string) {
    if (!this.id) {
      return;
    }
    if (window.confirm('Are you sure you want to delete this event?')) {
      this.supabaseService.deleteEvent(this.id);
      this.routerService.navigateByUrl('/');
    }
  }

  onAddEventToUser(eventId: string){
    this.supabaseService.AddEventToUser(this.event.id);
    this.rsvpStatus = 'You\'re going!'
  }

  showModal() {
	this.isPopupVisible = true;
  }

  hideModal() {
	this.isPopupVisible = false;
  }

  ngOnInit(): void {
    if (!this.id) {
      return;
    }
    this.supabaseService.fetchEventById(this.id).then((event) => {
      this.event = event;
      this.rsvpStatus = 'Sign up for event'
    });
  }

  getBackgroundColor(eventType: string): string {
    switch (eventType.toLowerCase()) {
      case 'art':
        return 'lightblue';
      case 'music':
        return 'lightgreen';
      case 'literature':
        return 'lightcoral';
      case 'theatre':
        return 'lightgoldenrodyellow';
      default:
        return 'white';  
    }
  }
}
