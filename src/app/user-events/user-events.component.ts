import { Component, OnInit, signal } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, formatDate } from '@angular/common';
import { User } from '@supabase/supabase-js';
import { ModalComponent } from '../modal/modal.component';
import { ErrorService } from '../services/error.service';

type Event = {
  id: string;
  title: string;
  location: string;
  summary: string;
  image: string;
  date: string;
  time: string;
  type: string;
};

@Component({
  selector: 'app-user-events',
  imports: [CommonModule, ModalComponent],
  templateUrl: './user-events.component.html',
  styleUrl: './user-events.component.css',
})
export class UserEventsComponent implements OnInit {
  events: Array<{ event: Event }> = [];
  event: Event = {
    id: '',
    title: '',
    location: '',
    summary: '',
    image: '',
    date: '',
    time: '',
    type: '',
  };
  user: User | undefined;
  rsvpStatus: string = '';
  isPopupVisible = false;
  showEventModal: string = '';
  isFetching = signal(false);
  pastEvents: any[] = [];
  currentDate = new Date();

  constructor(
    private supabaseService: SupabaseService,
    private routerService: Router,
    private route: ActivatedRoute,
    private errorService: ErrorService
  ) {}

  loadEvents() {
    this.isFetching.set(true);
    if (!this.user) {
      return;
    }
    Promise.all([
      this.supabaseService.fetchEventsByUser(this.user?.id),
      this.supabaseService.fetchEventsByUser(this.user?.id, {past: true})
    ]).then(([future, past]) => {
      this.events = future;
      this.pastEvents = past;
    })
    .catch((error) => {
      this.errorService.showError('There was an error loading your events.');
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
