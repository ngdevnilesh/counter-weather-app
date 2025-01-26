import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./core/header/header.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSync, faPlus, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [HeaderComponent, FontAwesomeModule, RouterModule]
})
export class AppComponent {

  constructor(library: FaIconLibrary) {
    library.addIcons(faSync, faPlus, faTrash, faTimes);
  }
  title = 'CounterWeatherApp';
}
