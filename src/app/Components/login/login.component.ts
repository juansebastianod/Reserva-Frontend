import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user-service.service';
import { ModalUserComponent } from '../layout/Modal/modal-user/modal-user.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup;
  ocultarpassword: boolean = true;
  mostrarLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private userService: UserService,  // Inyectar UserService
    private snackBar: MatSnackBar
  ) {
    this.formularioLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  iniciarSesion(): void {
    if (this.formularioLogin.invalid) {
      return;
    }
  
    this.mostrarLoading = true;
  
    const loginData = {
      username: this.formularioLogin.get('username')?.value,
      password: this.formularioLogin.get('password')?.value
    };
  
    this.userService.login(loginData.username, loginData.password).subscribe({
      next: (response: string) => {  // Ahora la respuesta es un string
        this.mostrarLoading = false;
  
        // Guardar el token en localStorage
        if (response) {
          localStorage.setItem('token', response);
  
          // Notificación de éxito
          this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', { duration: 3000 });
  
          // Redirigir a la página principal
          this.router.navigate(['pages/users']);
        } else {
          // Si no hay token, mostrar un mensaje de error
          this.snackBar.open('Error al recibir el token', 'Cerrar', { duration: 3000 });
        }
      },
      error: () => {
        this.mostrarLoading = false;
        // Mostrar notificación de error
        this.snackBar.open('Credenciales incorrectas', 'Cerrar', { duration: 3000 });
      }
    });
  }

  // Método para abrir el modal de registro
  openRegisterDialog(): void {
    this.dialog.open(ModalUserComponent, {
      disableClose: true
    }).afterClosed().subscribe(result => {
      if (result === 'true') {
        console.log('Usuario registrado correctamente');
      }
    });
  }
}