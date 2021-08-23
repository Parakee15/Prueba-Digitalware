import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AircraftService } from '../../core/services/aircraft.service';
import { AlertService } from '../../core/services/alert.service';
import { FormService as FORMSERVICE } from '../../core/services/form.service';

@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.scss']
})
export class AircraftComponent implements OnInit {
  public formAircraft: FormGroup;

  // public aircraftList: [];

  constructor(private _aircraftService: AircraftService,
    private _formBuilder: FormBuilder,
    private _alertService: AlertService) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.getAircraft();
  }

  private buildForm() {
    this.formAircraft = this._formBuilder.group({
      aircraft: this._formBuilder.array([])
    });
  }

  private getAircraft() {
    this._aircraftService.get().subscribe((res) => {
      console.log('res :>> ', res);
      res.data.forEach((element) => this.addRow(element));
      if (res.data.length == 0) this.addRow();
    }, (err) => {
      console.log('err :>> ', err);
      // this._alertService.openSwal({
      //   title: 'Error',
      //   text: 'Ocurrio un error consultando las Aeronaves',
      //   icon: 'error'
      // });
    });
  }

  public get aircrafForm() { return this.formAircraft.get('aircraft') as FormArray }

  public addRow(data?: any) {
    console.log('object :>> ',);
    let available = data?.available ? 'Disponible' : 'No Disponible';
    const form = this._formBuilder.group({
      id: [{ value: data?.id, disabled: true }],
      name: [data?.name, [Validators.required]],
      status: [{ value: data ? available : 'Disponible', disabled: true }],
      available: [data?.available]
    });
    if (data) form.disable();

    this.aircrafForm.push(form);
  }

  public removeRow(index) {
    if (this.aircrafForm.length != 1)
      this.aircrafForm.removeAt(index);
  }

  public update(index) {
    const form = (this.aircrafForm.controls[index] as FormGroup);
    const dataForm = form.getRawValue();
    const dataJson = {
      name: dataForm.name
    };
    this._aircraftService.update(dataForm.id, dataJson).subscribe((res) => {
      form.disable();
      this._alertService.openSwal({
        title: 'Información',
        text: 'Editada con exito',
        icon: 'success',
      });
    }, (err) => {
      // this._alertService.openSwal({
      //   title: 'Error',
      //   text: 'Ocurrio un error editando la Aeronave',
      //   icon: 'warning',
      // });
    });
  }

  public delete(index) {
    let form = this.aircrafForm.controls[index];
    if (!form.value.id) { this.removeRow(index); return }

    if (!form.value.available) {
      this._alertService.openSwal({
        title: 'Error',
        text: 'No puedes eliminar una aeronave con viajes asignado',
        icon: 'warning',
      });
      return;
    }

    this._alertService.openConfirmSwal({
      title: 'Advertencia',
      text: '¿Está seguro de eliminar esta Aeronave?',
      icon: 'warning',
      confirmButtonText: 'Confirmar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      handlerConfirm: async () => {
        this._aircraftService.delete(form.value.id).subscribe(() => {
          this.removeRow(index);
          this._alertService.openSwal({
            title: 'Información',
            text: 'Eiminada con exito',
            icon: 'success',
          });
        }, (err) => {
          // this._alertService.openSwal({
          //   title: 'Error',
          //   text: 'Ocurrio un error eliminando la Aeronave',
          //   icon: 'warning',
          // });
        });
      }
    });
  }

  public save(index) {
    const form = (this.aircrafForm.controls[index] as FormGroup);
    if (!FORMSERVICE.validateForm(form)) { return; }
    const dataForm = form.getRawValue();
    const dataJson = {
      name: dataForm.name
    }
    this._aircraftService.save(dataJson).subscribe((res) => {
      form.patchValue({ id: res.id, });
      form.disable();
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
      //   text: 'Ocurrio un error Guardando la Aeronave',
      //   icon: 'warning',
      // });
    });
  }
}
