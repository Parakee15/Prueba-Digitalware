import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AircraftComponent } from './aircraft.component';
import { AircraftRoutingModule } from './aircraft-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AircraftService } from '../../core/services/aircraft.service';



@NgModule({
  declarations: [AircraftComponent],
  imports: [
    CommonModule,
    AircraftRoutingModule,
    SharedModule
  ], providers: []
})
export class AircraftModule { }
