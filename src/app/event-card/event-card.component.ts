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

  initClient() {
    console.log(gapi.client);
    gapi.client
      .init({
        apiKey: 'AIzaSyCs8kF78b9-aq7Ot5VoTx1Hu9MTfxsF2ho',
        clientId:
          '777277188325-k49mb0ja0ms5kg4cu2shsmeufhmlkbv9.apps.googleusercontent.com',
        discoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
        ],
        scope: 'https://www.googleapis.com/auth/calendar.readonly',
      })
      .then(() => {
        //do something...?
      });
  }

  addToCalendar() {}

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
