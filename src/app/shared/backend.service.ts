import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kindergarden } from './interfaces/Kindergarden';
import { StoreService } from './store.service';
import { Child, ChildResponse } from './interfaces/Child';
import { CHILDREN_PER_PAGE } from './constants';
import { BehaviorSubject, Observable, finalize, map, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

private loadingSubject = new BehaviorSubject<boolean>(false);
loading$ = this.loadingSubject.asObservable();

private deletingSubject = new BehaviorSubject<boolean>(false);
deleting$ = this.deletingSubject.asObservable();

constructor(private http: HttpClient, private storeService: StoreService) { }

public getKindergardens(): Observable<Kindergarden[]> {
  this.loadingSubject.next(true);

  return this.http.get<Kindergarden[]>('http://localhost:5000/kindergardens').pipe(
    tap(data => {
      this.storeService.kindergardens = data;
      this.loadingSubject.next(false);
    })
  );
}

public getChildren(page: number, itemsPerPage: number): Observable<ChildResponse[]> {
  this.loadingSubject.next(true);

  return this.http.get<ChildResponse[]>(`http://localhost:5000/childs?_expand=kindergarden&_page=${page}&_limit=${itemsPerPage}`, { observe: 'response' })
    .pipe(
      map(data => {
        this.storeService.children = data.body!;
        this.storeService.childrenTotalCount = Number(data.headers.get('X-Total-Count'));
        this.loadingSubject.next(false);
        return data.body!;
      })
    );
}

public addChildData(child: Child, page: number): Observable<any> {
  this.loadingSubject.next(true);

  return this.http.post('http://localhost:5000/childs', child).pipe(
    switchMap(() => {
      return this.getChildren(page, CHILDREN_PER_PAGE);
    })
  );
}

public deleteChildData(childId: string, page: number): Observable<any> {
  this.deletingSubject.next(true);

  return this.http.delete(`http://localhost:5000/childs/${childId}`).pipe(
    switchMap(() => {
      return this.getChildren(page, CHILDREN_PER_PAGE);
    }),
    finalize(() => this.deletingSubject.next(false)) // Setze deleting auf false, wenn der Vorgang abgeschlossen ist
  );
}
}

