// kindergarten-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KindergartenService } from '../shared/kindergarten.service';
import { Typ } from '../shared/interfaces/Kindergarden';

@Component({
  selector: 'app-kindergarten-detail',
  templateUrl: './kindergarten-detail.component.html',
  styleUrls: ['./kindergarten-detail.component.css']
})
export class KindergartenDetailComponent implements OnInit {
  kindergarten: any; // Typ entsprechend deiner Datenstruktur
  kindergartenId: number = 0; // Initialisierung hinzugefügt

  constructor(
    private route: ActivatedRoute,
    private kindergartenService: KindergartenService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.kindergartenId = +idParam;
        console.log('Kindergarten ID:', this.kindergartenId);
        this.kindergarten = this.kindergartenService.getKindergartenById(this.kindergartenId);
        console.log('Kindergarten:', this.kindergarten);
      }
    });
  }
  
  getTypText(typ: Typ): string {
    return typ === Typ.oeffentlich ? 'Öffentlich' : 'Privat';
  }
}