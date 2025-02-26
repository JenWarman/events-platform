import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  imports: [],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  events: any;

  constructor(
    private supabaseService: SupabaseService,
    private routerService: Router
  ) {}

  onOpenEventDetails(id: string) {
    this.routerService.navigateByUrl(`/event-item/${id}`);
  }

  ngOnInit(): void {
    this.supabaseService.fetchEvents().then((events) => {
      this.events = events;
    });
  }
}
