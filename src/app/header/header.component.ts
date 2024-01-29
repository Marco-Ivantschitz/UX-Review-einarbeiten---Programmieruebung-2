import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public title: string = 'Kindergarden-App';
  public imagePath: string = "./../assets/images/kindergarden.jpg";

  constructor() { }

  ngOnInit(): void {
  }

  openExternalLink() {
    // Hier den Link zur externen Website einfügen
    const externalLink = 'https://angular.io/guide/component-overview';
    
    // Öffne die externe Website in einem neuen Tab/Fenster
    window.open(externalLink, '_blank');
  }
}
