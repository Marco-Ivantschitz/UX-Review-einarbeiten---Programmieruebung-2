// kindergarten.service.ts
import { Injectable } from '@angular/core';
import { Kindergarden, Typ } from './interfaces/Kindergarden';

@Injectable({
  providedIn: 'root'
})
export class KindergartenService {
    private kindergartens: Kindergarden[] = [
        {
            "id": 1,
            "name": "Waldorfkindergarden im Zentrum Wiens",
            "address": "Oleandergasse 21, 1220 Wien",
            "betreiber": "MA 10 - Wiener Kindergärten",
            "typ": Typ.privat,
            "images": [
                { url: './../assets/images/Kindergarten1.jpg' },
            ]
          },
          {
            "id": 2,
            "name": "Kindergarden der Karl Schubert Schule für seelenpflegebedürftige Kinder und Jugendliche in Wien",
            "address": "Kanitzgasse 1-3, 1230 Wien",
            "betreiber": "Verein Karl Schubertschule für Seelenpflege- bedürftige Kinder und Jugendliche in Wien",
            "typ": Typ.privat,
            "images": [
                { url: './../assets/images/Kindergarten2.jpg' },
            ]
          },
          {
            "id": 3,
            "name": "Kindergarden der Stadt Wien",
            "address": "Audorfgasse 20, 1210 Wien",
            "betreiber": "MA 10 - Wiener Kindergärten",
            "typ": Typ.oeffentlich,
            "images": [
                { url: './../assets/images/Kindergarten3.jpg' },
            ]
          },
          {
            "id": 4,
            "name": "Kindergarden der Stadt Wien",
            "address": "Moßbachergasse 20-24, 1140 Wien",
            "betreiber": "MA 10 - Wiener Kindergärten",
            "typ": Typ.oeffentlich,
            "images": [
                { url: './../assets/images/Kindergarten3.jpg' },
            ]
          },
          {
            "id": 5,
            "name": "Montessori Kinderhaus Wien 1",
            "address": "Nußdorferstraße 6, 1090 Wien",
            "betreiber": "Montessori Kinderhaus Wien",
            "typ": Typ.privat,
            "images": [
                { url: './../assets/images/Kindergarten5.jpg' },
            ]
          }
    ];

    getKindergartenById(id: number): Kindergarden | undefined {
        return this.kindergartens.find((k) => k.id === id);
    }
}
