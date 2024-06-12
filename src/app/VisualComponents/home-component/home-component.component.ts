import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { JuntaDirectivaComponent } from "../junta-directiva/junta-directiva.component";

@Component({
    selector: 'app-home-component',
    standalone: true,
    templateUrl: './home-component.component.html',
    styleUrl: './home-component.component.css',
    imports: [RouterLink, JuntaDirectivaComponent,JuntaDirectivaComponent]
})
export  class HomeComponentComponent {


}
