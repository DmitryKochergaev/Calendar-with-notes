import {Component} from '@angular/core';
import {IconsService} from './core/services/icons.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _iconService: IconsService) {
  }
}
