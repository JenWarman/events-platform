import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  form = new FormGroup({
    keyword: new FormControl(''),
  });

  keyword: string | null | undefined;

  constructor(private routerService: Router){}

  onFormSubmit() {
    this.routerService.navigate(['/events'], {queryParams: {keyword: this.form.value.keyword}, queryParamsHandling: 'replace'})
    this.form.reset();  
  }
  
}
