import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Reservation } from 'src/app/interfaces/reservation';
import { ReservationService } from 'src/app/services/reservation-service.service';
import { ModalReservationComponent } from '../../Modal/modal-reservation/modal-reservation.component';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['customerId', 'serviceId', 'date', 'time', 'status', 'completionStatus', 'numberOfGuests', 'actions'];
  dataSource = new MatTableDataSource<Reservation>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private reservationsService: ReservationService
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadReservations(): void {
    this.reservationsService.getReservations().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (error) => {
        console.error('Error fetching reservations:', error);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openCreateDialog(): void {
    this.dialog.open(ModalReservationComponent, {
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result === true) {
        this.loadReservations();
      }
    });
  }

  openEditDialog(reservation: Reservation): void {
    this.dialog.open(ModalReservationComponent, {
      disableClose: true,
      data: reservation
    }).afterClosed().subscribe(result => {
      if (result === true) {
        this.loadReservations();
      }
    });
  }

  deleteReservation(reservation: Reservation): void {
    Swal.fire({
      title: '¿Desea eliminar la reserva?',
      text: `Reserva ID: ${reservation.id}`,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver'
    }).then(result => {
      if (result.isConfirmed) {
        this.reservationsService.cancelReservation(reservation.id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'La reserva ha sido eliminada', 'success');
            this.loadReservations();
          },
          error: (error) => {
            Swal.fire('Error', 'No se pudo eliminar la reserva', 'error');
            console.error('Error deleting reservation:', error);
          }
        });
      }
    });
  }

  completeReservation(reservation: Reservation): void {
    Swal.fire({
      title: '¿Desea marcar esta reserva como completada?',
      text: `Reserva ID: ${reservation.id}`,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, completar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver'
    }).then(result => {
      if (result.isConfirmed) {
        this.reservationsService.completeReservation(reservation.id).subscribe({
          next: (updatedReservation) => {
            Swal.fire('Completado', 'La reserva ha sido marcada como completada', 'success');
            this.loadReservations(); // Actualiza la lista de reservas
          },
          error: (error) => {
            Swal.fire('Error', 'No se pudo completar la reserva', 'error');
            console.error('Error completing reservation:', error);
          }
        });
      }
    });
  }
}