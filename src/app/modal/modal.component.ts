import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-modal',
  imports: [RouterLink],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent  {
  @Output() close = new EventEmitter<void>();

  constructor(private routerService: Router){}

  closeModal() {
	this.close.emit();
  }
}
