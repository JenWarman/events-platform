import { Component, OnInit, signal } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '@supabase/supabase-js';
import { ModalComponent } from '../modal/modal.component';

declare var gapi: any;

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
  showEventModal: string = '';
  isFetching = signal(false);

  tokenClient: any;
  gapiInited: boolean = false;
  gisInited: boolean = false;

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
    this.supabaseService.fetchEventsByUser(this.user?.id).then((events) => {
      this.events = events;
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
    this.loadEvents()
  }

  showModal() {
    this.isPopupVisible = true;
  }

  hideModal() {
    this.isPopupVisible = false;
  }


  async initClient() {
    await gapi.client.init({
      apiKey: 'AIzaSyCs8kF78b9-aq7Ot5VoTx1Hu9MTfxsF2ho',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    });
    this.gapiInited = true;
  }

  gisLoaded() {
    console.log('gisLoaded')
    this.tokenClient = gapi.oauth2.initTokenClient({
      client_id: '777277188325-k49mb0ja0ms5kg4cu2shsmeufhmlkbv9.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/calendar.readonly',
      callback: '', // defined later
    });
    this.gisInited = true;
  }

createGoogleEvent(eventDetails: any) {
    console.log('is createGoogleEvent working?')
    // this.scheduleEvent(eventDetails);
    this.tokenClient.callback = async (resp: any) => { /* <----------HERE-------------*/
      if (resp.error !== undefined) {
        throw resp;
      }
      await this.scheduleEvent(eventDetails);
    };
    if (gapi.client.getToken() === null) {
      this.tokenClient.requestAccessToken({ prompt: "consent" });
    } else {
      this.tokenClient.requestAccessToken({ prompt: "" });
    }
  }

  scheduleEvent(eventDetails: any) {
    let request
    let eventToAdd = {
      title: this.event.title,
      summary:this.event.summary,
      location: this.event.location,
      date: this.event.date,
      time: this.event.time
    }
    request = gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: eventToAdd,
    })
    request.execute(function (eventToAdd: any) {
      console.info("Event created: " + eventToAdd.htmlLink);
    });
  }

  loadGapi(): Promise<void> {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    window.document.body.appendChild(script);
    return new Promise<void>((resolve, reject) => {
      script.addEventListener('error', (error) => reject(error));
      script.addEventListener('load', () => resolve());
    });
  }

  async ngOnInit() {
    this.supabaseService.userLoaded.subscribe((user) => {
      this.user = user;
      if (!user) {
        return;
      }
      this.loadEvents()
      this.rsvpStatus = "You're going!"
    });
    await this.loadGapi();
    gapi.load('client', this.initClient.bind(this));
  }

}
