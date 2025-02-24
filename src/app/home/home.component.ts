import { Component } from '@angular/core';
import { EventListComponent } from "../event-list/event-list.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [EventListComponent]
})
export class HomeComponent {

}
