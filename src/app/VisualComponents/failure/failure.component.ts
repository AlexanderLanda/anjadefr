import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PaymentService } from '../../Core/Service/PaymentService';

@Component({
  selector: 'app-failure',
  standalone: true,
  imports: [FormsModule,
    CommonModule,
    ReactiveFormsModule,
    
// TODO: `HttpClientModule` should not be imported into a component directly.
// Please refactor the code to add `provideHttpClient()` call to the provider list in the
// application bootstrap logic and remove the `HttpClientModule` import from this component.
HttpClientModule,
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
