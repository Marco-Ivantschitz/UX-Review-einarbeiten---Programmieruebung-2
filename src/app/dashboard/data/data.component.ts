import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { CHILDREN_PER_PAGE } from 'src/app/shared/constants';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  constructor(public storeService: StoreService, private backendService: BackendService) {}

  @Input() currentPage!: number;
  @Output() selectPageEvent = new EventEmitter<number>();
  public page: number = 0;

  itemsPerPage: number = 2; // Standardwert oder dein bevorzugter Standardwert
  itemsPerPageOptions: number[] = [1, 2, 3, 4, 5, 10, 25, 50, 100]; // Optionen für das Dropdown-Menü

  ngOnInit(): void {
    this.backendService.getChildren(this.currentPage, this.itemsPerPage);
  }

  getAge(birthDate: string) {
    const today = new Date();
    const birthDateTimestamp = new Date(birthDate);
    let age = today.getFullYear() - birthDateTimestamp.getFullYear();
    const m = today.getMonth() - birthDateTimestamp.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateTimestamp.getDate())) {
        age--;
    }
    return age;
  }

  selectPage(i: any) {
    const currentPage = i;
    this.selectPageEvent.emit(currentPage);
    this.backendService.getChildren(currentPage, this.itemsPerPage);
  }

  public returnAllPages() {
    return Math.ceil(this.storeService.childrenTotalCount / this.itemsPerPage);
  }

  public cancelRegistration(childId: string) {
    this.backendService.deleteChildData(childId, this.currentPage);
  }

  onPageChange(event: any): void {
    const currentPage = event.pageIndex + 1; // Da die Paginierung bei 0 beginnt
    this.selectPage(currentPage);
  }

  onItemsPerPageChange(): void {
    this.backendService.getChildren(this.currentPage, this.itemsPerPage);
  }
}
