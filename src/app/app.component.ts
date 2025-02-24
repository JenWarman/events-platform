import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { EventSearchComponent } from "./event-search/event-search.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, EventSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'events-platform';
}
