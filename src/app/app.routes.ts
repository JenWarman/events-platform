import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserEventsComponent } from './user-events/user-events.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddEventComponent } from './add-event/add-event.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EditEventComponent } from './edit-event/edit-event.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/events'
  },
  {
    path: 'events',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'events/:category',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'events/:category/event/:id',
    component: EventCardComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'your-events',
    component: UserEventsComponent,
  },
  {
    path: 'add-event',
    component: AddEventComponent,
  },
  {
    path: 'event-item/:id',
    component: EventCardComponent
  },
  {
    path: 'edit-event/:id',
    component: EditEventComponent
  }
];
