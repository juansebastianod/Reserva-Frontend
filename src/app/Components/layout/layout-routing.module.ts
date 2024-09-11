import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { UserComponent } from './pages/user/user.component';
import { ServiceComponent } from './pages/service/service.component';
import { DashboardComponent } from './pages/dasd-board/dasd-board.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'reservation', component: ReservationComponent },
      { path: 'users', component: UserComponent },
      { path: 'services', component: ServiceComponent },
      { path: 'reservations', component: ReservationComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: 'reservas', pathMatch: 'full' } // Ruta por defecto
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }