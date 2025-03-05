import { Component} from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '@supabase/supabase-js';
import { EventCardComponent } from '../event-card/event-card.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-user-events',
  imports: [CommonModule, ModalComponent],
  templateUrl: './user-events.component.html',
  styleUrl: './user-events.component.css'
})
export class UserEventsComponent {
  event: any;
  events: any;
   user: User | undefined;
   rsvpStatus: string = '';
   isPopupVisible = false;

  constructor(
    private supabaseService: SupabaseService,
    private routerService: Router,
    private route: ActivatedRoute,
  ) {
    supabaseService.userLoaded.subscribe((user) => {
      this.user = user;
      if(!user) {
        return;
      }
      this.supabaseService.fetchEventsByUser(user?.id).then((events) => {
        console.log(events, '<---data from fetched event by user id')
        this.events = events;
        this.rsvpStatus = 'you\'re going!'
      })
    });
  }

  onEditRSVP(eventId: string) {
    if (!eventId) {
      console.log('no event id to delete from user');
      return;
    }
    if (window.confirm('Are you sure you are not going to this event?')){
      this.supabaseService.deleteEventFromUser(eventId);
      this.rsvpStatus = 'you\'re not going!'
    }
  }
  onAddToCalendar(){}
  showModal() {
    this.isPopupVisible = true;
    }
  
    hideModal() {
    this.isPopupVisible = false;
    }

  getBackgroundColor(eventType: string) {
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
