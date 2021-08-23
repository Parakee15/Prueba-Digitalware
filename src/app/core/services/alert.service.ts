import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2'


export interface SwalOptions extends SweetAlertOptions {
    handlerConfirm?: () => void,
    handlerCancel?: () => void
}

@Injectable()
export class AlertService {
    openSwal(data: SwalOptions) {
        Swal.fire(
            `${data.title}`,
            `${data.text}`,
            data.icon
        );
    }

    openConfirmSwal(data: SwalOptions) {
        Swal.fire({
            title: data.title,
            html: data.text,
            icon: data.icon,
            showCancelButton: data.showCancelButton,
            confirmButtonColor: data.confirmButtonColor,
            cancelButtonColor: data.confirmButtonColor,
            confirmButtonText: data.confirmButtonText,
            cancelButtonText: data.cancelButtonText,
            reverseButtons: false
        }).then((result) => {
            if (result.value) {
                data.handlerConfirm();
            } else {
                if (data.handlerCancel) {
                    data.handlerCancel();
                }
            }
        });
    }
}