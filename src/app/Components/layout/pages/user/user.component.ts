import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user-service.service';
import { ModalUserComponent } from '../../Modal/modal-user/modal-user.component';// Asegúrate de que la ruta es correcta

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'username', 'phone', 'address', 'actions'];
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 

  openEditDialog(user: User): void {
    this.dialog.open(ModalUserComponent, {
      disableClose: true,
      data: user
    }).afterClosed().subscribe(result => {
      if (result === 'true') {
        this.loadUsers();
      }
    });
  }

  deleteUser(user: User): void {
    Swal.fire({
      title: '¿Desea eliminar el usuario?',
      text: user.name,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'No, volver'
    }).then(result => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user.id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El usuario ha sido eliminado', 'success');
            this.loadUsers();
          },
          error: (error) => {
            Swal.fire('Error', 'No se pudo eliminar el usuario', 'error');
            console.error('Error deleting user:', error);
          }
        });
      }
    });
  }
}