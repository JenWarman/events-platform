import { Component, OnInit, signal } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, formatDate } from '@angular/common';
import { User } from '@supabase/supabase-js';
import { ModalComponent } from '../modal/modal.component';

// type Event = {
//   id: string;
//   title: string;
//   location: string;
//   summary: string;
//   image: string;
//   date: string;
//   time: string;
//   type: string;
// };

@Component({
  selector: 'app-user-events',
  imports: [CommonModule, ModalComponent],
  templateUrl: './user-events.component.html',
  styleUrl: './user-events.component.css',
})
export class UserEventsComponent implements OnInit {
  events: any;
  // events: Array<{event: Event}> = [];
  user: User | undefined;
  rsvpStatus: string = '';
  isPopupVisible = false;
  showEventModal: string = '';
  isFetching = signal(false);
  pastEvents: any;

  constructor(
    private supabaseService: SupabaseService,
    private routerService: Router,
    private route: ActivatedRoute
  ) {}

  loadEvents() {
    this.isFetching.set(true);
    if (!this.user) {
      return;
    }
    this.supabaseService
      .fetchEventsByUser(this.user?.id)
      .then((events) => {
        this.events = events;
      })
      .finally(() => {
        this.isFetching.set(false);
      });
  }

  async onEditRSVP(eventId: string) {
    if (!eventId) {
      return;
    }
    await this.supabaseService.deleteEventFromUser(eventId);
    this.hideModal();
    this.loadEvents();
  }

  showModal() {
    this.isPopupVisible = true;
  }

  hideModal() {
    this.isPopupVisible = false;
  }

  addToGoogleCalendar(event: any) {
    if (!event) {
      return;
    }

    let eventDate = new Date(event.date);
    if (event.time) {
      const [hours, minutes] = event.time.split(':').map(Number);
      eventDate.setHours(hours, minutes, 0, 0);
    }

    let eventDetails = {
      title: event.title,
      summary: event.summary,
      location: event.location,
      startDate: event.time
        ? formatDate(eventDate, "yyyyMMdd'T'HHmmss'Z'", 'en-UK', 'UTC')
        : formatDate(eventDate, 'yyyyMMdd', 'en-UK', 'UTC'),
      endDate: event.time
        ? formatDate(
            new Date(eventDate.getTime() + 2 * 60 * 60 * 1000),
            "yyyyMMdd'T'HHmmss'Z'",
            'en-UK',
            'UTC'
          )
        : formatDate(eventDate, 'yyyyMMdd', 'en-UK', 'UTC'),
      time: event.time,
    };

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      eventDetails.title
    )}&dates=${eventDetails.startDate}/${
      eventDetails.endDate
    }&location=${encodeURIComponent(
      eventDetails.location
    )}&details=${encodeURIComponent(eventDetails.summary)}`;

    window.open(url, '_blank');
  }

  loadPastEvents(event: any) {
    this.isFetching.set(true);
    if (!event) {
      return;
    }
    let currentDate = new Date();
    let dateOfEvent = new Date(event.date);

    if (dateOfEvent < currentDate) {
      this.supabaseService.fetchEventsByUserAndDate(event.date).then((event) => {
        this.pastEvents = event
        console.log('fetch event by user and date')
      })
      .finally(() => {
        this.isFetching.set(false);
      });
    }
  }
  async ngOnInit() {
    this.supabaseService.userLoaded.subscribe((user) => {
      this.user = user;
      if (!user) {
        return;
      }
      this.loadEvents();
      this.rsvpStatus = "You're going!";
    });
  }
}
