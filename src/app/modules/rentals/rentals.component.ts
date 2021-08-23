import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { UserService } from '../../core/services/user.service';
import { AlertService } from '../../core/services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService as FORMSERVICE } from '../../core/services/form.service';
import { RentService } from '../../core/services/rent.service';
import { AircraftService } from '../../core/services/aircraft.service';
import { StringHelper } from 'src/app/core/helpers/string.helper';



@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html',
  styleUrls: ['./rentals.component.scss']
})
export class RentalsComponent implements OnInit {
  @ViewChild('modalPassengers') modalPassengers: ModalComponent;
  @ViewChild('modalAircraft') modalAircraft: ModalComponent;

  public formRent: FormGroup;

  public userList: [];
  public aircraftList: [];
  public rentList: [];

  public aircraft: any;

  constructor(private _userService: UserService,
    private _alertService: AlertService,
    private _formBuilder: FormBuilder,
    private _rentService: RentService,
    private _aircraftService: AircraftService) {
    this.getAll();
    this.getUserByRole('2');
    this.getAircraftByAvailable('1');
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.formRent = this._formBuilder.group({
      location: [null, [Validators.required]],
      desnitationDate: [null, [Validators.required]],
      arrivalDate: [null, [Validators.required]],
      passenger: [null, [Validators.required]],
      aircraft: [null, [Validators.required]],
    });
  }

  private getUserByRole(id: string) {
    this._userService.getByRole(id).subscribe((res: any) => {
      this.userList = res.data;
    }, (err) => {
      // this._alertService.openSwal({
      //   title: 'Error',
      //   text: 'Ocurrio un error consultando los usuarios',
      //   icon: 'warning',
      // });
    });
  }

  private getAircraftByAvailable(id: string) {
    this._aircraftService.getByAvailable(id).subscribe((res: any) => {
      this.aircraftList = res.data;
    }, (err) => {
      // this._alertService.openSwal({
      //   title: 'Error',
      //   text: 'Ocurrio un error consultando los usuarios',
      //   icon: 'warning',
      // });
    });
  }

  public addNamePassenger() {
    this.formRent.patchValue({
      passenger: this.userList.map((a: any) => a.checked ? a.username : null).filter(Boolean).join(', ')
    });
    this.modalPassengers.dissmis();
  }

  public addNameAirCraftSelected() {
    if (this.aircraft) {
      this.formRent.patchValue({
        aircraft: this.aircraft.name
      });
    }
    this.modalAircraft.dissmis();
  }

  public onSubmit() {
    if (!FORMSERVICE.validateForm(this.formRent)) return;
    const dataForm = this.formRent.value;
    const destinationDate = dataForm.desnitationDate as Date;
    const arrivalDate = dataForm.arrivalDate as Date;
    const passenger = this.userList.filter((a: any) => a.checked);

    if (destinationDate < arrivalDate) {
      // this._alertService.openSwal({
      //   title: 'Advertencia',
      //   text: 'La fecha de llegada no puede ser menor a la fecha de salida',
      //   icon: 'warning',
      // });
      return;
    }

    const dataJson = {
      "location": dataForm.location,
      "departureDate": `${destinationDate.getFullYear()}-${StringHelper.zfill((destinationDate.getMonth() + 1), 2)}-${destinationDate.getDate()}`,
      "arrivalDate": `${arrivalDate.getFullYear()}-${StringHelper.zfill((arrivalDate.getMonth() + 1), 2)}-${arrivalDate.getDate()}`,
      "aircraft": this.aircraft,
      "passengers": passenger
    }
    this.save(dataJson);

  }

  public save(data: any) {
    this._rentService.save(data).subscribe((res) => {
      this.formRent.reset();
      this.getUserByRole('2');
      this.getAircraftByAvailable('1');
      this.getAll();
      this.aircraft = null;
      this._alertService.openSwal({
        title: 'Información',
        text: 'Guardada con exito',
        icon: 'success',
      });
    }, (err) => {
      // if (err?.status == 300) {
      //   console.log('err :>> ', err);
      //   this._alertService.openSwal({
      //     title: 'Error',
      //     text: err.error.error,
      //     icon: 'warning',
      //   });
      //   return;
      // }

      // this._alertService.openSwal({
      //   title: 'Error',
      //   text: 'Ocurrio un error Guardando el alquiler de la aeronave',
      //   icon: 'warning',
      // });
    });
  }

  private getAll() {
    this._rentService.get().subscribe((res) => {
      this.rentList = res.data.map((a: any) => {
        a.passengerDesc = a.passengers.map((b: any) => b.username).join(', ');
        return a;
      });
    }, (err) => {
      // this._alertService.openSwal({
      //   title: 'Error',
      //   text: 'Ocurrio un error consultando el alquiler de aeronaves ',
      //   icon: 'warning',
      // });
    });
  }
}




