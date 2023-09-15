import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ORDER_URL } from 'src/app/shared/constants/urls';

@Component({
  selector: 'app-ordenes-empastados-persona-page',
  templateUrl: './ordenes-empastados-persona-page.component.html',
  styleUrls: ['./ordenes-empastados-persona-page.component.css']
})
export class OrdenesEmpastadosPersonaPageComponent implements OnInit {
  userDocuments: any[] | undefined; // Puedes dejarlo como un array genérico para simplificar

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDocumentosUsuario();
  }

  getDocumentosUsuario(): void {
    // Llama directamente al endpoint de tu servidor Express
    this.http.get<any[]>(ORDER_URL + '/documents/by-user') // Ajusta la ruta a la URL correcta de tu servidor
      .subscribe((data: any[]) => {
        this.userDocuments = data;
      });
  }
}