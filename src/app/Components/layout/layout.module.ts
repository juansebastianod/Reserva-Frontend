import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { UserComponent } from './pages/user/user.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { ServiceComponent } from './pages/service/service.component';
import { ModalReservationComponent } from './Modal/modal-reservation/modal-reservation.component';
import { ModalServiceComponent } from './Modal/modal-service/modal-service.component';
import { ModalUserComponent } from './Modal/modal-user/modal-user.component';
import { SharedModule } from 'src/app/Reutilizable/shared/shared.module';
import { DashboardComponent } from './pages/dasd-board/dasd-board.component';



@NgModule({
  declarations: [
    UserComponent,
    ReservationComponent,
    ServiceComponent,
    ModalReservationComponent,
    ModalServiceComponent,
    ModalUserComponent,
    DashboardComponent,
   
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ]
})
export class LayoutModule { }
