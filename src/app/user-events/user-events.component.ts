import { Component, OnInit, signal } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '@supabase/supabase-js';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-user-events',
  imports: [CommonModule, ModalComponent],
  templateUrl: './user-events.component.html',
  styleUrl: './user-events.component.css',
})
export class UserEventsComponent implements OnInit {

  event: any;
  events: any;
  user: User | undefined;
  rsvpStatus: string = '';
  isPopupVisible = false;
  isFetching = signal(false);

  constructor(
    private supabaseService: SupabaseService,
    private routerService: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.supabaseService.userLoaded.subscribe((user) => {
      this.user = user;
      if (!user) {
        return;
      }
      this.loadEvents()
    });
  }

  loadEvents() {
    this.isFetching.set(true);
    if (!this.user) {
      return;
    }
    this.supabaseService.fetchEventsByUser(this.user?.id).then((events) => {
      this.events = events;
      // this.rsvpStatus = "you're going!";
    }).finally(() => {
      this.isFetching.set(false);
    });
  }

  async onEditRSVP(eventId: string) {
    if (!eventId) {
      console.log('no event id to delete from user');
      return;
    }
    await this.supabaseService.deleteEventFromUser(eventId);
    //this.events = this.events.filter((ev: {event_id: string}) => ev.event_id != eventId);
    // this.rsvpStatus = "you're not going!";
    this.loadEvents()
  }

  onAddToCalendar() {}

  showModal() {
    this.isPopupVisible = true;
  }

  hideModal() {
    this.isPopupVisible = false;
  }

}
