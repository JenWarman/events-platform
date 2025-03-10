import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { BehaviorSubject, throwError } from 'rxjs';
import { ErrorService } from './error.service';

export type UserProfile = User & { is_admin: boolean };

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public supabase: SupabaseClient;
  // loading: boolean;

  private userLoadedSub: BehaviorSubject<UserProfile | undefined> =
    new BehaviorSubject<UserProfile | undefined>(undefined);
  public userLoaded = this.userLoadedSub.asObservable();

  constructor(private errorService: ErrorService) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    this.publishUser();
    // this.loading = false;
  }

  // startLoading() {
  //   this.loading = true;
  // };

  // stopLoading() {
  //   this.loading = false;
  // };

  private publishUser() {
    this.supabase.auth.getSession().then(async (user) => {
      if (!user.data.session?.user) {
        return;
      }
      const { data, error } = await this.supabase
        .from('admin')
        .select()
        .eq('user_id', user.data.session?.user.id);

      this.userLoadedSub.next({
        ...user.data.session?.user,
        is_admin: data?.length === 1,
      });
    });
  }

  async registerUser(formData: { email: string; password: string }) {
    // this.loading = true;
    let { data, error } = await this.supabase.auth.signUp(formData);
    if (error)  {
        this.errorService.showError('Failed to register new user.');
        throw throwError(() => new Error('Failed to register new user.'));
    }
    this.publishUser();
    // this.loading = false;
  }

  async loginUser(formData: { email: string; password: string }) {
    // this.loading = true;
    let { data, error } = await this.supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error)  {
      this.errorService.showError('Login failed.');
      throw throwError(() => new Error('Login failed.'));
  }
    this.publishUser();
    // this.loading = false;
  }

  async logoutUser() {
    let { error } = await this.supabase.auth.signOut();
    if (error)  {
      this.errorService.showError('Failed to log out user.');
      throw throwError(() => new Error('Failed to log out user.'));
  }
    this.publishUser();
  }

  async fetchUserById(user_id: string){
    const { data: { user } } = await this.supabase.auth.getUser();
    console.log(user, '<---user fetched')
   return user;
  }

  getEventsQuery() {
    return this.supabase.
      from('event').
      select('*, user_events(event_id)').
      order('date', {ascending: true});
  }

  async fetchEvents(filters?: { category?: string; keyword?: string }) {
    let builder = this.getEventsQuery()

    if (filters?.category) {
      builder = builder.eq('type', filters?.category);
    }

    if (filters?.keyword) {
      builder = builder.or(
        `summary.fts.${filters.keyword},title.fts.${filters.keyword}`
      );
    }

    const { data, error } = await builder;

    if (error)  {
      this.errorService.showError('Failed to fetch event data.');
      throw throwError(() => new Error('Failed to fetch event data.'));
  }
    return data;
  }

  async fetchEventById(id: string) {
    const { data, error } = await this.supabase
      .from('event')
      .select()
      .eq('id', id);

      if (error)  {
        this.errorService.showError('Failed to fetch event by event id.');
        throw throwError(() => new Error('Failed to fetch event by event id.'));
    }
    if (data.length < 1) {
      console.log('error in fetching data');
    }
    return data[0];
  }

  async deleteEvent(id: string) {
    const response = await this.supabase.from('event').delete().eq('id', id);

    if (response.error) {
      this.errorService.showError('Failed to delete event data.');
        throw throwError(() => new Error('Failed to delete event data.'));
    }
  }

  async fetchEventByType(eventType: string) {
    const { data, error } = await this.getEventsQuery()
      .eq('type', eventType);

      if (error)  {
        this.errorService.showError('Failed to fetch event by event type.');
        throw throwError(() => new Error('Failed to fetch event by event type.'));
    }
    if (data!.length < 1) {
      console.log('error in fetching data by type');
    }
    return data;
  }

  async fetchEventByKeyword(query: string) {
    const { data, error } = await this.supabase
      .from('event')
      .select()
      .textSearch('summary', query);

      if (error)  {
        this.errorService.showError('Failed to fetch event by keyword search.');
        throw throwError(() => new Error('Failed to fetch event by keyword search.'));
    }
    if (data!.length < 1) {
      console.log('error in fetching data by query');
    }
    return data;
  }

  async AddEventToUser(eventId: string) {
    const user = this.userLoadedSub.getValue();
    if (!user) {
      return;
    }

    const { data, error } = await this.supabase
      .from('user_events')
      .insert({ user_id: user.id, event_id: eventId });

      if (error)  {
        this.errorService.showError('Failed to sign up user to this event. You may already be signed up, check your events!');
        throw throwError(() => new Error('Failed to sign up user to this event.'));
    }
    if (!data) {
      console.log('no event data added to user');
    }
    return data;
  }

  async fetchEventsByUser(userId: string) {
    const {data, error} = await this.supabase
    .from('user_events')
    .select('*, event(*)')
    .eq('user_id', userId)

    if (error)  {
      this.errorService.showError('Failed to fetch your events.');
      throw throwError(() => new Error('Failed to fetch your events.'));
  }
    if (data!.length < 1) {
      console.log('empty array for user events')
    }
    return data;
  }

  async deleteEventFromUser(eventId: string) {
    const { data, error } = await this.supabase
    .from('user_events')
    .delete()
    .eq('event_id', eventId)

    if (error)  {
      this.errorService.showError('Failed to edit your RSVP to this event.');
      throw throwError(() => new Error('Failed to edit your RSVP to this event.'));
  }
    return data;
  }
}
