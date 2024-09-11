import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  userRole: number | null = null;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
   
  }

  logout(): void {
    this.authService.logout();  // Llama al método de logout del servicio
    this.router.navigate(['/login']);  // Redirige al usuario a la página de inicio de sesión
  }
}