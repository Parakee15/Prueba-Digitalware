import { Component, forwardRef, Input, OnInit, Optional, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-control-error',
  templateUrl: './form-control-error.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => FormControlErrorComponent)
    },
  ]
})
export class FormControlErrorComponent implements OnInit, ControlValueAccessor {
  @Input()
  formControlName: string;

  @Input()
  className: string;

  control: AbstractControl;
  formError: string;

  constructor(private controlContainer: ControlContainer,) { }

  ngOnInit() {
    this.control = this.controlContainer.control.get(this.formControlName);

    this.control.statusChanges.subscribe(status => {
      if ((this.control.invalid && this.control.dirty) || (this.control.invalid && this.control.touched)) {

        Object.keys(this.control.errors).every(errorName => {
          this.formError = this.getErrorMessage(errorName, this.control.errors[errorName]);
          return false;
        });
      } else { this.formError = ''; };
    });
  }

  private getErrorMessage(errorName: string, error: any) {
    const messages = {
      required: () => 'Campo requerido',
    };

    return messages[errorName].call(this, error);
  }

  writeValue(obj: any): void {
    // throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }

}
