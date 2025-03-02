import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-user-events',
  imports: [CommonModule],
  templateUrl: './user-events.component.html',
  styleUrl: './user-events.component.css'
})
export class UserEventsComponent implements OnInit {
  event: any;
  events: any;
   user: User | undefined;

  constructor(
    private supabaseService: SupabaseService,
    private routerService: Router,
    private route: ActivatedRoute,
  ) {
    supabaseService.userLoaded.subscribe((user) => {
      this.user = user;
    });
  }

  onEditRSVP(eventId: string) {
    if (!eventId) {
      console.log('no event id to delete from user');
      return;
    }
    if (window.confirm('Are you sure you are not going to this event?')){
      this.supabaseService.deleteEventFromUser(eventId);
    }
  }
 
  ngOnInit(): void {
    this.supabaseService.fetchEventsByUser(this.user!.id).then((events) => {
      this.events = events;
    })
     // this.route.queryParamMap.subscribe((query) => {
    
    //   this.supabaseService.fetchEvents({
    //     category: query.get('category') ?? undefined,
    //     keyword: query.get('keyword') ?? undefined,
    //   }).then((events) => {
    //     this.events = events;
    //   });
    // })

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
