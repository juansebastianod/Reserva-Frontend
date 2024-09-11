import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user-service.service';
import { User } from 'src/app/interfaces/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit {
  formularioUsuario: FormGroup;
  ocultarpassword: boolean = true;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";

 constructor(
  private modalActual: MatDialogRef<ModalUserComponent>,
  @Inject(MAT_DIALOG_DATA) public datosUsuario: User,
  private fb: FormBuilder,
  private userService: UserService,
  private snackBar: MatSnackBar
) {
  this.formularioUsuario = this.fb.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    roleId: [2, Validators.required],  // Valor predeterminado de 2
    password: ['', Validators.required]
  });

  if (this.datosUsuario) {
    this.tituloAccion = "Editar";
    this.botonAccion = "Actualizar";
    this.formularioUsuario.patchValue(this.datosUsuario);
  }
}

  ngOnInit(): void {}

  guardarEditarUsuario(): void {
    const usuario: User = this.formularioUsuario.value;

    if (!this.datosUsuario) {
      this.userService.createUser(usuario).subscribe({
        next: (data) => {
          this.mostrarAlerta('Usuario creado con éxito', 'success');
          this.modalActual.close(true);
        },
        error: () => {
          this.mostrarAlerta('No se pudo crear el usuario', 'error');
        }
      });
    } else {
      usuario.id = this.datosUsuario.id;
      this.userService.updateUser(usuario).subscribe({
        next: (data) => {
          this.mostrarAlerta('Usuario actualizado con éxito', 'success');
          this.modalActual.close(true);
        },
        error: () => {
          this.mostrarAlerta('No se pudo actualizar el usuario', 'error');
        }
      });
    }
  }

  mostrarAlerta(mensaje: string, tipo: string) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 3000,
      panelClass: tipo
    });
  }
}