import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser'; // Importa DomSanitizer
import { ORDER_URL } from 'src/app/shared/constants/urls';

@Component({
  selector: 'ordenes-empastados-page',
  templateUrl: './ordenes-empastados-page.component.html',
  styleUrls: ['./ordenes-empastados-page.component.css']
})
export class OrdenesEmpastadosPageComponent implements OnInit {
  documents: any[] = [];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.fetchDocuments();
  }

  fetchDocuments() {
    this.http.get<any[]>(ORDER_URL+ '/getdocuments').subscribe(
      (data: any[]) => {
        console.log(data)
        this.documents = data;
      },
      (error) => {
        console.error('Error fetching documents:', error);
      }
    );
  }
  async downloadDocument(documentId:string, fileName:string) {
    if (!documentId) {
      console.error('No se ha especificado un ID de documento.');
      return;
    }

    try {
      // Hacer una solicitud HTTP GET para descargar el documento
      const response = await this.http.get(ORDER_URL + `/download/${documentId}`, {
        responseType: 'blob', // Especificar que esperamos un blob (archivo binario) como respuesta
      }).toPromise();

      if (response instanceof Blob) { // Verificar si la respuesta es un Blob válido
        // Crear un objeto Blob URL para el archivo
        const blob = new Blob([response], { type: 'application/pdf' });
        const objectUrl = URL.createObjectURL(blob);

        // Crear un enlace para descargar el archivo
        const a = document.createElement('a');
        a.href = objectUrl;
        a.download = fileName;
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