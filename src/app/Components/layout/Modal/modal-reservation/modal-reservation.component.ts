import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reservation } from 'src/app/interfaces/reservation';
import { ReservationService } from 'src/app/services/reservation-service.service';
import { ServicesService } from 'src/app/services/services.service';
import { UserService } from 'src/app/services/user-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Service } from 'src/app/interfaces/services';
import { User } from 'src/app/interfaces/user'; // Importa la interfaz de User
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-modal-reservation',
  templateUrl: './modal-reservation.component.html',
  styleUrls: ['./modal-reservation.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})
export class ModalReservationComponent implements OnInit {
  reservationForm: FormGroup;
  services: Service[] = [];
  users: User[] = []; // Nueva variable para almacenar los usuarios

  constructor(
    public dialogRef: MatDialogRef<ModalReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reservation,
    private reservationsService: ReservationService,
    private servicesService: ServicesService,
    private userService: UserService, // Inyecta el servicio de usuarios
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.reservationForm = this.fb.group({
      id: [this.data?.id || ''],
      customerId: [this.data?.customerId || '', Validators.required], // Customer ID ahora se toma del formulario
      serviceId: [this.data?.serviceId || '', Validators.required],
      date: [this.data?.date ? moment(this.data.date, 'DD/MM/YYYY').toDate() : '', Validators.required],
      time: [this.data?.time || '', Validators.required],
      numberOfGuests: [this.data?.numberOfGuests ?? 1]
    });
  }

  ngOnInit(): void {
    this.loadServices();
    this.loadUsers(); // Cargar la lista de usuarios
  }

  loadServices(): void {
    this.servicesService.getServices().subscribe({
      next: (data) => {
        this.services = data;
      },
      error: (error) => {
        console.error('Error fetching services:', error);
      }
    });
  }

  // Nueva función para cargar la lista de usuarios
  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  onSubmit(): void {
    const formValue = this.reservationForm.value;
    const formattedDate = moment(formValue.date).format('DD/MM/YYYY');

    const reservationData: Reservation = {
      ...formValue,
      date: formattedDate,
      customerId: formValue.customerId, // Usar el customerId del formulario
    };

    if (reservationData.id) {
      this.reservationsService.updateReservation(reservationData.id, reservationData).subscribe(() => {
        this.showAlert('Reserva actualizada con éxito', 'success');
        this.dialogRef.close(true);
      });
    } else {
      this.reservationsService.createReservation(reservationData).subscribe(() => {
        this.showAlert('Reserva creada con éxito', 'success');
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  showAlert(message: string, type: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: type
    });
  }
}