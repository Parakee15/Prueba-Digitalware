import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlErrorComponent } from './components/form-control-error/form-control-error.component';
import { FormService } from '../core/services/form.service';
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
  declarations: [FormControlErrorComponent, ModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    FormControlErrorComponent,
    ModalComponent
  ],
  providers: [FormService]
})
export class SharedModule { }
