import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentalsRoutingModule } from './rentals-routing.module';
import { RentalsComponent } from './rentals.component';
import { SharedModule } from '../../shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RentService } from '../../core/services/rent.service';
import { AircraftService } from '../../core/services/aircraft.service';


@NgModule({
  declarations: [RentalsComponent],
  imports: [
    CommonModule,
    RentalsRoutingModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: []
})
export class RentalsModule { }
