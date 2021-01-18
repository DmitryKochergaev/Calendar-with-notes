import {Injectable} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})

export class IconsService {
  constructor(private _matIconRegistry: MatIconRegistry,
              private _domSanitizer: DomSanitizer) {
    this._registerIcon('user');
    this._registerIcon('logout');
    this._registerIcon('calendar');
    this._registerIcon('menu');
    this._registerIcon('add');
    this._registerIcon('plane');
    this._registerIcon('clock');
    this._registerIcon('bus');
    this._registerIcon('meeting');
  }

  private _registerIcon(name: string): void {
    this._matIconRegistry.addSvgIcon(
      name,
      this._domSanitizer.bypassSecurityTrustResourceUrl(`../assets/${name}.svg`)
    );
  }
}


