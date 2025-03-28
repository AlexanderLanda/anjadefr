// report.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ReportDto } from '../../Model/ReportDto';
import { environment } from '../../../../environments/environment';
import { catchError } from 'rxjs/operators';
import jsPDF from 'jspdf';
import JSZip from 'jszip';
import saveAs from 'file-saver';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

import html2canvas from 'html2canvas';





@Injectable({
  providedIn: 'root'
})
export class ReportServiceImpl {
  private apiUrl = environment.apiUrl + 'api/v1/reports';

  constructor(private http: HttpClient) { }

  createReport(report: ReportDto): Observable<ReportDto> {
    const formData: FormData = new FormData();
    report.attachments.forEach(file => console.log("file subidos antes de llamar backend:" + file.name))

    formData.append('json', JSON.stringify(report));
    report.attachments.forEach(file => formData.append('files', file, file.name));
    return this.http.post<ReportDto>(`${this.apiUrl}`, formData)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: any): Observable<never> {
    console.error('Error en la solicitud:', error);
    return throwError('Hubo un error en la solicitud. Por favor, inténtelo de nuevo más tarde.');

  }

  getAllReports(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  getReportById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getAttachments(reportId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}api/v1/attachments/report/${reportId}`);
  }

  updateReport(formData: FormData): Observable<ReportDto> {
    return this.http.put<ReportDto>(`${this.apiUrl}/update`, formData);
  }

  eliminarReporte(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'json' });
  }

  async generateAndDownloadReport(
    dataSource: MatTableDataSource<ReportDto>,
    download: boolean = true
  ): Promise<Blob | null> {
    // Obtener todos los reportes seleccionados
    const selectedReports = dataSource.filteredData.filter((repo) => repo.selected);

    // Validar si hay reportes seleccionados
    if (selectedReports.length === 0) {
      Swal.fire({
        title: 'Error!',
        text: 'Debe seleccionar al menos un Reporte.',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return null;
    }

    // Crear un ZIP que contenga todos los reportes y sus archivos adjuntos
    const zip = new JSZip();

    try {
      // Procesar cada reporte seleccionado
      for (const report of selectedReports) {
        // Obtener los detalles completos del reporte
        const detailedReport: ReportDto | null = await this.loadReportDetails(report.id);

        if (!detailedReport) {
          console.error(`Error: No se pudo cargar el reporte con ID ${report.id}`);
          continue; // Saltar este reporte y continuar con los demás
        }

        const folderName = `${detailedReport.referenciaReporte}`;
        const pdfFileName = `${detailedReport.referenciaReporte}.pdf`;

        // Crear el PDF y validar que no sea null
        const pdfBlob = await this.generateReportPDF(detailedReport);
        if (!(pdfBlob instanceof Blob)) {
          console.error("No se pudo generar el PDF para el reporte:", detailedReport.referenciaReporte);
          continue; // Saltar este reporte y continuar con los demás
        }

        // Agregar el PDF al ZIP
        zip.file(`${folderName}/${pdfFileName}`, pdfBlob);

        // Descargar y agregar los archivos adjuntos al ZIP
        for (const [index, file] of (detailedReport.attachments || []).entries()) {
          const fileData = await this.downloadFile(file);
          if (fileData instanceof Blob) {
            zip.file(`${folderName}/adjuntos/${index + 1}-${this.getName(file)}`, fileData);
          } else {
            console.error('No se pudo descargar el archivo:', file.name);
          }
        }
      }

      // Generar el ZIP final
      const zipBlob = await zip.generateAsync({ type: 'blob' });

      // Si es para descargar el ZIP
      if (download) {
        saveAs(zipBlob, 'reportes.zip');
        return null; // No retornar nada cuando se descarga
      } else {
        return zipBlob; // Retornar el Blob para otras acciones, como enviar por correo
      }

    } catch (error) {
      console.error('Error procesando los reportes:', error);
      return null;
    }
  }





  async loadReportDetails(id?: number): Promise<ReportDto | null> {
    if (id === undefined) {
      console.error("El ID del reporte es undefined.");
      return null; // Retornar null o manejar de otra forma
    }
    try {
      const report = await this.getReportById(id).toPromise(); // Convertimos a Promise
      const attachments = await this.loadAttachments(id);

      report.attachments = attachments || [];
      return report;
    } catch (error) {
      console.error('Error fetching report details:', error);
      throw error;
    }
  }

  async loadAttachments(reportId: number): Promise<File[]> {
    try {
      const data = await this.getAttachments(reportId).toPromise();
      return data || [];
    } catch (error) {
      console.error('Error fetching attachments:', error);
      return [];
    }
  }

  generateReportPDF(detailedReport: ReportDto): Promise<Blob> {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = new jsPDF();

        const footerImage = 'iconos/anjade_icon.jpg'; // Imagen del footer
        const footerHeight = 30;
        const imageSize = 25;
        const pageHeight = doc.internal.pageSize.height;

        doc.setFont('helvetica');
        doc.setFontSize(12);

        // 🔹 Encabezado
        doc.setFillColor(50, 50, 50);
        doc.setTextColor(255, 255, 255);
        doc.rect(10, 10, 190, 10, 'F');
        doc.text('Detalles del Reporte', 15, 17);

        // 🔹 Datos principales
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        let yPosition = 30;
        const maxContentHeight = pageHeight - footerHeight;

        doc.text(`ID: ${detailedReport?.referenciaReporte}`, 15, yPosition);
        doc.text(`Afiliación ID: ${detailedReport?.afiliacionId || 'N/A'}`, 75, yPosition);
        doc.text(`Nombre: ${(detailedReport?.nombre + " " + detailedReport?.apellidos) || 'N/A'}`, 125, yPosition);
        yPosition += 8;
        doc.text(`Teléfono: ${detailedReport?.telefono || 'N/A'}`, 15, yPosition);
        doc.text(`Deporte: ${detailedReport?.deporte?.nombre || 'N/A'}`, 75, yPosition);
        doc.text(`Provincia: ${detailedReport?.provincia?.descripcion || 'N/A'}`, 125, yPosition);
        yPosition += 8;
        doc.text(`Email: ${detailedReport?.email || 'N/A'}`, 15, yPosition);

        // 🔹 Sección de Descripción
        yPosition += 10;
        doc.setFillColor(100, 100, 100);
        doc.setTextColor(255, 255, 255);
        doc.rect(10, yPosition, 190, 8, 'F');
        doc.text('Descripción:', 15, yPosition + 5);
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(9);
        yPosition += 12;

        const htmlString = detailedReport?.descripcion || '<p>Sin descripción</p>';
        const parser = new DOMParser();
        const docHtml = parser.parseFromString(htmlString, 'text/html');

        const elements = docHtml.body.childNodes;
        const maxWidth = 180; // Ancho máximo del texto en el PDF
        const lineHeight = 5; // Espaciado entre líneas
        let fontSize = 10;

        elements.forEach((element: any) => {  
          let textLines: string[] = [];
          if (element.nodeName === Node.TEXT_NODE || element.nodeName === "P") {
            doc.setFont("helvetica", "normal");
            fontSize = 10;
            doc.setFontSize(10);
            textLines = this.smartSplitText(doc, element.textContent, 500);
          }
          if (element.nodeName === "H2" || element.nodeName === "H3") {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(20);
            fontSize = 20;
            textLines = this.smartSplitText(doc, element.textContent, 500);
          }
          if (element.nodeName === "STRONG" || element.nodeName === "B") {
              doc.setFont("helvetica", "bold");
              doc.setFontSize(10);
              fontSize = 15;
              textLines = this.smartSplitText(doc, element.textContent, 500);
            }
            
          
          // Aplicar cada línea con salto automático
          textLines.forEach((line) => {
            doc.setFontSize(fontSize);
            if(fontSize === 20){
              yPosition += lineHeight;
            }
            if (yPosition + 20 > maxContentHeight) {
              this.addFooter(doc, footerImage, imageSize, pageHeight);
              doc.addPage();
              yPosition = 20;
            }
            doc.text(line, 15, yPosition);
            yPosition += lineHeight;
          });

          yPosition += 2; // Espacio extra entre párrafos
        });


        // 🔹 Sección de Archivos Adjuntos
        doc.setFillColor(100, 100, 100);
        doc.setTextColor(255, 255, 255);
        doc.rect(10, yPosition, 190, 8, 'F');
        doc.text('Archivos Adjuntos:', 15, yPosition + 5);
        yPosition += 10;

        const attachments = detailedReport?.attachments || [];
        const tableData = attachments.map((file, index) => [index + 1, this.getName(file) || 'Sin nombre']);

        if (attachments.length > 0) {
          if (yPosition + 20 > maxContentHeight) {
            this.addFooter(doc, footerImage, imageSize, pageHeight);
            doc.addPage();
            yPosition = 20;
          }
          (doc as any).autoTable({
            startY: yPosition + 5,
            head: [['#', 'Nombre del archivo']],
            body: tableData,
          });
        } else {
          doc.text('No hay archivos adjuntos.', 15, yPosition + 15);
        }

        // Agregar footer en la última página
        this.addFooter(doc, footerImage, imageSize, pageHeight);

        // Obtiene el contenido del PDF como una URL de datos
        const pdfContent = doc.output('datauristring');

        // Abre una nueva ventana y escribe el contenido del PDF
        const newWindow = window.open();
        newWindow?.document.write('<iframe width="100%" height="100%" src="' + pdfContent + '"></iframe>');

        const pdfBlob = doc.output('blob');
        if (pdfBlob instanceof Blob) {
          resolve(pdfBlob);
        } else {
          reject(new Error("Error al generar el PDF: no se obtuvo un Blob válido"));
        }

      } catch (error) {
        reject(error);
      }
    });
  }

  smartSplitText(doc: jsPDF, text: string, maxWidth: number): string[] {
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = doc.getStringUnitWidth(testLine) * (doc as any).getFontSize();

      if (testWidth > maxWidth) {
        if (currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          // Si la palabra es más larga que maxWidth, dividirla
          const chars = word.split('');
          let partialWord = '';
          for (const char of chars) {
            const testWord = partialWord + char;
            const testWordWidth = doc.getStringUnitWidth(testWord) * (doc as any).getFontSize();
            if (testWordWidth > maxWidth) {
              lines.push(partialWord + '-');
              partialWord = char;
            } else {
              partialWord += char;
            }
          }
          currentLine = partialWord;
        }
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }



  async downloadFile(file: any): Promise<Blob | undefined> {
    if (!file || !file.data || !file.fileName || !file.fileType) {
      console.error('Archivo inválido', file);
      return;
    }
    const blob = this.base64ToBlob(file.data, file.fileType);

    if (!blob) {
      console.error('No se pudo convertir a Blob:', file);
      return;
    }

    return blob;
  }


  base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }

  // Función para agregar el footer con la imagen
  private addFooter(doc: jsPDF, imageBase64: string, size: number, pageHeight: number) {
    const xPosition = (doc.internal.pageSize.width / 2) - (size / 2); // Centrar la imagen
    const yPosition = pageHeight - size - 5; // Dejar margen inferior
    doc.addImage(imageBase64, 'PNG', xPosition, yPosition, size, size);
  }

  getName(file: any): string | undefined {
    return file.fileName;
  }
}
