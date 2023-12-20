// notification-toast.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notification-toast',
  template: `
    <div *ngIf="show" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="5000">
      <div class="toast-header">
        <strong class="mr-auto">Erfolgreich angemeldet</strong>
        <button type="button" class="ml-2 mb-1 close" (click)="closeToast()" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        Ihr Kind wurde erfolgreich angemeldet!
      </div>
    </div>
  `,
  styleUrls: ['./notification-toast.component.css'], 
})
export class NotificationToastComponent {
  @Input() show: boolean = false;
  @Output() closeToastEvent = new EventEmitter<void>();

  closeToast() {
    this.show = false;
    this.closeToastEvent.emit();
  }
}
