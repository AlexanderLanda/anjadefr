import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterModule } from '@angular/router';
import RegistroComponentComponent from '../registro/registro.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [MatButtonModule,RouterLink,MatCardModule,
    MatButtonModule,],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export default class HomeComponentComponent {


}
