import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-list',
  imports: [CommonModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  events: any;

  constructor(
    private supabaseService: SupabaseService,
    private routerService: Router,
  ) {}

  onOpenEventDetails(id: string) {
    this.routerService.navigateByUrl(`/event-item/${id}`);
  }

  ngOnInit(): void {
    this.supabaseService.fetchEvents().then((events) => {
      this.events = events;
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
