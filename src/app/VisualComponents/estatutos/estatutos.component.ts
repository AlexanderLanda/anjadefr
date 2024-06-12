import { Component } from '@angular/core';

@Component({
  selector: 'app-estatutos',
  standalone: true,
  imports: [],
  templateUrl: './estatutos.component.html',
  styleUrl: './estatutos.component.css'
})
export  class EstatutosComponent {

  constructor() {
    // Ruta del documento Word
    const url = '/assets/documentos/estatutos.docx';
    // Descargar el documento Word
    window.location.href = url;
    // Imprimir mensaje en la consola
    console.log('Descarga realizada con éxito');
  }
}
