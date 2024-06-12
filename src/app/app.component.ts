import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './Core/Service/Implements/AuthService';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OriginInterceptor } from './Core/OriginInterceptor';
import { MenuNavBarComponent } from './VisualComponents/menu-nav-bar/menu-nav-bar.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FooterComponent } from './VisualComponents/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    RouterLink,
    MenuNavBarComponent,
    BsDropdownModule,
    FooterComponent
    
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
