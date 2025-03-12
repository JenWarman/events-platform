import { Component, OnInit } from '@angular/core';
import { SupabaseService, UserProfile } from '../services/supabase.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

declare var gapi: any;

@Component({
  selector: 'app-event-card',
  imports: [CommonModule, ModalComponent, RouterLink],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css',
})
export class EventCardComponent implements OnInit {
  event: any;
  id: string | undefined;
  user: UserProfile | undefined;
  isPopupVisible = false;

  tokenClient: any;
  gapiInited: boolean = false;
  gisInited: boolean = false;

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

  onEdit(id: string) {
    this.routerService.navigateByUrl(`/edit-event/${id}`);
  }

  onDelete() {
    if (!this.event?.id) {
      return;
    }
    this.supabaseService.deleteEvent(this.event.id);
    this.routerService.navigateByUrl('/');
  }

  onAddEventToUser(eventId: string) {
    this.supabaseService.AddEventToUser(this.event.id);
    this.routerService.navigateByUrl('/your-events');
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
    this.tokenClient.callback = async (resp: any) => {
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
    if (!this.id) {
      return;
    }
    this.supabaseService.fetchEventById(this.id).then((event) => {
      this.event = event;
    });
    await this.loadGapi();
    gapi.load('client', this.initClient.bind(this));
  }
}
