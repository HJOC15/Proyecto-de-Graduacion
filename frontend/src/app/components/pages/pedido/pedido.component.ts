import { Component } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ORDER_URL } from 'src/app/shared/constants/urls';
import { TextureService } from 'src/app/services/texture.service.service';

@Component({
  selector: 'pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent {
  selectedFile: File | null = null;
  fileName = '';
  pageCount = 0;
  totalPrice = 0;

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (!file) {
      return;
    }

    this.selectedFile = file;
    this.fileName = file.name;

    const reader = new FileReader();

    reader.onload = async () => {
      const uint8Array = new Uint8Array(reader.result as ArrayBuffer);
      const pdfDoc = await PDFDocument.load(uint8Array);

      this.pageCount = pdfDoc.getPageCount();
      this.totalPrice = this.pageCount * 0.25 + 35;
    };

    reader.readAsArrayBuffer(file);
  }

  documentId: string | null = null;
  

  constructor(private http: HttpClient, public textureService: TextureService) {} // Asegúrate de haber inyectado HttpClient en el constructor

  async uploadDocument() {
    if (!this.selectedFile) {
      return;
    }
  
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('selectedTextureName', this.textureService.selectedTexture?.name || ''); // Envía el nombre de la textura seleccionada
    formData.append('totalPrice', this.totalPrice.toString());
  
    try {
      // Hacer la solicitud HTTP POST para enviar el archivo al servidor
      const response = await this.http.post(ORDER_URL + '/upload', formData, {
        responseType: 'blob', // Especificar que esperamos un blob (archivo binario) como respuesta
        headers: new HttpHeaders().append('Accept', 'application/pdf') // Opcional: especificar el tipo de archivo esperado
      }).toPromise();
  
      if (response instanceof Blob) { // Verificar si la respuesta es un Blob válido
        // En este punto, la respuesta es un blob (archivo binario). Puedes manejarlo como desees.
        // Por ejemplo, puedes abrirlo en una nueva ventana o descargarlo.
  
        // Si deseas abrirlo en una nueva ventana del navegador (en este caso asumiendo que es un PDF):
        const blob = new Blob([response], { type: 'application/pdf' });
        const objectUrl = URL.createObjectURL(blob);
  
        // Si deseas descargar el archivo:
        // const blob = new Blob([response], { type: 'application/pdf' });
        // const url = window.URL.createObjectURL(blob);
        // const a = document.createElement('a');
        // a.href = url;
        // a.download = 'documento.pdf';
        // a.click();
      } else {
        console.error('Respuesta del servidor no es un Blob válido.');
      }
    } catch (error) {
      console.error('Error al subir el documento:', error);
    }
  }

  async downloadDocument() {
    this.documentId= '65025cb8b19cefc41e678e55'
    if (!this.documentId) {
      console.error('No se ha especificado un ID de documento.');
      return;
    }

    try {
      // Hacer una solicitud HTTP GET para descargar el documento
      const response = await this.http.get(ORDER_URL + `/download/${this.documentId}`, {
        responseType: 'blob', // Especificar que esperamos un blob (archivo binario) como respuesta
      }).toPromise();

      if (response instanceof Blob) { // Verificar si la respuesta es un Blob válido
        // Crear un objeto Blob URL para el archivo
        const blob = new Blob([response], { type: 'application/pdf' });
        const objectUrl = URL.createObjectURL(blob);

        // Crear un enlace para descargar el archivo
        const a = document.createElement('a');
        a.href = objectUrl;
        a.download = this.fileName;
        a.click();

        // Liberar el objeto Blob URL después de la descarga
        URL.revokeObjectURL(objectUrl);
      } else {
        console.error('Respuesta del servidor no es un Blob válido.');
      }
    } catch (error) {
      console.error('Error al descargar el documento:', error);
    }
  }
}
