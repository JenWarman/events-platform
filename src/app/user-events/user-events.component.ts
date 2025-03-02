import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-events',
  imports: [CommonModule],
  templateUrl: './user-events.component.html',
  styleUrl: './user-events.component.css'
})
export class UserEventsComponent implements OnInit {
  events: any;

  constructor(
    private supabaseService: SupabaseService,
    private routerService: Router,
    private route: ActivatedRoute,
  ) {

  }

  onOpenEventDetails(id: string) {
    this.routerService.navigateByUrl(`/event-item/${id}`);
  }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe((query) => {
    
      this.supabaseService.fetchEvents({
        category: query.get('category') ?? undefined,
        keyword: query.get('keyword') ?? undefined,
      }).then((events) => {
        this.events = events;
      });
    })

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
