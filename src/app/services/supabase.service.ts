import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';

export type UserProfile = User & { is_admin: boolean };

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  public supabase: SupabaseClient;

  private userLoadedSub: BehaviorSubject<UserProfile | undefined> = new BehaviorSubject<UserProfile | undefined> (undefined);
  public userLoaded = this.userLoadedSub.asObservable();

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    this.publishUser();
  }

  private publishUser() {

    this.supabase.auth.getSession().then(async (user) => {
      if (!user.data.session?.user) {
        return;
      }
      const {data, error} = await this.supabase.from('admin').select().eq('user_id', user.data.session?.user.id)
      
      this.userLoadedSub.next({...user.data.session?.user, is_admin: data?.length === 1});
    });
  }

  async registerUser(formData: { email: string; password: string }) {
    let { data, error } = await this.supabase.auth.signUp(formData);
    if (error) {
      throw error;
    }
    this.publishUser();
  }

  async loginUser(formData: { email: string; password: string }) {
    let { data, error } = await this.supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error != null) {
      throw error;
    }
    this.publishUser();
  }

  async logoutUser() {
    let { error } = await this.supabase.auth.signOut();
    this.publishUser();
  }

  async fetchEvents() {
    const { data, error } = await this.supabase.from('event').select();

    if (error) {
      console.log('error fetching events');
      return;
    }
    return data;
  }

  async fetchEventById(id: string) {
    const { data, error } = await this.supabase
      .from('event')
      .select()
      .eq('id', id);

    if (error) {
      console.log('error fetching event by id.');
      return;
    }
    if (data.length < 1) {
      console.log('error in fetching data');
    }
    console.log(data, '<---data from fetching event by id');
    return data[0];
  }

  async deleteEvent(id: string) {
    const response = await this.supabase.from('event').delete().eq('id', id);

    if (response.error) {
      console.log('error deleting event');
      return;
    }
  }

//   async fetchEventByTitle(query: string) {
//     const {data, error} = await this.supabase.from('event').select().textSearch('title', query);

//     if (error) {
//       console.log('error fetching event by title')
//     }
    // if (data.length < 1) {
    //   console.log('error in fetching data by title query');
    // }
//     console.log(data, '<---data fetched by title query')
//     return data;
//   }
}