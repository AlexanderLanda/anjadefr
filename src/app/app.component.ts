import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import {MatToolbarModule, MatToolbarRow,MatToolbar} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatSlideToggleModule,MatSlideToggle} from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AuthService } from './Core/Service/Implements/AuthService';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OriginInterceptor } from './Core/OriginInterceptor';
import { MenuNavBarComponent } from './VisualComponents/menu-nav-bar/menu-nav-bar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarRow,
    MatToolbar, 
    MatToolbarModule,
    MatButtonModule,
    MatSlideToggle,
    MatMenuModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    RouterLink,
    MenuNavBarComponent
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OriginInterceptor,
      multi: true,
    },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
export class InterceptorModule {}
