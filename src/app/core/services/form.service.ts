import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  public static validateForm(form: FormGroup): boolean {
    Object.keys(form.controls).forEach(field => {
      const control = form.controls[field];
      control.markAsTouched();
      control.updateValueAndValidity();
    });
    return form.valid;
  }
}
