import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { Service } from 'src/app/interfaces/services';
import { ServicesService } from 'src/app/services/services.service';
import { ModalServiceComponent } from '../../Modal/modal-service/modal-service.component';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'description', 'price', 'quantity', 'actions'];
  dataSource = new MatTableDataSource<Service>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.loadServices();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadServices(): void {
    this.servicesService.getServices().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (error) => {
        console.error('Error fetching services:', error);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openCreateDialog(): void {
    this.dialog.open(ModalServiceComponent, {
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result === 'true') {
        this.loadServices();
      }
    });
  }

  openEditDialog(service: Service): void {
    this.dialog.open(ModalServiceComponent, {
      disableClose: true,
      data: service
    }).afterClosed().subscribe(result => {
      if (result === 'true') {
        this.loadServices();
      }
    });
  }

  deleteService(service: Service): void {
    Swal.fire({
      title: '¿Desea eliminar el servicio?',
      text: service.name,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver'
    }).then(result => {
      if (result.isConfirmed) {
        this.servicesService.deleteService(service.id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El servicio ha sido eliminado', 'success');
            this.loadServices();
          },
          error: (error) => {
            Swal.fire('Error', 'No se pudo eliminar el servicio', 'error');
            console.error('Error deleting service:', error);
          }
        });
      }
    });
  }
}