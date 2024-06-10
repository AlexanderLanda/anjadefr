import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { PaymentService } from '../../Core/Service/PaymentService';

@Component({
  selector: 'app-failure',
  standalone: true,
  imports: [FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    HttpClientModule,
    MatDatepickerModule,
    MatIconModule,
    MatAutocompleteModule,
    MatRadioModule,
    RouterLink],
  templateUrl: './failure.component.html',
  styleUrl: './failure.component.css'
})
export default class FailureComponent {

  selectedFormaPago=1;

  constructor(private paymentService: PaymentService){}

  closeModal() {
    console.info("valor tipo de pago",this.selectedFormaPago)
   // this.paymentService.pay(this.selectedFormaPago);
  }
}
