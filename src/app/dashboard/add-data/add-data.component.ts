// Import-Anweisungen...
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from './notification.service';
import { NotificationToastComponent } from './notification-toast.component';  // Vergessen Sie nicht, diese Zeile hinzuzufügen

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {

  constructor(
    private formbuilder: FormBuilder,
    public storeService: StoreService,
    public backendService: BackendService,
    private notificationService: NotificationService  // Hinzugefügt
  ) {}

  public addChildForm: any;
  @Input() currentPage!: number;
  public showSuccessToast: boolean = false;

  @ViewChild(NotificationToastComponent) toastComponent!: NotificationToastComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.addChildForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      kindergardenId: ['', Validators.required],
      birthDate: [null, Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  onSubmit() {
    if (this.addChildForm.valid) {
      this.backendService.addChildData(this.addChildForm.value, this.currentPage);
      this.showSuccessToast = true;

      // Annahme: Ihr Backend gibt das aktualisierte Datenarray zurück
      // Sie können den aktuellen Seitenindex auf der Grundlage des neuen Datenarrays berechnen
      const updatedData = (this.backendService as any).getUpdatedData(); // 'as any' wird verwendet, um TypeScript zu umgehen
      const itemsPerPage = this.paginator.pageSize;

      // Berechnen Sie den aktuellen Seitenindex basierend auf der Position des hinzugefügten Elements im aktualisierten Array
      const addedItemIndex = updatedData.findIndex(/* Logik zum Finden des hinzugefügten Elements */);
      const newPageIndex = Math.floor(addedItemIndex / itemsPerPage);

      // Setzen Sie den aktualisierten Seitenindex
      this.paginator.pageIndex = newPageIndex;

      this.toastComponent.show = true;
      this.notificationService.showSuccess('Kind erfolgreich angemeldet!');  
    } else {
      console.log('Form is invalid. Please check your inputs.');
      this.notificationService.showError('Form is invalid. Please check your inputs.');  
    }
  }

  closeSuccessToast() {
    this.showSuccessToast = false;
  }

  onPageChange(event: any) {
    // Ihre Logik beim Seitenwechsel
  }
}
