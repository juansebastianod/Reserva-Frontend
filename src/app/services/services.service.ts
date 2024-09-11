import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Service } from '../interfaces/services';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private baseUrl = `${environment.endpoint}/services`;

  constructor(private http: HttpClient) {}

  // Obtener todos los servicios
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.baseUrl);
  }

  // Obtener un servicio por ID
  getServiceById(id: number): Observable<Service> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Service>(url);
  }

  
  createService(service: Service): Observable<Service> {
    const token = localStorage.getItem('token');
    let options:any = {};


  
    options['Authorization'] =token
    options['X-Content-Type-Options'] = 'nosniff'
    options['X-XSS-Protection'] = '1'
    options['Cache-Control'] = 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0'
    options['Pragma'] = 'no-cache'
    options['Expires'] = '0'
    options['Content-Type']='application/json'

    const headers = new HttpHeaders(options);


    return this.http.post<Service>(this.baseUrl, service,{headers});
  }

  // Actualizar un servicio existente
  updateService(id: number, service: Service): Observable<Service> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Service>(url, service);
  }

  // Eliminar un servicio
  deleteService(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}