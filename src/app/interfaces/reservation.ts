export interface Reservation {
  id: number;
  customerId: number; // ID del cliente
  serviceId: number; // ID del servicio
  date: string; // Asegúrate de que el formato de fecha sea compatible con el backend
  time: string; // Asegúrate de que el formato de hora sea compatible con el backend
  status: boolean; // Indica si la reserva está activa
  completionStatus: boolean; // Indica si la reserva está completada
  numberOfGuests: number; // Número de invitados
}