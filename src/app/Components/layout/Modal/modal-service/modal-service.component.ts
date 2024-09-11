import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicesService } from 'src/app/services/services.service';
import { Service } from 'src/app/interfaces/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-service',
  templateUrl: './modal-service.component.html',
  styleUrls: ['./modal-service.component.css']
})
export class ModalServiceComponent {
  service: Service = { id: 0, name: '', description: '', price: 0, quantity: 0 }; // Valor por defecto

  constructor(
    public dialogRef: MatDialogRef<ModalServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Service,
    private servicesService: ServicesService,
    private snackBar: MatSnackBar,
  ) {
    if (data) {
      this.service = { ...data };
    }
  }

  onSubmit(): void {
    if (this.service.id) {
      this.servicesService.updateService(this.service.id, this.service).subscribe(() => {
        this.mostrarAlerta('Servicio actualizado  con éxito', 'success');
        this.dialogRef.close(true);
      });
    } else {
      this.servicesService.createService(this.service).subscribe(() => {
        this.mostrarAlerta('Servicio creado  con éxito', 'success');
        this.dialogRef.close(true);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
  mostrarAlerta(mensaje: string, tipo: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      panelClass: tipo
    });
  }

  
}