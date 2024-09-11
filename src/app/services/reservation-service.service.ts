import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from '../interfaces/reservation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = `${environment.endpoint}/reservations`;

  constructor(private http: HttpClient) {}

  // Obtener todas las reservas
  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.baseUrl);
  }

  // Crear una nueva reserva
  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.baseUrl, reservation);
  }

  // Actualizar una reserva existente
  updateReservation(id: number, reservation: Reservation): Observable<Reservation> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Reservation>(url, reservation);
  }

  // Cancelar (eliminar) una reserva
  cancelReservation(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/cancel/${id}`, null);
  }

  // Completar una reserva
  completeReservation(id: number): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.baseUrl}/complete/${id}`, null);
  }

  // Obtener reservas por cliente
  getReservationsByCustomerId(customerId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/customer/${customerId}`);
  }

  // Obtener reservas por servicio
  getReservationsByServiceId(serviceId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/service/${serviceId}`);
  }

  // Obtener reservas por rango de fechas
  getReservationsByDateRange(startDate: string, endDate: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseUrl}/date-range?startDate=${startDate}&endDate=${endDate}`);
  }
}