import { Component, OnInit, signal } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-list',
  imports: [CommonModule],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  events: any;
  isFetching = signal(false);

  constructor(
    private supabaseService: SupabaseService,
    private routerService: Router,
    private route: ActivatedRoute,
  ) {}

  onOpenEventDetails(id: string) {
    this.routerService.navigateByUrl(`/event-item/${id}`);
  }

  ngOnInit(): void {
    this.isFetching.set(true);
    this.route.queryParamMap.subscribe((query) => {
    
      this.supabaseService.fetchEvents({
        category: query.get('category') ?? undefined,
        keyword: query.get('keyword') ?? undefined,
      }).then((events) => {
        this.events = events;
        this.isFetching.set(false);
      });
    })

  }

}
