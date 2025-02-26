import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-search',
  imports: [],
  templateUrl: './event-search.component.html',
  styleUrl: './event-search.component.css'
})
export class EventSearchComponent {

  constructor(private routerService: Router) {}
onCreateEvent() {
  this.routerService.navigateByUrl('/add-event');
}
}
