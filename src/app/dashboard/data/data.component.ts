import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { CHILDREN_PER_PAGE } from 'src/app/shared/constants';
import { StoreService } from 'src/app/shared/store.service';
import { Kindergarden, Typ } from 'src/app/shared/interfaces/Kindergarden'; 
import { Child, ChildResponse } from 'src/app/shared/interfaces/Child'; 
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  constructor(public storeService: StoreService, public backendService: BackendService) {}

  // Deklariere die Eigenschaft 'loading'
  loading: boolean = false;

  @Input() currentPage!: number;
  @Output() selectPageEvent = new EventEmitter<number>();
  public page: number = 0;

  itemsPerPage: number = 2;
  itemsPerPageOptions: number[] = [1, 2, 3, 4, 5, 10, 25, 50, 100];

  kindergartens: Kindergarden[] = [];
  selectedKindergarten: number | null = null;
  filteredChildren: ChildResponse[] = [];

  dataSource: MatTableDataSource<ChildResponse> = new MatTableDataSource<ChildResponse>();
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  // Neue Spalten für die Sortierung nach Kindergarten und Anmeldedatum
  sortColumns: { [key: string]: string } = {
    name: 'name',
    kindergarden: 'kindergarden.name', // Beachten Sie die Verschachtelung, falls kindergarden ein Objekt ist
    registrationDate: 'registrationDate'
  };

  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  // Hier eine Funktion hinzufügen, um die Datenquelle zu aktualisieren
  updateDataSource() {
    this.dataSource.data = this.storeService.children;
    console.log('Updated DataSource:', this.dataSource.data);
  }

  ngOnInit(): void {
    // Abonniere das 'loading$'-Observable
    this.backendService.loading$.subscribe((loading) => {
      this.loading = loading;
    });

    // Weitere Initialisierungen
    this.backendService.getChildren(this.currentPage, this.itemsPerPage).subscribe(() => {
      this.updateDataSource();
      this.dataSource.sort = this.sort;
    });

    this.backendService.getKindergardens();
  }

  // Funktion zum Filtern nach Kindergarten
  onKindergartenFilterChange() {
    this.dataSource.filter = this.selectedKindergarten?.toString() || '';
  }

  // Funktion zum Sortieren der Daten
  sortData(sortBy: string) {
    this.sortColumn = sortBy;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    
    if (this.dataSource.sort) {
      const sortColumn = this.sortColumns[sortBy];
      
      if (sortColumn) {
        this.dataSource.sort.active = sortColumn;
        this.dataSource.sort.direction = this.sortDirection;
      } else {
        console.error(`Ungültige Sortierspalte: ${sortBy}`);
      }
    } else {
      console.error('Das Sortierungsobjekt ist nicht initialisiert.');
    }
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
    console.log('Children Total Count:', this.storeService.childrenTotalCount);
    console.log('Items Per Page:', this.itemsPerPage);
  
    return Math.ceil(this.storeService.childrenTotalCount / this.itemsPerPage);
  }

  public cancelRegistration(childId: string) {
    this.backendService.deleteChildData(childId, this.currentPage);
  }

  onPageChange(event: any): void {
    console.log('Page changed:', event);
    const currentPage = event.pageIndex + 1;
    this.selectPage(currentPage);
  }

  onItemsPerPageChange(): void {
    console.log('Items Per Page Changed:', this.itemsPerPage);
    this.backendService.getChildren(this.currentPage, this.itemsPerPage);
  }
}
